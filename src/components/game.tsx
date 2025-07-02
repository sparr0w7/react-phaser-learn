import React, { useEffect } from "react";
import Phaser from "phaser";
import MainScene from "../scenes/MainScene";

const Game: React.FC = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: "game-container",
      scene: [MainScene],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div id="game-container" style={{ width: "800px", height: "600px" }} />
  );
};

export default Game;
