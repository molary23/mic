import React from "react";

function AccountCol(props) {
  const { details } = props;
  return details.map((item, i) => {
    return (
      <div className="col-md-6 col-xs-12" key={i}>
        <div className="first-account card">
          <h3>Account Details {i + 1} </h3>

          <div className="settings-details">
            <div className="settings-title">Wallet</div>
            <div className="settings-info"> {item.wallet}</div>
          </div>
          <div className="settings-details">
            <div className="settings-title">Account Number</div>
            <div className="settings-info"> {item.accountnumber} </div>
          </div>
        </div>
      </div>
    );
  });
}

export default AccountCol;
