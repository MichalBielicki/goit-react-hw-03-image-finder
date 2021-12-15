import React from "react";
import s from "./LoaderFetch.module.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoaderFetch = () => {
  return (
    <div className={s.overlay}>
      <Loader type="Oval" color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default LoaderFetch;
