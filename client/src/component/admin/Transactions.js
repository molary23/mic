import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTrans, clearActions } from "../../action/adminAction";
import { searchTrans, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

let typingTimer;
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
    isLoading: false,
    doneTypingInterval: 5000,
    transcount: JSON.parse(sessionStorage.getItem("counts")).transactions,
    upLoad: true,
  };

  componentDidMount() {
    const { limit, offset, transcount } = this.state;

    const paginate = {
      limit,
      offset,
    };

    this.setState({
      numOfPages: Math.ceil(transcount / limit),
    });

    this.props.getTrans(paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions("trans");
    this.props.clearSearchActions("trans");
  }

  loadMore = () => {
    const { limit, numOfPages, iScrollPos, currentPage } = this.state;
    let searchParams = window.location.search;

    let winScroll = window.scrollY;

    if (winScroll > iScrollPos) {
      if (currentPage <= numOfPages) {
        this.setState((prevState) => ({
          offset: prevState.offset + limit,
        }));

        if (searchParams !== "") {
          let queryTerms = searchParams.split("?")[1];
          queryTerms = queryTerms.split("&");
          let terms = queryTerms.map((term) => term.split("="));
          let params = Object.fromEntries(terms);
          params.offset = this.state.offset;
          params.limit = this.state.limit;
          // Search Now
          this.props.searchTrans(params);
        } else {
          const paginate = {
            offset: this.state.offset,
            limit: this.state.limit,
          };
          this.props.getTrans(paginate);
        }

        this.setState({
          currentPage: this.state.currentPage + 1,
        });
      }
    }
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.setSearchParams(e.target.name, e.target.value);
  };

  setSearchParams = (selected, valueOfSelected) => {
    const { url } = this.state;
    this.setState({
      offset: 0,
      limit: 4,
      currentPage: 2,
    });
    if (valueOfSelected !== "") {
      url.searchParams.set(selected, valueOfSelected);
      window.history.pushState({}, "", url);
    } else if (valueOfSelected === "") {
      url.searchParams.delete(selected);
      window.history.pushState({}, "", url);
    }

    let searchParams = window.location.search;
    if (searchParams !== "") {
      let queryTerms = searchParams.split("?")[1];
      queryTerms = queryTerms.split("&");
      let terms = queryTerms.map((term) => term.split("="));
      let params = Object.fromEntries(terms);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      params.offset = 0;
      params.limit = this.state.limit;

      // Search Now
      this.props.clearSearchActions("trans");
      if (selected === "search") {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          this.setState({
            isLoading: true,
          });
          this.props.searchTrans(params);
        }, this.state.doneTypingInterval);
      } else {
        this.setState({
          isLoading: true,
        });
        this.props.searchTrans(params);
      }
    } else {
      const paginate = {
        offset: 0,
        limit: this.state.limit,
      };
      this.props.clearActions("trans");
      this.setState((prevState) => ({
        upLoad: (prevState.upLoad = false),
      }));
      this.props.getTrans(paginate);
    }
  };

  render() {
    const {
      sender,
      methodOptions,
      typeOptions,
      type,
      method,
      search,
      isLoading,
      upLoad,
    } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    let load = upLoad,
      loader = isLoading,
      trans = [],
      searchTrans,
      showSearch,
      emptyRecord = false,
      noRecord = false,
      totalText = "",
      totalCount = 0;

    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.transCount;
      totalText = "Total Transactions";
      if (admin.trans === [] && loading) {
        loader = true;
        load = upLoad;
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
  getTrans: PropTypes.func,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  searchTerms: state.searchTerms,
});
export default connect(mapStateToProps, {
  getTrans,
  searchTrans,
  clearSearchActions,
  clearActions,
})(Transactions);
