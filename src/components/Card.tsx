import { makeStyles } from "@mui/styles";
import React from "react";
import { T } from "../types/type";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    display: "flex",
    background: "cyan",
    border: "solid 0.5px",
  },
  img: {
    background: "blue",
  },
  mask: {
    background: "black",
    zIndex: 1,
    position: "absolute",
  },
});

export const Card: React.FC<{
  node: T.CardNode;
  onClick: () => void;
}> = ({ node, onClick }) => {
  const styles = useStyles();
  return (
    <div
      className={styles.container}
      onClick={onClick}
      style={{
        zIndex: node.level,
        left: node.layout.left,
        top: node.layout.top,
        width: node.size,
        height: node.size,
      }}
    >
      {node.viewUrl ? (
        <img
          src={node.viewUrl}
          className={styles.img}
          alt=""
          style={{
            width: node.size,
            height: node.size,
          }}
        />
      ) : (
        node.name
      )}
      <div
        className={styles.mask}
        style={{
          opacity: node.status === T.Status.Clickable ? 0 : 0.5,
          width: node.size,
          height: node.size,
        }}
      />
    </div>
  );
};
