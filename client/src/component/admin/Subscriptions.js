import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getSub } from "../../action/adminAction";
import { getTableCount } from "../../action/adminAction";
import { searchSub } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import { url } from "gravatar";

export class Subscriptions extends Component {
  state = {
    sender: "admin-subscriptions",
    searchname: "",
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
    subcount: JSON.parse(sessionStorage.getItem("subcount")),
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
  };

  componentDidMount() {
    const { limit, offset, subcount } = this.state;

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(subcount.all / limit),
    });
    this.props.getTableCount("subscriptions");
    this.props.getSub(paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    // window.removeEventListener("scroll", this.loadMore);
    // sessionStorage.removeItem("subcount");
  }

  loadMore = () => {
    const { limit, numOfPages, iScrollPos, currentPage } = this.state;
    let winScroll = window.scrollY;
    if (winScroll > iScrollPos) {
      if (currentPage <= numOfPages) {
        this.setState((prevState) => ({
          offset: prevState.offset + limit,
        }));
        const paginate = {
          offset: this.state.offset,
          limit: this.state.limit,
        };
        this.props.getSub(paginate);
        this.setState((prevState) => ({
          currentPage: prevState.currentPage + 1,
        }));
      }
    }
  };

  keyHandler = (searchText) => {
    const { url } = this.state;
    this.setSearchParams("search", searchText);
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    this.setSearchParams(e.target.name, e.target.value);
  };

  setSearchParams = (selected, valueOfSelected) => {
    const { url } = this.state;
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
      // Search Now
      this.props.searchSub(params);
    }
  };

  render() {
    const {
      sender,
      typeOptions,
      packageOptions,
      type,
      subPackage,
      searchname,
      subcount,
    } = this.state;
    const { admin, search } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = search;

    let load = true,
      loader = false,
      sub,
      searchSub,
      showSearch,
      noRecord = false;

    if (fetching) {
      showSearch = false;
      if (admin.sub === [] && loading) {
        load = true;
      } else if (admin.sub.length > 0 && !loading) {
        sub = admin.sub;
        load = false;
        loader = false;
      } else if (admin.sub.length > 0 && loading) {
        sub = admin.sub;
        load = false;
        loader = true;
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      if (search.sub === [] || search.sub.length <= 0) {
        noRecord = true;
        searchSub = [];
      } else if (search.sub.length > 0) {
        searchSub = search.sub;
      }
    }
    /* if (search.sub === [] && searching) {
      load = true;
    }else if ( && searching) {
      searchSub = search.sub;
    }*/
    return (
      <div>
        {loader && (
          <div>
            <ProgressBar />
          </div>
        )}
        {load ? (
          <div className="loader">
            <ProgressBar />
            <div>
              <i className="fas fa-circle-notch fa-2x fa-spin" />
            </div>
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
                    placeholder="Search by Name"
                    readOnly
                    name="searchname"
                    value={searchname}
                    onKeyUp={this.keyHandler}
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
                        {subcount.all}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            {noRecord && "No Record(s) found"}
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
              {!showSearch && <TableBody sender={sender} tablebody={sub} />}
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
  search: state.search,
});
export default connect(mapStateToProps, { getSub, getTableCount, searchSub })(
  Subscriptions
);
