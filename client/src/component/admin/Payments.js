import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableBody from "../../layout/TableBody";
import TableHead from "../../layout/TableHead";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import Spinner from "../../layout/Spinner";

import {
  getMore,
  setSearchParams,
  renderArrange,
  loadFromParams,
} from "../../util/LoadFunction";
import Pagination from "../../util/Pagination";

export class Payments extends Component {
  state = {
    sender: "admin-payments",
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "f", option: "Failed" },
      { value: "s", option: "Success" },
    ],
    gatewayOptions: [
      { value: "", option: "Filter by Gateway" },
      { value: "c", option: "BitPay" },
      { value: "b", option: "Stripe" },
    ],
    gateway: "",
    status: "",
    search: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    timer: Pagination.timer,
    url: new URL(window.location),
    startLoad: false,
    getLoad: true,
    isLoading: false,
    paymentcount:
      JSON.parse(localStorage.getItem("counts")).payments ??
      this.props.auth.allCounts.payments,
    content: "payments",
    toast: false,
    toasttext: "",
  };

  componentDidMount() {
    const { limit, offset, paymentcount, content } = this.state;

    let searchParams = window.location.search;

    if (searchParams !== "") {
      loadFromParams({ limit, self: this, content, searchParams });
    } else {
      const paginate = {
        limit,
        offset,
      };
      this.props.getContent(content, paginate);
    }
    this.setState({
      numOfPages: Math.ceil(paymentcount / limit),
    });

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
  }

  componentDidUpdate(prevProps) {
    /*   if (
      prevProps.admin.updatepayment !==
        this.props.admin.updatepayment &&
      this.props.admin.updatepayment
    ) {
      this.afterUpdate("updated");
      this.setState({
        currentPage: Pagination.currentpage,
      });
    }*/
  }

  afterUpdate = () => {
    const { limit, content, timer } = this.state;

    this.props.clearAdminAction("update-payments");
    /* window.scrollTo({
      top: 0,
      behavior: "smooth",
    });*/
    this.setState({
      modal: false,
      toast: true,
      toasttext: `Payment updated successfully`,
    });
    const paginate = {
      limit,
      offset: 0,
    };
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    this.props.getContent(content, paginate);

    this.setState({
      offset: this.state.offset - Pagination.limit,
    });
    window.addEventListener("scroll", this.loadMore, { passive: true });
    setTimeout(() => {
      this.setState({
        toast: false,
        newsignal: {},
      });
    }, timer);
  };

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
    const { url, content, limit, offset, timer } = this.state;
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
      timer,
      self: this,
    });
  };

  render() {
    const {
      sender,
      statusOptions,
      status,
      startLoad,
      getLoad,
      search,
      paymentcount,
      gatewayOptions,
      gateway,
    } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.payCount,
      list = admin.pay,
      searchcount = searchTerms.payCount,
      searchlist = searchTerms.pay,
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
      paymentcount,
    });

    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div className="payments card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Payments</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Username or Reference"
                    onChange={this.changeHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-2 mb-3">
                  <Select
                    sender={sender}
                    options={statusOptions}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-2 mb-3">
                  <Select
                    sender={sender}
                    options={gatewayOptions}
                    onChange={this.changeHandler}
                    name="gateway"
                    value={gateway}
                  />
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
            {(noRecord || emptyRecord) && (
              <p className="no-records">No Record(s) found</p>
            )}
            <TableHead
              sender={sender}
              head={[
                "S/N",
                "amount",
                "Payer",
                "status",
                "gateway",
                "reference",
                "paid on",
                "updated on",
                "action",
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

Payments.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  admin: PropTypes.object.isRequired,
  searchTerms: PropTypes.object,
  getContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func,
  searchContent: PropTypes.func,
  clearSearchActions: PropTypes.func,
  renderArrange: PropTypes.func,
  setSearchParams: PropTypes.func,
  loadFromParams: PropTypes.func,
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
})(Payments);
