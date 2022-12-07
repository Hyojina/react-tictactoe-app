// 클래스형 -> 함수형으로 바꿀겁니다.
import React from "react";
import "./App.css";
import Board from "./components/Board";

export default class App extends React.Component {
  render() {
    return (
      <div className="game">
        game
        {/* game-board */}
        <div className="game-board"></div>
        <Board />
        {/* game-info */}
        <div className="game-info">
          game-info
          {/* status */}
          <div></div>
          {/* TODO */}
          <ol></ol>
        </div>
      </div>
    );
  }
}
