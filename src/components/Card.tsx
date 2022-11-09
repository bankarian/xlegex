import { makeStyles } from "@mui/styles";
import React from "react";
import { T } from "../types/type";

const useStyles = makeStyles({
  container: (props: T.CardNode) => ({
    zIndex: props.level,
  }),
  img: {
    width: 40,
    height: 40,
    background: "blue",
  },
  mask: {
    background: "black",
    opacity: 0.5,
  },
});

export const Card: React.FC<{
  node: T.CardNode;
  onClick: () => void;
}> = ({ node, onClick }) => {
  const styles = useStyles(node);
  return (
    <div className={styles.container} onClick={onClick}>
      <img src={node.viewUrl} className={styles.img} />
      <div className={styles.mask} />
    </div>
  );
};
