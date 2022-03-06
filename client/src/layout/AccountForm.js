import React, { useState } from "react";

import TextInputField from "./TextInputField";

function AccountForm(props) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {};
  const changeHandler = (e) => {};
  return (
    <div>
      <form className="account-form" onSubmit={submitHandler}>
        <TextInputField
          id="account-form-bank-name"
          placeholder="Bank Name"
          label="Bank Name"
          type="text"
          name="bankname"
          value={inputs.bankname || ""}
          onChange={changeHandler}
          error={error.bankname}
        />
        <TextInputField
          id="account-form-account-number"
          placeholder="Account Number"
          label="Account Number"
          type="text"
          name="accountnumber"
          value={inputs.accountnumber || ""}
          onChange={changeHandler}
          error={error.accountnumber}
        />
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Add Account
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
