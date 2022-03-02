import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TableBody from "../../layout/TableBody";
import TableHead from "../../layout/TableHead";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

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

export class Payments extends Component {
  state = {
    sender: "user-payments",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "1", option: "Failed" },
      { value: "2", option: "Success" },
    ],
    gatewayOptions: [
      { value: "", option: "Filter by Gateway" },
      { value: "b", option: "Bank" },
      { value: "c", option: "Crypto" },
    ],
    status: "",
    gateway: "",
    search: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    isLoading: false,
    paycount: JSON.parse(localStorage.getItem("userCounts")).payments,
    upLoad: true,
    content: "payments",
  };

  componentDidMount() {
    const { limit, offset, paycount, content } = this.state;
    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(paycount / limit),
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
      statusOptions,
      status,
      gatewayOptions,
      gateway,
      startLoad,
      getLoad,
      paycount,
      search,
    } = this.state;

    const { user, userSearch } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.paycount,
      list = user.pay,
      searchcount = userSearch.paycount,
      searchlist = userSearch.pay,
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
      paycount,
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
              <h1>Payments</h1>
            </div>
            <div className="container-fluid mb-4">
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
                <div className="col-md-2">
                  <Select
                    sender={sender}
                    options={statusOptions}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-2">
                  <Select
                    sender={sender}
                    options={gatewayOptions}
                    onChange={this.changeHandler}
                    name="gateway"
                    value={gateway}
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
                      {totalText} Payments
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
                "Payment Gateway",
                "reference",
                "status",
                "date",
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

Payments.propTypes = {
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
})(Payments);
