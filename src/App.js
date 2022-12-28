import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";

const App = () => {
  // history: 게임판의 모든 내역을 저장
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  // xIsNext: 플레이어(boolean타입으로 구분)
  const [xIsNext, setXIsNext] = useState(true);
  // current: 현재의 게임판 상황
  const current = history[history.length - 1];
  // winner: current를 이용하여 승자가 있는지 없는지 확인
  const winner = calculateWinner(current.squares);
  // moves: history를 이용하여 현재 몇번째 움직이는지 메시지를 변경
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button>{desc}</button>
      </li>
    );
  });

  // status: winner를 이용하여 플레이어가 누군지 or 승자가 누군지 메시지를 변경
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newSquares = current.squares.slice();

    if (calculateWinner(newSquares) || newSquares[i]) {
      return; // 아래로 코드 진행 X
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setHistory([...history, { squares: newSquares }]);
    setXIsNext((previousValue) => !previousValue);
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="game">
      {/* game-board */}
      <div className="game-board"></div>
      <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      {/* game-info */}
      <div className="game-info">
        {/* status */}
        <div className="status">{status}</div>
        <div></div>
        {/* TODO */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default App;
