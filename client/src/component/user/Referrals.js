import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/userAction";
import {
  searchContent,
  clearSearchActions,
} from "../../action/userSearchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
} from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import Select from "../../layout/Select";

export class Referrals extends Component {
  state = {
    sender: "user-referrals",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "1", option: "Active" },
      { value: "0", option: "Inactive" },
    ],
    status: "",
    search: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    isLoading: false,
    refcount: JSON.parse(localStorage.getItem("userCounts")).referrals,
    upLoad: true,
    content: "referrals",
  };

  componentDidMount() {
    const { limit, offset, refcount, content } = this.state;
    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(refcount / limit),
    });
    this.props.getContent(content, paginate);
    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

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

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(this.state.content);
    this.props.clearSearchActions(this.state.content);
  }

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

  render() {
    const {
      sender,
      refcount,
      startLoad,
      getLoad,
      search,
      status,
      statusOptions,
    } = this.state;

    const { user, userSearch } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.referralcount,
      list = user.referrals,
      searchcount = userSearch.referralcount,
      searchlist = userSearch.referrals,
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
      refcount,
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
              <h1>Referrals</h1>
            </div>
            <div className="container-fluid mb-3">
              <div className="row">
                <div className="col-md-3">
                  <SearchInput
                    placeholder="Search by Name"
                    type="text"
                    name="search"
                    value={search}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="col-md-3 ">
                  <Select
                    sender={sender}
                    options={statusOptions}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-3 ">
                  <button type="button" className="btn download-btn">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-3 ">
                  <div className="table-figure">
                    <h5>
                      {totalText} Referrals
                      <span className="badge rounded-pill bg-success">
                        {totalCount}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {(noRecord || emptyRecord) && "No Record(s) found"}
            <TableHead
              sender={sender}
              head={[
                "S/N",
                "username",
                "phone number",
                "Status",
                "registered date",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
              />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Referrals.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func.isRequired,
  clearSearchActions: PropTypes.func.isRequired,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
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
})(Referrals);
