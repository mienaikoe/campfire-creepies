import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardCard from "./CardCard";
import styles from "./Hands.less";

function getCallToAction(round, isSwap, isSettled) {
  if (round === 0) {
    return "Choose 3 cards to discard";
  } else if (isSettled) {
    return "Wait for other players";
  } else if (isSwap) {
    return "Chose 1 card to swap";
  } else {
    return "Chose 1 card to play";
  }
}

const PlayerHand = ({ player, submit }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const { round, settledPlayers, isSwap } = useSelector((state) => state);

  const isSettled = settledPlayers.indexOf(player) !== -1;

  const isSubmitDisabled =
    isSettled || selectedCards.length < (round === 0 ? 3 : 1);
  const isAddingDisabled =
    isSettled || selectedCards.length === (round === 0 ? 3 : 1);

  // useEffect(() => {
  //   setSelectedCards([]);
  // }, [round, isSwap]);

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
    setSelectedCards([]);
  };

  return (
    <div className={styles.handSection}>
      <div className={styles.handGroup}>
        <div className={styles.heading}>
          <h2>
            <span>
              {player.name}: {player.role}
            </span>
            <button disabled={isSubmitDisabled} onClick={onSubmit}>
              Lock it in
            </button>
          </h2>
          <p>{getCallToAction(round, isSwap, isSettled)}</p>
        </div>
        <div className={styles.hand}>
          {player.hand.map((card) => {
            const isSelected = selectedCards.indexOf(card) !== -1;
            return (
              <CardCard
                key={card.key}
                card={card}
                selected={isSelected}
                onSelect={
                  isAddingDisabled ? (isSelected ? onSelect : null) : onSelect
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerHand;
