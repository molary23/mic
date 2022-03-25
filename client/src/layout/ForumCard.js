import React from "react";
import PropTypes from "prop-types";

import { MdOutlineDeleteForever } from "react-icons/md";

import { FaRegEye } from "react-icons/fa";
import { FcIdea } from "react-icons/fc";
import { IoLockClosedOutline } from "react-icons/io5";
import { RiMapPinUserLine } from "react-icons/ri";
import { BsFileEarmarkFont } from "react-icons/bs";

import DateFormat from "./DateFormat";
import { Link } from "react-router-dom";

function ForumCard(props) {
  const { onClick, sender, forum, user, level } = props;

  const clickHandler = (value) => {
    onClick(value);
  };

  let forumList;
  forumList = forum.map((item, i) => {
    return (
      <div className="discussion-card card" key={i}>
        <div className="discussion">
          <h3 className="mb-4 forum-title">
            {item.title}

            {item.status === "c" && (
              <span className="forum-status">
                Closed <IoLockClosedOutline />
              </span>
            )}
          </h3>
          <div className="forum-from">
            {item.right !== "p" && (
              <span className="forum-right ">
                <BsFileEarmarkFont />
                {item.id.toString().length < 5
                  ? item.id.toString().padStart(5, "0")
                  : item.id}
              </span>
            )}
            {item.right === "p" && (
              <span className="forum-right ">
                <FcIdea />
                From Knowledge base
              </span>
            )}

            {item.UserId === user && (
              <em>
                <small className="forum-by">
                  <RiMapPinUserLine /> Created by You
                </small>
              </em>
            )}
          </div>
          <div className="forum-time">
            <DateFormat date={item.createdAt} />
          </div>
          <div className="forum-text">
            <p className="mt-2">{item.text}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-xs-12">
            <div className="forum-action">
              <Link
                className="btn view-btn"
                to={`/${level === 3 ? "admin" : "user"}/forum/:${item.id}`}
                title="view discussion"
              >
                View <FaRegEye />
              </Link>

              {(sender === "admin-forums" || item.right === "u") && (
                <button
                  className="btn delete-btn"
                  title="delete discussion"
                  onClick={() => clickHandler(["delete", item.id])}
                >
                  Delete <MdOutlineDeleteForever />
                </button>
              )}
              {item.status === "o" &&
                (item.UserId === user || sender === "admin-forums") && (
                  <button
                    className="btn close-btn"
                    title="close discussion"
                    onClick={() => clickHandler(["close", item.id])}
                  >
                    Close <IoLockClosedOutline />
                  </button>
                )}
              {sender === "admin-forums" && item.right !== "pc" && (
                <button
                  className="btn move-btn"
                  title="turn to knowledge base"
                  onClick={() => clickHandler(["public", item.id])}
                >
                  Add to Knowledgebase <FcIdea />
                </button>
              )}
            </div>
          </div>
          <div className="col-md-2 col-xs-12">
            <span className="text-muted forum-reply-count">
              {item.replycount} repl{item.replycount !== 1 ? "ies" : "y"}
            </span>
          </div>
        </div>
      </div>
    );
  });
  return <div>{forumList}</div>;
}
ForumCard.propTypes = {
  onClick: PropTypes.func,
  sender: PropTypes.string.isRequired,
  forum: PropTypes.array.isRequired,
  user: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
};
export default ForumCard;
