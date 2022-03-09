import React, { useState } from "react";

function SignalForm(props) {
  const { onSubmit } = props;
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState([]);
  let providers = [];
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit();
  };
  const changeHandler = (e) => {
    let selected = e.target.value;
    if (provider.includes(selected)) {
      providers = provider.filter((elm) => elm !== selected);
      setProvider(providers);
    } else {
      providers.push(selected);
      setProvider([...provider, ...providers]);
    }
  };

  return (
    <div className="settings-form-dark-mode dash-card settings-form-card">
      <div className="page-title mb-2 mt-1">
        <h4>Add/Modify Account</h4>
      </div>
      <form className="select-providers-form" onSubmit={submitHandler}>
        <select
          className="form-select form-select-lg mb-3"
          onChange={changeHandler}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <div className="selectedProviders">
          {provider.map((item, i) => {
            return <span key={i}>{item}+</span>;
          })}
        </div>

        {errors && <small>{errors}</small>}
        <div className="d-grid">
          <button type="submit" className="btn default-btn btn-lg btn-block">
            Change Providers
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignalForm;
