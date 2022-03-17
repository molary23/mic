import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { FiCheckCircle } from "react-icons/fi";
import { VscCircleFilled } from "react-icons/vsc";

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
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
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
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
          <td>
            {item.status === "a" && (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}

            {item.status === "r" && (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
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
        </tr>
      );
    });
  }

  if (sender === "user-bonus") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
          <td>{item.payer}</td>
          <td>
            {item.status === "a" && (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}

            {item.status === "r" && (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "p" && (
              <span className="new-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
          </td>

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

  if (sender === "user-referrals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.referred}</td>
          <td>{item.phone}</td>
          <td>
            {item.status === "a" && (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}

            {item.status === "i" && (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "n" && (
              <span className="new-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
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
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
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
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
          <td>
            {item.status === "p" && (
              <span className="new-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "a" && (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "r" && (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
          </td>
          <td>{item.wallet}</td>
          <td className="td-upper">{item.accountnumber}</td>
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

  /* if (sender === "withdrawals") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
          <td>{item.reference}</td>
          <td>{item.status}</td>
          <td>{item.date.toISOString()}</td>
          <td>{item.update.toISOString()}</td>
        </tr>
      );
    });
  }*/

  if (sender === "admin-bonus") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
          <td>
            <Link
              type="button"
              title="View Payer"
              to={`/admin/user/:${item.payerid}`}
            >
              {item.payer}
            </Link>
          </td>
          <td>
            {item.status === "p" && (
              <span className="new-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "a" && (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "r" && (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
          </td>
          <td>
            <Link
              type="button"
              title="View User"
              to={`/admin/user/:${item.UserId}`}
            >
              {item.username}
            </Link>
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
                className="btn btn-info btn-sm"
                title="View Bonus"
                to={`/admin/bonus/:${item.bonusid}`}
              >
                <FaRegEye />
              </Link>
            </div>
          </td>
          <td>
            {item.status === "p" && (
              <div className="action-buttons">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-id={item.bonusid}
                  title="Approve Bonus"
                  onClick={() =>
                    onClick(["approve", item.bonusid, item.username])
                  }
                >
                  <FiCheckCircle />
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-id={item.bonusid}
                  title="Disapprove Bonus"
                  onClick={() =>
                    onClick(["reject", item.bonusid, item.username])
                  }
                >
                  <ImCancelCircle />
                </button>
              </div>
            )}
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
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
          <td>
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${item.UserId}`} // change to user ID later
            >
              {item.username}
            </Link>
          </td>
          <td>
            {item.method === "b" && "bonus"}
            {item.method === "s" && "subscription"}
            {item.method === "w" && "withdrawal"}
          </td>
          <td>{item.type === "d" ? "debit" : "credit"}</td>
          <td>
            <DateFormat date={item.transactiondate}></DateFormat>
          </td>
        </tr>
      );
    });
  }

  if (sender === "admin-wallets") {
    tabeldata = tablebody.map((item, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.wallet}</td>
          <td>
            {item.status === "a" && (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "i" && (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
          </td>

          <td>
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/admin/:${item.UserId}`}
            >
              {item.User.username}
            </Link>
          </td>

          <td>
            <DateFormat date={item.createdAt}></DateFormat>
          </td>
          <td>
            <div className="action-buttons">
              {item.status !== "a" ? (
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  title="Activate Wallet"
                  onClick={() => onClick(["activate", item.id, item.wallet])}
                >
                  <FiCheckCircle />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  title="Deactivate Wallet"
                  onClick={() => onClick(["delete", item.id, item.wallet])}
                >
                  <ImCancelCircle />
                </button>
              )}
            </div>
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
              to={`/admin/user/:${item.referralid}`}
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
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
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
          <td>
            {item.status === "a" && (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "r" && (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.status === "p" && (
              <span className="new-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
          </td>
          <td>{item.wallet}</td>
          <td>{item.accountnumber}</td>
          <td>
            <DateFormat date={item.createdAt} />
          </td>
          <td>
            <DateFormat date={item.updatedAt} />
          </td>
          <td>
            {item.status === "p" && (
              <div className="action-buttons">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  title="Approve Withdrawals"
                  onClick={() =>
                    onClick(["approve", item.withdrawalid, item.username])
                  }
                >
                  <FiCheckCircle />
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  title="Reject Withdrawals"
                  onClick={() =>
                    onClick(["reject", item.withdrawalid, item.username])
                  }
                >
                  <ImCancelCircle />
                </button>
              </div>
            )}
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
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>
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

          <td>{item.status === "s" ? "successful" : "failed"}</td>
          <td>{item.gateway === "c" ? "crypto" : "bank"}</td>
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
                <ImCancelCircle />
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
          <td>{item.amount !== null && item.amount.toFixed(2)}</td>

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
          <td>{item.type === "b" ? "bonus" : "payment"}</td>

          <td>{item.plan === "m" ? "monthly" : "annually"}</td>
          <td>{item.package}</td>
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
          <td className="td-lower">
            <Link title="View User" to={`/admin/user/:${item.UserId}`}>
              {item.username}
            </Link>
          </td>
          <td>{item.phone}</td>
          <td>
            {item.userstatus === "a" ? (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            ) : (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
          </td>
          <td>
            {item.premiumstatus === "a" && (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.premiumstatus === "i" && (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
            {item.premiumstatus === "n" && (
              <span className="new-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            )}
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
          <td>{item.wallet}</td>
          <td>{item.accountnumber}</td>
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
              to={`/admin/admin/:${item.UserId}`}
            >
              {item.username}
            </Link>
          </td>
          <td>{item.phone}</td>
          <td>
            {item.status === "a" ? (
              <span className="active-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            ) : (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
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
                  onClick={() => onClick(["delete", item.UserId])}
                >
                  <MdOutlineDeleteForever />
                </button>
              )}

              {item.status === "i" && (
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-id={item.id}
                  title={`Activate ${adm}`}
                  onClick={() => onClick(["reactivate", item.UserId])}
                >
                  <RiRefreshLine />
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
                to={`/admin/admin/:${item.UserId}`}
              >
                {item.User.username}
              </Link>
            </div>
          </td>
          <td>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-info btn-sm"
                data-id={item.bonusid}
                title="Edit Announcement"
                onClick={() => onClick(["edit", item])}
              >
                <AiOutlineEdit />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                data-id={item.bonusid}
                title="Delete Announcement"
                onClick={() => onClick(["delete", item.id])}
              >
                <MdOutlineDeleteForever />
              </button>
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
            {JSON.parse(item.firstcurrency.split(", "))[1].toUpperCase() +
              "/" +
              JSON.parse(item.secondcurrency.split(", "))[1].toUpperCase()}
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
                <span>
                  <VscCircleFilled />
                </span>
              </span>
            ) : (
              <span className="inactive-status status-info">
                <span>
                  <VscCircleFilled />
                </span>
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
              title="View Provider"
              to={`/admin/admin/:${item.UserId}`}
            >
              {item.User.username}
            </Link>
          </td>
          <td>
            <div className="action-buttons">
              {item.status === "a" ? (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  data-id={item.id}
                  title="Delete Currency "
                  onClick={() => onClick(["delete", item])}
                >
                  <MdOutlineDeleteForever />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  data-id={item.id}
                  title="Reactivate Currency "
                  onClick={() => onClick(["activate", item])}
                >
                  <RiRefreshLine />
                </button>
              )}
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
          <td>{item.signaloption === "s" ? "sell" : "buy"}</td>
          <td>
            {item.status === "c" && "cancelled"}
            {item.status === "f" && "fulfilled"}
            {item.status === null && ""}
          </td>
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
                to={`/admin/signal-provider/:${item.providerid}`}
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
                <FaRegEye />
              </button>
              {sender === "provider-signals" && (
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  data-id={item.signalid}
                  title="Edit Signal"
                  onClick={() => onClick([...["edit"], ...[item]])}
                >
                  <AiOutlineEdit />
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
