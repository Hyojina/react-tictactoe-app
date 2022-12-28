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

  // status: winner를 이용하여 프린트되는 메시지를 변경
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
        <ol></ol>
      </div>
    </div>
  );
};

export default App;
