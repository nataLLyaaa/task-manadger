import React, { useState } from "react";
import CloseIcon from "../../UI/CloseIcon/CloseIcon.tsx";

import AddBtn from "../../UI/AddBtn/AddBtn.js";
import DelBtn from "../../UI/DelBtn/DelBtn.js";
import MyInput from "../../UI/MyInput/MyInput.js";
import IconModal from "../IconModal/IconModal.jsx";
import Task from "../Task/Task";
import "./Column.css";

function Column({
  colorhead,
  columnTasks,
  bgColumn,
  addTask,
  deleteColumn,
  onCLickCard,
  editColumnName,
  column,
  icons,
  changeColumnIcon,
}) {
  const { id: columnId, columnIcon, name } = column;
  const [taskValue, setTaskValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [newColumnName, setnewColumnName] = useState(name);
  const [modalIconActive, setModalIconActive] = useState(false);

  const onBlur = () => {
    setIsEdit(false);
    if (taskValue) {
      addTask(taskValue, columnId);
    }
    setTaskValue("");
  };

  const result = columnTasks.map(({ id, ...rest }) => {
    return <Task {...rest} key={id} cardId={id} onCLickCard={onCLickCard} />;
  });

  return (
    <div className="column">
      <div className="columnHead" style={{ backgroundColor: colorhead }}>
        <button
          className="iconBtn"
          onClick={() => {
            setModalIconActive(true);
          }}
        >
          {icons[columnIcon]}
        </button>

        {!onChange ? (
          <p onClick={() => setOnChange(true)}>{name}</p>
        ) : (
          <input
            value={newColumnName}
            autoFocus
            onChange={(event) => setnewColumnName(event.target.value)}
            onBlur={() => {
              editColumnName(columnId, newColumnName);
              setOnChange(false);
            }}
          />
        )}

        {columnTasks.length ? (
          <div className="taskCounter">{columnTasks.length}</div>
        ) : (
          <div></div>
        )}
        <DelBtn
          onClick={() => {
            deleteColumn(columnId);
          }}
        >
          <CloseIcon />
        </DelBtn>
      </div>
      <div className="columnContent" style={{ backgroundColor: bgColumn }}>
        {result}
        {!isEdit ? (
          <AddBtn onClick={() => setIsEdit(true)}>+</AddBtn>
        ) : (
          <MyInput
            value={taskValue}
            onChange={(event) => setTaskValue(event.target.value)}
            onBlur={onBlur}
            placeholder="Введите название задачи"
            autoFocus
          />
        )}
        {!columnTasks.length && (
          <>
            <svg width="30%" height="30%" viewBox="0 0 24 24">
              <path
                color="rgb(138, 148, 153)"
                fill="currentColor"
                fillRule="evenodd"
                d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm0 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm4.328 4.856a1.003 1.003 0 0 1 1.416 0 .999.999 0 0 1-.002 1.414l-7.334 7.323c-.392.39-1.024.39-1.415 0l-3.086-3.086a1 1 0 0 1 1.414-1.414l2.025 2.025a.501.501 0 0 0 .708 0z"
              ></path>
            </svg>
            <div>Задачи отсутствуют</div>
            <div className="columnContentText">
              Перетащите задачи сюда или нажмите + чтобы добавить новые задачи
            </div>
          </>
        )}
      </div>

      <IconModal
        columnId={columnId}
        modalIconActive={modalIconActive}
        setModalIconActive={setModalIconActive}
        icons={icons}
        changeColumnIcon={changeColumnIcon}
      />
    </div>
  );
}
export default Column;
