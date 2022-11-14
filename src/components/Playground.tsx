import React from "react";
import { useGameContext } from "../hooks/useGameContext";
import { T } from "../types/type";
import { Card } from "./Card";
import viewUrl from "../assets/cards/p1.jpg";

export const Playground: React.FC = () => {
  const {
    nodes,
    selectedNodes,
    removedNodes,
    canBack,
    canUnblockFirstThree,
    ...callbacks
  } = useGameContext({ levelCount: 3 });

  return (
    <Card
      node={{
        index: 0,
        level: 0,
        viewUrl,
        layout: { left: 30, top: 40 },
        position: { row: 0, col: 0 },
        value: 0,
        status: T.Status.Frozen,
        parents: [],
      }}
      onClick={() => {}}
    />
  );
};
