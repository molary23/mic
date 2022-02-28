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
    subcount: JSON.parse(localStorage.getItem("counts")).subscriptions,
    startLoad: false,
    getLoad: true,
    content: "subscriptions",
  };

  componentDidMount() {
    const { limit, offset, subcount, content } = this.state;

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(subcount / limit),
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
      doneTypingInterval: this.state.doneTypingInterval,
      self: this,
    });
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
      startLoad,
      getLoad,
    } = this.state;
    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    console.log(admin.sub);

    let load = startLoad,
      loader = getLoad,
      sub = [],
      searchsub,
      showSearch,
      emptyRecord = false,
      noRecord = false,
      totalText = "",
      totalCount = subcount;

    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.subCount;
      totalText = "Total sub";
      if (admin.sub === [] && loading) {
        loader = true;
        load = false;
      } else if (admin.sub.length > 0 && !loading) {
        sub = admin.sub;
        load = false;
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
      totalCount = searchTerms.subCount;
      totalText = "Selected/Searched sub";
      if (searchTerms.sub === [] || searchTerms.sub.length <= 0) {
        noRecord = true;
        searchsub = [];
        loader = false;
      } else if (searchTerms.sub.length > 0 && !searchTerms.loading) {
        searchsub = searchTerms.sub;
        loader = false;
      } else if (searchTerms.sub.length > 0 && searchTerms.loading) {
        searchsub = searchTerms.sub;
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
                "amount",
                "User Fullname",
                "type",
                "package",
                "plan",
                "date",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? sub : searchsub}
              />
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
  getContent,
  searchContent,
  clearSearchActions,
  clearActions,
})(Subscriptions);
