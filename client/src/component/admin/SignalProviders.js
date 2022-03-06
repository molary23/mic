import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  addNewAdmin,
  clearAdminAction,
  updateAdmin,
} from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import {
  getMore,
  setSearchParams,
  loadFromParams,
  renderArrange,
} from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import Select from "../../layout/Select";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";

import Pagination from "../../util/Pagination";

class ViewAdmin extends Component {
  state = {
    sender: "admin-providers",
    search: "",
    statusOpt: [
      { value: "", option: "Filter by Status" },
      { value: "a", option: "Active" },
      { value: "i", option: "Inactive" },
    ],
    status: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    url: new URL(window.location),
    isLoading: false,
    usercount: 9,
    upLoad: true,
    providercount:
      JSON.parse(localStorage.getItem("counts")).providers ??
      this.props.auth.allCounts.providers,
    content: "providers",
    modal: false,
    toast: false,
    toasttext: "",
    error: {},
  };

  componentDidMount() {
    const { limit, offset, providercount, content } = this.state;

    let searchParams = window.location.search;

    if (searchParams !== "") {
      loadFromParams({ limit, self: this, content, searchParams });
    }

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(providercount / limit),
    });

    this.props.getContent(content, paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    const { content } = this.state;
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    window.removeEventListener("scroll", this.loadMore);
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
      prevProps.admin.addprovider !== this.props.admin.addprovider &&
      this.props.admin.addprovider
    ) {
      this.afterUpdate("added");
    }

    if (
      prevProps.admin.updateadmin !== this.props.admin.updateadmin &&
      this.props.admin.updateadmin
    ) {
      this.afterUpdate("updated");
    }
  }

  afterUpdate = (text) => {
    const { limit, content, signalcount } = this.state;
    if (text === "added") {
      this.setState({
        numOfPages: Math.ceil((signalcount + 1) / limit),
      });
      this.props.clearAdminAction("add-admin");
    } else {
      this.props.clearAdminAction("update-admin");
    }

    this.setState({
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Provider ${text} successfully`,
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
    if (value[0] === "add") {
      this.props.addNewAdmin("provider", value[1]);
    }
  };

  clickhandler = (value) => {
    let check = window.confirm(
      `Are you sure you want to ${value[0]} this Admin?`
    );
    if (check) {
      this.props.updateAdmin(value);
    } else {
      return false;
    }
  };

  render() {
    const {
      sender,
      providercount,
      startLoad,
      getLoad,
      search,
      statusOpt,
      status,
      modal,
      toast,
      toasttext,
      error,
    } = this.state;

    const { admin, searchTerms } = this.props,
      { loading, fetching } = admin,
      { searching } = searchTerms,
      count = admin.prCount,
      list = admin.providers,
      searchcount = searchTerms.prCount,
      searchlist = searchTerms.providers,
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
      providercount,
    });

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
              <h1>Transactions</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Name, Email, Username"
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
                  <button type="button" className="btn download-btn">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-2 mb-3">
                  <button
                    type="button"
                    className="btn add-btn"
                    onClick={this.openModal}
                  >
                    Add SP <i className="fas fa-user-plus" />
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
                "Fullname",
                "email",
                "ussername",
                "phone number",
                "status ",
                "View",
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
            {...{ modal, sender, error }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

ViewAdmin.propTypes = {
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  renderArrange: PropTypes.func,
  clearAdminAction: PropTypes.func,
  addNewAdmin: PropTypes.func,
  updateAdmin: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  searchTerms: state.searchTerms,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
  addNewAdmin,
  clearAdminAction,
  updateAdmin,
})(ViewAdmin);
