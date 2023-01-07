import React from "react";
import LabelCheckbox from "../labelCheckbox/LabelCheckbox";
import { bookCardPropsType } from "./bookCard.types";
import "./bookCard.styles.scss";
const BookCard = (props: bookCardPropsType) => {
  const {
    title,
    author,
    thumbnail,
    selected,
    size = "small",
    deleteButtonEnable,
    actionCallback,
  } = props;

  return (
    <div
      className={`book--card--component ${
        size === "small" ? "card--small" : "card--large"
      }`}
    >
      <img className="book--card--component__img" src={thumbnail} alt="" />
      <span className="book--card--component__title">
        <span>{title}</span>
      </span>
      <span className="book--card--component__author">
        <span>{author}</span>
      </span>
      <span className={"book--card--component__action"}>
        {deleteButtonEnable ? (
          selected && (
            <span
              onClick={actionCallback}
              className="book--card--component__action--delete"
            ></span>
          )
        ) : (
          <LabelCheckbox
            onClick={actionCallback}
            value={selected}
            name={"selectedCheckbox" + thumbnail + Math.random() * 1000}
            label={
              selected ? (
                <span className="book--card--component__action--green">
                  Selected
                </span>
              ) : (
                <span className="book--card--component__action--gray">
                  Not Selected
                </span>
              )
            }
          />
        )}
      </span>
    </div>
  );
};

export default BookCard;
