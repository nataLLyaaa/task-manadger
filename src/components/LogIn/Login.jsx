import React, { useEffect, useState } from "react";
import LoginIcon from "../../svg/LoginIcon/LoginIcon";
import "./Login.css"

const LogIn = ({ userName, setUserName, saveUserName, onSave, setOnSave }) => {

  return (
    <div className="header">
      <LoginIcon />
      {onSave ? (
        <>
          <div className="headerLogin">{userName}</div>
          <button className="loginBtn"
            onClick={() => {
            
              setOnSave(false);
              setUserName("");

            }}
          >
            Выйти
          </button>
        </>
      ) :
        (<>
         <div className="headerLogin">
          <input
            type="text"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            placeholder="Введите имя"
            aria-label="fullname"
          />
          </div>
          <button className="loginBtn"
            onClick={() => {
              saveUserName(userName);
              
            }}
            disabled={userName ? false: true}
          >
            Войти
          </button>
        </>)}
    </div>
  );
}

export default LogIn;
