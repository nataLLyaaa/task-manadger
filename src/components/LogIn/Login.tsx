import React, { useEffect, useState } from "react";

const LogIn = ({ userName, setUserName, saveUserName }) => {
  //   const [userName, setUserName] = useState();
  //state(userName)

  //onClick
  return (
    <form>
      <input
        type="text"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder="Введите имя"
        aria-label="fullname"
      />
      <button
        onClick={() => {
          saveUserName(userName);
        }}
      >
        Войти
      </button>
    </form>
  );
};

export default LogIn;
