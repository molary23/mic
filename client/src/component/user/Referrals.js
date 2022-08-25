import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/userAction";
import {
  searchContent,
  clearSearchActions,
} from "../../action/userSearchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
  landingLoad,
  downloadFile,
  setDocumentTitle,
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import Select from "../../layout/Select";
import Spinner from "../../layout/Spinner";
import Toast from "../../layout/Toast";

import { RiFileExcel2Line } from "react-icons/ri";

export class Referrals extends Component {
  state = {
    sender: "user-referrals",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "a", option: "Active" },
      { value: "n", option: "New" },
      { value: "i", option: "Inactive" },
    ],
    status: "",
    search: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    timer: Pagination.timer,
    lastScrollTop: 0,
    url: new URL(window.location),
    isLoading: false,
    refcount:
      JSON.parse(localStorage.getItem("userCounts")).referrals ??
      this.props.auth.userCounts.referrals,
    toast: false,
    toastcategory: null,
    toasttext: null,
    content: "referrals",
  };

  componentDidMount() {
    setDocumentTitle("my referrals");
    const { limit, offset, refcount, content } = this.state;
    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });

    this.setState({
      numOfPages: Math.ceil(refcount / limit),
      startLoad: true,
    });

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

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

  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userSearch.searching !== this.props.userSearch.searching &&
      this.props.userSearch.searching
    ) {
      this.setState({
        numOfPages: (this.props.userSearch.refcount + 1) / this.state.limit,
      });
    }
  }

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

  downloadHandler = () => {
    const { sender } = this.state;
    downloadFile({ sender, self: this });
  };

  render() {
    const {
      sender,
      refcount,
      startLoad,
      getLoad,
      search,
      status,
      statusOptions,
      toast,
      toastcategory,
      toasttext,
    } = this.state;

    const { user, userSearch } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.referralcount,
      list = user.referrals,
      searchcount = userSearch.referralcount,
      searchlist = userSearch.referrals,
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
      refcount,
    });
    return (
      <div>
        {loader && <ProgressBar />}

        <div className="transactions card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Referrals</h1>
          </div>
          <div className="container-fluid mb-3">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12">
                <SearchInput
                  placeholder="Search by Name"
                  type="text"
                  name="search"
                  value={search}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <Select
                  sender={sender}
                  options={statusOptions}
                  onChange={this.changeHandler}
                  name="status"
                  value={status}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12 mb-3">
                <button
                  type="button"
                  className="btn download-btn"
                  onClick={this.downloadHandler}
                >
                  Download <RiFileExcel2Line />
                </button>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="table-figure">
                  <h5>
                    {totalText}
                    <span className="badge rounded-pill bg-success">
                      {totalCount}
                    </span>
                  </h5>
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
            <TableHead
              sender={sender}
              head={["S/N", "username", "phone", "premium status"]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
              />
            </TableHead>
          )}
        </div>
        {toast && <Toast text={toasttext} category={toastcategory} />}
      </div>
    );
  }
}

Referrals.propTypes = {
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
  downloadFile: PropTypes.func,
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
})(Referrals);
