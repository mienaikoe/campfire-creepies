import React from "react";
import CARD_DECK from "../config/card_deck";
import Card from "../components/Card";
import styles from "./MainPage.less";

export default () => {
  return (
    <div className={styles.deck}>
      {CARD_DECK.map((card) => (
        <Card card={card} />
      ))}
    </div>
  );
};
