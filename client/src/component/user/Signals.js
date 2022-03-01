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

import {
  getMore,
  setSearchParams,
  renderArrange,
} from "../../util/LoadFunction";

export class Signals extends Component {
  state = {
    sender: "user-signals",
    search: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    signalcount: JSON.parse(localStorage.getItem("userCounts")).signals,
    startLoad: false,
    getLoad: true,
    content: "signals",
    autoRefresh: false,
  };

  componentDidMount() {
    const { limit, offset, signalcount, content } = this.state;
    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(signalcount / limit),
      startLoad: true,
    });
    this.props.getContent(content, paginate);
    window.addEventListener("scroll", this.loadMore, { passive: true });

    setTimeout(() => {
      this.setState({
        //  autoRefresh: true,
      });
    }, 5000);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(this.state.content);
    this.props.clearSearchActions(this.state.content);
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
    console.log(main);
    return (
      <div>
        {loader || (autoRefresh && <ProgressBar />)}
        {load ? (
          <div className="loader">
            <i className="fas fa-circle-notch fa-2x fa-spin" />
          </div>
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
            {(noRecord || emptyRecord) && "No Record(s) found"}
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
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  auth: PropTypes.object.isRequired,
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
})(Signals);
