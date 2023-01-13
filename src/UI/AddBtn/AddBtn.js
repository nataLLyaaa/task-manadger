import React from "react";
import classes from "./AddBtn.module.css";
const AddBtn = ({ children, ...rest }) => {
  return (
    <button {...rest} className={classes.AddBtn}>
      {children}
    </button>
  );
};
export default AddBtn;
