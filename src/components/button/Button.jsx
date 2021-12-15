import React from "react";
import s from "./Button.module.css";

const Button = ({ fetchMoreImages, label }) => {
  return (
    <button type="button" className={s.Button} onClick={fetchMoreImages}>
      {label}
    </button>
  );
};

export default Button;
