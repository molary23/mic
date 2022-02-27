import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";

let typingTimer;
export class Referrals extends Component {
  state = {
    sender: "admin-referrals",
    search: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    isLoading: false,
    doneTypingInterval: 5000,
    refcount: JSON.parse(localStorage.getItem("counts")).referrals,
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
    const { sender, isLoading, upLoad, search, refcount } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    let load = upLoad,
      loader = isLoading,
      ref = [],
      searchref,
      showSearch,
      emptyRecord = false,
      noRecord = false,
      totalText = "",
      totalCount = refcount;
    console.log(admin.referrals);

    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.refCount;
      totalText = "Total Users";
      if (admin.referrals === [] && loading) {
        loader = true;
        load = upLoad;
      } else if (admin.referrals.length > 0 && !loading) {
        ref = admin.referrals;
        load = false;
        loader = false;
      } else if (admin.referrals.length > 0 && loading) {
        ref = admin.referrals;
        load = false;
        loader = true;
      } else {
        load = false;
        emptyRecord = true;
        ref = [];
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      loader = true;
      totalCount = searchTerms.refCount;
      totalText = "Selected/Searched Users";
      if (searchTerms.referrals === [] || searchTerms.referrals.length <= 0) {
        noRecord = true;
        searchref = [];
        loader = false;
      } else if (searchTerms.referrals.length > 0 && !searchTerms.loading) {
        searchref = searchTerms.referrals;
        loader = false;
      } else if (searchTerms.referrals.length > 0 && searchTerms.loading) {
        searchref = searchTerms.referrals;
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
              <h1>Referrals</h1>
            </div>
            <div className="container-fluid mb-3">
              <div className="row">
                <div className="col-md-4 mb-2">
                  <SearchInput
                    placeholder="Search by Name"
                    type="text"
                    name="search"
                    value={search}
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <button type="button" className="btn btn-outline-primary">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="table-figure">
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
              head={["S/N", "Referred Username", "Referral Username"]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? ref : searchref}
              />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Referrals.propTypes = {
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  searchTerms: state.searchTerms,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
})(Referrals);
