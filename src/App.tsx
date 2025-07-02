import { useState } from "react";
import "./App.css";
import MainScene from "./scenes/MainScene";
import Game from "./components/game";

function App() {
  return (
    <>
      <div className="App">
        <h1>React + Phaser.js Game</h1>
        <Game />
      </div>
    </>
  );
}

export default App;
