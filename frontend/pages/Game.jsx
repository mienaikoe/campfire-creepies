import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Game.less";
import DealerReducer from "../models/DealerReducer";
import PlayerHand from "../components/PlayerHand";
import DeckHand from "../components/DeckHand";

const PLAYERS = 4;

const Game = () => {
  const gameState = useSelector((state) => state);
  const dispatch = useDispatch();

  const isSettled =
    !gameState.outcome &&
    gameState.players.length > 0 &&
    gameState.settledPlayers.length === gameState.players.length;

  useEffect(() => {
    dispatch(DealerReducer.methods.reset());
    for (let ix = 1; ix <= PLAYERS; ix++) {
      dispatch(DealerReducer.methods.addPlayer(`Player ${ix}`));
    }
    dispatch(DealerReducer.methods.assignPlayers());
  }, []);

  useEffect(() => {
    if (gameState.isTableCalculated === true) {
      dispatch(DealerReducer.methods.clearTable());
      if (!gameState.isSwap) {
        dispatch(DealerReducer.methods.nextRound());
      }
    }
  }, [gameState.isTableCalculated]);

  const submit = (player, cards) => {
    if (gameState.round === 0) {
      dispatch(DealerReducer.methods.pushToReserve(player, cards));
    } else {
      dispatch(DealerReducer.methods.pushToTable(player, cards));
    }
  };

  const proceed = () => {
    if (gameState.outcome) {
      dispatch(DealerReducer.methods.reset());
    } else if (gameState.round === 0) {
      gameState.players.forEach((player) => {
        dispatch(DealerReducer.methods.pullFromReserve(player, 3));
      });
      dispatch(DealerReducer.methods.clearTable());
      dispatch(DealerReducer.methods.nextRound());
    } else if (isSettled) {
      if (gameState.isSwap) {
        dispatch(DealerReducer.methods.swapTable());
        dispatch(DealerReducer.methods.nextRound());
      } else {
        dispatch(DealerReducer.methods.calculateTable());
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.round}>
        <span>
          {gameState.outcome
            ? `Campers ${gameState.outcome} the game!`
            : `Round ${gameState.round} ${
                gameState.isSwap ? "(Swappping)" : ""
              }`}
        </span>
        <button onClick={proceed} disabled={!isSettled}>
          {gameState.outcome ? "Reset" : isSettled ? "Calculate" : "Proceed"}
        </button>
      </div>
      <DeckHand
        carryOver={gameState.carryOver}
        deck={gameState.table}
        title="Table"
      />
      {gameState.players.map((player) => (
        <PlayerHand key={player.name} player={player} submit={submit} />
      ))}
    </div>
  );
};

export default Game;
