import React from "react";
import { useGameContext } from "../hooks/useGameContext";
import { T } from "../types/type";
import { Card } from "./Card";
import { makeStyles } from "@mui/styles";
import views from "../assets/cards/index";

const useStyles = makeStyles({
  pool: {},
});

/**
 * TODO: generate card pool
 */

export const Playground: React.FC = () => {
  const {
    nodes,
    selectedNodes,
    removedNodes,
    canBack,
    canUnblockFirstThree,
    ...callbacks
  } = useGameContext({ levelCount: 3 });

  

  const styles = useStyles();

  return (
    <div className={styles.pool}>
      <Card
        node={{
          index: 0,
          level: 0,
          viewUrl: views.p1,
          layout: { left: 40, top: 40 },
          position: { row: 0, col: 0 },
          value: 0,
          status: T.Status.Frozen,
          parents: [],
        }}
        onClick={() => {}}
      />
      <Card
        node={{
          index: 0,
          level: 0,
          viewUrl: views.p1,
          layout: { left: 60, top: 60 },
          position: { row: 0, col: 0 },
          value: 0,
          status: T.Status.Frozen,
          parents: [],
        }}
        onClick={() => {}}
      />
    </div>
  );
};
