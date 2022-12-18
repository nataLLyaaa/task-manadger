import React, { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import TaskRow from "./components/TaskRow";
const initTasks = [];
function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(initTasks);

  function addTask() {
    let obj;
    if (value) {
      obj = {
        id: uuid(),
        note: value,
      };
      setTasks([...tasks, obj]);
    }
    setValue("");
  }
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function editTask(id, newTaskName) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, note: newTaskName };
        } else return task;
      })
    );
  }
  const result = tasks.map((task, index) => {
    return (
      <TaskRow
        key={task.id}
        id={task.id}
        note={task.note}
        deleteTask={deleteTask}
        addTask={addTask}
        editTask={editTask}
      />
    );
  });
  return (
    <>
      <div className="input">
        <input
          className="inputrow"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button className="btn" onClick={addTask} disabled={!value}>
          сохранить
        </button>
      </div>
      <div className="resaltcontainer">{result}</div>
    </>
  );
}
export default App;
