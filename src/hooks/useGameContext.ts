import { floor, random, shuffle } from "lodash";
import React from "react";
import { T } from "../types/type";

export const useGameContext = (config: T.GameConfig): T.GameContext => {
  const [nodes, useNodes] = React.useState<T.CardNode[]>([]);

  // The selected nodes are organized as a FILO stack
  const [selectedStack, useSelectStack] = React.useState<T.CardNode[]>([]);
  const [removedNodes, useRemoveNodes] = React.useState<T.CardNode[]>([]);
  const [canBack, useCanBack] = React.useState<boolean>(true);
  const [canUnblockFirstThree, useCanUnblockFirstThree] = React.useState<
    boolean
  >(false);

  const onSelect = (node: T.CardNode) => {
    useNodes((pre) => pre.filter((e) => e !== node));
    useSelectStack((pre) => [...pre, node]);
  };

  const onBack = () => {
    if (!canBack || selectedStack.length === 0) {
      return;
    }
    const node = selectedStack[selectedStack.length - 1];
    useNodes((pre) => [...pre, node]);
    useSelectStack((pre) => {
      pre.pop();
      return pre;
    });
    useCanBack(false);
  };

  const resetContext = () => {
    useSelectStack([]);
    useRemoveNodes([]);
    useCanBack(true);
    useCanUnblockFirstThree(false);
  };

  const genCount = (level: number) => {
    const maxCount = level * level;
    const minCount = maxCount / 2;
    return random(minCount, maxCount + 1);
  };

  /** Deal with the overlapping relation for nodes in pre-level */
  const linkOverlap = (node: T.CardNode, preLevel: T.CardNode[]) => {
    const offset = config.cardSize / 2;
    const keyPoints: T.Layout[] = [
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

    preLevel.forEach((n) => {
      const overlap = keyPoints.filter(
        (p) => p.left === n.layout.left && p.top === n.layout.top
      );
      if (overlap.length > 0) {
        n.status = T.Status.Frozen;
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
          parents: [],
          size: cardSize
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
  const onUnblockFirstThree = () => {};

  return {
    nodes,
    selectedNodes: selectedStack,
    removedNodes,
    canBack,
    canUnblockFirstThree,
    onSelect,
    onBack,
    onUnblockFirstThree,
    onInitialize,
  };
};
