import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Game.less";
import DealerReducer from "../models/DealerReducer";

const GameSetup = () => {
  const gameState = useSelector((state) => state);
  const dispatch = useDispatch();

  const addPlayer = () => {
    dispatch(DealerReducer.methods.addPlayer());
  };

  const changePlayer = (player, name) => {
    dispatch(DealerReducer.methods.changePlayer(player, name));
  };

  return (
    <div className={styles.setup}>
      <button onClick={addPlayer}>+ Add Player</button>
      <div className={styles.players}>
        {gameState.players.map((player, ix) => (
          <div key={ix} className={styles.player}>
            <input
              type="text"
              placeholder="Player Name"
              value={player.name}
              onChange={(ev) => changePlayer(player, ev.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameSetup;
