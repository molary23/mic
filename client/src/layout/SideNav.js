import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { GiWallet, GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import { RiExchangeBoxLine, RiShieldUserLine } from "react-icons/ri";
import { HiOutlineUsers, HiOutlineSpeakerphone } from "react-icons/hi";
import {
  MdOutlinePayments,
  MdOutlineSupervisedUserCircle,
} from "react-icons/md";
import { BsCurrencyExchange, BsCreditCard } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { CgSignal } from "react-icons/cg";

import {
  AiOutlineUsergroupAdd,
  AiOutlineMoneyCollect,
  AiOutlineBank,
} from "react-icons/ai";

function SideNav(props) {
  const { act, onClick } = props;
  let navigate = useNavigate();
  let location = useLocation();
  const [show, setShow] = useState(false);
  // check user logged in
  /* useEffect(() => {
    if (!props.auth.isAuthenticated) {
      navigate(`/?next=${location.pathname}`, { replace: true });
    }
  });*/
  let display;

  const closeSide = () => {
    setShow(true);
    onClick(true);
  };

  if (show) {
    display = true;
    if (act) {
      setShow(false);
    }
  } else {
    display = act;
  }

  let viewer,
    level = props.auth.user.level;
  if (props.auth.user.level === 3) {
    viewer = "admin";
  } else if (props.auth.user.level === 2) {
    viewer = "sp";
  } else if (props.auth.user.level === 1) {
    viewer = "user";
  }

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${!display ? "hide-side" : ""}`}>
        <div className={`side-nav-list ${!display ? "show-nav" : "hide-nav"}`}>
          <Link to={`/${viewer}/`} onClick={closeSide}>
            <span className="sidebar-icon">
              <FiHome />
            </span>
            Dashboard
          </Link>

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/signals`} onClick={closeSide}>
              <span className="sidebar-icon">
                <CgSignal />
              </span>
              Signals
            </Link>
          )}

          {level > 2 && (
            <Link to={`/${viewer}/currencies`} onClick={closeSide}>
              <span className="sidebar-icon">
                <BsCurrencyExchange />
              </span>
              Currencies
            </Link>
          )}

          {level > 2 && (
            <Link to={`/${viewer}/users`} onClick={closeSide}>
              <span className="sidebar-icon">
                <HiOutlineUsers />
              </span>
              Users
            </Link>
          )}

          {level > 2 && (
            <Link to={`/${viewer}/admins`} onClick={closeSide}>
              <span className="sidebar-icon">
                <MdOutlineSupervisedUserCircle />
              </span>
              Admins
            </Link>
          )}

          {level > 2 && (
            <Link to={`/${viewer}/signal-providers`} onClick={closeSide}>
              <span className="sidebar-icon">
                <RiShieldUserLine />
              </span>
              Signal Providers
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/subscriptions`} onClick={closeSide}>
              <span className="sidebar-icon">
                <MdOutlinePayments />
              </span>
              Subscriptions
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/transactions`} onClick={closeSide}>
              <span className="sidebar-icon">
                <RiExchangeBoxLine />
              </span>
              Transactions
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/referrals`} onClick={closeSide}>
              <span className="sidebar-icon">
                <AiOutlineUsergroupAdd />
              </span>
              Referrals
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/earnings`} onClick={closeSide}>
              <span className="sidebar-icon">
                <GiWallet />
              </span>
              Earnings
            </Link>
          )}

          {level === 3 && (
            <Link to={`/${viewer}/accounts`} onClick={closeSide}>
              <span className="sidebar-icon">
                <AiOutlineMoneyCollect />
              </span>
              Accounts
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/payments`} onClick={closeSide}>
              <span className="sidebar-icon">
                <GiMoneyStack />
              </span>
              Payments
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/withdrawals`} onClick={closeSide}>
              <span className="sidebar-icon">
                <GiReceiveMoney />
              </span>
              Withdrawals
            </Link>
          )}

          {level === 3 && (
            <Link to={`/${viewer}/announcements`} onClick={closeSide}>
              <span className="sidebar-icon">
                <HiOutlineSpeakerphone />
              </span>
              Announcements
            </Link>
          )}
          {level === 3 && (
            <Link to={`/${viewer}/wallets`} onClick={closeSide}>
              <span className="sidebar-icon">
                <AiOutlineBank />
              </span>
              Wallets
            </Link>
          )}
          {level === 1 && (
            <Link to={`/${viewer}/pay`} onClick={closeSide}>
              <span className="sidebar-icon">
                <BsCreditCard />
              </span>
              Pay Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

SideNav.propTypes = {
  getUserProfile: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, null)(SideNav);
