import { makeStyles } from "@mui/styles";
import React from "react";
import { useGameContext } from "../hooks/useGameContext";
import { Card } from "./Card";

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
    ...props
  } = useGameContext({
    expectedLevelCount: 5,
    containerWidth: 400,
    containerHeight: 400,
    typeCount: 6,
    cardSize: 40,
  });

  const styles = useStyles();

  React.useEffect(() => {
    props.onInitialize();
  }, []);

  return (
    <div className={styles.pool}>
      {nodes.map((n) => (
        <Card node={n} onClick={() => props.onSelect(n)} />
      ))}
    </div>
  );
};
