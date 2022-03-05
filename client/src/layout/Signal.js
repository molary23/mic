import React from "react";
import { Link } from "react-router-dom";
import Flag from "react-flagpack";

function Signal(props) {
  const { signal, sender } = props;

  let result;
  if (signal.pip >= 1) {
    result = "fas fa-level-up-alt";
  } else if (signal.pip === 0) {
    result = "fas fa-level-down-alt";
  } else if (signal.pip < 0) {
    result = "fas fa-level-down-alt";
  }
  return (
    <div className="signal-content card">
      <div className="signal-detail">
        <div className="signal-currency">
          <div className="currency-info">
            <div className="currency-image">
              {
                <>
                  <Flag
                    code={JSON.parse(
                      signal.firstcurrency.split(", ")
                    )[0].toUpperCase()}
                    size="M"
                  />
                  <Flag
                    code={JSON.parse(
                      signal.secondcurrency.split(", ")
                    )[0].toUpperCase()}
                    size="M"
                  />
                </>
              }
            </div>
            <div className="currency-name">
              {JSON.parse(signal.firstcurrency.split(", "))[1] +
                "/" +
                JSON.parse(signal.secondcurrency.split(", "))[1]}
            </div>
            <div className="currency-return signal-align-right">
              <i className={result} />
            </div>
          </div>
        </div>
        <div className="signal-about">
          <div className="signal-type signal-title">Signal Option</div>
          <div className="signal-opt signal-align-right">
            {signal.signaloption}
          </div>
        </div>
        <div className="signal-about">
          <div className="signal-type signal-title"></div>
          <div className="signal-days-ago signal-align-right">2 days ago</div>
        </div>
        <div className="signal-from">
          <div className="signal-from-title signal-title">From</div>
          <div className="signal-from-value signal-align-right">
            <span className="signal-timezone">UTC+1</span>
          </div>
        </div>
        <div className="signal-to">
          <div className="signal-to-title signal-title">To</div>
          <div className="signal-to-value signal-align-right">
            <span className="signal-timezone">UTC+1</span>
          </div>
        </div>
        <div className="signal-take-profit">
          {signal.takeprofit.map((tp, i) => {
            return (
              <div className="signal-sold-at" key={i}>
                <div className="signal-sold-title signal-title">
                  Take Profit
                </div>
                <div className="signal-sold-value signal-align-right">{tp}</div>
              </div>
            );
          })}
        </div>

        <div className="signal-status">
          <div className="signal-stat">{signal.status}</div>
        </div>
        <div className="signal-stop-loss">
          {signal.stoploss.map((sl, i) => {
            return (
              <div className="signal-bought-at" key={i}>
                <div className="signal-bought-title signal-title">
                  Stop Loss
                </div>
                <div className="signal-bought-value signal-align-right">
                  {sl}
                </div>
              </div>
            );
          })}
        </div>

        <div className="signal-provider">
          <div className="signal-pip-title signal-title">Profit, Pip</div>
          <div className="signal-pip-value signal-align-right">
            {signal.pip}
          </div>
        </div>

        {sender !== "provider" && (
          <div className="signal-provider">
            <div className="signal-provider-title signal-title">Provider</div>
            <div className="signal-provider-value signal-align-right">
              <Link
                type=""
                className=""
                title="View Admin"
                to={`/admin/user/provider/:${signal.providerid}`}
              >
                {signal.provider}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signal;
