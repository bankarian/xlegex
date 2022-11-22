import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import config from "../config";
import { useGameContext } from "../hooks/useGameContext";
import { Card } from "./Card";
import Button from "@mui/material/Button";

const useStyles = makeStyles({
  pool: {},
  stack: {},
});

export const Playground: React.FC = () => {
  const {
    nodes,
    selectedNodes,
    unblockedNodes,
    canBack,
    canUnblockFirstThree,
    gameStatus,
    ...props
  } = useGameContext(config);

  const styles = useStyles();

  React.useEffect(() => {
    props.onInitialize();
  }, []);

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  return (
    <div className={styles.pool}>
      {nodes.map((n, i) => (
        <Card key={i} node={n} onClick={() => props.onSelect(n)} />
      ))}
      <Button variant="outlined" disabled={!canBack} onClick={props.onBack}>
        Back
      </Button>
      <Button
        variant="outlined"
        disabled={!canUnblockFirstThree}
        onClick={props.onUnblockFirstThree}
      >
        Unblock first three
      </Button>
      <div>{`selected: ${selectedNodes.map(
        (o) => o.name + ":" + o.type + ", "
      )}`}</div>
      <div>{`unblocked: ${unblockedNodes.map(
        (o) => o.name + ":" + o.type + ", "
      )}`}</div>
      <div>{`Game Status: ${gameStatus}`}</div>
    </div>
  );
};
