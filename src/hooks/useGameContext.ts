import React from "react";

export const useGameContext = (initNodes: CardNode[]): GameContext => {
  const [nodes, useNodes] = React.useState<CardNode[]>(initNodes);

  // The selected nodes are organized as a FILO stack
  const [selectedStack, useSelectStack] = React.useState<CardNode[]>([]);
  const [removedNodes, useRemoveNodes] = React.useState<CardNode[]>([]);
  const [canBack, useCanBack] = React.useState<boolean>(true);
  const [canUnblockFirstThree, useCanUnblockFirstThree] =
    React.useState<boolean>(true);

  const onSelect = (node: CardNode) => {
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
  };
};
