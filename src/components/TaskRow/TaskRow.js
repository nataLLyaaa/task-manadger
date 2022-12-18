import React, { useState } from "react";

function TaskRow({ id, note, deleteTask, editTask }) {
  const [inedit, setInedit] = useState(false);
  const [newTaskName, setNewTaskName] = useState(note);
  const [checked, setChecked] = useState(false);

  return (
    <div className="result">
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />

      {inedit ? (
        <input
          className="resultedit"
          value={newTaskName}
          onChange={(event) => setNewTaskName(event.target.value)}
          onBlur={() => {
            setInedit(false);
            editTask(id, newTaskName);
          }}
        />
      ) : (
        <div
          className={checked ? "checked" : "unchecked"}
          onClick={() => {
            setInedit(true);
          }}
        >
          {newTaskName}
        </div>
      )}

      <button
        className="btndel"
        onClick={() => {
          deleteTask(id);
        }}
      >
        удалить
      </button>
    </div>
  );
}
export default TaskRow;
