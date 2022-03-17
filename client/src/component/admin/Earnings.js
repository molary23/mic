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

import {
  getMore,
  setSearchParams,
  loadFromParams,
  renderArrange,
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
      url: new URL(window.location),
      isLoading: false,
      bonuscount:
        JSON.parse(localStorage.getItem("counts")).bonus ??
        this.props.auth.allCounts.bonus,
      upLoad: true,
      content: "bonus",
      modal: false,
      error: {},
      toast: false,
      toasttext: "",
    };
  }

  componentDidMount() {
    const { limit, offset, bonuscount, content } = this.state;
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
      numOfPages: Math.ceil(bonuscount / limit),
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
    }
    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.admin.updatebonus !== this.props.admin.updatebonus &&
      this.props.admin.updatebonus
    ) {
      this.afterUpdate("updated");
    }
  }

  afterUpdate = (text) => {
    const { limit, content } = this.state;

    this.props.clearAdminAction("update-bonus");

    this.setState({
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Bonus ${text} successfully`,
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

  clickhandler = (value) => {
    let check = window.confirm(
      `Are you sure you want to ${value[0]} ${value[2].toUpperCase()}'s Bonus?`
    );
    if (check) {
      this.props.updateBonus({ action: value[0], id: value[1] });
    } else {
      return false;
    }
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
      self: this,
    });
  };

  render() {
    const {
      sender,
      status,
      statusOpt,
      startLoad,
      getLoad,
      bonuscount,
      search,
      toast,
      toasttext,
      error,
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
      startLoad,
      getLoad,
      bonuscount,
    });

    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div className="bonus card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Earnings</h1>
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
                <div className="col-md-3 mb-3">
                  <Select
                    sender={sender}
                    options={statusOpt}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <button type="button" className="btn download-btn">
                    Download <i className="far fa-file-excel" />
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
          </div>
        )}
        {toast && <Toast text={toasttext} />}
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
  loadFromParams: PropTypes.func,
  renderArrange: PropTypes.func,
  updateBonus: PropTypes.func,
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
