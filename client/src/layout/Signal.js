import React from "react";
import Flag from "react-flagpack";

function Signal(props) {
  const { signal } = props;

  let result;
  if (signal.pip >= 1) {
    result = "fas fa-balance-scale-right";
  } else if (signal.pip === 0) {
    result = "fas fa-balance-scale";
  } else if (signal.pip < 0) {
    result = "fas fa-balance-scale-left";
  }
  return (
    <div className="signal-content card">
      <div className="signal-detail">
        <div className="signal-currency">
          <div className="currency-info">
            <div className="currency-image">
              {Object.values(signal.currency).map((flag, i) => {
                return (
                  <span key={i}>
                    <Flag code={flag.toUpperCase()} size="l" className="flag" />
                  </span>
                );
              })}
            </div>
            <div className="currency-name">
              {Object.keys(signal.currency).join("/").toUpperCase()}
            </div>
            <div className="currency-return signal-align-right">
              <i className={result} />
            </div>
          </div>
        </div>
        <div className="signal-about">
          <div className="signal-type signal-title">
            {Object.keys(signal.currency).join("/").toUpperCase()} Signal{" "}
          </div>
          <div className="signal-days-ago signal-align-right">2 days ago</div>
        </div>
        <div className="signal-from">
          <div className="signal-from-title signal-title">From</div>
          <div className="signal-from-value signal-align-right">
            {signal.time.toLocaleTimeString()}
            <span className="signal-timezone">UTC+1</span>
          </div>
        </div>
        <div className="signal-to">
          <div className="signal-to-title signal-title">To</div>
          <div className="signal-to-value signal-align-right">
            {signal.time.toLocaleTimeString()}
            <span className="signal-timezone">UTC+1</span>
          </div>
        </div>
        <div className="signal-status">
          <div className="signal-stat">{signal.status}</div>
        </div>

        {signal.takeprofit.map((tp, i) => {
          return (
            <div className="signal-sold-at" key={i}>
              <div className="signal-sold-title signal-title">Take Profit</div>
              <div className="signal-sold-value signal-align-right">{tp}</div>
            </div>
          );
        })}
        {signal.stoploss.map((sl, i) => {
          return (
            <div className="signal-bought-at" key={i}>
              <div className="signal-bought-title signal-title">Stop Loss</div>
              <div className="signal-bought-value signal-align-right">{sl}</div>
            </div>
          );
        })}

        <div className="signal-pip">
          <div className="signal-pip-title signal-title">Profit, Pip</div>
          <div className="signal-pip-value signal-align-right">
            {signal.pip}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signal;
