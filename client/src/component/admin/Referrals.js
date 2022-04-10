import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import Toast from "../../layout/Toast";

import Spinner from "../../layout/Spinner";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  getMore,
  setSearchParams,
  landingLoad,
  renderArrange,
  downloadFile,
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";
export class Referrals extends Component {
  state = {
    sender: "admin-referrals",
    search: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    url: new URL(window.location),
    lastScrollTop: 0,
    refcount:
      JSON.parse(localStorage.getItem("counts")).referrals ??
      this.props.auth.allCounts.referrals,
    content: "referrals",
    toastcategory: null,
    toast: null,
    toasttext: null,
  };

  componentDidMount() {
    const { limit, offset, refcount, content } = this.state;
    let searchParams = window.location.search;

    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(refcount / limit),
    });

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

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
      prevProps.searchTerms.searching !== this.props.searchTerms.searching &&
      this.props.searchTerms.searching
    ) {
      this.setState({
        numOfPages: (this.props.searchTerms.refCount + 1) / this.state.limit,
      });
    }
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
  changeHandler = (e) => {
    const { url, content, limit, offset } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
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

  downloadHandler = () => {
    const { sender } = this.state;
    downloadFile({ sender, self: this });
  };

  render() {
    const { sender, search, refcount, toastcategory, toast, toasttext } =
      this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.refCount,
      list = admin.referrals,
      searchcount = searchTerms.refCount,
      searchlist = searchTerms.referrals,
      searchloading = searchTerms.loading;

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
              <div className="col-lg-4 col-md-5 col-12 mb-2">
                <SearchInput
                  placeholder="Search by Name"
                  type="text"
                  name="search"
                  value={search}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-12 mb-3">
                <button
                  type="button"
                  className="btn download-btn"
                  onClick={this.downloadHandler}
                >
                  Download <RiFileExcel2Line />
                </button>
              </div>
              <div className="col-lg-4 col-md-3 col-12 mb-2">
                <div className="table-figure">
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
            <TableHead
              sender={sender}
              head={["S/N", "Referred Username", "Referral Username"]}
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
  admin: PropTypes.object.isRequired,
  searchTerms: PropTypes.object,
  clearSearchActions: PropTypes.func,
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  landingLoad: PropTypes.func,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  downloadFile: PropTypes.func,
  clearActions: PropTypes.func,
  setSearchParams: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  searchTerms: state.searchTerms,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
})(Referrals);
