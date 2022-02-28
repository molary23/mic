import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Flag from "react-flagpack";

import DateFormat from "./DateFormat";

function TableBody(props) {
  const { sender, tablebody, onClick } = props;

  let tabeldata;
  if (sender === "transactions") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>{item.method}</td>
          <td>{item.type}</td>
          <td>{item.date.toISOString()}</td>
        </tr>
      );
    });
  }

  if (sender === "subscriptions") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>{item.method}</td>
          <td>{item.type}</td>
          <td>{item.date.toISOString()}</td>
        </tr>
      );
    });
  }

  if (sender === "bonus") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>{item.createdAt.toISOString()}</td>
          <td>{item.updatedAt.toISOString()}</td>
        </tr>
      );
    });
  }

  if (sender === "referrals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.referred}</td>
          <td>{item.status}</td>
          <td>{item.createdAt.toISOString()}</td>
        </tr>
      );
    });
  }
  if (sender === "payments") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>{item.reference}</td>
          <td>{item.status}</td>
          <td>{item.date.toISOString()}</td>
        </tr>
      );
    });
  }
  if (sender === "withdrawals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>{item.reference}</td>
          <td>{item.status}</td>
          <td>{item.date.toISOString()}</td>
          <td>{item.update.toISOString()}</td>
        </tr>
      );
    });
  }

  if (sender === "admin-bonus") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>{item.status}</td>
          <td>{item.username}</td>
          <td>
            <DateFormat date={item.createdAt} />
          </td>
          <td>
            <DateFormat date={item.updatedAt} />
          </td>
          <td>
            <div className="action-buttons">
              <Link
                type="button"
                className="btn btn-info btn-sm"
                title="View Bonus"
                to={`/admin/bonus/:${item.bonusid}`}
              >
                <i className="far fa-eye" />
              </Link>
              <button
                type="button"
                className="btn btn-success btn-sm"
                data-id={item.bonusid}
                title="Approve Bonus"
                onClick={() => onClick()}
              >
                <i className="fas fa-check" />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                data-id={item.bonusid}
                title="Disapprove Bonus"
                onClick={() => onClick()}
              >
                <i className="fas fa-ban" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-transactions") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${item.userId}`} // change to user ID later
            >
              {item.user}
            </Link>
          </td>
          <td>{item.method}</td>
          <td>{item.type}</td>
          <td>
            <DateFormat date={item.transactiondate}></DateFormat>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-referrals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td className="td-lower">
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${item.referredId}`}
            >
              {item.referred}
            </Link>
          </td>
          <td className="td-lower">
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${item.referral}`}
            >
              {item.referral}
            </Link>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-withdrawals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${i}`}
            >
              {item.reference}
            </Link>
          </td>
          <td>{item.status}</td>
          <td>{item.date.toISOString()}</td>
          <td>{item.update.toISOString()}</td>
        </tr>
      );
    });
  }

  if (sender === "admin-payments") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td className="td-lower">
            <Link
              type=""
              className=""
              title="View Payment"
              to={`/admin/user/:${item.UserId}`}
            >
              {item.username}
            </Link>
          </td>

          <td>{item.status}</td>
          <td>{item.gateway}</td>
          <td className="td-shorter">{item.reference}</td>
          <td>
            <DateFormat date={item.createdAt} />
          </td>
          <td>
            <DateFormat date={item.updatedAt} />
          </td>
          <td className="td-lower">
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-success btn-sm mb-1"
                data-id={item.payid}
                title="Update Payment"
                onClick={() => onClick(i)}
              >
                <i className="fas fa-sync" />
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm mt-1"
                data-id={item.payid}
                title="Cancel Payment"
                onClick={() => onClick(i)}
              >
                <i className="fas fa-ban" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-subscriptions") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>

          <td>
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${item.userId}`}
            >
              {item.user}
            </Link>
          </td>
          <td>{item["Payment Type"]}</td>

          <td>{item.Package}</td>
          <td>{item.plan}</td>
          <td>
            <DateFormat date={item.subscriptiondate} />
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-users") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.fullname}</td>
          <td className="td-lower">{item.email}</td>
          <td className="td-lower">{item.username}</td>
          <td>{item.phone}</td>
          <td>{item.userstatus}</td>
          <td>{item.premiumstatus}</td>
          <td>
            <div className="action-buttons">
              <Link
                type="button"
                className="btn btn-info btn-sm"
                data-id={i}
                title="View User"
                to={`/admin/user/:${item.userid}`}
              >
                <i className="far fa-eye" />
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-accounts") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.fullname}</td>
          <td className="td-lower">{item.username}</td>
          <td>{item.type}</td>
          <td>
            {item.type === "bank" ? item.account.bank : item.account.wallet}
          </td>
          <td>{item.account.account}</td>
          <td>{item.type === "bank" ? item.account.type : null}</td>
          <td>
            <DateFormat date={item.createdAt} />
          </td>
          <td>
            <DateFormat date={item.updatedAt} />
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-admins") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.fullname}</td>
          <td className="td-lower">{item.email}</td>
          <td className="td-lower">{item.username}</td>
          <td>{item.phone}</td>
          <td>{item.userstatus}</td>
          <td>
            <div className="action-buttons">
              <Link
                type="button"
                className="btn btn-info btn-sm"
                data-id={i}
                title="View User"
                to={`/admin/user/:${item.userid}`}
              >
                <i className="far fa-eye" />
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-announcements") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.title}</td>
          <td className="td-lower">{item.link}</td>
          <td>{item.summary.substring(0, 200)}...</td>
          <td>{item.startdate}</td>
          <td>{item.enddate}</td>
          <td className="td-lower">
            <div className="action-buttons">
              <Link
                type=""
                className=""
                title="View Addmin"
                to={`/admin/user/:${item.UserId}`}
              >
                {item.User.username}
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-currencies") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>
            {JSON.parse(item.firstcurrency.split(", "))[1] +
              "/" +
              JSON.parse(item.secondcurrency.split(", "))[1]}
          </td>
          <td>
            {
              <>
                <Flag
                  code={JSON.parse(
                    item.firstcurrency.split(", ")
                  )[0].toUpperCase()}
                  size="M"
                />
                <Flag
                  code={JSON.parse(
                    item.secondcurrency.split(", ")
                  )[0].toUpperCase()}
                  size="M"
                />
              </>
            }
          </td>
          <td>{item.status === 1 ? "active" : "inactive"}</td>

          <td>
            <DateFormat date={item.createdAt} />
          </td>

          <td>
            <DateFormat date={item.updatedAt} />
          </td>
          <td className="td-lower">
            <Link
              type=""
              className=""
              title="View Admin"
              to={`/admin/user/:${item.UserId}`}
            >
              {item.User.username}
            </Link>
          </td>
          <td>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                data-id={item.id}
                title="Delete Currency "
                onClick={() => onClick(i)}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-signals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>
            {JSON.parse(item.firstcurrency.split(", "))[1] +
              "/" +
              JSON.parse(item.secondcurrency.split(", "))[1]}
          </td>
          <td>
            {
              <>
                <Flag
                  code={JSON.parse(
                    item.firstcurrency.split(", ")
                  )[0].toUpperCase()}
                  size="M"
                />
                <Flag
                  code={JSON.parse(
                    item.secondcurrency.split(", ")
                  )[0].toUpperCase()}
                  size="M"
                />
              </>
            }
          </td>
          <td>{item.signaloption}</td>
          <td>{item.status}</td>
          <td>
            {item.takeprofit.map((tp, i) => {
              let profit;
              if (i === item.takeprofit.length - 1) {
                profit = <span key={i}>{tp}</span>;
              } else {
                profit = <span key={i}>{tp}, </span>;
              }
              return profit;
            })}
          </td>
          <td>
            {item.stoploss.map((sl, i) => {
              let loss;
              if (i === item.stoploss.length - 1) {
                loss = <span key={i}>{sl}</span>;
              } else {
                loss = <span key={i}>{sl}, </span>;
              }
              return loss;
            })}
          </td>
          <td>{item.range}</td>
          <td>{item.pip}</td>
          <td>
            <DateFormat date={item.createdAt} />
          </td>

          <td>
            <DateFormat date={item.updatedAt} />
          </td>
          <td className="td-lower">
            <Link
              type=""
              className=""
              title="View Admin"
              to={`/admin/signal-provider/:${item.userid}`}
            >
              {item.provider}
            </Link>
          </td>
          <td>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-info btn-sm"
                data-id={item.signalid}
                title="View Signal"
                onClick={() => onClick(i)}
              >
                <i className="far fa-eye" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  return <tbody>{tabeldata}</tbody>;
}

TableBody.propTypes = {
  sender: PropTypes.string.isRequired,
  tablebody: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default TableBody;
