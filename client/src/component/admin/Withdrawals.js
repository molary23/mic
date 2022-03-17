import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  updateWithdrawals,
  clearAdminAction,
} from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import Toast from "../../layout/Toast";
import Spinner from "../../layout/Spinner";

import {
  getMore,
  setSearchParams,
  renderArrange,
  loadFromParams,
} from "../../util/LoadFunction";
import Pagination from "../../util/Pagination";

export class Withdrawals extends Component {
  state = {
    sender: "admin-withdrawals",
    search: "",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "a", option: "Approved" },
      { value: "p", option: "Pending" },
      { value: "r", option: "Rejected" },
    ],
    status: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    timer: Pagination.timer,
    lastScrollTop: 0,
    url: new URL(window.location),
    withcount:
      JSON.parse(localStorage.getItem("counts")).withdrawals ??
      this.props.auth.allCounts.withdrawals,
    startLoad: false,
    getLoad: true,
    content: "withdrawals",
    toast: false,
    toasttext: "",
  };

  componentDidMount() {
    const { limit, offset, withcount, content } = this.state;

    let searchParams = window.location.search;

    if (searchParams !== "") {
      loadFromParams({ limit, self: this, content, searchParams });
    } else {
      const paginate = {
        limit,
        offset,
      };
      this.props.getContent(content, paginate);
    }
    this.setState({
      numOfPages: Math.ceil(withcount / limit),
    });

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.admin.updatewithdrawals !==
        this.props.admin.updatewithdrawals &&
      this.props.admin.updatewithdrawals
    ) {
      this.afterUpdate("updated");
      this.setState({
        currentPage: Pagination.currentpage,
      });
    }
  }

  afterUpdate = (text) => {
    const { limit, content, timer } = this.state;

    this.props.clearAdminAction("update-withdrawals");
    /* window.scrollTo({
      top: 0,
      behavior: "smooth",
    });*/
    this.setState({
      modal: false,
      toast: true,
      toasttext: `Withdrawal ${text} successfully`,
    });
    const paginate = {
      limit,
      offset: 0,
    };
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    this.props.getContent(content, paginate);

    this.setState({
      offset: this.state.offset - Pagination.limit,
    });
    window.addEventListener("scroll", this.loadMore, { passive: true });
    setTimeout(() => {
      this.setState({
        toast: false,
        newsignal: {},
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
      winScroll = window.scrollY;
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

  clickhandler = (value) => {
    console.log(value);
    let check = window.confirm(
      `Are you sure you want to ${
        value[0]
      } ${value[2].toUpperCase()}'s Withdrawal Request?`
    );
    if (check) {
      this.props.updateWithdrawals(value[0], value[1]);
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
      withcount,
      startLoad,
      getLoad,
      toast,
      toasttext,
      error,
    } = this.state;
    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.withcount,
      list = admin.withdrawals,
      searchcount = searchTerms.withcount,
      searchlist = searchTerms.withdrawals,
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
      startLoad,
      getLoad,
      withcount,
    });

    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div className="transactions card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Withdrawals</h1>
            </div>
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
                  <button type="button" className="btn download-btn">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="transactions-total table-figure">
                    <h6>
                      {totalText} Withdrawals
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
            <TableHead
              sender={sender}
              head={[
                "S/N",
                "amount",
                "Fullname",
                "username",
                "status",
                "wallet",
                "account",
                "request date",
                "response date",
                "action",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
                onClick={this.clickhandler}
              />
            </TableHead>
          </div>
        )}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Withdrawals.propTypes = {
  getContent: PropTypes.func.isRequired,
  updateWithdrawals: PropTypes.func,
  searchContent: PropTypes.func,
  clearActions: PropTypes.func,
  clearAdminAction: PropTypes.func,
  loadFromParams: PropTypes.func,
  renderArrange: PropTypes.func,
  setSearchParams: PropTypes.func,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  searchTerms: state.searchTerms,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  getContent,
  searchContent,
  clearSearchActions,
  clearActions,
  clearAdminAction,
  updateWithdrawals,
})(Withdrawals);
