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
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      navigate(`/?next=${location.pathname}`, { replace: true });
    }
  });

  useEffect(() => {
    //setShow(false);
    //document.getElementById("mySidebar").classList.remove("hide-side");
  }, [location]);

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

  console.log(display, show);

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
            <Link to={`/${viewer}/signals`}>
              <span className="sidebar-icon">
                <CgSignal />
              </span>
              Signals
            </Link>
          )}

          {level > 2 && (
            <Link to={`/${viewer}/currencies`}>
              <span className="sidebar-icon">
                <BsCurrencyExchange />
              </span>
              Currencies
            </Link>
          )}

          {level > 2 && (
            <Link to={`/${viewer}/users`}>
              <span className="sidebar-icon">
                <HiOutlineUsers />
              </span>
              Users
            </Link>
          )}

          {level > 2 && (
            <Link to={`/${viewer}/admins`}>
              <span className="sidebar-icon">
                <MdOutlineSupervisedUserCircle />
              </span>
              Admins
            </Link>
          )}

          {level > 2 && (
            <Link to={`/${viewer}/signal-providers`}>
              <span className="sidebar-icon">
                <RiShieldUserLine />
              </span>
              Signal Providers
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/subscriptions`}>
              <span className="sidebar-icon">
                <MdOutlinePayments />
              </span>
              Subscriptions
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/transactions`}>
              <span className="sidebar-icon">
                <RiExchangeBoxLine />
              </span>
              Transactions
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/referrals`}>
              <span className="sidebar-icon">
                <AiOutlineUsergroupAdd />
              </span>
              Referrals
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/earnings`}>
              <span className="sidebar-icon">
                <GiWallet />
              </span>
              Earnings
            </Link>
          )}

          {level === 3 && (
            <Link to={`/${viewer}/accounts`}>
              <span className="sidebar-icon">
                <AiOutlineMoneyCollect />
              </span>
              Accounts
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/payments`}>
              <span className="sidebar-icon">
                <GiMoneyStack />
              </span>
              Payments
            </Link>
          )}

          {(level === 1 || level === 3) && (
            <Link to={`/${viewer}/withdrawals`}>
              <span className="sidebar-icon">
                <GiReceiveMoney />
              </span>
              Withdrawals
            </Link>
          )}

          {level === 3 && (
            <Link to={`/${viewer}/announcements`}>
              <span className="sidebar-icon">
                <HiOutlineSpeakerphone />
              </span>
              Announcements
            </Link>
          )}
          {level === 3 && (
            <Link to={`/${viewer}/wallets`}>
              <span className="sidebar-icon">
                <AiOutlineBank />
              </span>
              Wallets
            </Link>
          )}
          {level === 1 && (
            <Link to={`/${viewer}/pay`}>
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
