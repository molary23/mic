import React from "react";
import DateFormat from "./DateFormat";

import { MdOutlineDeleteForever } from "react-icons/md";

function ReplyCard(props) {
  const { sender, UserId, reply, onClick } = props;

  const clickHandler = (value) => {
    onClick(value);
  };

  let replyList;
  replyList = reply.map((item, i) => {
    return (
      <div
        className={`reply-card ${
          item.UserId === UserId && "move-left dash-card transactions"
        }`}
        key={i}
      >
        <p className="mb-1">{item.text}</p>
        <span className="reply-time">
          <DateFormat date={item.createdAt} />
        </span>
        <span className="reply-by">{item.User.username}</span>
        {item.UserId === UserId && (
          <div className="reply-action">
            <button
              className="btn delete-btn"
              title="delete discussion"
              onClick={() => clickHandler(item.id)}
            >
              <MdOutlineDeleteForever />
            </button>
          </div>
        )}
      </div>
    );
  });

  return <div>{replyList}</div>;
}

export default ReplyCard;
