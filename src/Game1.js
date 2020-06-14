import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./helpers";
import "./index.css";

const STATE = {
  history: [{ squares: Array(9).fill(null) }],
  xIsNext: true,
  stepNumber: 0,
};

const Game = () => {
  const [history, setHistory] = useState(STATE.history);
  const [xIsNext, setXIsNext] = useState(STATE.xIsNext);
  const [stepNumber, setStepNumber] = useState(STATE.stepNumber);

  const newGame = () => {
    setHistory(STATE.history);
    setXIsNext(STATE.xIsNext);
    setStepNumber(STATE.stepNumber);
  };

  const handleClick = (i) => {
    const historyAtStep = history.slice(0, stepNumber + 1);
    const current = historyAtStep[historyAtStep.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    setHistory([...historyAtStep, { squares }]);
    setXIsNext(!xIsNext);
    setStepNumber(historyAtStep.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const statusText = (winner) => {
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li className="move" key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} handleClick={handleClick} />
      </div>
      <div className="game-info">
        <div className={winner ? "winner-status" : ""}>
          {statusText(winner)}
        </div>
        <ol>{moves}</ol>
        {winner && (
          <button onClick={newGame} className="new-game">
            New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
