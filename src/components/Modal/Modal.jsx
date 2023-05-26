import React, { useState } from "react";
import DelBtn from "../../UI/DelBtn/DelBtn";
import "./Modal.css";
import CloseIcon from "../../UI/CloseIcon/CloseIcon";
import DoneIcon from "../../UI/DoneIkon/DoneIcon";
import Comment from "../Comment/Comment.tsx";

const Modal = ({
  active,
  setActive,
  task,
  setTaskComlete,
  id,
  creator,
  createDate,
  content,
  deleteComment,
  addComment,
}) => {
  const [commentValue, setCommentValue] = useState("");

  const onBlur = () => {
    if (commentValue) {
      addComment(commentValue, task.id);
    }
    setCommentValue("");
  };

  if (!task) return null;

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className="modalCotainer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modalHeader">
          {task.isComplete ? (
            <div className="modalHeaderIcon">
              <DoneIcon />
              <p>Завершено</p>
            </div>
          ) : (
            <button className="finishTask" onClick={() => setTaskComlete()}>
              Завершить
            </button>
          )}

          <div className="wrapperBtn">
            <DelBtn onClick={() => setActive(false)}>
              <CloseIcon />
            </DelBtn>
          </div>
        </div>
        <div className="wrapper">
          <div className="modalContent">
            <div className={!task.isComplete ? "taskName" : "taskNameComplete"}>
              {task.taskName}
            </div>
            <div className="modalComments">
              {task.comments.map((comment) => (
                <Comment
                  {...comment}
                  key={comment.id}
                  taskId={task.id}
                  deleteComment={deleteComment}
                />
              ))}
            </div>
            <input
              className="modalInp"
              value={commentValue}
              onChange={(event) => setCommentValue(event.target.value)}
              onBlur={onBlur}
              placeholder="Введите комментарий"
            />
          </div>

          <div className="modalDiscription">
            <div className="modalDiscriptionBlock first">
              Автор:
              <div className="modalDiscriptionBlockText">{task.creator}</div>
            </div>
            <div className="modalDiscriptionBlock second">
              Дата создания:
              <div className="modalDiscriptionBlockText">{task.createDate}</div>
            </div>
            <div className="modalDiscriptionBlock third">
              Дата завершения:
              <div className="modalDiscriptionBlockText">
                {task.completeDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
