import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  deleteAnn,
  clearAdminAction,
  addAnn,
  editAnn,
} from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
  loadFromParams,
} from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";
import ConfirmModal from "../../layout/ConfirmModal";

import { HiOutlineSpeakerphone } from "react-icons/hi";

import Pagination from "../../util/Pagination";

class Announcements extends Component {
  state = {
    sender: "admin-announcements",
    search: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    url: new URL(window.location),
    announcementcount: JSON.parse(localStorage.getItem("counts")).announcements,
    content: "announcements",
    modal: false,
    error: {},
    toast: false,
    toasttext: "",
    purpose: "",
    modalAnnDetails: [],
    check: false,
    checktext: null,
    checktitle: null,
    isLoading: false,
  };

  componentDidMount() {
    const { limit, offset, announcementcount, content } = this.state;
    let searchParams = window.location.search;
    if (searchParams !== "") {
      loadFromParams({ limit, self: this, content, searchParams });
    }

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(announcementcount / limit),
    });

    this.props.getContent(content, paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    this.props.clearActions(this.state.content);
    this.props.clearSearchActions(this.state.content);
    window.removeEventListener("scroll", this.loadMore);
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
      prevProps.admin.addann !== this.props.admin.addann &&
      this.props.admin.addann
    ) {
      this.afterUpdate("added");
    }
    if (
      prevProps.admin.deleteann !== this.props.admin.deleteann &&
      this.props.admin.deleteann
    ) {
      this.afterUpdate("deleted");
    }

    if (
      prevProps.admin.editann !== this.props.admin.editann &&
      this.props.admin.editann
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
      this.props.clearAdminAction("add-ann");
    } else if (text === "edited") {
      this.props.clearAdminAction("edit-ann");
    } else {
      this.props.clearAdminAction("delete-ann");
    }
    this.setState({
      isLoading: false,
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Announcement ${text} successfully`,
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

  clickHandler = (value) => {
    if (value[0] === "edit") {
      this.setState({
        modal: true,
        purpose: value[0],
        modalAnnDetails: value[1],
      });
    } else if (value[0] === "delete") {
      this.setState({
        check: true,
        checktext: `Are you sure you want to delete this Announcement?`,
        checktitle: "Confirm Delete",
      });
      this.confirmHandler = (option) => {
        if (option) {
          this.setState({
            isLoading: true,
          });
          this.props.deleteAnn(value[1]);
        }
        this.setState({
          check: false,
        });
      };
    }
  };

  openModal = () => {
    this.setState({
      modal: true,
      purpose: "add",
    });
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
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

  submitHandler = (anninfo) => {
    let act = anninfo[0],
      anndetail = anninfo[1];
    this.setState({
      isLoading: true,
    });
    if (act === "new") {
      this.props.addAnn(anndetail);
    } else if (act === "edit") {
      this.props.editAnn([anndetail, anninfo[2]]);
    }
  };

  render() {
    const {
      sender,
      announcementcount,
      search,
      modal,
      toast,
      toasttext,
      error,
      modalAnnDetails,
      purpose,
      check,
      checktext,
      checktitle,
    } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading, fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.annCount,
      list = admin.ann,
      searchcount = searchTerms.annCount,
      searchlist = searchTerms.ann,
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
      announcementcount,
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
              <h1>Accounts</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-4 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Title, Summary, Link"
                    onChange={this.changeHandler}
                    name="search"
                    value={search}
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
                    className="btn add-btn btn-sm"
                    onClick={this.openModal}
                  >
                    Create <HiOutlineSpeakerphone />
                  </button>
                </div>
                <div className="col-md-4 mb-2">
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
                "title",
                "link",
                "summary",
                "start date",
                "end date",
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
          </div>
        )}
        {modal ? (
          <AddModal
            {...{ modal, sender, error, modalAnnDetails, purpose }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {check && (
          <ConfirmModal
            {...{ check, sender, checktext, checktitle }}
            onClick={this.confirmHandler}
          />
        )}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Announcements.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func.isRequired,
  clearSearchActions: PropTypes.func.isRequired,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
  loadFromParams: PropTypes.func,
  deleteAnn: PropTypes.func,
  clearAdminAction: PropTypes.func,
  addAnn: PropTypes.func,
  editAnn: PropTypes.func,
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
  deleteAnn,
  clearAdminAction,
  addAnn,
  editAnn,
})(Announcements);
