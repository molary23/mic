import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  updateCurrency,
  clearAdminAction,
  addCurrency,
  clearErrors,
} from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import {
  getMore,
  setSearchParams,
  landingLoad,
  renderArrange,
  downloadFile,
} from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";
import Spinner from "../../layout/Spinner";
import ConfirmModal from "../../layout/ConfirmModal";

import { RiFileExcel2Line, RiCurrencyLine } from "react-icons/ri";

import Pagination from "../../util/Pagination";

class Currency extends Component {
  state = {
    sender: "admin-currencies",
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
    currencycount:
      JSON.parse(localStorage.getItem("counts")).currency ??
      this.props.auth.allCounts.currency,
    isLoading: false,
    content: "currency",
    modal: "",
    error: {},
    toast: false,
    toasttext: null,
    toastcategory: null,
    check: false,
    data: null,
  };

  componentDidMount() {
    const { limit, offset, currencycount, content } = this.state;
    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(currencycount / limit),
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
      prevProps.admin.addcurrency !== this.props.admin.addcurrency &&
      this.props.admin.addcurrency
    ) {
      this.afterUpdate("added");
    } else if (
      prevProps.admin.updatecurrency !== this.props.admin.updatecurrency &&
      this.props.admin.updatecurrency
    ) {
      this.afterUpdate("updated");
    }

    if (
      prevProps.searchTerms.searching !== this.props.searchTerms.searching &&
      this.props.searchTerms.searching
    ) {
      this.setState({
        numOfPages: (this.props.searchTerms.curCount + 1) / this.state.limit,
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

  afterUpdate = (text) => {
    const { limit, content, currencycount, timer } = this.state;
    this.setState({
      modal: false,
      toast: true,
      toasttext: `Currency ${text} successfully`,
      currentPage: Pagination.currentpage,
      offset: 0,
    });
    if (text === "added") {
      this.props.clearAdminAction("add-currency");
      this.setState({
        numOfPages: Math.ceil((currencycount + 1) / limit),
      });
    } else {
      this.props.clearAdminAction("update-currency");
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

  clickHandler = (value) => {
    let action = value[0],
      cur = value[1];

    this.setState({
      checktext: `Are you sure you want to ${action} ${
        cur.firstcurrency[1].toUpperCase() +
        "/" +
        cur.secondcurrency[1].toUpperCase()
      } pair?`,
      checktitle: "Confirm Delete",
      check: true,
    });

    this.confirmHandler = (option) => {
      if (option) {
        this.setState({
          isLoading: true,
        });
        this.props.updateCurrency(action, cur["id"]);
      }
      this.setState({
        check: false,
      });
    };
  };

  openModal = () => {
    this.setState({
      modal: true,
    });
  };

  modalHandler = (close) => {
    this.props.clearErrors();
    this.setState({
      modal: close,
    });
  };

  submitHandler = (value) => {
    if (value[0] === "add") {
      this.props.addCurrency(value[1]);
      this.setState({
        isLoading: true,
      });
    }
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
      search,
      currencycount,
      modal,
      error,
      toast,
      toasttext,
      toastcategory,
      isLoading,
      checktext,
      checktitle,
      check,
    } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading, fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.curCount,
      list = admin.currency,
      searchcount = searchTerms.curCount,
      searchlist = searchTerms.currency,
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
      currencycount,
    });

    return (
      <div>
        {(loader || isLoading) && <ProgressBar />}

        <div className="transactions card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Currencies</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12 mb-2">
                <SearchInput
                  sender={sender}
                  placeholder="Search by Name, Email, Username"
                  onChange={this.changeHandler}
                  onKeyUp={this.keyHandler}
                  name="search"
                  value={search}
                />
              </div>
              <div className="col-lg-2 col-md-6 col-12 mb-3">
                <Select
                  sender={sender}
                  options={statusOpt}
                  onChange={this.changeHandler}
                  name="status"
                  value={status}
                />
              </div>
              <div className="col-lg-2 col-md-4 col-12 mb-3">
                <button
                  type="button"
                  className="btn add-btn btn-sm"
                  onClick={this.openModal}
                >
                  Add New <RiCurrencyLine />
                </button>
              </div>

              <div className="col-lg-2 col-md-4 col-12 mb-3">
                <button
                  type="button"
                  className="btn download-btn btn-sm"
                  onClick={this.downloadHandler}
                >
                  Download <RiFileExcel2Line />
                </button>
              </div>

              <div className="col-lg-3 col-md-4 col-12 mb-2">
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
                "currency pair",
                "currency flags",
                "status",
                "created at",
                "updated at",
                "created by",
                "action",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
                onClick={this.clickHandler}
              />
            </TableHead>
          )}
        </div>

        {modal && (
          <AddModal
            {...{ modal, sender, error, isLoading }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        )}
        {check && (
          <ConfirmModal
            {...{ check, sender, checktext, checktitle }}
            onClick={this.confirmHandler}
          />
        )}
        {toast && <Toast text={toasttext} category={toastcategory} />}
      </div>
    );
  }
}

Currency.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  admin: PropTypes.object.isRequired,
  searchTerms: PropTypes.object,
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  updateCurrency: PropTypes.func.isRequired,
  addCurrency: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  renderArrange: PropTypes.func,
  landingLoad: PropTypes.func,
  setSearchParams: PropTypes.func,
  getMore: PropTypes.func,
  downloadFile: PropTypes.func,
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
  updateCurrency,
  clearAdminAction,
  addCurrency,
  clearErrors,
})(Currency);
