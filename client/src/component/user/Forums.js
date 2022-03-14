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

import { BiCommentAdd } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";

import { FaRegEye } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

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
} from "../../util/LoadFunction";
import Pagination from "../../util/Pagination";

class Forums extends Component {
  state = {
    sender: "user-forums",
    active: 0,
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
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
    isLoading: false,
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
    forumcount: JSON.parse(localStorage.getItem("userCounts")).forums,
    content: "forums",
    update: "",
  };

  componentDidMount() {
    const { limit, offset, forumcount, content } = this.state;
    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(forumcount / limit),
    });
    this.props.getContent(content, paginate);
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
    if (nextProps.errors) {
      update.error = nextProps.errors;
      update.isLoading = false;
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
      this.setState({
        currentPage: Pagination.currentpage,
      });
    }
  }
  afterUpdate = (text) => {
    const { limit, content, forumcount, update } = this.state;
    let action;
    if (text === "added") {
      this.setState({
        numOfPages: Math.ceil((forumcount + 1) / limit),
      });
      this.props.clearActions("add-forum");
      action = text;
    } else {
      this.props.clearActions("update-forum");
      action = update;
    }
    this.setState({
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Discussion ${action} successfully`,
    });
    const paginate = {
      limit,
      offset: 0,
    };
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    this.props.getContent(content, paginate);

    this.setState((prevState) => ({
      offset: this.state.offset,
    }));
    window.addEventListener("scroll", this.loadMore, { passive: true });
    setTimeout(() => {
      this.setState({
        toast: false,
        newsignal: {},
      });
    }, 3000);
  };

  loadMore = () => {
    const { limit, numOfPages, iScrollPos, currentPage, content } = this.state;
    let searchParams = window.location.search,
      winScroll = window.scrollY;
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
  };

  changeHandler = (e) => {
    const { url, content, limit, offset } = this.state;
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
    this.props.addForum(value);
  };

  clickhandler = (value) => {
    const forum = {
      action: value[0],
      id: value[1],
    };
    this.setState({
      update: `${forum.action}d`,
    });
    let check = window.confirm(
      `Are you sure you want to ${value[0]} this Discussion?`
    );
    if (check) {
      this.props.updateForum(forum);
    } else {
      return false;
    }
  };

  render() {
    const {
      sender,
      status,
      statusOptions,
      search,
      forumcount,
      startLoad,
      getLoad,
      right,
      toast,
      toasttext,
      error,
      isLoading,
      rightOptions,
      modal,
    } = this.state;

    const { user, userSearch } = this.props;
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
      startLoad,
      getLoad,
      forumcount,
    });
    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
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
                      {totalText} Discussions
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
            <ForumCard
              sender={sender}
              forum={!showSearch ? main : searchMain}
              onClick={this.clickhandler}
            />
          </div>
        )}
        {modal ? (
          <AddModal
            {...{ modal, sender, isLoading, error }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Forums.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func.isRequired,
  clearSearchActions: PropTypes.func.isRequired,
  renderArrange: PropTypes.func,
  addForum: PropTypes.func,
  updateForum: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userSearch: PropTypes.object.isRequired,
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
