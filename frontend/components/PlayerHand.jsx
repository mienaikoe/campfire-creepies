import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardCard from "./CardCard";
import RULES from "../config/rules";
import DealerReducer from "../models/DealerReducer";
import styles from "./Hands.less";

const PlayerHand = ({ player }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const gameState = useSelector((state) => state);
  const { round, draftRound, settledPlayers, isSwap } = gameState;
  const dispatch = useDispatch();

  const isSettled = settledPlayers.indexOf(player) !== -1;

  const discardLimit = RULES.DRAFT_ROUNDS - draftRound;

  const isSubmitDisabled =
    isSettled ||
    gameState.outcome ||
    selectedCards.length < (round === 0 ? discardLimit : 1);
  const isAddingDisabled =
    isSettled ||
    gameState.outcome ||
    selectedCards.length === (round === 0 ? discardLimit : 1);

  // useEffect(() => {
  //   setSelectedCards([]);
  // }, [round, isSwap]);

  function getCallToAction(gameState) {
    if (isSettled) {
      return "Wait for other players";
    } else if (gameState.round === 0) {
      return `Choose ${discardLimit} cards to pass to the next player`;
    } else if (isSwap) {
      return "Chose 1 card to swap";
    } else {
      return "Chose 1 card to play";
    }
  }

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
    if (gameState.round === 0) {
      dispatch(DealerReducer.methods.pushToDraft(player, selectedCards));
    } else {
      dispatch(DealerReducer.methods.pushToTable(player, selectedCards));
    }
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
          <p>{getCallToAction(gameState)}</p>
        </div>
        <div className={styles.hand}>
          {player.hand.cards.map((card) => {
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
