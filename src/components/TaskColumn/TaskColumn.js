import React, { useState } from "react";
import TaskContent from "../TaskContent/TaskContent";
function TaskColumn({ id, colorhead, name, content }) {
  content = <TaskContent />;
  return (
    <div key={id} className="column">
      <div className="columnHead" style={{ backgroundColor: { colorhead } }}>
        {name}
      </div>
      {content}
    </div>
  );
}
export default TaskColumn;
