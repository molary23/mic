import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Flag from "react-flagpack";

import DateFormat from "./DateFormat";

function TableBody(props) {
  const { sender, tablebody, onClick } = props;

  let tabeldata;
  if (sender === "user-transactions") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>
            {item.method === "b" && "bonus"}
            {item.method === "s" && "subscription"}
            {item.method === "w" && "withdrawal"}
          </td>
          <td>{item.type === "d" ? "debit" : "credit"}</td>
          <td>
            <DateFormat date={item.createdAt} />
          </td>
        </tr>
      );
    });
  }

  if (sender === "user-subscriptions") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>
            {item.status === 1 && "disapproved"}
            {item.status === 2 && "pending"}
            {item.status === 3 && "approved"}
          </td>
          <td>{item.type === "b" ? "bonus" : "pay"}</td>
          <td>
            {item.plan} {item.package === "m" ? "month" : "year"}
            {item.plan > 1 && "s"}
          </td>
          <td>{item.duration} days</td>
          <td>
            <DateFormat date={item.createdAt} />
          </td>
          <td>
            {item.payID && (
              <div className="action-buttons">
                <Link
                  type="button"
                  className="btn btn-info btn-sm"
                  title="View Payment"
                  to={`/user/payment/:${item.payID}`}
                >
                  View Payment
                </Link>
              </div>
            )}
          </td>
          <td>
            <div className="action-buttons">
              <Link
                type="button"
                className="btn btn-primary btn-sm"
                title="View Subscription"
                to={`/admin/subscription/:${item.id}`}
              >
                View
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "user-bonus") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>
            {item.status === "a" && "approved"}
            {item.status === "p" && "pending"}
            {item.status === "r" && "rejected"}
          </td>
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
                className="btn btn-primary btn-sm"
                title="View Subscription"
                to={`/admin/subscription/:${item.subscriptionid}`}
              >
                View
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "user-referrals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td className="td-lower">
            <Link
              type="button"
              className=""
              title="View User"
              to={`/user/user/:${item.referredId}`}
            >
              {item.referred}
            </Link>
          </td>
          <td>{item.phone}</td>
          <td>
            {item.status === 1 ? (
              <span className="active-status status-info">
                <span>&bull;</span> Active
              </span>
            ) : (
              <span className="inactive-status status-info">
                <span>&bull;</span> Inactive
              </span>
            )}
          </td>
          <td>
            <DateFormat date={item.enddate} />
          </td>
        </tr>
      );
    });
  }
  if (sender === "user-payments") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>{item.gateway === "c" ? "crypto" : "bank"}</td>
          <td>{item.reference}</td>
          <td>{item.status === 2 ? "successful" : "failed"}</td>

          <td>
            <DateFormat date={item.createdAt} />
          </td>
        </tr>
      );
    });
  }

  if (sender === "user-withdrawals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount}</td>
          <td>
            {item.status === "p" && "pending"}
            {item.status === "a" && "approved"}
            {item.status === "r" && "rejected"}
          </td>
          <td>
            {item.account.bank && item.account.bank}
            {item.account.wallet && item.account.wallet}
          </td>
          <td>{item.account.type && item.account.type}</td>
          <td>{item.account.account}</td>
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
          <td>{item.fullname}</td>
          <td>
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${item.UserId}`}
            >
              {item.username}
            </Link>
          </td>
          <td>{item.status}</td>
          <td>
            {item.account.bank && item.account.bank}
            {item.account.wallet && item.account.wallet}
          </td>
          <td>{item.account.account}</td>
          <td>{item.account.bank && item.account.type}</td>
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
          <td>
            {item.userstatus === "a" ? (
              <span className="active-status status-info">
                <span>&bull;</span>
              </span>
            ) : (
              <span className="inactive-status status-info">
                <span>&bull;</span>
              </span>
            )}
          </td>
          <td>
            {item.premiumstatus === "a" && (
              <span className="active-status status-info">
                <span>&bull;</span>
              </span>
            )}
            {item.premiumstatus === "i" && (
              <span className="inactive-status status-info">
                <span>&bull;</span>
              </span>
            )}
            {item.premiumstatus === "n" && (
              <span className="new-status status-info">
                <span>&bull;</span>
              </span>
            )}
          </td>
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

  if (sender === "admin-admins" || sender === "admin-providers") {
    let adm = sender.split("-")[1].replace(/s/g, "");
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.fullname}</td>
          <td className="td-lower">{item.email}</td>
          <td className="td-lower">
            <Link
              type="button"
              className=""
              data-id={i}
              title={`View ${adm}`}
              to={`/admin/admin/:${item.userid}`}
            >
              {item.username}
            </Link>
          </td>
          <td>{item.phone}</td>
          <td>
            {item.status === "a" ? (
              <span className="active-status status-info">
                <span>&bull;</span>
              </span>
            ) : (
              <span className="inactive-status status-info">
                <span>&bull;</span>
              </span>
            )}
          </td>
          <td>
            <div className="action-buttons">
              {item.status === "a" && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-id={item.id}
                  title={`Deactivate ${adm}`}
                  onClick={() => onClick(["delete", item.userid])}
                >
                  <i className="fas fa-ban" />
                </button>
              )}

              {item.status === "i" && (
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-id={item.id}
                  title={`Activate ${adm}`}
                  onClick={() => onClick(["reactivate", item.userid])}
                >
                  <i className="fas fa-user-check" />
                </button>
              )}
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
          <td>
            {item.status === "a" ? (
              <span className="active-status status-info">
                <span>&bull;</span>
              </span>
            ) : (
              <span className="inactive-status status-info">
                <span>&bull;</span>
              </span>
            )}
          </td>

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
                onClick={() => onClick(item)}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-signals" || sender === "provider-signals") {
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

          {sender === "admin-signals" && (
            <td>
              <DateFormat date={item.updatedAt} />
            </td>
          )}
          {sender === "admin-signals" && (
            <td className="td-lower">
              <Link
                type=""
                className=""
                title="View Provider"
                to={`/admin/signal-provider/:${item.userid}`}
              >
                {item.provider}
              </Link>
            </td>
          )}
          <td>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-info btn-sm"
                data-id={item.signalid}
                title="View Signal"
                onClick={() => onClick([...["view"], ...[item]])}
              >
                <i className="far fa-eye" />
              </button>
              {sender === "provider-signals" && (
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-id={item.signalid}
                  title="Edit Signal"
                  onClick={() => onClick([...["edit"], ...[item]])}
                >
                  <i className="fas fa-edit" />
                </button>
              )}
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
