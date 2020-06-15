import React from "react";
import Square from "./Square";

const board = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const Board = ({ handleClick, squares }) => {
  const renderSquare = (i) => {
    return (
      <Square key={i} value={squares[i]} handleClick={() => handleClick(i)} />
    );
  };

  return (
    <div>
      {board.map((row, r) => (
        <div className="board-row" key={r}>
          {row.map((col) => renderSquare(col))}
        </div>
      ))}
    </div>
  );
};

export default Board;
