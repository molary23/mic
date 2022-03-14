import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TableBody from "../../layout/TableBody";
import TableHead from "../../layout/TableHead";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";

import { getContent, clearActions } from "../../action/userAction";
import {
  searchContent,
  clearSearchActions,
} from "../../action/userSearchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
  // loadFromParams,
} from "../../util/LoadFunction";

export class Bonuses extends Component {
  state = {
    sender: "user-bonus",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "a", option: "Approved" },
      { value: "p", option: "Pending" },
      { value: "r", option: "Reject" },
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
    bonuscount: JSON.parse(localStorage.getItem("userCounts")).bonus,
    upLoad: true,
    content: "bonus",
  };

  componentDidMount() {
    const { limit, offset, bonuscount, content } = this.state;

    // loadFromParams({ limit, self: this, content });

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(bonuscount / limit),
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

  clickHandler = (value) => {};

  render() {
    const {
      sender,
      statusOptions,
      status,

      startLoad,
      getLoad,
      bonuscount,
    } = this.state;

    const { user, userSearch } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.bonuscount,
      list = user.bonus,
      searchcount = userSearch.bonuscount,
      searchlist = userSearch.bonus,
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
      bonuscount,
    });
    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <div className="loader">
            <i className="fas fa-circle-notch fa-2x fa-spin" />
          </div>
        ) : (
          <div className="payments card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Bonus</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3">
                  <Select
                    sender={sender}
                    options={statusOptions}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-2">
                  <button type="button" className="btn download-btn">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-3">
                  <div className="transactions-total table-figure">
                    <h6>
                      {totalText} Bonus
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
                "amount",
                "from",
                "status",
                "bonus date",
                "update date",
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
      </div>
    );
  }
}

Bonuses.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  // loadFromParams: PropTypes.func.isRequired,
  clearActions: PropTypes.func.isRequired,
  clearSearchActions: PropTypes.func.isRequired,
  renderArrange: PropTypes.func.isRequired,
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
})(Bonuses);
