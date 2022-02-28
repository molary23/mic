import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function SideNav(props) {
  let navigate = useNavigate();
  let location = useLocation();
  // check user logged in
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      navigate(`/?next=${location.pathname}`, { replace: true });
    }
  });

  let display = props.act;

  let viewer = "admin";
  if (props.auth.user.level === 3) {
    viewer = "admin";
  } else if (props.auth.user.level === 2) {
    viewer = "provider";
  } else if (props.auth.user.level === 1) {
    viewer = "user";
  }

  return (
    <div>
      <div id="mySidebar" className={`sidebar ${!display && "hide-side"}`}>
        {display && (
          <div className="side-nav-list">
            <Link to={`/${viewer}/`}>
              <span className="sidebar-icon">
                <i className="fas fa-home" />
              </span>
              Dashboard
            </Link>

            {(props.auth.user.level === 1 || props.auth.user.level === 3) && (
              <Link to={`/${viewer}/signals`}>
                <span className="sidebar-icon">
                  <i className="fas fa-signal" />
                </span>
                Signals
              </Link>
            )}

            {
              //props.auth.user.level > 2 && (
              <Link to={`/${viewer}/currencies`}>
                <span className="sidebar-icon">
                  <i className="fas fa-money-bill-wave-alt" />
                </span>
                Currencies
              </Link>
              //)
            }

            {
              //props.auth.user.level > 2 && (
              <Link to={`/${viewer}/users`}>
                <span className="sidebar-icon">
                  <i className="fas fa-user-friends" />
                </span>
                Users
              </Link>
              //)
            }

            {
              //props.auth.user.level > 2 && (
              <Link to={`/${viewer}/viewadmins`}>
                <span className="sidebar-icon">
                  <i className="fas fa-user-tie" />
                </span>
                Admins
              </Link>
              //)
            }

            {
              //props.auth.user.level > 2 && (
              <Link to={`/${viewer}/signal-providers`}>
                <span className="sidebar-icon">
                  <i className="fas fa-user-tag" />
                </span>
                Signal Providers
              </Link>
              //)
            }

            <Link to={`/${viewer}/subscriptions`}>
              <span className="sidebar-icon">
                <i className="fas fa-id-card-alt" />
              </span>
              Subscriptions
            </Link>

            <Link to={`/${viewer}/transactions`}>
              <span className="sidebar-icon">
                <i className="fas fa-exchange-alt" />
              </span>
              Transactions
            </Link>

            <Link to={`/${viewer}/referrals`}>
              <span className="sidebar-icon">
                <i className="fas fa-users" />
              </span>
              Referrals
            </Link>

            <Link to={`/${viewer}/bonuses`}>
              <span className="sidebar-icon">
                <i className="fas fa-wallet" />
              </span>
              Bonus
            </Link>

            <Link to={`/${viewer}/accounts`}>
              <span className="sidebar-icon">
                <i className="fas fa-file-invoice-dollar" />
              </span>
              Accounts
            </Link>

            <Link to={`/${viewer}/payments`}>
              <span className="sidebar-icon">
                <i className="fas fa-dollar-sign" />
              </span>
              Payments
            </Link>

            <Link to={`/${viewer}/withdrawals`}>
              <span className="sidebar-icon">
                <i className="fas fa-hand-holding-usd" />
              </span>
              Withdrawals
            </Link>

            <Link to={`/${viewer}/announcements`}>
              <span className="sidebar-icon">
                <i className="fas fa-bullhorn" />
              </span>
              Announcements
            </Link>
          </div>
        )}
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
