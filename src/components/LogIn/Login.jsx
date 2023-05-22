import React, { useEffect, useState } from "react";
import LoginIcon from "../../svg/LoginIcon/LoginIcon";
import "./Login.css";

const LogIn = ({ userName, setUserName, saveUserName, onSave, setOnSave }) => {
  return (
    <div className="header">
      <LoginIcon />
      {onSave ? (
        <div className="headerLogin">
          {userName}
          <button
            onClick={() => {
              setOnSave(false);
              setUserName("");
            }}
          >
            Выйти
          </button>
        </div>
      ) : (
        <div className="headerLogin">
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Введите имя"
            aria-label="fullname"
          />
          <button
            disabled={userName ? false : true}
            onClick={() => {
              saveUserName(userName);
            }}
          >
            Войти
          </button>
        </div>
      )}
    </div>
  );
};

export default LogIn;
