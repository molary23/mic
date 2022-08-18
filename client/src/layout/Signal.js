import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Flag from "react-flagpack";

import { FcCurrencyExchange } from "react-icons/fc";
import { countrycodes } from "../util/countrycodes";

import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";

import { MdOutlineTrendingFlat } from "react-icons/md";

function Signal(props) {
  const { signal, sender } = props;

  let result;
  if (signal.pip >= 1) {
    result = <IoIosTrendingUp />;
  } else if (signal.pip === 0) {
    result = <MdOutlineTrendingFlat />;
  } else if (signal.pip < 0) {
    result = <IoIosTrendingDown />;
  }
  return (
    <div className="signal-content card">
      <div className="signal-detail">
        <div className="signal-currency">
          <div className="currency-info">
            <div className="currency-image">
              {
                <>
                  <span className="currency-flag">
                    {countrycodes.includes(
                      JSON.parse(signal.firstcurrency)[0].toUpperCase()
                    ) ? (
                      <Flag
                        code={JSON.parse(signal.firstcurrency)[0].toUpperCase()}
                        size="L"
                        border="NONE"
                      />
                    ) : (
                      <FcCurrencyExchange />
                    )}
                  </span>
                  <span className="currency-flag">
                    {countrycodes.includes(
                      JSON.parse(signal.secondcurrency)[0].toUpperCase()
                    ) ? (
                      <Flag
                        code={JSON.parse(
                          signal.secondcurrency
                        )[0].toUpperCase()}
                        size="L"
                        border="NONE"
                      />
                    ) : (
                      <FcCurrencyExchange />
                    )}
                  </span>
                </>
              }
            </div>
            <div className="currency-name">
              {`${JSON.parse(signal.firstcurrency)[1]}
                /
                ${JSON.parse(signal.secondcurrency)[1]}`}
            </div>
            <div className="currency-return signal-align-right">{result}</div>
          </div>
        </div>
        <div className="signal-about">
          <div className="signal-type signal-title">Signal Option</div>
          <div className="signal-opt signal-align-right">
            {signal.signaloption === "s" && "sell (instant execution)"}
            {signal.signaloption === "t" && "sell stop"}
            {signal.signaloption === "u" && "sell limit"}
            {signal.signaloption === "b" && "buy (instant execution)"}
            {signal.signaloption === "c" && "buy stop"}
            {signal.signaloption === "d" && "buy limit"}
          </div>
        </div>
        <div className="signal-about">
          <div className="signal-type signal-title">Signal Identifier</div>
          <div className="signal-days-ago signal-align-right">
            {signal.signalid.toString().length < 5
              ? signal.signalid.toString().padStart(5, "0")
              : signal.signalid.toString()}
          </div>
        </div>
        <div className="signal-entry">
          <div className="signal-entry-title signal-title">Entry Point</div>
          <div className="signal-entry-value signal-align-right">
            <span>{signal.entry}</span>
          </div>
        </div>
        <div className="signal-take-profit">
          {JSON.parse(signal.takeprofit).map((tp, i) => {
            return (
              <div className="signal-sold-at" key={i}>
                <div className="signal-sold-title signal-title">
                  Take Profit {i + 1}
                </div>
                <div className="signal-value signal-align-right">{tp}</div>
              </div>
            );
          })}
        </div>
        {signal.status !== null && (
          <div className="signal-status">
            <div className="signal-stat">
              {signal.status === "f" && "failed"}
              {signal.status === "c" && "cancelled"}
              {signal.status === "s" && "successful"}
            </div>
          </div>
        )}
        <div className="signal-stop-loss">
          {JSON.parse(signal.stoploss).map((sl, i) => {
            return (
              <div className="signal-bought-at" key={i}>
                <div className="signal-bought-title signal-title">
                  Stop Loss {i + 1}
                </div>
                <div className="signal-value signal-align-right">{sl}</div>
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
        {sender === "admin" && (
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
        {sender === "user-signals" && (
          <div className="signal-provider">
            <div className="signal-provider-title signal-title">Provider</div>
            <div className="signal-provider-value signal-align-right">
              {signal.provider}
            </div>
          </div>
        )}
        {signal.comment && (
          <div className="signal-comment">
            <div className="signal-comment-title signal-title">Comment</div>
            <div className="signal-comment-value signal-align-right">
              <span className="signal-comment-value">{signal.comment}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Signal.propTypes = {
  signal: PropTypes.object.isRequired,
};

export default Signal;
