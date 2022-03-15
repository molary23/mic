import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
import ProgressBar from "../../layout/ProgressBar";
import TextAreaField from "../../layout/TextAreaField";
import ReplyCard from "../../layout/ReplyCard";
import Toast from "../../layout/Toast";

import { IoLockClosedOutline } from "react-icons/io5";

import DateFormat from "../../layout/DateFormat";

import { IoReturnUpBackOutline } from "react-icons/io5";
import { BiCommentCheck } from "react-icons/bi";

import {
  clearActions,
  getForum,
  replyForum,
  deleteReply,
} from "../../action/userAction";

class Forum extends Component {
  state = {
    text: "",
    sender: "user-forum",
    error: {},
    servererror: {},
    url: new URL(window.location),
    forumId: null,
    toast: null,
    toasttext: null,
  };
  componentDidMount() {
    const { url, forumId } = this.state;
    let params = url.pathname.split("forum")[1],
      id = params.split(":")[1];
    this.setState({
      forumId: id,
    });
    this.props.getForum(id);
    console.log(forumId);
  }

  componentWillUnmount() {
    this.props.clearActions("get-forum");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.errors) {
      update.servererror = nextProps.errors;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.userreply !== this.props.user.userreply &&
      this.props.user.userreply
    ) {
      this.afterUpdate("added");
    }

    if (
      prevProps.user.deletereply !== this.props.user.deletereply &&
      this.props.user.deletereply
    ) {
      this.afterUpdate("deleted");
    }
    if (prevProps.errors.allow !== this.props.errors.allow) {
      this.errorUpdate();
    }
  }

  errorUpdate = () => {
    const { forumId, servererror } = this.state;
    this.setState({
      toast: true,
      toasttext: servererror.allow,
    });

    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, 3000);
    this.props.clearActions("get-forum");
    this.props.getForum(forumId);
  };

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
          text: "Reply Field can't be empty",
        },
      });
    } else {
      const reply = {
        text: text.toLowerCase(),
        ForumId,
      };
      this.props.replyForum(reply);
    }
  };

  clickHandler = (value) => {
    let check = window.confirm(`Are you sure you want to delete this reply?`);
    if (check) {
      this.props.deleteReply(value);
    } else {
      return false;
    }
  };

  render() {
    const { text, error, sender, toasttext, toast } = this.state;
    let loader = false,
      load = false,
      noRecord = false,
      notAllowed = false;
    const { user, errors, auth } = this.props,
      { loading } = user;
    let forum, post, reply, UserId, level;

    console.log(user.getforum);

    if (
      (user.getforum === null || loading) &&
      !Object.keys(errors).includes("user")
    ) {
      loader = true;
      load = true;
    } else if (
      user.getforum.forum !== null &&
      !loading &&
      !Object.keys(errors).includes("user")
    ) {
      loader = false;
      load = false;
      forum = user.getforum;
      post = forum.forum;
      reply = forum.reply;
      UserId = auth.user.id;
      level = auth.user.level;
    } else if (user.getforum === null && Object.keys(errors).includes("user")) {
      loader = false;
      load = false;
      noRecord = true;
      notAllowed = errors.user;
    } else if (user.getforum.forum === null && !loading) {
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
                <Link to="/user/forums">
                  Back <IoReturnUpBackOutline />
                </Link>
              </p>
            ) : (
              <div className="discussion-page">
                <div className="discussion-card card">
                  <div className="discussion">
                    <h3 className="mb-1">
                      {post.title}
                      <span className="text-muted ms-4 forum-status">
                        {post.status === "c" && (
                          <span className="text-muted ms-4 forum-status">
                            Closed <IoLockClosedOutline />
                          </span>
                        )}
                      </span>
                    </h3>
                    <div className="row">
                      <div className="col-md-2">
                        {post.right === "p"
                          ? "From Knowledge base"
                          : "Created by You"}
                      </div>
                      <div className="col-md-3">
                        <DateFormat date={post.createdAt} />
                      </div>
                    </div>

                    <p className="mt-1">{post.text}</p>
                    <span>{reply.length} replies</span>
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
                {post.status !== "o" && (
                  <div className="reply-form">
                    <form
                      className="account-form"
                      onSubmit={this.submitReplyHandler}
                    >
                      <input
                        type="hidden"
                        value={post.id}
                        name="postid"
                        readOnly
                      />
                      <TextAreaField
                        id="add-new-ann-summary"
                        placeholder="Add Comment"
                        type="text"
                        name="text"
                        value={text}
                        onChange={this.changeHandler}
                        error={error.text}
                      />
                      <div className="d-grid">
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
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Forum.propTypes = {
  getForum: PropTypes.func.isRequired,
  replyForum: PropTypes.func,
  deleteReply: PropTypes.func,
  clearActions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearActions,
  getForum,
  replyForum,
  deleteReply,
})(Forum);
