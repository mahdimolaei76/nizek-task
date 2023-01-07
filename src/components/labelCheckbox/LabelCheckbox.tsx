import React from "react";
import { LabelCheckboxPropsTypes } from "./labelCheckbox.types";
import "./labelCheckbox.styles.scss";

const LabelCheckbox = (props: LabelCheckboxPropsTypes) => {
  const { label, value, name, onClick } = props;

  return (
    <div className="checkbox--container">
      <input
        onChange={onClick}
        className="checkbox--component--input"
        checked={value}
        type="checkbox"
        id={`${name}`}
        name={name}
      />
      <label htmlFor={name} className=" checkbox--component--label">
        <span className="checkbox--component--label__text">{label}</span>
      </label>
    </div>
  );
};

export default LabelCheckbox;
