import React, { useState } from "react";

function TaskRow({ id, note, deleteTask }) {
  const [inedit, setInedit] = useState(false);
  const [newTaskName, setNewTaskName] = useState(note);

  return (
    <li key={id}>
      <input type="checkbox" />
      <span
        onClick={() => {
          setInedit(true);
        }}
        onBlur={() => setInedit(false)}
      >
        {inedit ? (
          <input
            value={newTaskName}
            onChange={(event) => setNewTaskName(event.target.value)}
          />
        ) : (
          newTaskName
        )}
      </span>
      <button
        onClick={() => {
          deleteTask(id);
        }}
      >
        удалить
      </button>
    </li>
  );
}
export default TaskRow;