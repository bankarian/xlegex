import { makeStyles } from "@mui/styles";
import React from "react";
import config from "../config";
import { useGameContext } from "../hooks/useGameContext";
import { Card } from "./Card";

const useStyles = makeStyles({
  pool: {},
  stack: {},
});

export const Playground: React.FC = () => {
  const {
    nodes,
    selectedNodes,
    removedNodes,
    canBack,
    canUnblockFirstThree,
    ...props
  } = useGameContext(config);

  const styles = useStyles();

  React.useEffect(() => {
    props.onInitialize();
  }, []);

  return (
    <div className={styles.pool}>
      {nodes.map((n, i) => (
        <Card key={i} node={n} onClick={() => props.onSelect(n)} />
      ))}
    </div>
  );
};
