import React, { useState } from "react";
import uuid from "react-uuid";
import DoneIcon from "../../UI/DoneIkon/DoneIcon";
import "./Task.css";

function Task({ taskName, onCLickCard, cardId, isComplete }) {
  return (
    <>
      {!isComplete ? (
        <div
          className="task"
          onClick={() => {
            onCLickCard(cardId);
          }}
        >
          {taskName}
        </div>
      ) : (
        <div
          className="taskComplete"
          onClick={() => {
            onCLickCard(cardId);
          }}
        >
          <DoneIcon />
          <div className="taskCompleteText">{taskName}</div>
        </div>
      )}
    </>
  );
}
export default Task;
