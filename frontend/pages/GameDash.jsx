import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Game.less";
import DealerReducer from "../models/DealerReducer";

const GameDash = () => {
  const gameState = useSelector((state) => state);
  const dispatch = useDispatch();

  const isSettled =
    (gameState.isSettingUp && gameState.players.length > 2) ||
    (!gameState.outcome &&
      gameState.players.length > 0 &&
      gameState.settledPlayers.length === gameState.players.length);

  useEffect(() => {
    if (gameState.isTableCalculated === true) {
      dispatch(DealerReducer.methods.clearTable());
      if (!gameState.isSwap) {
        dispatch(DealerReducer.methods.nextRound());
      }
    }
  }, [gameState.isTableCalculated]);

  const proceed = () => {
    if (gameState.isSettingUp) {
      dispatch(DealerReducer.methods.assignPlayers());
    } else if (gameState.outcome) {
      dispatch(DealerReducer.methods.reset());
    } else if (gameState.round === 0) {
      dispatch(DealerReducer.methods.clearDraft());
    } else if (isSettled) {
      if (gameState.isSwap) {
        dispatch(DealerReducer.methods.swapTable());
        dispatch(DealerReducer.methods.nextRound());
      } else {
        dispatch(DealerReducer.methods.calculateTable());
      }
    }
  };

  let status = "",
    proceedButton = "";
  if (gameState.isSettingUp) {
    status = "Setting Up Players";
    proceedButton = "Start the Game!";
  } else if (gameState.outcome) {
    status = `Campers ${gameState.outcome} the game!`;
    proceedButton = "Reset";
  } else if (gameState.round === 0) {
    status = `Draft Round ${gameState.draftRound} of 6`;
    proceedButton = "Shift Cards";
  } else {
    status = `Round ${gameState.round} ${
      gameState.isSwap ? "(Swappping)" : ""
    }`;
    proceedButton = "Finish Round";
  }

  return (
    <div className={styles.round}>
      <span>{status}</span>
      <button onClick={proceed} disabled={!isSettled}>
        {proceedButton}
      </button>
    </div>
  );
};

export default GameDash;
