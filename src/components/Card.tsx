import { makeStyles } from "@mui/styles";
import React from "react";
import { T } from "../types/type";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    display: "flex",
  },
  img: {
    width: 40,
    height: 40,
    background: "blue",
  },
  mask: {
    background: "black",
    opacity: 0.5,
    width: 40,
    height: 40,
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
      }}
    >
      <img src={node.viewUrl} className={styles.img} alt="" />
      <div className={styles.mask} />
    </div>
  );
};
