import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
          <td>{item.createdAt.toISOString()}</td>
          <td>{item.updatedAt.toISOString()}</td>

          <td>
            <div className="action-buttons">
              <Link
                type="button"
                className="btn btn-info btn-sm"
                data-id={i}
                title="View Bonus"
                to={`/admin/bonus/:${i}`}
              >
                <i className="far fa-eye" />
              </Link>
              <button
                type="button"
                className="btn btn-success btn-sm"
                data-id={i}
                title="Approve Bonus"
                onClick={() => onClick(i)}
              >
                <i className="fas fa-check" />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                data-id={i}
                title="Disapprove Bonus"
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
          <td>
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${i}`}
            >
              {item.referred}
            </Link>
          </td>
          <td>{item.status}</td>
          <td>
            <Link
              className=""
              data-id={i}
              title="View Details"
              to={`/admin/user/:${i}`}
            >
              {item.referred}
            </Link>
          </td>
          <td>{item.createdAt.toISOString()}</td>
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
          <td>
            <div className="action-buttons">
              <Link
                type="button"
                className="btn btn-info btn-sm"
                data-id={i}
                title="View Payment"
                to={`/admin/payment/:${i}`}
              >
                <i className="far fa-eye" />
              </Link>
              <button
                type="button"
                className="btn btn-success btn-sm"
                data-id={i}
                title="Update Payment"
                onClick={() => onClick(i)}
              >
                <i className="fas fa-sync" />
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
          <td>{item.amount}</td>
          <td>{item.method}</td>
          <td>{item.type}</td>
          <td>{item.date.toISOString()}</td>
          <td>
            <div className="action-buttons">
              <Link
                type="button"
                className="btn btn-danger btn-sm"
                data-id={i}
                title="Delete Currency"
                to={`/admin/user/:${i}`}
              >
                <i className="far fa-eye" />
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
          <td>{item.amount}</td>
          <td>{item.method}</td>
          <td>{item.type}</td>
          <td>{item.date.toISOString()}</td>
          <td>
            <div className="action-buttons">
              <button
                type="button"
                className="btn btn-danger btn-sm"
                data-id={i}
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

  return <tbody>{tabeldata}</tbody>;
}

TableBody.propTypes = {
  sender: PropTypes.string.isRequired,
  tablebody: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default TableBody;
