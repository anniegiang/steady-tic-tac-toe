import React from "react";
import "./index.css";

const Square = ({ handleClick, value }) => {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
};

export default Square;
