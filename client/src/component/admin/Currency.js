import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

let typingTimer;
class Currency extends Component {
  state = {
    sender: "admin-currencies",
    statusOpt: [
      { value: "", option: "Filter by Status" },
      { value: "1", option: "Active" },
      { value: "2", option: "Inactive" },
    ],
    search: "",
    status: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    isLoading: false,
    doneTypingInterval: 5000,
    currencycount: JSON.parse(localStorage.getItem("counts")).currency,
    upLoad: true,
    content: "currency",
  };

  componentDidMount() {
    const { limit, offset, currencycount, content } = this.state;
    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(currencycount / limit),
    });
    this.props.getContent(content, paginate);
    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(this.state.content);
    this.props.clearSearchActions(this.state.content);
  }

  loadMore = () => {
    const { limit, numOfPages, iScrollPos, currentPage, content } = this.state;
    let searchParams = window.location.search;

    let winScroll = window.scrollY;

    if (winScroll > iScrollPos) {
      if (currentPage <= numOfPages) {
        this.setState((prevState) => ({
          offset: prevState.offset + limit,
          upLoad: (prevState.upLoad = false),
        }));

        if (searchParams !== "") {
          let queryTerms = searchParams.split("?")[1];
          queryTerms = queryTerms.split("&");
          let terms = queryTerms.map((term) => term.split("="));
          let params = Object.fromEntries(terms);
          params.offset = this.state.offset;
          params.limit = this.state.limit;
          // Search Now
          this.props.searchContent(content, params);
        } else {
          const paginate = {
            offset: this.state.offset,
            limit: this.state.limit,
          };
          this.props.getContent(content, paginate);
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
      loading: true,
    });
    this.setSearchParams(e.target.name, e.target.value);
  };

  setSearchParams = (selected, valueOfSelected) => {
    const { url, content } = this.state;
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
      params.offset = 0;
      params.limit = this.state.limit;

      // Search Now
      this.props.clearSearchActions(content);
      if (selected === "search") {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          this.setState({
            isLoading: true,
          });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          this.props.searchContent(content, params);
        }, this.state.doneTypingInterval);
      } else {
        this.setState({
          isLoading: true,
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        this.props.searchContent(content, params);
      }
    } else {
      const paginate = {
        offset: 0,
        limit: this.state.limit,
      };
      this.props.clearActions(content);
      this.setState((prevState) => ({
        upLoad: (prevState.upLoad = false),
      }));
      this.props.getContent(content, paginate);
    }
  };

  render() {
    const { sender, status, statusOpt, isLoading, upLoad, search } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    let load = upLoad,
      loader = isLoading,
      currency = [],
      searchCurrency,
      showSearch,
      emptyRecord = false,
      noRecord = false,
      totalText = "",
      totalCount = 0;

    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.curCount;
      totalText = "Total Currencies";
      if (admin.currency === [] && loading) {
        loader = true;
        load = upLoad;
      } else if (admin.currency.length > 0 && !loading) {
        currency = admin.currency;
        load = false;
        loader = false;
      } else if (admin.currency.length > 0 && loading) {
        currency = admin.currency;
        load = false;
        loader = true;
      } else {
        load = false;
        emptyRecord = true;
        currency = [];
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      loader = true;
      totalCount = searchTerms.curCount;
      totalText = "Selected/Searched Currencies";
      if (searchTerms.currency === [] || searchTerms.currency.length <= 0) {
        noRecord = true;
        searchCurrency = [];
        loader = false;
      } else if (searchTerms.currency.length > 0 && !searchTerms.loading) {
        searchCurrency = searchTerms.currency;
        loader = false;
      } else if (searchTerms.currency.length > 0 && searchTerms.loading) {
        searchCurrency = searchTerms.currency;
        loader = true;
      }
    }

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
                  <button type="button" className="btn btn-outline-primary">
                    Add New <i className="fas fa-folder-plus" />
                  </button>
                </div>

                <div className="col-md-2 mb-3">
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
              head={[
                "S/N",
                "currency pair",
                "currency flags",
                "status",
                "created at",
                "updated at",
                "created by",
                "action",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? currency : searchCurrency}
              />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Currency.propTypes = {
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
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
})(Currency);
