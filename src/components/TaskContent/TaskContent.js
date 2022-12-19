import React, { useState } from "react";
import uuid from "react-uuid";
const initTasks = [];
function TaskContent({ id }) {
  const [tasks, setTasks] = useState(initTasks);
  const [value, setValue] = useState("Название задачи");
  const [onClickBtn, setOnClickBtn] = useState(false);
  function addTask() {
    let obj;
    obj = {
      id: uuid(),
      name: value,
    };
    setTasks([...tasks, obj]);
    setOnClickBtn(false);
    setValue("Название задачи");
  }
  const taskResult = tasks.map((task) => {
    return (
      <div key={task.id} className="taskResult">
        {task.name}
      </div>
    );
  });
  return (
    <div className="columnContent">
      {taskResult}
      {!onClickBtn ? (
        <button className="addContentBtn" onClick={() => setOnClickBtn(true)}>
          +
        </button>
      ) : (
        <input
          className="inputTaskName"
          value={value}
          onFocus={() => setValue("")}
          onChange={(event) => setValue(event.target.value)}
          onBlur={value ? () => addTask : () => setOnClickBtn(false)}
        />
      )}
      {/* {!tasks ? (
        console.log(tasks)
      ) : (
        <svg width="100%" height="100%" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="5"
            r="3"
            stroke="gray"
            strokeWidth="0.5"
            fill="white"
          />
          <text fill="grey" fontSize="2" fontFamily="Arial" x="3" y="12">
            Задачи отсутствуют
          </text>
        </svg>
      )} */}
    </div>
  );
}
export default TaskContent;
