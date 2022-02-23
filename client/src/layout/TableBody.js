import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TableBody(props) {
  const { sender, tablebody } = props;

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
    const { onClick } = props;
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

  return <tbody>{tabeldata}</tbody>;
}

TableBody.propTypes = {
  sender: PropTypes.string.isRequired,
  tablebody: PropTypes.array.isRequired,
};

export default TableBody;
