import React, { useState } from "react";
import uuid from "react-uuid";
import TaskRow from "./components/TaskRow";
const initTasks = [];
function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(initTasks);

  function addTask() {
    let obj;
    if (value.length !== 0) {
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
  function editTask() {}
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
      <input value={value} onChange={(event) => setValue(event.target.value)} />
      <button onClick={addTask} disabled={!value}>
        сохранить
      </button>
      <div>
        <ul>{result}</ul>
      </div>
    </>
  );
}
export default App;
