import React from "react";
import CardCard from "./CardCard";
import styles from "./Hands.less";

const DeckHand = ({ carryOver, deck, title }) => {
  return (
    <div className={styles.handSection}>
      <div className={styles.handGroup}>
        <div className={styles.heading}>
          <h2>Played Cards</h2>
        </div>
        <div className={styles.hand}>
          {deck.cards.map((card) => (
            <CardCard key={card.key} card={card} />
          ))}
        </div>
      </div>
      <div className={styles.handGroup}>
        <div className={styles.heading}>
          <h2>Carry Over Cards</h2>
        </div>
        <div className={styles.hand}>
          {carryOver.cards.map((card) => (
            <CardCard key={card.key} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckHand;
