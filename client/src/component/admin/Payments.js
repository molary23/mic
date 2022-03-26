import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getContent,
  clearActions,
  updatePayment,
} from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableBody from "../../layout/TableBody";
import TableHead from "../../layout/TableHead";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
import Spinner from "../../layout/Spinner";
import Toast from "../../layout/Toast";
import ConfirmModal from "../../layout/ConfirmModal";

import { RiFileExcel2Line } from "react-icons/ri";

import {
  getMore,
  setSearchParams,
  landingLoad,
  renderArrange,
  downloadFile,
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
    lastScrollTop: 0,
    url: new URL(window.location),
    isLoading: false,
    paymentcount:
      JSON.parse(localStorage.getItem("counts")).payments ??
      this.props.auth.allCounts.payments,
    content: "payments",
    toast: false,
    toasttext: null,
    toastcategory: null,
    check: false,
  };

  componentDidMount() {
    const { limit, offset, paymentcount, content } = this.state;

    let searchParams = window.location.search;

    landingLoad({ limit, offset, self: this, content, searchParams });
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
    if (
      prevProps.admin.updatepayment !== this.props.admin.updatepayment &&
      this.props.admin.updatepayment
    ) {
      this.afterUpdate();
    }
  }

  afterUpdate = () => {
    const { limit, content, timer } = this.state;

    this.props.clearActions("update-payment");
    this.setState({
      modal: false,
      toast: true,
      isLoading: false,
      toasttext: `Payment updated successfully`,
      currentPage: Pagination.currentpage,
      offset: 0,
    });

    this.props.clearActions(content);
    this.props.clearSearchActions(content);

    let searchParams = window.location.search;
    landingLoad({ limit, offset: 0, self: this, content, searchParams });
    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, timer);
  };

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
      lastScrollTop: toTop <= 0 ? 0 : toTop,
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

  downloadHandler = () => {
    const { sender } = this.state;
    downloadFile({ sender, self: this });
  };

  clickHandler = (value) => {
    let action = value[0],
      id = value[1];

    console.log(action, id);

    this.setState({
      check: true,
      checktext: `Are you sure you want to ${action} this Payment?`,
      checktitle: `Confirm ${action}`,
      update: action,
    });

    this.confirmHandler = (option) => {
      if (option) {
        this.props.updatePayment(action, id);
      }
      this.setState({
        check: false,
      });
    };
  };

  render() {
    const {
      sender,
      statusOptions,
      status,
      search,
      toast,
      toasttext,
      toastcategory,
      paymentcount,
      gatewayOptions,
      gateway,
      isLoading,
      check,
      checktext,
      checktitle,
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
      paymentcount,
    });

    return (
      <div>
        {(loader || isLoading) && <ProgressBar />}

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
                <button
                  type="button"
                  className="btn download-btn"
                  onClick={this.downloadHandler}
                >
                  Download <RiFileExcel2Line />
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
          {load ? (
            <Spinner />
          ) : (
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
                onClick={this.clickHandler}
              />
            </TableHead>
          )}
        </div>

        {check && (
          <ConfirmModal
            {...{ check, sender, checktext, checktitle }}
            onClick={this.confirmHandler}
          />
        )}
        {toast && <Toast text={toasttext} category={toastcategory} />}
      </div>
    );
  }
}

Payments.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  admin: PropTypes.object.isRequired,
  searchTerms: PropTypes.object,
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  landingLoad: PropTypes.func,
  renderArrange: PropTypes.func,
  updateBonus: PropTypes.func,
  clearActions: PropTypes.func,
  setSearchParams: PropTypes.func,
  clearSearchActions: PropTypes.func,
  updatePayment: PropTypes.func,
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
  updatePayment,
})(Payments);
