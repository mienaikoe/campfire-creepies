import React from "react";
import styles from "./CardCard.less";

const CardCard = ({ card, selected, onSelect }) => {
  const classNames = [styles.card];
  onSelect && classNames.push(styles.selectable);
  selected && classNames.push(styles.selected);

  return (
    <div
      className={classNames.join(" ")}
      onClick={onSelect ? () => onSelect(card) : null}
    >
      <h3>{card.name}</h3>
      <p>{card.description}</p>
    </div>
  );
};

export default CardCard;
