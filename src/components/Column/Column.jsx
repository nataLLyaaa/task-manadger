import React, { useEffect, useState } from "react";
import ColumnItem from "../ColumnItem/ColumnItem.jsx";
import MyInput from "../../UI/MyInput/MyInput.js";

const Column = ({
  arr,
  headColors,
  bgColors,
  tasks,
  // icons,
  deleteColumn,
  addTask,
  onCLickCard,
  changeColumnIcon,
  editColumnName,
  addColumn,
  value,
  setValue,
  userName,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const onBlur = () => {
    setIsEdit(false);
    if (value) {
      addColumn(value);
      setIsEdit(false);
    }
    setValue("");
  };
  if (!arr) return null;

  return (
    <div className="result">
      {arr.map((item, index) => {
        const bgIndex = index % 2;
        const bgColumn = bgColors[bgIndex];
        const colorIndex = index % 5;
        const colorHead = headColors[colorIndex];

        return (
          <ColumnItem
            key={item.id}
            column={item}
            colorhead={colorHead}
            // icons={icons}
            deleteColumn={deleteColumn}
            addTask={addTask}
            bgColumn={bgColumn}
            onCLickCard={onCLickCard}
            columnTasks={tasks.filter(({ columnId }) => columnId === item.id)}
            editColumnName={editColumnName}
            changeColumnIcon={changeColumnIcon}
            userName={userName}
          />
        );
      })}
      <div className="column">
        {!isEdit ? (
          <div className="head">
            <p onClick={() => setIsEdit(true)}>Добавить раздел</p>
          </div>
        ) : (
          <div
            className="columnHead"
            style={{ backgroundColor: headColors[arr.length % 5] }}
          >
            <MyInput
              value={value}
              autoFocus
              onFocus={() => setValue("")}
              onChange={(event) => setValue(event.target.value)}
              onBlur={onBlur}
            />
          </div>
        )}
        <div
          className="columnContent"
          style={
            !(arr.length % 2)
              ? { backgroundColor: "rgb(235, 235, 235)" }
              : { backgroundColor: "rgb(240, 240, 240)" }
          }
        >
          Добавить участников
        </div>
        n{" "}
      </div>
    </div>
  );
};

export default Column;
