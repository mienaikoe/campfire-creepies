import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Game.less";
import DealerReducer from "../models/DealerReducer";
import PlayerHand from "../components/PlayerHand";
import DeckHand from "../components/DeckHand";

const PLAYERS = 4;

export default () => {
  const gameState = useSelector((state) => state);
  const dispatch = useDispatch();

  const isSettled =
    !gameState.isLost &&
    gameState.settledPlayers.length === gameState.players.length;

  console.log(gameState);

  useEffect(() => {
    dispatch(DealerReducer.methods.reset());
    for (let ix = 1; ix <= PLAYERS; ix++) {
      dispatch(DealerReducer.methods.addPlayer(`Player ${ix}`));
    }
  }, []);

  useEffect(() => {
    if (gameState.round !== 0 && isSettled) {
      dispatch(DealerReducer.methods.calculateTable());
    }
  }, [isSettled]);

  const submit = (player, cards) => {
    if (gameState.round === 0) {
      dispatch(DealerReducer.methods.pushToReserve(player, cards));
    } else {
      dispatch(DealerReducer.methods.pushToTable(player, cards));
    }
  };

  const proceed = () => {
    if (gameState.round === 0) {
      gameState.players.forEach((player) => {
        dispatch(DealerReducer.methods.pullFromReserve(player, 3));
      });
    }
    dispatch(DealerReducer.methods.clearTable());
  };

  return (
    <div className={styles.main}>
      <div className={styles.round}>
        <span>Round {gameState.round}</span>
        {gameState.isLost ? <span>Lost the Game!"</span> : null}
        <button onClick={proceed} disabled={!isSettled}>
          Proceed
        </button>
      </div>
      <DeckHand
        carryOver={gameState.carryOver}
        deck={gameState.table}
        title="Table"
      />
      {gameState.players.map((player) => (
        <PlayerHand
          key={player.name}
          player={player}
          round={gameState.round}
          isSettled={gameState.settledPlayers.indexOf(player) !== -1}
          submit={submit}
        />
      ))}
    </div>
  );
};
