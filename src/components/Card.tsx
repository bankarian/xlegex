import { makeStyles } from "@mui/styles";
import React from "react";
import { T } from "../types/type";

const useStyles = makeStyles({
  container: (props: T.CardNode) => ({
    position: "absolute",
    display: "flex",
    background: "cyan",
    border: "solid 0.5px",
    width: props.size,
    height: props.size,
    zIndex: props.level,
    left: props.layout.left,
    top: props.layout.top,
    cursor: "pointer",
  }),
  img: (props: T.CardNode) => ({
    background: "blue",
    width: props.size,
    height: props.size,
  }),
  mask: (props: T.CardNode) => ({
    background: "black",
    zIndex: 1,
    position: "absolute",
    width: props.size,
    height: props.size,
    opacity: props.status === T.Status.Clickable ? 0 : 0.5,
  }),
});

export const Card: React.FC<{
  node: T.CardNode;
  onClick: () => void;
}> = ({ node, onClick }) => {
  const styles = useStyles(node);
  return (
    <div className={styles.container} onClick={onClick}>
      {node.viewUrl ? (
        <img src={node.viewUrl} className={styles.img} alt="" />
      ) : (
        node.name
      )}
      <div className={styles.mask} />
    </div>
  );
};
