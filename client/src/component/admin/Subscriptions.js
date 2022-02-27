import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getSub, clearActions } from "../../action/adminAction";
import { searchSub, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

let typingTimer;
export class Subscriptions extends Component {
  state = {
    sender: "admin-subscriptions",
    search: "",
    typeOptions: [
      { value: "", option: "Filter by Type" },
      { value: "b", option: "Bonus" },
      { value: "p", option: "Pay" },
    ],
    packageOptions: [
      { value: "", option: "Filter by Package" },
      { value: "m", option: "Monthly" },
      { value: "y", option: "Yearly" },
    ],
    type: "",
    subPackage: "",
    limit: 4,
    offset: 0,
    sub: "",
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    isLoading: false,
    doneTypingInterval: 5000,
    subcount: JSON.parse(sessionStorage.getItem("tableCounts")).subscriptions,
    upLoad: true,
  };

  componentDidMount() {
    const { limit, offset, subcount } = this.state;

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(subcount / limit),
    });

    this.props.clearActions("sub");

    this.props.getSub(paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
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
          this.props.searchSub(params);
        } else {
          const paginate = {
            offset: this.state.offset,
            limit: this.state.limit,
          };
          this.props.getSub(paginate);
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

    this.props.clearSearchActions("sub");
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
      console.log(params);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      params.offset = 0;
      params.limit = this.state.limit;

      // Search Now
      if (selected === "search") {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          this.setState({
            isLoading: true,
          });
          this.props.searchSub(params);
        }, this.state.doneTypingInterval);
      } else {
        this.setState({
          isLoading: true,
        });
        this.props.searchSub(params);
      }
    } else {
      const paginate = {
        offset: 0,
        limit: this.state.limit,
      };
      this.props.clearActions("sub");
      this.setState((prevState) => ({
        upLoad: (prevState.upLoad = false),
      }));
      this.props.getSub(paginate);
    }
  };

  render() {
    const {
      sender,
      typeOptions,
      packageOptions,
      type,
      subPackage,
      search,
      subcount,
      isLoading,
      upLoad,
    } = this.state;
    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    let load = upLoad,
      loader = isLoading,
      sub,
      searchSub,
      showSearch,
      emptyRecord = false,
      noRecord = false;

    if (fetching) {
      showSearch = false;
      loader = true;

      if (admin.sub === [] && loading) {
        load = true;
      } else if (admin.sub.length > 0 && !loading) {
        sub = admin.sub;
        load = upLoad;
        loader = false;
      } else if (admin.sub.length > 0 && loading) {
        sub = admin.sub;
        load = false;
        loader = true;
      } else {
        load = false;
        emptyRecord = true;
        sub = [];
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      loader = true;
      if (searchTerms.sub === [] || searchTerms.sub.length <= 0) {
        noRecord = true;
        searchSub = [];
        loader = false;
      } else if (searchTerms.sub.length > 0 && !searchTerms.loading) {
        searchSub = searchTerms.sub;
        loader = false;
      } else if (searchTerms.sub.length > 0 && searchTerms.loading) {
        searchSub = searchTerms.sub;
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
              <h1>Subscriptions</h1>
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
                    options={typeOptions}
                    onChange={this.changeHandler}
                    name="type"
                    value={type}
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <Select
                    sender={sender}
                    options={packageOptions}
                    onChange={this.changeHandler}
                    name="subPackage"
                    value={subPackage}
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
                      Total
                      <span className="badge rounded-pill bg-success">
                        {subcount}
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
                "User Fullname",
                "type",
                "package",
                "plan",
                "date",
              ]}
            >
              {!showSearch && (
                <TableBody
                  sender={sender}
                  tablebody={sub !== undefined ? sub : null}
                />
              )}

              {showSearch && (
                <TableBody sender={sender} tablebody={searchSub} />
              )}
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Subscriptions.propTypes = {
  getSub: PropTypes.func,
  getTableCount: PropTypes.func,
  searchSub: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  searchTerms: state.searchTerms,
});
export default connect(mapStateToProps, {
  getSub,
  searchSub,
  clearSearchActions,
  clearActions,
})(Subscriptions);
