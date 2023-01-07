import React from "react";
import { IconInputPropsTypes } from "./iconInput.types";
import "./iconInput.styles.scss";
const IconInput = (props: IconInputPropsTypes) => {
  const { label, value, onChange, iconSrc, name, type } = props;

  return (
    <div className={`input--component`}>
      <img src={iconSrc} alt="" className="input--component--icon" />
      <input
        placeholder={label}
        onChange={onChange}
        name={name}
        type={type === "password" ? "password" : "text"}
        value={value}
        className="input--component--input"
      />
    </div>
  );
};

export default IconInput;
