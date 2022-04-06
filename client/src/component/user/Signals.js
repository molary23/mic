import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
    limit: 30,
    offset: Pagination.offset,
    timer: Pagination.timer,
    url: new URL(window.location),
    signalcount:
      JSON.parse(localStorage.getItem("userCounts")).signals ??
      this.props.auth.userCounts.signals,
    premiuminfo:
      JSON.parse(localStorage.getItem("premium")) ??
      JSON.parse(this.props.auth.user.premium),
    content: "signals",
    isLoading: false,
    substatus: "",
  };

  componentDidMount() {
    const { limit, offset, content, premiuminfo } = this.state;
    let searchParams = window.location.search,
      dateOnly = new Date().toDateString(),
      curDate = new Date(dateOnly).getTime() / 1000,
      expDate = new Date(premiuminfo.enddate).getTime() / 1000;
    if (curDate > expDate && premiuminfo.status === "n") {
      this.setState({
        substatus: "n",
      });
    } else if (curDate > expDate && premiuminfo.status === "i") {
      this.setState({
        substatus: "i",
      });
    } else {
      this.setState({
        substatus: "a",
      });
      landingLoad({ limit, offset, self: this, content, searchParams });
      interval = setInterval(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        this.setState({
          isLoading: true,
        });
        this.refreshGet();
      }, 300000);
    }
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
        isLoading: false,
      });
    }

    if (
      prevProps.userSearch.searching !== this.props.userSearch.searching &&
      this.props.userSearch.searching
    ) {
      this.setState({
        numOfPages: (this.props.userSearch.signalcount + 1) / this.state.limit,
      });
    }
  }

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
    const { sender, search, signalcount, isLoading, substatus } = this.state;
    let pagecontent;
    if (substatus === "a") {
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
        signalcount,
      });
      let signal;
      if (!showSearch) {
        signal = main;
      } else {
        signal = searchMain;
      }
      pagecontent = (
        <div>
          {(loader || isLoading) && <ProgressBar />}

          <div className="signal-page">
            <div className="page-dash-title mb-4">
              <h1>Signals</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Currency"
                    onChange={this.changeHandler}
                    onKeyUp={this.keyHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-6 mb-2">
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
              <div className="container-fluid">
                <div className="row">
                  {signal.map((signal, i) => {
                    return (
                      <div className="col-lg-4 col-12 col-md-6" key={i}>
                        <div className="signal-one mb-4">
                          <Signal propkey={i} signal={signal} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else if (substatus === "i") {
      pagecontent = (
        <div>
          <p>
            Your Subscription has expired. To get Signal Updates, subscribe to a
            plan.
          </p>
          <p>
            Click Here to <Link to="/user/pay">Subscribe</Link>.
          </p>
        </div>
      );
    } else if (substatus === "n") {
      pagecontent = (
        <div>
          <p>As a new Member, you have to Subscribe to get Signal Updates.</p>
          <p>
            Click Here to <Link to="/user/pay">Subscribe</Link>.
          </p>
        </div>
      );
    }
    return <div>{pagecontent}</div>;
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
