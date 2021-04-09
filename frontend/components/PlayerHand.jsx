import React, { useEffect, useState } from "react";
import CardCard from "./CardCard";
import styles from "./Hands.less";

const PlayerHand = ({ player, round, isSwap, isSettled, submit }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const isAddingDisabled =
    isSettled ||
    (round === 0 ? selectedCards.length === 3 : selectedCards.length === 1);

  useEffect(() => {
    setSelectedCards([]);
  }, [round, isSwap]);

  const onSelect = (card) => {
    const cardIdx = selectedCards.indexOf(card);
    if (cardIdx === -1) {
      if (!isAddingDisabled) {
        setSelectedCards([...selectedCards, card]);
      }
    } else {
      selectedCards.splice(cardIdx, 1);
      setSelectedCards([...selectedCards]);
    }
  };

  const onSubmit = () => {
    submit(player, selectedCards);
  };

  return (
    <div className={styles.handSection}>
      <div className={styles.handGroup}>
        <h3>
          {player.name}
          <button disabled={!isAddingDisabled} onClick={onSubmit}>
            Play Cards
          </button>
        </h3>
        <div className={styles.hand}>
          {player.hand.map((card) => (
            <CardCard
              key={card.key}
              card={card}
              selected={selectedCards.indexOf(card) !== -1}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerHand;
