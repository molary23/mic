import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { GiReceiveMoney } from "react-icons/gi";

import TableBody from "../../layout/TableBody";
import TableHead from "../../layout/TableHead";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";
import { RiFileExcel2Line } from "react-icons/ri";

import {
  getContent,
  clearActions,
  getBalance,
  getAccount,
  requestWithdrawal,
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
  downloadFile,
  roundUp,
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";

export class Withdrawals extends Component {
  state = {
    sender: "user-withdrawals",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "a", option: "Approved" },
      { value: "p", option: "Pending" },
      { value: "r", option: "Rejected" },
    ],
    status: "",
    search: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    url: new URL(window.location),
    isLoading: false,
    withcount: JSON.parse(localStorage.getItem("userCounts")).withdrawals,
    upLoad: true,
    content: "withdrawals",
    error: {},
    modal: false,
    toast: false,
    toasttext: "",
  };

  componentDidMount() {
    const { limit, offset, withcount, content } = this.state;
    this.props.getBalance();
    this.props.getAccount();

    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(withcount / limit),
    });

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }
  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearActions("user-account");
    this.props.clearActions("user-balance");
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
      prevProps.user.requestwithdrawal !== this.props.user.requestwithdrawal &&
      this.props.user.requestwithdrawal
    ) {
      this.afterUpdate();
    }
  }
  afterUpdate = () => {
    const { limit, content, walletcount } = this.state;

    this.setState({
      numOfPages: Math.ceil((walletcount + 1) / limit),
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

  downloadHandler = () => {
    const { sender } = this.state;
    downloadFile({ sender, self: this });
  };

  render() {
    const {
      sender,
      statusOptions,
      status,
      startLoad,
      getLoad,
      withcount,
      error,
      modal,
      toast,
      toasttext,
      isLoading,
    } = this.state;

    const { user, userSearch } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.withcount,
      list = user.withdrawals,
      searchcount = userSearch.withcount,
      searchlist = userSearch.withdrawals,
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
      withcount,
    });
    let balance = user.userbalance;
    let accountList = user.useraccount;
    return (
      <div>
        {(loader || isLoading) && <ProgressBar />}
        {load ? (
          <div className="loader">
            <i className="fas fa-circle-notch fa-2x fa-spin" />
          </div>
        ) : (
          <div className="payments card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Payments</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3">
                  <Select
                    sender={sender}
                    options={statusOptions}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-2">
                  <div className="transactions-total table-figure">
                    <h6>
                      Balance
                      <span className="badge rounded-pill bg-success">
                        {roundUp(balance)}
                      </span>
                    </h6>
                  </div>
                </div>
                {balance > 10 && (
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn add-btn"
                      onClick={this.openModal}
                    >
                      Withdraw <GiReceiveMoney />
                    </button>
                  </div>
                )}
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn download-btn"
                    onClick={this.downloadHandler}
                  >
                    Download <RiFileExcel2Line />
                  </button>
                </div>
                <div className="col-md-2">
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
                "status",
                "wallet",
                "account number",
                "request date",
                "updated date",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
              />
            </TableHead>
          </div>
        )}
        {modal ? (
          <AddModal
            {...{ modal, sender, accountList, balance, error, isLoading }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Withdrawals.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func.isRequired,
  clearSearchActions: PropTypes.func.isRequired,
  getBalance: PropTypes.func.isRequired,
  getAccount: PropTypes.func.isRequired,
  roundUp: PropTypes.func,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
  requestWithdrawal: PropTypes.func,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  userSearch: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  userSearch: state.userSearch,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
  getBalance,
  getAccount,
  requestWithdrawal,
})(Withdrawals);
