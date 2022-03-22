import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
import ProgressBar from "../../layout/ProgressBar";
import TextAreaField from "../../layout/TextAreaField";
import ReplyCard from "../../layout/ReplyCard";
import Toast from "../../layout/Toast";
import ConfirmModal from "../../layout/ConfirmModal";

import { FcIdea } from "react-icons/fc";
import { IoLockClosedOutline } from "react-icons/io5";
import { RiMapPinUserLine } from "react-icons/ri";

import DateFormat from "../../layout/DateFormat";

import { IoReturnUpBackOutline } from "react-icons/io5";
import { BiCommentCheck } from "react-icons/bi";

import {
  clearActions,
  getForum,
  replyForum,
  deleteReply,
  clearErrors,
} from "../../action/adminAction";

class Forum extends Component {
  state = {
    text: "",
    sender: "admin-forum",
    error: {},
    url: new URL(window.location),
    forumId: null,
    toast: null,
    toasttext: null,
    isLoading: false,
    check: false,
    checktext: null,
    checktitle: null,
  };
  componentDidMount() {
    const { url } = this.state;
    let params = url.pathname.split("forum")[1],
      id = parseInt(params.split(":")[1]);
    this.setState({
      forumId: id,
    });
    this.props.clearErrors();
    this.props.getForum(id);
  }

  componentWillUnmount() {
    this.props.clearActions("get-forum");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (
      nextProps.errors !== prevState.errors &&
      Object.keys(nextProps.errors).length > 0
    ) {
      update.servererror = nextProps.errors.data;
      update.isLoading = false;
    } else if (
      nextProps.errors !== prevState.errors &&
      Object.keys(nextProps.errors).length === 0
    ) {
      update.servererror = {};
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.admin.adminreply !== this.props.admin.adminreply &&
      this.props.admin.adminreply
    ) {
      this.afterUpdate("added");
      this.setState({
        isLoading: false,
      });
    }
    if (
      prevProps.admin.deletereply !== this.props.admin.deletereply &&
      this.props.admin.deletereply
    ) {
      this.afterUpdate("deleted");
    }
    /*  if (prevProps.errors.allow !== this.props.errors.allow) {
      this.errorUpdate();
    }*/
  }

  errorUpdate = () => {};

  afterUpdate = (text) => {
    const { forumId } = this.state;
    this.setState({
      text: "",
      toast: true,
      toasttext: `Reply ${text}.`,
    });
    this.props.clearActions("get-forum");
    this.props.getForum(forumId);

    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, 3000);
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitReplyHandler = (e) => {
    const { text } = this.state,
      ForumId = parseInt(e.target.postid.value);
    e.preventDefault();
    if (text === "") {
      this.setState({
        error: {
          text: "Add Reply Field can't be Empty",
        },
      });
    } else {
      this.setState({
        isLoading: true,
        error: {},
      });
      const reply = {
        text: text.toLowerCase(),
        ForumId,
      };
      this.props.replyForum(reply);
    }
  };
  /*
  clickHandler = (value) => {
    let check = window.confirm(`Are you sure you want to delete this reply?`);
    if (check) {
      this.props.deleteReply(value);
    } else {
      return false;
    }
  };*/

  clickHandler = (value) => {
    this.setState({
      check: true,
      checktext: "Are you sure you want to delete this reply?",
      checktitle: "Confirm Delete",
    });

    this.confirmHandler = (option) => {
      if (option) {
        this.props.deleteReply(value);
      }
      this.setState({
        check: false,
      });
    };
  };

  render() {
    const {
      text,
      error,
      sender,
      toasttext,
      toast,
      isLoading,
      check,
      checktext,
      checktitle,
    } = this.state;
    let loader = false,
      load = false,
      noRecord = false,
      notAllowed = false;
    const { admin, auth } = this.props,
      { loading } = admin;
    let forum, post, reply, UserId, level;

    if (admin.getforum === null || loading) {
      loader = true;
      load = true;
    } else if (admin.getforum.forum !== null && !loading) {
      loader = false;
      load = false;
      forum = admin.getforum;
      post = forum.forum;
      reply = forum.reply;
      UserId = auth.user.id;
      level = auth.user.level;
    } else if (admin.getforum.forum === null && !loading) {
      loader = false;
      load = false;
      noRecord = true;
      notAllowed = "There is no Discussion with the specified ID";
    }
    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div>
            {noRecord ? (
              <p className="no-records">
                {notAllowed}. Go{" "}
                <Link to="/admin/forums">
                  Back <IoReturnUpBackOutline />
                </Link>
              </p>
            ) : (
              <div className="transactions holder-card card">
                <div className="discussion-card card">
                  <div className="discussion">
                    <h3 className="mb-4 forum-title">
                      {post.title}
                      {post.status === "c" && (
                        <span className="forum-status">
                          Closed <IoLockClosedOutline />
                        </span>
                      )}
                    </h3>

                    <div className="forum-from">
                      {post.right === "p" ? (
                        <span className="forum-right ">
                          <FcIdea />
                          From Knowledge base
                        </span>
                      ) : (
                        <em>
                          <small className="forum-by">
                            <RiMapPinUserLine /> Created by You
                          </small>
                        </em>
                      )}
                    </div>

                    <div className="forum-time">
                      <DateFormat date={post.createdAt} />
                    </div>
                    <div className="forum-text">
                      <p className="mt-2">{post.text}</p>
                    </div>

                    <span className="reply-post-by text-muted">
                      <RiMapPinUserLine />
                      Created by{" "}
                      {post.User.level === 3 ? (
                        <span className="reply-post-level text-muted">
                          Admin
                        </span>
                      ) : (
                        post.User.username
                      )}
                    </span>

                    <span className="reply-count text-muted">
                      {reply.length} repl{reply.length !== 1 ? "ies" : "y"}
                    </span>
                  </div>
                </div>
                <div className="replies-card">
                  {reply.length >= 1 ? (
                    <ReplyCard
                      {...{ sender, UserId, reply, level }}
                      onClick={this.clickHandler}
                    />
                  ) : (
                    <p>
                      There is no reply to this Discussion yet. Be the first to
                      reply.
                    </p>
                  )}
                </div>
                {post.status === "o" && (
                  <div className="reply-form">
                    <form
                      className="reply-form"
                      onSubmit={this.submitReplyHandler}
                    >
                      <input
                        type="hidden"
                        value={post.id}
                        name="postid"
                        readOnly
                      />
                      <TextAreaField
                        id="add-new-reply"
                        placeholder="Add Reply"
                        type="text"
                        name="text"
                        value={text}
                        onChange={this.changeHandler}
                        error={error.text}
                      />

                      <div className="">
                        <button
                          type="submit"
                          className="btn default-btn btn-lg btn-block"
                        >
                          Add Comment <BiCommentCheck />
                          {loading && (
                            <span className="spinner-border spinner-border-sm ms-2"></span>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {check && (
          <ConfirmModal
            {...{ check, sender, checktext, checktitle }}
            onClick={this.confirmHandler}
          />
        )}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Forum.propTypes = {
  getForum: PropTypes.func.isRequired,
  replyForum: PropTypes.func,
  deleteReply: PropTypes.func,
  clearErrors: PropTypes.func,
  clearActions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearActions,
  getForum,
  replyForum,
  deleteReply,
  clearErrors,
})(Forum);
