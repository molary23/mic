import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import Toast from "../../layout/Toast";
import Spinner from "../../layout/Spinner";
import ForumCard from "../../layout/ForumCard";
import AddModal from "../../layout/AddModal";
import ConfirmModal from "../../layout/ConfirmModal";

import { BiCommentAdd } from "react-icons/bi";

import {
  getContent,
  clearActions,
  addForum,
  updateForum,
} from "../../action/userAction";
import {
  searchContent,
  clearSearchActions,
} from "../../action/userSearchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
  landingLoad,
} from "../../util/LoadFunction";
import Pagination from "../../util/Pagination";

class Forums extends Component {
  state = {
    sender: "user-forums",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    timer: Pagination.timer,
    lastScrollTop: 0,
    url: new URL(window.location),
    loading: false,
    modal: false,
    error: {},
    toast: false,
    toasttext: "",
    purpose: "",
    search: "",
    status: "",
    right: "",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "o", option: "Open" },
      { value: "c", option: "Closed" },
    ],
    rightOptions: [
      { value: "", option: "Filter by Knowledge base" },
      { value: "u", option: "User" },
      { value: "p", option: "Public" },
    ],
    forumcount:
      JSON.parse(localStorage.getItem("userCounts")).forums ??
      this.props.auth.userCounts.forums,
    content: "forums",
    update: "",
    check: false,
    checktext: null,
    checktitle: null,
  };

  componentDidMount() {
    const { limit, offset, forumcount, content } = this.state;
    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(forumcount / limit),
    });
    window.addEventListener("scroll", this.loadMore, { passive: true });
  }
  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.errors !== prevState.errors &&
      Object.keys(nextProps.errors).length > 0
    ) {
      update.error = nextProps.errors.data;
      update.isLoading = false;
    } else if (
      nextProps.errors !== prevState.errors &&
      Object.keys(nextProps.errors).length === 0
    ) {
      update.error = {};
    }
    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.addforum !== this.props.user.addforum &&
      this.props.user.addforum
    ) {
      this.afterUpdate("added");
    }
    if (
      prevProps.user.updateforum !== this.props.user.updateforum &&
      this.props.user.updateforum
    ) {
      this.afterUpdate("updated");
    }
  }
  afterUpdate = (text) => {
    const { limit, content, forumcount, timer } = this.state;
    this.setState({
      isLoading: false,
      modal: false,
      toast: true,
      toasttext: `Discussion ${text} successfully`,
      currentPage: Pagination.currentpage,
      offset: 0,
    });
    if (text === "added") {
      this.setState({
        numOfPages: Math.ceil((forumcount + 1) / limit),
      });
      this.props.clearActions("add-forum");
    } else {
      this.props.clearActions("update-forum");
    }
    this.props.clearActions(content);
    this.props.clearSearchActions(content);

    let searchParams = window.location.search;
    landingLoad({ limit, offset: 0, self: this, content, searchParams });
    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, timer);
  };

  loadMore = () => {
    const {
      limit,
      numOfPages,
      iScrollPos,
      currentPage,
      content,
      lastScrollTop,
    } = this.state;
    let searchParams = window.location.search,
      winScroll = window.scrollY,
      toTop = window.pageYOffset || document.documentElement.scrollTop;
    if (toTop > lastScrollTop) {
      getMore({
        limit,
        numOfPages,
        iScrollPos,
        currentPage,
        content,
        winScroll,
        searchParams,
        self: this,
      });
    }
    this.setState({
      lastScrollTop: toTop <= 0 ? 0 : toTop,
    });
  };

  changeHandler = (e) => {
    const { url, content, limit, offset, timer } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });

    setSearchParams({
      selected: e.target.name,
      valueOfSelected: e.target.value,
      url,
      content,
      limit,
      offset,
      self: this,
      timer,
    });
  };

  openModal = () => {
    this.setState({
      modal: true,
    });
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
  };

  submitHandler = (value) => {
    this.setState({
      isLoading: true,
    });
    this.props.addForum(value);
  };

  clickHandler = (value) => {
    const forum = {
      action: value[0],
      id: value[1],
    };

    this.setState({
      check: true,
      checktext: `Are you sure you want to ${value[0]} this Discussion?`,
      checktitle: `Confirm ${value[0]}`,
    });

    this.confirmHandler = (option) => {
      if (option) {
        this.setState({
          isLoading: true,
        });
        this.props.updateForum(forum);
      }
      this.setState({
        check: false,
      });
    };
  };

  render() {
    const {
      sender,
      status,
      statusOptions,
      search,
      forumcount,
      right,
      toast,
      toasttext,
      error,
      isLoading,
      rightOptions,
      modal,
      check,
      checktext,
      checktitle,
    } = this.state;

    const { user, userSearch, auth } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.forumscount,
      list = user.forums,
      searchcount = userSearch.forumscount,
      searchlist = userSearch.forums,
      searchloading = userSearch.loading;

    const {
      showSearch,
      main,
      searchMain,
      emptyRecord,
      noRecord,
      totalText,
      totalCount,
      load,
      loader,
    } = renderArrange({
      fetching,
      loading,
      list,
      count,
      searching,
      searchcount,
      searchlist,
      searchloading,
      forumcount,
    });
    let UserId = auth.user.id,
      level = auth.user.level;
    return (
      <div>
        {loader && <ProgressBar />}
        <div className="transactions card holder-card ">
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-md-3 mb-2">
                <SearchInput
                  sender={sender}
                  placeholder="Search by User Name"
                  onChange={this.changeHandler}
                  name="search"
                  value={search}
                />
              </div>

              <div className="col-md-2 mb-2">
                <Select
                  sender={sender}
                  options={statusOptions}
                  onChange={this.changeHandler}
                  name="status"
                  value={status}
                />
              </div>
              <div className="col-md-2 mb-2">
                <Select
                  sender={sender}
                  options={rightOptions}
                  onChange={this.changeHandler}
                  name="right"
                  value={right}
                />
              </div>
              <div className="col-md-2 mb-2">
                <button
                  type="button"
                  className="btn add-btn"
                  onClick={this.openModal}
                >
                  Create <BiCommentAdd />
                </button>
              </div>
              <div className="col-md-3 mb-2">
                <div className="transactions-total table-figure">
                  <h6>
                    {totalText}
                    <span className="badge rounded-pill bg-success">
                      {totalCount}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          {(noRecord || emptyRecord) && (
            <p className="no-records">No Record(s) found</p>
          )}
          {load ? (
            <Spinner />
          ) : (
            <ForumCard
              sender={sender}
              forum={!showSearch ? main : searchMain}
              onClick={this.clickHandler}
              user={UserId}
              level={level}
            />
          )}
        </div>

        {modal ? (
          <AddModal
            {...{ modal, sender, isLoading, error }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
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

Forums.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  user: PropTypes.object.isRequired,
  userSearch: PropTypes.object,
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  clearActions: PropTypes.func,
  clearSearchActions: PropTypes.func,
  landingLoad: PropTypes.func,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
  addForum: PropTypes.func,
  updateForum: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  userSearch: state.userSearch,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
  addForum,
  updateForum,
})(Forums);
