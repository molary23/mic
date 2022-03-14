import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import Toast from "../../layout/Toast";
import Spinner from "../../layout/Spinner";

import { BiCommentAdd } from "react-icons/bi";
import { BsCheck2Circle } from "react-icons/bs";

import { getContent, clearActions } from "../../action/userAction";
import {
  searchContent,
  clearSearchActions,
} from "../../action/userSearchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
  roundUp,
} from "../../util/LoadFunction";
import Pagination from "../../util/Pagination";

class Forums extends Component {
  state = {
    sender: "user-forum",
    active: 0,
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    loading: false,
    modal: false,
    error: {},
    toast: false,
    toasttext: "",
    purpose: "",
    search: "",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "o", option: "Open" },
      { value: "c", option: "Closed" },
    ],
    forumcount: JSON.parse(localStorage.getItem("userCounts")).forumcount,
    content: "forums",
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
    // this.props.clearSearchActions(content);
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
    /*  if (
      prevProps.user.requestwithdrawal !== this.props.user.requestwithdrawal &&
      this.props.user.requestwithdrawal
    ) {
      this.afterUpdate();
    }*/
  }
  afterUpdate = () => {
    const { limit, content, forumcount } = this.state;

    this.setState({
      numOfPages: Math.ceil((forumcount + 1) / limit),
    });
    this.props.clearActions("user-payout");

    this.setState({
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Withdrawal request sent`,
    });
    const paginate = {
      limit,
      offset: 0,
    };
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    this.props.getContent(content, paginate);

    this.setState((prevState) => ({
      offset: prevState.offset + limit,
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
    this.props.requestWithdrawal(value);
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
      toast,
      toasttext,
      error,
    } = this.state;

    const { user, userSearch } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.forumcount,
      list = user.forums,
      searchcount = userSearch.forumcount,
      searchlist = userSearch.forums,
      searchloading = userSearch.loading;

    console.log(list);

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
                options={statusOptions}
                onChange={this.changeHandler}
                name="status"
                value={status}
              />
            </div>
            <div className="col-md-2 mb-2">
              <button type="button" className="btn add-btn">
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
        <div className="discussion-card card">
          <div className="discussion">
            <h3 className="mb-1">Discussion Topic Here</h3>
            <span className="text-muted">About</span>,{" "}
            <small className="text-muted">Time of post</small>
            <p className="mt-1">
              FROM `ForumViews` AS `ForumView` WHERE (`ForumView`.`UserId` = 5
              OR `ForumView`.`right` = 'p'); [0] Executing (default): SELECT
              `id`, `title`, `about`, `text`, `status`, `right`, `replycount`,
              `UserId`, `creator`, `createdAt` FROM `ForumViews` AS `ForumView`
              WHERE (`ForumView`.`UserId` = 5 OR `ForumView`.`right` = 'p');
            </p>
          </div>
          <div className="row">
            <div className="col-md-6 col-xs-12">Number of replies</div>
            <div className="col-md-6 col-xs-12">
              <div className="forum-action">Action</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Forums.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func.isRequired,
  clearSearchActions: PropTypes.func.isRequired,
  roundUp: PropTypes.func,
  renderArrange: PropTypes.func,
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
})(Forums);
