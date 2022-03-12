import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  updateCurrency,
  clearAdminAction,
  addCurrency,
} from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import {
  getMore,
  setSearchParams,
  loadFromParams,
  renderArrange,
} from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";

class Currency extends Component {
  state = {
    sender: "admin-currencies",
    statusOpt: [
      { value: "", option: "Filter by Status" },
      { value: "1", option: "Active" },
      { value: "0", option: "Inactive" },
    ],
    search: "",
    status: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    doneTypingInterval: 5000,
    currencycount:
      JSON.parse(localStorage.getItem("counts")).currency ??
      this.props.auth.allCounts.currency,
    getLoad: true,
    startLoad: false,
    content: "currency",
    modal: "",
    error: {},
    toast: false,
    toasttext: "",
  };

  componentDidMount() {
    const { limit, offset, currencycount, content } = this.state;
    let searchParams = window.location.search;
    loadFromParams({ limit, self: this, content, searchParams });

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(currencycount / limit),
      startLoad: true,
    });
    this.props.getContent(content, paginate);
    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(this.state.content);
    this.props.clearSearchActions(this.state.content);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.errors) {
      update.error = nextProps.errors;
    }
    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.admin.addcurrency !== this.props.admin.addcurrency &&
      this.props.admin.addcurrency
    ) {
      this.afterUpdate("added");
    } else if (
      prevProps.admin.updatecurrency !== this.props.admin.updatecurrency &&
      this.props.admin.updatecurrency
    ) {
      this.afterUpdate("updated");
    }
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

  afterUpdate = (text) => {
    const { limit, content, signalcount } = this.state;
    if (text === "added") {
      this.setState({
        numOfPages: Math.ceil((signalcount + 1) / limit),
      });
      this.props.clearAdminAction("add-currency");
    } else {
      this.props.clearAdminAction("delete-currency");
    }
    this.setState({
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Currency ${text} successfully`,
    });
    const paginate = {
      limit,
      offset: 0,
    };
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    this.props.getContent(content, paginate);

    this.setState((prevState) => ({
      offset: prevState.offset + limit,
    }));
    window.addEventListener("scroll", this.loadMore, { passive: true });
    setTimeout(() => {
      this.setState({
        toast: false,
        newsignal: {},
      });
    }, 3000);
  };

  /*  loadMore = () => {
    const { limit, numOfPages, iScrollPos, currentPage, content } = this.state;
    let searchParams = window.location.search;

    let winScroll = window.scrollY;

    if (winScroll > iScrollPos) {
      if (currentPage <= numOfPages) {
        this.setState((prevState) => ({
          offset: prevState.offset + limit,
          getLoad: (prevState.getLoad = false),
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
  };*/

  changeHandler = (e) => {
    const { url, content, limit, offset } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
    });
    setSearchParams({
      selected: e.target.name,
      valueOfSelected: e.target.value,
      url,
      content,
      limit,
      offset,
      doneTypingInterval: this.state.doneTypingInterval,
      self: this,
    });

    //  this.setSearchParams(e.target.name, e.target.value);
  };

  /*
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
    if (selected !== "search") {
      if (searchParams !== "") {
        let queryTerms = searchParams.split("?")[1];
        queryTerms = queryTerms.split("&");
        let terms = queryTerms.map((term) => term.split("="));
        let params = Object.fromEntries(terms);
        params.offset = 0;
        params.limit = this.state.limit;
        //this.props.clearSearchActions(content);

        this.setState({
          isLoading: true,
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        this.props.searchContent(content, params);
      } else {
        const paginate = {
          offset: 0,
          limit: this.state.limit,
        };
        this.props.clearActions(content);
        this.setState((prevState) => ({
          getLoad: (prevState.getLoad = false),
        }));
        this.props.getContent(content, paginate);
      }
    } else {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        this.setState({
          isLoading: true,
        });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        console.log(searchParams);
        if (searchParams !== "") {
          let queryTerms = searchParams.split("?")[1];
          queryTerms = queryTerms.split("&");
          let terms = queryTerms.map((term) => term.split("="));
          let params = Object.fromEntries(terms);
          params.offset = 0;
          params.limit = this.state.limit;
        } else {
          /*  const paginate = {
            offset: 0,
            limit: this.state.limit,
          };
          this.props.clearActions(content);
          this.setState((prevState) => ({
            getLoad: (prevState.getLoad = false),
          }));
          this.props.getContent(content, paginate);
        }
      }, this.state.doneTypingInterval);
    }
      console.log(searchParams);
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
          if (valueOfSelected !== "") {
            //this.props.searchContent(content, params);
            console.log(valueOfSelected);
          } else {
            console.log(valueOfSelected);
          }
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
        getLoad: (prevState.getLoad = false),
      }));
      this.props.getContent(content, paginate);
    }
  };*/

  clickHandler = (value) => {
    let action = value[0],
      cur = value[1];

    let check = window.confirm(
      `Are you sure you want to ${action} ${
        JSON.parse(cur.firstcurrency.split(", "))[1].toUpperCase() +
        "/" +
        JSON.parse(cur.secondcurrency.split(", "))[1].toUpperCase()
      } pair?`
    );
    if (check) {
      this.props.updateCurrency(action, cur["id"]);
    } else {
      return false;
    }
  };

  openModal = () => {
    this.setState({
      modal: true,
    });
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
  };

  submitHandler = (value) => {
    if (value[0] === "add") {
      this.props.addCurrency(value[1]);
    }
  };

  render() {
    const {
      sender,
      status,
      statusOpt,
      startLoad,
      getLoad,
      search,
      currencycount,
      modal,
      error,
      toast,
      toasttext,
    } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading, fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.curCount,
      list = admin.currency,
      searchcount = searchTerms.curCount,
      searchlist = searchTerms.currency,
      searchloading = searchTerms.loading;

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
      currencycount,
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
              <h1>Currencies</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Name, Email, Username"
                    onChange={this.changeHandler}
                    onKeyUp={this.keyHandler}
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
                  <button
                    type="button"
                    className="btn add-btn btn-sm"
                    onClick={this.openModal}
                  >
                    Add New <i className="fas fa-folder-plus" />
                  </button>
                </div>

                <div className="col-md-2 mb-3">
                  <button type="button" className="btn download-btn btn-sm">
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
            {(noRecord || emptyRecord) && (
              <p className="no-records">No Record(s) found</p>
            )}
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
                tablebody={!showSearch ? main : searchMain}
                onClick={this.clickHandler}
              />
            </TableHead>
          </div>
        )}
        {modal ? (
          <AddModal
            {...{ modal, sender, error }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Currency.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  updateCurrency: PropTypes.func.isRequired,
  addCurrency: PropTypes.func.isRequired,
  renderArrange: PropTypes.func,
  loadFromParams: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  searchTerms: state.searchTerms,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
  updateCurrency,
  clearAdminAction,
  addCurrency,
})(Currency);
