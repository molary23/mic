import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import {
  getMore,
  setSearchParams,
  renderArrange,
} from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";

class Announcements extends Component {
  state = {
    sender: "admin-announcements",
    search: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    announcementcount: JSON.parse(localStorage.getItem("counts")).announcements,
    startLoad: false,
    getLoad: true,
    content: "announcements",
  };

  componentDidMount() {
    const { limit, offset, announcementcount, content } = this.state;

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(announcementcount / limit),
      startLoad: true,
    });

    this.props.getContent(content, paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    this.props.clearActions(this.state.content);
    this.props.clearSearchActions(this.state.content);
    window.removeEventListener("scroll", this.loadMore);
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
    const { sender, announcementcount, startLoad, getLoad, search } =
      this.state;

    const { admin, searchTerms } = this.props;
    const { loading, fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.annCount,
      list = admin.ann,
      searchcount = searchTerms.annCount,
      searchlist = searchTerms.ann,
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
      announcementcount,
    });

    /*  if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.annCount;
      totalText = "";
      if (admin.ann === [] && loading) {
        loader = true;
        load = false;
      } else if (admin.ann.length > 0 && !loading) {
        ann = admin.ann;
        load = false;

        loader = false;
      } else if (admin.ann.length > 0 && loading) {
        ann = admin.ann;
        load = false;
        loader = true;
      } else {
        load = false;
        emptyRecord = true;
        ann = [];
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      loader = true;
      totalCount = searchTerms.annCount;
      totalText = "Selected/Searched";
      if (searchTerms.ann === [] || searchTerms.ann.length <= 0) {
        noRecord = true;
        searchann = [];
        loader = false;
      } else if (searchTerms.ann.length > 0 && !searchTerms.loading) {
        searchann = searchTerms.ann;
        loader = false;
      } else if (searchTerms.ann.length > 0 && searchTerms.loading) {
        searchann = searchTerms.ann;
        loader = true;
      }
    }*/
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
              <h1>Accounts</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-4 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Title, Summary, Link"
                    onChange={this.changeHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <button type="button" className="btn btn-outline-primary">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="transactions-total table-figure">
                    <h6>
                      {totalText} Announcements
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
                "title",
                "link",
                "summary",
                "start date",
                "end date",
                "created by",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
              />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Announcements.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func.isRequired,
  clearSearchActions: PropTypes.func.isRequired,
  renderArrange: PropTypes.func.isRequired,
  getMore: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired,
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
})(Announcements);
