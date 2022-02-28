import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import { getMore, setSearchParams } from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

export class Transactions extends Component {
  state = {
    sender: "admin-transactions",
    methodOptions: [
      { value: "", option: "Filter by Method" },
      { value: "b", option: "Bonus" },
      { value: "s", option: "Subscriptions" },
      { value: "w", option: "Withdrawal" },
    ],
    typeOptions: [
      { value: "", option: "Filter by Type" },
      { value: "d", option: "Debit" },
      { value: "c", option: "Credit" },
    ],
    type: "",
    method: "",
    search: "",
    limit: 4,
    offset: 0,
    sub: "",
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    transcount: JSON.parse(localStorage.getItem("counts")).subscriptions,
    startLoad: false,
    getLoad: true,
    content: "transactions",
  };

  componentDidMount() {
    const { limit, offset, transcount, content } = this.state;

    const paginate = {
      limit,
      offset,
    };

    this.setState({
      numOfPages: Math.ceil(transcount / limit),
      startLoad: true,
    });

    this.props.getContent(content, paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions("trans");
    this.props.clearSearchActions("users");
    this.props.clearSearchActions("trans");
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
      methodOptions,
      typeOptions,
      type,
      method,
      search,
      startLoad,
      getLoad,
      transcount,
    } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    let load = startLoad,
      loader = getLoad,
      trans = [],
      searchTrans,
      showSearch,
      emptyRecord = false,
      noRecord = false,
      totalText = "Total Transactions",
      totalCount = transcount;

    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.transCount;
      totalText = "Total Transactions";
      if (admin.trans === [] && loading) {
        loader = true;
        load = false;
      } else if (admin.trans.length > 0 && !loading) {
        trans = admin.trans;
        load = false;
        loader = false;
      } else if (admin.trans.length > 0 && loading) {
        trans = admin.trans;
        load = false;
        loader = true;
      } else {
        load = false;
        emptyRecord = true;
        trans = [];
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      loader = true;
      totalCount = searchTerms.transCount;
      totalText = "Selected/Searched Transactions";
      if (searchTerms.trans === [] || searchTerms.trans.length <= 0) {
        noRecord = true;
        searchTrans = [];
        loader = false;
      } else if (searchTerms.trans.length > 0 && !searchTerms.loading) {
        searchTrans = searchTerms.trans;
        loader = false;
      } else if (searchTerms.trans.length > 0 && searchTerms.loading) {
        searchTrans = searchTerms.trans;
        loader = true;
      }
    }

    return (
      <div>
        {loader || load ? (
          <div>
            <ProgressBar loading={{ loader, load }} />
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
                    placeholder="Search by User Name"
                    onChange={this.changeHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <Select
                    sender={sender}
                    options={methodOptions}
                    onChange={this.changeHandler}
                    name="method"
                    value={method}
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <Select
                    sender={sender}
                    options={typeOptions}
                    onChange={this.changeHandler}
                    name="type"
                    value={type}
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <button type="button" className="btn btn-outline-primary">
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
            {(noRecord || emptyRecord) && "No Record(s) found"}
            <TableHead
              sender={sender}
              head={["S/N", "amount", "User", "method", "type", "date"]}
            >
              {!showSearch && (
                <TableBody
                  sender={sender}
                  tablebody={trans !== undefined ? trans : null}
                />
              )}

              {showSearch && (
                <TableBody sender={sender} tablebody={searchTrans} />
              )}
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Transactions.propTypes = {
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  searchTerms: state.searchTerms,
});
export default connect(mapStateToProps, {
  getContent,
  searchContent,
  clearSearchActions,
  clearActions,
})(Transactions);
