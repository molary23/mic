import React from "react";

import { MdOutlineDeleteForever, MdPublic } from "react-icons/md";

import { FaRegEye } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

import DateFormat from "./DateFormat";
import { Link } from "react-router-dom";

function ForumCard(props) {
  const { onClick, sender, forum } = props;

  const clickHandler = (value) => {
    onClick(value);
  };

  let forumList;
  forumList = forum.map((item, i) => {
    return (
      <div className="discussion-card card" key={i}>
        <div className="discussion">
          <h3 className="mb-1">
            {item.title}
            <span className="text-muted ms-4 forum-status">
              {item.status === "c" && (
                <span className="text-muted ms-4 forum-status">
                  Closed <IoLockClosedOutline />
                </span>
              )}
            </span>
          </h3>
          <div className="row">
            <div className="col-md-2">
              {item.right === "p" ? "From Knowledge base" : "Created by You"}
            </div>
            <div className="col-md-3">
              <DateFormat date={item.createdAt} />
            </div>
          </div>

          <p className="mt-1">{item.text}</p>
        </div>
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <span className="text-muted forum-reply-count">
              {item.replycount} repl{item.replycount > 1 ? "ies" : "y"}
            </span>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="forum-action">
              <Link
                className="btn view-btn"
                to={`/user/forum/:${item.id}`}
                title="view discussion"
              >
                <FaRegEye />
              </Link>

              {(sender === "admin-forums" || item.right === "u") && (
                <button
                  className="btn delete-btn"
                  title="delete discussion"
                  onClick={() => clickHandler(["delete", item.id])}
                >
                  <MdOutlineDeleteForever />
                </button>
              )}
              {item.status === "o" && (
                <button
                  className="btn close-btn"
                  title="close discussion"
                  onClick={() => clickHandler(["close", item.id])}
                >
                  <IoLockClosedOutline />
                </button>
              )}
              {sender === "admin-forums" && (
                <button
                  className="btn close-btn"
                  title="turn to knowledge base"
                  onClick={() => clickHandler(["public", item.id])}
                >
                  <MdPublic />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{forumList}</div>;
}

export default ForumCard;
