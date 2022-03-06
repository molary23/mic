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
} from "../../action/providerAction";

import {
  searchContent,
  clearSearchActions,
} from "../../action/providerSearchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
} from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";

class Signals extends Component {
  state = {
    sender: "provider-signals",
    statusOpt: [
      { value: "", option: "Filter by Status" },
      { value: "f", option: "Filled" },
      { value: "c", option: "Cancelled" },
    ],
    signalOpt: [
      { value: "", option: "Filter by Signal Option" },
      { value: "b", option: "Buy" },
      { value: "s", option: "Sell" },
    ],
    search: "",
    status: "",
    signaloption: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    signalcount: JSON.parse(localStorage.getItem("providerCounts")).signals,
    startLoad: false,
    getLoad: true,
    content: "signals",
    modal: false,
    purpose: "",
    toast: false,
    toasttext: "",
    modalsignaldetails: [],
    error: {},
  };

  componentDidMount() {
    const { limit, offset, signalcount, content } = this.state;
    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(signalcount / limit),
      startLoad: true,
    });
    this.props.getContent(content, paginate);
    this.props.getCurrency();
    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(this.state.content);
    this.props.clearSearchActions(this.state.content);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.errors) {
      update.error = nextProps.errors;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.provider.signaladded !== this.props.provider.signaladded) {
      this.afterUpdate("added");
    } else if (
      prevProps.provider.signaledited !== this.props.provider.signaledited
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
      //  newsignal,
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
    /*  let joinsignal = {};
    joinsignal = newsignal;
    if (Object.keys(joinsignal).length > 0) {
      //main.unshift(joinsignal);
      main.splice(0, 0, joinsignal);
    }*/

    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <div className="loader">
            <i className="fas fa-circle-notch fa-2x fa-spin" />
          </div>
        ) : (
          <div className="transactions card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Currencies</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Name, Email, Username"
                    onChange={this.changeHandler}
                    onKeyUp={this.keyHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <Select
                    sender={sender}
                    options={statusOpt}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-2">
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
                    Add New <i className="fas fa-folder-plus" />
                  </button>
                  <button type="button" className="btn btn-sm download-btn">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>

                <div className="col-md-2 mb-2">
                  <div className="transactions-total table-figure">
                    <h6>
                      {totalText} Signals
                      <span className="badge rounded-pill bg-success">
                        {totalCount}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            {(noRecord || emptyRecord) && "No Record(s) found"}
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
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  provider: state.provider,
  providerSearch: state.providerSearch,
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
})(Signals);
