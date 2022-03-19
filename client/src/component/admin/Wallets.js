import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  clearAdminAction,
  updateWallet,
  addWallet,
} from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import Toast from "../../layout/Toast";
import AddModal from "../../layout/AddModal";
import Spinner from "../../layout/Spinner";

import { RiFileExcel2Line } from "react-icons/ri";
import { MdOutlinePostAdd } from "react-icons/md";

import {
  getMore,
  setSearchParams,
  landingLoad,
  renderArrange,
  downloadFile,
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";

export class Wallets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: "admin-wallets",
      statusOpt: [
        { value: "", option: "Filter by Status" },
        { value: "a", option: "Active" },
        { value: "i", option: "Inactive" },
      ],
      search: "",
      status: "",
      limit: Pagination.limit,
      offset: Pagination.offset,
      numOfPages: Pagination.numberofpages,
      iScrollPos: Pagination.scrollposition,
      currentPage: Pagination.currentpage,
      timer: Pagination.timer,
      lastScrollTop: 0,
      url: new URL(window.location),
      walletcount:
        JSON.parse(localStorage.getItem("counts")).wallets ??
        this.props.auth.allCounts.wallets,
      startLoad: false,
      getLoad: true,
      content: "wallets",
      modal: false,
      error: {},
      toast: false,
      toasttext: "",
      isLoading: false,
      servererror: null,
    };
  }

  componentDidMount() {
    const { limit, offset, walletcount, content } = this.state;
    let searchParams = window.location.search;

    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(walletcount / limit),
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
    if (nextProps.errors) {
      update.error = nextProps.errors;
      update.isLoading = false;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.admin.addwallet !== this.props.admin.addwallet &&
      this.props.admin.addwallet
    ) {
      this.afterUpdate("added");
    }
    if (
      prevProps.admin.updatewallet !== this.props.admin.updatewallet &&
      this.props.admin.updatewallet
    ) {
      this.afterUpdate("updated");
    }
  }

  afterUpdate = (text) => {
    const { limit, content, walletcount } = this.state;
    if (text === "added") {
      this.setState({
        numOfPages: Math.ceil((walletcount + 1) / limit),
      });
      this.props.clearAdminAction("add-wallet");
    } else {
      this.props.clearAdminAction("update-wallet");
    }

    this.setState({
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Wallet ${text} successfully`,
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
      });
    }, 3000);
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

  clickhandler = (value) => {
    let check = window.confirm(
      `Are you sure you want to ${value[0]} ${value[2].toUpperCase()}'s Wallet?`
    );
    if (check) {
      this.props.updateWallet(value[0], value[1]);
    } else {
      return false;
    }
  };

  changeHandler = (e) => {
    const { url, content, limit, offset, timer } = this.state;
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
    this.props.addWallet(value);
  };

  downloadHandler = () => {
    const { sender } = this.state;
    downloadFile({ sender, self: this });
  };

  render() {
    const {
      sender,
      status,
      statusOpt,
      startLoad,
      getLoad,
      walletcount,
      search,
      toast,
      toasttext,
      error,
      modal,
      isLoading,
    } = this.state;

    const { admin, searchTerms } = this.props,
      { loading, fetching } = admin,
      { searching } = searchTerms,
      count = admin.walletcount,
      list = admin.wallets,
      searchcount = searchTerms.walletcount,
      searchlist = searchTerms.wallets,
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
      walletcount,
    });

    return (
      <div>
        {(loader || isLoading) && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div className="bonus card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Bonus</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Username"
                    onChange={this.changeHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-2 mb-3">
                  <Select
                    sender={sender}
                    options={statusOpt}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-2 mb-3">
                  <button
                    type="button"
                    className="btn add-btn btn-sm"
                    onClick={this.openModal}
                  >
                    Add New <MdOutlinePostAdd />
                  </button>
                </div>
                <div className="col-md-2 mb-3">
                  <button
                    type="button"
                    className="btn download-btn"
                    onClick={this.downloadHandler}
                  >
                    Download <RiFileExcel2Line />
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
            <TableHead
              sender={sender}
              head={[
                "S/N",
                "wallet",
                "status",
                "created by",
                "date created",
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
        {modal ? (
          <AddModal
            {...{ modal, sender, error, isLoading }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Wallets.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  admin: PropTypes.object.isRequired,
  searchTerms: PropTypes.object,
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  clearAdminAction: PropTypes.func,
  landingLoad: PropTypes.func,
  renderArrange: PropTypes.func,
  updateBonus: PropTypes.func,
  clearActions: PropTypes.func,
  setSearchParams: PropTypes.func,
  clearSearchActions: PropTypes.func,
  updateWithdrawals: PropTypes.func,
  getMore: PropTypes.func,
  updateWallet: PropTypes.func,
  addWallet: PropTypes.func,
  updateAdmin: PropTypes.func,
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
  clearAdminAction,
  updateWallet,
  addWallet,
})(Wallets);
