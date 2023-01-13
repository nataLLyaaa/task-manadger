import React from "react";
import classes from "./MyInput.module.css";
const MyInput = ({ children, ...rest }) => {
  return (
    <input {...rest} className={classes.MyInput}>
      {children}
    </input>
  );
};
export default MyInput;
