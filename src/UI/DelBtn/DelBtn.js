import React from "react";
import classes from "./DelBtn.module.css";
const DelBtn = ({ children, ...rest }) => {
  return (
    <button {...rest} className={classes.DelBtn}>
      {children}
    </button>
  );
};
export default DelBtn;
