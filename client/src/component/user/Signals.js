import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/userAction";
import {
  searchContent,
  clearSearchActions,
} from "../../action/userSearchAction";

import Signal from "../../layout/Signal";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import Spinner from "../../layout/Spinner";

import {
  getMore,
  setSearchParams,
  renderArrange,
  landingLoad,
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";
let interval;
export class Signals extends Component {
  state = {
    sender: "user-signals",
    search: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    timer: Pagination.timer,
    lastScrollTop: 0,
    url: new URL(window.location),
    signalcount:
      JSON.parse(localStorage.getItem("userCounts")).signals ??
      this.props.auth.userCounts.signals,
    premium:
      JSON.parse(localStorage.getItem("premium")) ??
      JSON.parse(this.props.auth.user.premium),
    startLoad: false,
    getLoad: true,
    content: "signals",
    refreshing: false,
  };

  componentDidMount() {
    const { limit, offset, signalcount, content } = this.state;
    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });
    /* if (searchParams !== "") {
      loadFromParams({ limit, self: this, content, searchParams });
    } else {
      const paginate = {
        limit,
        offset,
      };
      this.props.getContent(content, paginate);
    }*/
    this.setState({
      numOfPages: Math.ceil(signalcount / limit),
      startLoad: true,
    });

    interval = setInterval(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      this.setState({
        autoRefresh: true,
      });
      this.refreshGet();
      console.log("first");
    }, 300000);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  refreshGet = () => {
    const { limit, content } = this.state;
    let searchParams = window.location.search;
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    landingLoad({ limit, offset: 0, self: this, content, searchParams });
  };

  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    clearInterval(interval);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.fetching !== this.props.user.fetching &&
      !this.props.user.loading
    ) {
      this.setState({
        autoRefresh: false,
        currentPage: Pagination.currentpage,
        offset: 0,
      });
    }
  }

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

  changeHandler = (e) => {
    const { url, content, limit, offset, timer } = this.state;
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
      timer,
    });
  };

  render() {
    const { sender, startLoad, getLoad, search, signalcount, autoRefresh } =
      this.state;

    const { user, userSearch } = this.props;
    const { loading } = user;
    const { fetching } = user;
    const { searching } = userSearch;
    const count = user.signalcount,
      list = user.signals,
      searchcount = userSearch.signalcount,
      searchlist = userSearch.signals,
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
      signalcount,
    });
    let signal;
    if (!showSearch) {
      signal = main;
    } else {
      signal = searchMain;
    }
    return (
      <div>
        {(loader || autoRefresh) && <ProgressBar />}
        {load && !autoRefresh ? (
          <Spinner />
        ) : (
          <div className="signal-page">
            <div className="page-dash-title mb-4">
              <h1>Signals</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-4 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Currency"
                    onChange={this.changeHandler}
                    onKeyUp={this.keyHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <div className="transactions-total table-figure">
                    <h6>
                      {totalText} Signals
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
            <div className="container-fluid">
              <div className="row">
                {signal.map((signal, i) => {
                  return (
                    <div className="col-md-4 col-xs-12 col-sm-12" key={i}>
                      <div className="signal-one mb-4">
                        <Signal propkey={i} signal={signal} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Signals.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  user: PropTypes.object.isRequired,
  userSearch: PropTypes.object,
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  clearActions: PropTypes.func,
  clearSearchActions: PropTypes.func,
  landingLoad: PropTypes.func,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  userSearch: state.userSearch,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
})(Signals);
