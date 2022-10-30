import React from "react";

export const useGame = (config: GameConfig): GameContext => {
  const [nodes, useNodes] = React.useState<CardNode[]>([]);
  const [selectedNodes, useSelectedNodes] = React.useState<CardNode[]>([]);
  const [removedNodes, useRemoveNodes] = React.useState<CardNode[]>([]);
  const [canBack, useCanBack] = React.useState<boolean>(true);
  const [canUnblockFirstThree, useCanUnblockFirstThree] =
    React.useState<boolean>(true);

  const onSelect = (node: CardNode) => {};
  const onBack = () => {};
  const onUnblockFirstThree = () => {};

  return {
    nodes,
    selectedNodes,
    removedNodes,
    canBack,
    canUnblockFirstThree,
    onSelect,
    onBack,
    onUnblockFirstThree,
  };
};
