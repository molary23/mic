import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  clearAdminAction,
  updateBonus,
} from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import Toast from "../../layout/Toast";
import Spinner from "../../layout/Spinner";
import ConfirmModal from "../../layout/ConfirmModal";
import { RiFileExcel2Line } from "react-icons/ri";

import {
  getMore,
  setSearchParams,
  landingLoad,
  renderArrange,
  downloadFile,
  setDocumentTitle,
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";

export class Earnings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: "admin-bonus",
      statusOpt: [
        { value: "", option: "Filter by Status" },
        { value: "p", option: "Pending" },
        { value: "a", option: "Approved" },
        { value: "r", option: "Disapprovd" },
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
      isLoading: false,
      bonuscount:
        JSON.parse(localStorage.getItem("counts")).bonus ??
        this.props.auth.allCounts.bonus,
      content: "bonus",
      modal: false,
      toast: false,
      toasttext: null,
      toastcategory: null,
      check: false,
      checktext: null,
      checktitle: null,
    };
  }

  componentDidMount() {
    setDocumentTitle("admin view users' earnings");
    const { limit, offset, bonuscount, content } = this.state;
    let searchParams = window.location.search;

    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(bonuscount / limit),
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
      prevProps.admin.updatebonus !== this.props.admin.updatebonus &&
      this.props.admin.updatebonus
    ) {
      this.afterUpdate("updated");
    }
    if (
      prevProps.searchTerms.searching !== this.props.searchTerms.searching &&
      this.props.searchTerms.searching
    ) {
      this.setState({
        numOfPages: (this.props.searchTerms.bonusCount + 1) / this.state.limit,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.errors !== prevState.errors &&
      Object.keys(nextProps.errors).length > 0
    ) {
      update.isLoading = false;
    }
    return update;
  }

  afterUpdate = (text) => {
    const { limit, content, timer } = this.state;

    this.props.clearAdminAction("update-bonus");

    this.setState({
      modal: false,
      toast: true,
      isLoading: false,
      toasttext: `Bonus ${text} successfully`,
      currentPage: Pagination.currentpage,
      offset: 0,
    });
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
      lastScrollTop: toTop <= 0 ? 0 : toTop, // For Mobile or negative scrolling
    });
  };

  clickhandler = (value) => {
    this.setState({
      check: true,
      checktext: `Are you sure you want to ${
        value[0]
      } ${value[2].toUpperCase()}'s Bonus?`,
      checktitle: `Confirm ${value[0]}`,
    });

    this.confirmHandler = (option) => {
      if (option) {
        this.props.updateBonus({ action: value[0], id: value[1] });
      }
      this.setState({
        check: false,
      });
    };
  };

  clickHandler = (value) => {
    let action = value[0],
      cur = value[1];

    this.setState({
      check: true,
      checktext: `Are you sure you want to ${
        value[0]
      } ${value[2].toUpperCase()}'s Bonus?`,
      checktitle: `Confirm ${value[0]}`,
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

  downloadHandler = () => {
    const { sender } = this.state;
    downloadFile({ sender, self: this });
  };

  render() {
    const {
      sender,
      status,
      statusOpt,
      bonuscount,
      search,
      toast,
      toasttext,
      toastcategory,
      isLoading,
      check,
      checktext,
      checktitle,
    } = this.state;

    const { admin, searchTerms } = this.props,
      { loading, fetching } = admin,
      { searching } = searchTerms,
      count = admin.bonusCount,
      list = admin.bonus,
      searchcount = searchTerms.bonusCount,
      searchlist = searchTerms.bonus,
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
      bonuscount,
    });

    return (
      <div>
        {(loader || isLoading) && <ProgressBar />}

        <div className="bonus card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Earnings</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-lg-3 col-md-6  col-12 mb-2">
                <SearchInput
                  sender={sender}
                  placeholder="Search by Username"
                  onChange={this.changeHandler}
                  name="search"
                  value={search}
                />
              </div>
              <div className="col-lg-3 col-md-6  col-12 mb-3">
                <Select
                  sender={sender}
                  options={statusOpt}
                  onChange={this.changeHandler}
                  name="status"
                  value={status}
                />
              </div>

              <div className="col-lg-3 col-md-6  col-12 mb-3">
                <button
                  type="button"
                  className="btn download-btn"
                  onClick={this.downloadHandler}
                >
                  Download <RiFileExcel2Line />
                </button>
              </div>

              <div className="col-lg-3 col-md-6  col-12 mb-2">
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
                "payer",
                "status",
                "receiver",
                "date created",
                "date approved",
                "view",
                "action",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
                onClick={this.clickhandler}
              />
            </TableHead>
          )}
        </div>

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

Earnings.propTypes = {
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
  updateBonus,
})(Earnings);
