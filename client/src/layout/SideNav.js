import React from "react";
import { Link } from "react-router-dom";

function SideNav(props) {
  let display = props.act;

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${display ? "" : "hide-side"}`}>
        <div className="side-nav-list">
          <Link to="/">
            <span className="sidebar-icon">
              <i className="fas fa-home" />
            </span>
            Dashboard
          </Link>

          <Link to="/signal">
            <span className="sidebar-icon">
              <i className="fas fa-signal" />
            </span>
            Signals
          </Link>

          <Link to="/">
            <span className="sidebar-icon">
              <i className="fas fa-money-bill-wave-alt" />
            </span>
            Currencies
          </Link>

          <Link to="/">
            <span className="sidebar-icon">
              <i className="fas fa-user-friends" />
            </span>
            Users
          </Link>

          <Link to="/signal">
            <span className="sidebar-icon">
              <i className="fas fa-user-plus" />
            </span>
            Subscriptions
          </Link>

          <Link to="/">
            <span className="sidebar-icon">
              <i className="fas fa-exchange-alt" />
            </span>
            Transactions
          </Link>

          <Link to="/">
            <span className="sidebar-icon">
              <i className="fas fa-users" />
            </span>
            Referrals
          </Link>

          <Link to="/">
            <span className="sidebar-icon">
              <i class="fas fa-donate" />
            </span>
            Bonus
          </Link>

          <Link to="/signal">
            <span className="sidebar-icon">
              <i className="fas fa-dollar-sign" />
            </span>
            Payments
          </Link>

          <Link to="/">
            <span className="sidebar-icon">
              <i className="fas fa-hand-holding-usd" />
            </span>
            Withdrawals
          </Link>

          <Link to="/">
            <span className="sidebar-icon">
              <i className="fas fa-bullhorn" />
            </span>
            Announcements
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
