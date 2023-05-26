import React, { useState } from "react";
import "./IconModal.css";
import DelBtn from "../../UI/DelBtn/DelBtn";
import CloseIcon from "../../UI/CloseIcon/CloseIcon.tsx";

const IconModal = ({
  icons,
  modalIconActive,
  setModalIconActive,
  columnId,
  changeColumnIcon,
}) => {
  const result = icons.map((item, index) => {
    return (
      <button
        className="iconBtn"
        key={index}
        style={{ margin: 5 }}
        onClick={() => {
          changeColumnIcon(columnId, index);
          setModalIconActive(false);
        }}
      >
        {item}
      </button>
    );
  });

  return (
    <div className={modalIconActive ? "iconModal active" : "iconModal"}>
      <div className="iconHeader">
        {" "}
        <DelBtn
          onClick={() => {
            setModalIconActive(false);
          }}
        >
          <CloseIcon />
        </DelBtn>
      </div>
      <div>{result}</div>
    </div>
  );
};
export default IconModal;
