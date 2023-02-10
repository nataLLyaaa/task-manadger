import React, { FC } from "react";
import "./Comment.css";

interface ICommentProps {
  id: String;
  creator: String;
  createDate: string;
  content: String;
  onDelete: (id: string) => void;
}

const Comment: FC<ICommentProps> = ({
  content,
  createDate,
  creator,
  id,
  onDelete,
}) => {
  return (
    <div className="comments">
      <div className="commentContent">{content}</div>
      <div className="commentAtribute">
        автор:{creator}
        дата создания:{createDate}
      </div>
    </div>
  );
};
export default Comment;
