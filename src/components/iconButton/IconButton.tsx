import React from "react";
import { IconButtonPropsTypes } from "./iconButton.types";
const IconButton = (props: IconButtonPropsTypes) => {
  const { text, onClick, imgStyle, iconSrc } = props;

  return (
    <div
      className="w-56 border border-gray-400 pr-10 relative rounded-3xl text-right cursor-pointer"
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
      onClick={onClick}
    >
      <img
        style={imgStyle}
        className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2"
        src={iconSrc}
        alt=""
      />
      <span className="text-gray-holder w-36">{text}</span>
    </div>
  );
};

export default IconButton;
