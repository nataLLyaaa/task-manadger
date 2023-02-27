import React, { FC } from "react";
import "./Comment.css";

interface ICommentProps {
  id: String;
  creator: String;
  createDate: string;
  content: String;
  taskId: String;
  deleteComment: (id: String, taskId: String) => void;
}

const Comment: FC<ICommentProps> = ({
  id,
  taskId,
  content,
  createDate,
  creator,
  deleteComment,
}) => {
  return (
    <div className="comments">
      <div className="commentContent">{content}</div>
      <div className="commentAtribute">
        <div>
          <div className="commentCreator"> автор:{creator}</div>
          <div>дата создания:{createDate}</div>
        </div>
        <div className="commentDel">
          <button
            className="btnCommentDel"
            onClick={() => {
              deleteComment(id, taskId);
            }}
          >
            Удалить комментарий
          </button>
        </div>
      </div>
    </div>
  );
};
export default Comment;
