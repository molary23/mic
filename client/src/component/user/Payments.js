import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TableBody from "../../layout/TableBody";
import TableHead from "../../layout/TableHead";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import Spinner from "../../layout/Spinner";
import Toast from "../../layout/Toast";

import { RiFileExcel2Line } from "react-icons/ri";

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
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";

export class Payments extends Component {
  state = {
    sender: "user-payments",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "f", option: "Failed" },
      { value: "s", option: "Success" },
    ],
    gatewayOptions: [
      { value: "", option: "Filter by Gateway" },
      { value: "b", option: "Bank" },
      { value: "c", option: "Crypto" },
    ],
    status: "",
    gateway: "",
    search: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    timer: Pagination.timer,
    lastScrollTop: 0,
    url: new URL(window.location),
    startLoad: false,
    isLoading: false,
    getLoad: true,
    paycount:
      JSON.parse(localStorage.getItem("userCounts")).payments ??
      this.props.auth.userCounts.payments,
    upLoad: true,
    content: "payments",
    toast: false,
    toastcategory: null,
    toasttext: null,
  };

  componentDidMount() {
    const { limit, offset, paycount, content } = this.state;
    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });

    this.setState({
      numOfPages: Math.ceil(paycount / limit),
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
    let searchParams = window.location.search;
    let winScroll = window.scrollY;
    let toTop = window.pageYOffset || document.documentElement.scrollTop;
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
      lastScrollTop: toTop <= 0 ? 0 : toTop, // For Mobile or negative scrolling
    });
  };

  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
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
      statusOptions,
      status,
      gatewayOptions,
      gateway,
      startLoad,
      getLoad,
      paycount,
      search,
      isLoading,
      toast,
      toastcategory,
      toasttext,
    } = this.state;

    const { user, userSearch } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.paycount,
      list = user.pay,
      searchcount = userSearch.paycount,
      searchlist = userSearch.pay,
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
      paycount,
    });
    return (
      <div>
        {(loader || isLoading) && <ProgressBar />}

        <div className="payments card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Payments</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-md-3">
                <SearchInput
                  placeholder="Search by Name"
                  type="text"
                  name="search"
                  value={search}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="col-md-2">
                <Select
                  sender={sender}
                  options={statusOptions}
                  onChange={this.changeHandler}
                  name="status"
                  value={status}
                />
              </div>
              <div className="col-md-2">
                <Select
                  sender={sender}
                  options={gatewayOptions}
                  onChange={this.changeHandler}
                  name="gateway"
                  value={gateway}
                />
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn download-btn"
                  onClick={this.downloadHandler}
                >
                  Download <RiFileExcel2Line />
                </button>
              </div>
              <div className="col-md-3">
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
            <TableHead
              sender={sender}
              head={[
                "S/N",
                "amount",
                "Payment Gateway",
                "reference",
                "status",
                "date",
              ]}
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

Payments.propTypes = {
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
})(Payments);
