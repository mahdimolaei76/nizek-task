import React from "react";
import { SimpleButtonPropsTypes } from "./simpleButton.types";
import "./simpleButton.styles.scss";

const SimpleButton = (props: SimpleButtonPropsTypes) => {
  const { text, onClick, style = {}, disabled } = props;
  return (
    <div
      style={style}
      className={`simple-button-container  ${
        disabled ? "simple-button-container__diasbled" : ""
      }`}
      onClick={disabled ? () => {} : onClick}
    >
      {text}
    </div>
  );
};

export default SimpleButton;
