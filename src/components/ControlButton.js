import React from "react";
import "./../App.css";

const ControlButton = (props) => {
  let symbol = "?";
  if (props.type === "del") {
    symbol = "✖";
  }
  if (props.type === "edit") {
    symbol = "✍";
  }
  if (props.type === "undone") {
    symbol = "✅";
  }
  if (props.type === "done") {
    symbol = "♻";
  }
  return (
    // на onClick висить індивідувальна для кожної кнопки дія, яка приходить з ListItem.js
    <div className="button" onClick={props.action}>
      {symbol}
    </div>
  );
};

export default ControlButton;
