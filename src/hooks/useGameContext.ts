import { floor, random, shuffle } from "lodash";
import { useEffect, useState } from "react";
import { T } from "../types/type";
import { containsByAssert, containsByKey } from "../utils/utils";

export const useGameContext = (config: T.GameConfig): T.GameContext => {
  const [nodes, useNodes] = useState<T.CardNode[]>([]);
  const [selectedStack, useSelectedStack] = useState<T.CardNode[]>([]);
  const [unblockedNodes, useUnblockedNodes] = useState<T.CardNode[]>([]);
  const [canBack, useCanBack] = useState<boolean>(false);
  const [canUnblockFirstThree, useCanUnblockFirstThree] = useState<boolean>(
    false
  );
  const [unblockChances, useUnblockChances] = useState<number>(
    config.unblockChances
  );
  const [backChances, useBackChances] = useState<number>(config.backChances);

  useEffect(() => {
    if (unblockChances && selectedStack.length > 2) {
      useCanUnblockFirstThree(true);
    } else {
      useCanUnblockFirstThree(false);
    }
  }, [selectedStack, unblockChances]);

  useEffect(() => {
    if (backChances && selectedStack.length > 0) {
      useCanBack(true);
    } else {
      useCanBack(false);
    }
  }, [selectedStack, backChances]);

  useEffect(() => {
    /**
     * check the last three element to see if they are matched
     */
    if (selectedStack.length < config.matchCount) {
      return;
    }
    const slice = selectedStack.slice(-config.matchCount);
    let matched = true;
    for (let i = 1; i < slice.length; i++) {
      if (slice[i].type !== slice[i - 1].type) {
        matched = false;
        break;
      }
    }
    if (matched) {
      useSelectedStack((pre) => pre.slice(0, pre.length - config.matchCount));
    }
  }, [selectedStack]);

  const stackIsFull = <T>(stack: T[], depth: number): boolean => {
    return stack.length === depth;
  };

  const onSelect = (node: T.CardNode) => {
    if (
      node.status !== T.Status.Clickable ||
      stackIsFull(selectedStack, config.stackDepth)
    ) {
      return;
    }
    useNodes((pre) =>
      pre
        .filter((o) => o.name !== node.name)
        .map((o) => {
          if (containsByKey(o.overlaps, node, "name")) {
            o.overlaps = o.overlaps.filter((e) => e.name !== node.name);
            if (o.overlaps.length === 0) {
              o.status = T.Status.Clickable;
            }
          }
          return o;
        })
    );
    useSelectedStack((pre) => [...pre, node]);
  };

  const onBack = () => {
    if (!canBack || selectedStack.length === 0) {
      return;
    }
    const node = selectedStack[selectedStack.length - 1];
    useNodes((pre) => {
      // update overlapping status for pre
      pre.forEach((o) => {
        if (o.level !== node.level - 1) {
          return;
        }
        const keyPoints = keyPointsOf(o);
        if (
          containsByAssert(
            keyPoints,
            node.layout,
            (a, b) => a.left === b.left && a.top === b.top
          )
        ) {
          o.overlaps.push(node);
          o.status = T.Status.Frozen;
        }
      });

      // insert node
      return [...pre, node];
    });
    useSelectedStack((pre) => pre.slice(0, pre.length - 1));
    useBackChances((pre) => pre - 1);
  };

  const resetContext = () => {
    useSelectedStack([]);
    useUnblockedNodes([]);
    useCanBack(true);
    useCanUnblockFirstThree(false);
  };

  const genCount = (level: number) => {
    const maxCount = level * level;
    const minCount = maxCount / 2;
    return random(minCount, maxCount + 1);
  };

  const keyPointsOf = (node: T.CardNode): T.Layout[] => {
    const offset = config.cardSize / 2;
    return [
      {
        left: node.layout.left + offset,
        top: node.layout.top + offset,
      },
      {
        left: node.layout.left - offset,
        top: node.layout.top + offset,
      },
      {
        left: node.layout.left + offset,
        top: node.layout.top - offset,
      },
      {
        left: node.layout.left - offset,
        top: node.layout.top - offset,
      },
    ];
  };

  /** Deal with the overlapping relation for nodes in pre-level */
  const linkOverlap = (node: T.CardNode, preLevel: T.CardNode[]) => {
    const keyPoints: T.Layout[] = keyPointsOf(node);

    preLevel.forEach((o) => {
      if (
        containsByAssert(
          keyPoints,
          o.layout,
          (a, b) => a.left === b.left && a.top === b.top
        )
      ) {
        o.overlaps.push(node);
        o.status = T.Status.Frozen;
      }
    });
  };

  const onInitialize = () => {
    const {
      expectedLevelCount,
      typeCount,
      cardSize,
      containerWidth,
      containerHeight,
    } = config;
    resetContext();

    // 1. Generate all item: count = typeCount * 3 * expectedLevelCount
    const types = new Array(typeCount).fill(0).map((_, i) => i + 1);
    let items: number[] = [];
    for (let i = 0; i < expectedLevelCount; i++) {
      items = [...items, ...types, ...types, ...types];
    }

    // 2. Shuffle
    items = shuffle(shuffle(items));

    // 3. Populate items to each level
    let level = 1;
    let tower: number[][] = [];
    while (items.length > 0) {
      const count = genCount(level);
      tower.push(items.splice(0, count));
      level++;
    }

    // 4. Create nodes with relation
    let preLevel: T.CardNode[] = [];
    let offset = 0;
    const baseWidthOffset = containerWidth / 2,
      baseHeightOffset = containerHeight / 2;
    const memo = new Set<number>();

    const src = tower.flatMap<T.CardNode>((keys, level) => {
      memo.clear();
      const len = level + 1;

      const nodes = keys.map((k) => {
        let levelIndex = random(0, len * len);
        while (memo.has(levelIndex)) {
          levelIndex = random(0, len * len);
        }
        const row = floor(levelIndex / len),
          col = levelIndex % len;

        const node: T.CardNode = {
          levelIndex,
          name: `${level}-${levelIndex}`,
          level,
          layout: {
            left: baseWidthOffset + col * cardSize - offset,
            top: baseHeightOffset + row * cardSize - offset,
          },
          position: {
            row,
            col,
          },
          type: k,
          viewUrl: "", // TODO: link url with 'type'
          status: T.Status.Clickable,
          overlaps: [],
          size: cardSize,
        };
        linkOverlap(node, preLevel);
        return node;
      });

      offset += cardSize / 2;
      preLevel = nodes;
      return nodes;
    });

    useNodes(src);
  };

  // TODO: impl
  const onUnblockFirstThree = () => {
    if (!canUnblockFirstThree) {
      return;
    }
    useUnblockedNodes(selectedStack.slice(0, 3));
    useUnblockChances((pre) => pre - 1);
    useSelectedStack(selectedStack.slice(3));
  };

  return {
    nodes,
    selectedNodes: selectedStack,
    unblockedNodes,
    canBack,
    canUnblockFirstThree,
    onSelect,
    onBack,
    onUnblockFirstThree,
    onInitialize,
  };
};
