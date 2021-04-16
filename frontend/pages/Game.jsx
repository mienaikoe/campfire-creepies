import React from "react";
import { useSelector } from "react-redux";
import styles from "./Game.less";
import PlayerHand from "../components/PlayerHand";
import DeckHand from "../components/DeckHand";
import GameDash from "./GameDash";
import GameSetup from "./GameSetup";

const Game = () => {
  const gameState = useSelector((state) => state);

  let gameBody;
  if (gameState.isSettingUp) {
    gameBody = <GameSetup />;
  } else {
    gameBody = (
      <>
        <DeckHand
          carryOver={gameState.carryOver}
          deck={gameState.table}
          title="Table"
        />
        {gameState.players.map((player) => (
          <PlayerHand key={player.name} player={player} />
        ))}
      </>
    );
  }

  return (
    <div className={styles.main}>
      <GameDash />
      {gameBody}
    </div>
  );
};

export default Game;
