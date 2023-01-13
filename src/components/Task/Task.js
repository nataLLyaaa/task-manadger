import React, { useState } from "react";
import uuid from "react-uuid";
import "./Task.css";

function Task({ taskName }) {
  return (
    <div className="task" onClick={() => setVisible(true)}>
      {taskName}
    </div>
  );
}
export default Task;
