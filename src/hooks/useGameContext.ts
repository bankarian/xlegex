import React from "react";
import { T } from "../types/type";

export const useGameContext = (config: T.GameConfig): T.GameContext => {
  const [nodes, useNodes] = React.useState<T.CardNode[]>([]);

  // The selected nodes are organized as a FILO stack
  const [selectedStack, useSelectStack] = React.useState<T.CardNode[]>([]);
  const [removedNodes, useRemoveNodes] = React.useState<T.CardNode[]>([]);
  const [canBack, useCanBack] = React.useState<boolean>(true);
  const [canUnblockFirstThree, useCanUnblockFirstThree] =
    React.useState<boolean>(true);

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

  const onInitialize = () => {
    // TODO: generate nodes here
    
  }

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
