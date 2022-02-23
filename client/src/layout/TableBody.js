import React from "react";

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
  return <tbody>{tabeldata}</tbody>;
}

export default TableBody;
