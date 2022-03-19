import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  getCurrency,
  addSignal,
  clearSignal,
  editSignal,
  clearCurrency,
} from "../../action/providerAction";

import {
  searchContent,
  clearSearchActions,
} from "../../action/providerSearchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
  landingLoad,
  downloadFile,
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";
import Spinner from "../../layout/Spinner";
import { RiFileExcel2Line } from "react-icons/ri";
import { BiGroup } from "react-icons/bi";
import { MdAddChart } from "react-icons/md";

class Signals extends Component {
  state = {
    sender: "provider-signals",
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
    timer: Pagination.timer,
    lastScrollTop: 0,
    signalcount:
      JSON.parse(localStorage.getItem("providerCounts")).signals ??
      this.props.auth.providerCounts.signals,
    startLoad: false,
    getLoad: true,
    content: "signals",
    modal: false,
    purpose: "",
    toast: true,
    toasttext: "go on",
    modalsignaldetails: [],
    error: {},
    isLoading: false,
  };

  componentDidMount() {
    const { limit, offset, signalcount, content } = this.state;
    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(signalcount / limit),
      startLoad: true,
    });
    this.props.getCurrency();
    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    this.props.clearCurrency();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.errors) {
      update.error = nextProps.errors;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.provider.signaladded !== this.props.provider.signaladded &&
      this.props.provider.signaladded
    ) {
      this.afterUpdate("added");
    } else if (
      prevProps.provider.signaledited !== this.props.provider.signaledited &&
      this.props.provider.signaledited
    ) {
      this.afterUpdate("edited");
    }
  }

  afterUpdate = (text) => {
    const { limit, content, signalcount } = this.state;
    if (text === "added") {
      this.setState({
        numOfPages: Math.ceil((signalcount + 1) / limit),
      });
      this.props.clearSignal("new");
    } else {
      this.props.clearSignal("edit");
    }
    this.setState({
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Signal ${text} successfully`,
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

  clickHandler = (value) => {
    this.setState({
      modal: true,
      purpose: value[0],
      modalsignaldetails: value[1],
    });
  };

  openModal = () => {
    this.setState({
      modal: true,
      purpose: "add-new",
    });
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
  };

  submitHandler = (signalinfo) => {
    let act = signalinfo[0],
      signaldetail = signalinfo[1];
    if (act === "new") {
      this.props.addSignal(signaldetail);
    } else if (act === "edit") {
      //console.log(signaldetail, signalinfo[2]);
      this.props.editSignal(signaldetail, signalinfo[2]);
    }
    // this.props.addSignal(addSignal);
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
      search,
      signalcount,
      signalOpt,
      signaloption,
      modal,
      purpose,
      toast,
      toasttext,
      modalsignaldetails,
      error,
      isLoading,
    } = this.state;

    const { provider, providerSearch } = this.props;
    const { loading } = provider;
    const { fetching } = provider;
    const { searching } = providerSearch;
    const count = provider.signalcount,
      list = provider.signals,
      searchcount = providerSearch.signalcount,
      searchlist = providerSearch.signals,
      searchloading = providerSearch.loading;

    const currencies = provider.currencies;

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
      signalcount,
    });

    return (
      <div>
        {(loader || isLoading) && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div className="transactions card holder-card ">
            <div className="page-dash-title mb-4">
              <div className="row">
                <div className="col-md-3">
                  <h1>Signals</h1>
                </div>
                <div className="col-md-3">
                  <p className="mb-1">
                    <BiGroup />
                    {22} Followers
                  </p>
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
                <div className="col-md-3">
                  <div className="transactions-total table-figure">
                    <h6>
                      Currency Pair
                      <span className="badge rounded-pill bg-success">
                        {currencies.length}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Signals, Currency Pair"
                    onChange={this.changeHandler}
                    onKeyUp={this.keyHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <Select
                    sender={sender}
                    options={statusOpt}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <Select
                    sender={sender}
                    options={signalOpt}
                    onChange={this.changeHandler}
                    name="signaloption"
                    value={signaloption}
                  />
                </div>

                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-sm add-new"
                    onClick={this.openModal}
                  >
                    Add New <MdAddChart />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm download-btn"
                    onClick={this.downloadHandler}
                  >
                    Download <RiFileExcel2Line />
                  </button>
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
                "currency pair",
                "flag",
                "option",
                "status",
                "take profit",
                "stop loss",
                "range",
                "pip",
                "created at",
                "action",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
                onClick={this.clickHandler}
              />
            </TableHead>
          </div>
        )}
        {modal ? (
          <AddModal
            {...{ modal, sender, purpose, modalsignaldetails, error }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Signals.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  provider: PropTypes.object.isRequired,
  providerSearch: PropTypes.object,
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  clearActions: PropTypes.func,
  clearSearchActions: PropTypes.func,
  landingLoad: PropTypes.func,
  downloadFile: PropTypes.func,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
  clearCurrency: PropTypes.func,
  getCurrency: PropTypes.func,
  addSignal: PropTypes.func,
  clearSignal: PropTypes.func,
  editSignal: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  provider: state.provider,
  providerSearch: state.providerSearch,
  errors: state.errors,
  download: state.download,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
  getCurrency,
  addSignal,
  clearSignal,
  editSignal,
  clearCurrency,
})(Signals);
