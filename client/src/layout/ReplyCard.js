import React from "react";
import DateFormat from "./DateFormat";

import { MdOutlineDeleteForever } from "react-icons/md";

import { RiMapPinUserLine } from "react-icons/ri";

function ReplyCard(props) {
  const { sender, UserId, reply, onClick, level } = props;

  const clickHandler = (value) => {
    onClick(value);
  };

  let replyList;
  replyList = reply.map((item, i) => {
    return (
      <div
        className={`reply-card card ${item.UserId === UserId && "move-left"}`}
        key={i}
      >
        <div className="forum-from">
          <span className="reply-post-by text-muted">
            <RiMapPinUserLine />
            Reply from{" "}
            {item.UserId === UserId ? (
              <span className="reply-post-level text-muted">You</span>
            ) : (
              `${item.level === 3 ? "Admin" : item.User.username}`
            )}
          </span>
        </div>
        <div className="forum-time">
          <DateFormat date={item.createdAt} />
        </div>
        <div className="forum-text">
          <p className="mt-2">{item.text}</p>
        </div>
        {item.UserId === UserId && (
          <div className="forum-action">
            <button
              className="btn delete-btn"
              title="delete discussion"
              onClick={() => clickHandler(item.id)}
            >
              Delete <MdOutlineDeleteForever />
            </button>
          </div>
        )}
      </div>
    );
  });

  return <div>{replyList}</div>;
}

export default ReplyCard;
