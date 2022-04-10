import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";
import Toast from "../../layout/Toast";

import {
  getMore,
  setSearchParams,
  renderArrange,
  landingLoad,
  downloadFile,
} from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import AddModal from "../../layout/AddModal";
import Spinner from "../../layout/Spinner";
import { RiFileExcel2Line } from "react-icons/ri";

import Pagination from "../../util/Pagination";

class Signals extends Component {
  state = {
    sender: "admin-signals",
    statusOpt: [
      { value: "", option: "Filter by Status" },
      { value: "f", option: "Failed" },
      { value: "c", option: "Cancelled" },
      { value: "s", option: "Successful" },
    ],
    signalOpt: [
      { value: "", option: "Filter by Signal Option" },
      { value: "b", option: "Buy" },
      { value: "s", option: "Sell" },
    ],
    search: "",
    status: "",
    signaloption: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    lastScrollTop: 0,
    url: new URL(window.location),
    signalcount:
      JSON.parse(localStorage.getItem("counts")).signals ??
      this.props.auth.counts.signals,
    content: "signals",
    modal: false,
    modalsignaldetails: [],
    purpose: "",
    toast: false,
    toastcategory: null,
    toasttext: null,
  };

  componentDidMount() {
    const { limit, offset, signalcount, content } = this.state;

    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(signalcount / limit),
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
        numOfPages: (this.props.searchTerms.signalCount + 1) / this.state.limit,
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
      doneTypingInterval: this.state.doneTypingInterval,
      self: this,
    });
  };

  clickHandler = (value) => {
    this.setState({
      modal: true,
      purpose: value[0],
      modalsignaldetails: value[1],
    });
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
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
      signalcount,
      signalOpt,
      signaloption,
      modal,
      modalsignaldetails,
      purpose,
      toast,
      toastcategory,
      toasttext,
    } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading, fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.signalCount,
      list = admin.signals,
      searchcount = searchTerms.signalCount,
      searchlist = searchTerms.signals,
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
      signalcount,
    });

    return (
      <div>
        {loader && <ProgressBar />}

        <div className="transactions card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Signals</h1>
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
              <div className="col-lg-2 col-md-6 col-12 mb-3">
                <Select
                  sender={sender}
                  options={signalOpt}
                  onChange={this.changeHandler}
                  name="signaloption"
                  value={signaloption}
                />
              </div>

              <div className="col-lg-2 col-md-3 col-12 mb-3">
                <button
                  type="button"
                  className="btn download-btn btn-sm"
                  onClick={this.downloadHandler}
                >
                  Download <RiFileExcel2Line />
                </button>
              </div>

              <div className="col-lg-3 col-md-3 col-12 mb-2">
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
                "flag",
                "option",
                "status",
                "take profit",
                "stop loss",
                "range",
                "pip",
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

        {modal ? (
          <AddModal
            {...{ modal, sender, purpose, modalsignaldetails }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} category={toastcategory} />}
      </div>
    );
  }
}

Signals.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  admin: PropTypes.object.isRequired,
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  clearActions: PropTypes.func,
  clearSearchActions: PropTypes.func,
  loadFromParams: PropTypes.func,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
  downloadFile: PropTypes.func,
  searchTerms: PropTypes.object,
  landingLoad: PropTypes.func,
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
})(Signals);
