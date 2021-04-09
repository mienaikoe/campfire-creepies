import React from "react";
import styles from "./CardCard.less";

const CardCard = ({ card, selected, onSelect }) => {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onSelect ? () => onSelect(card) : null}
    >
      <h3>{card.name}</h3>
      <p>{card.description}</p>
    </div>
  );
};

export default CardCard;
