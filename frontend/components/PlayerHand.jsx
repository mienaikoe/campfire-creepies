import React, { useEffect, useState } from "react";
import CardCard from "./CardCard";
import styles from "./Hands.less";

function getCallToAction(round, isSwap, isSettled) {
  if (round === 0) {
    return "Choose 3 cards to discard";
  } else if (isSwap) {
    return "Chose 1 card to swap";
  } else if (isSettled) {
    return "Wait for other players";
  } else {
    return "Chose 1 card to play";
  }
}

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
        <h2>
          <span>
            {player.name}: {getCallToAction(round, isSwap, isSettled)}
          </span>
          <button disabled={!isAddingDisabled} onClick={onSubmit}>
            Lock it in
          </button>
        </h2>
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
