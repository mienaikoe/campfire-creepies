import React from "react";
import styles from "./Card.less";

const Card = ({ card }) => {
  return (
    <div className={styles.card}>
      <h3>{card.name}</h3>
      <p>{card.description}</p>
    </div>
  );
};

export default Card;
