import React, { Component } from "react";

import Signal from "../layout/Signal";

const signal = [
  {
    option: "buy",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "filled",
    currency: { usd: "us", eur: "eu" },
    pip: 26,
    time: new Date(),
  },
  {
    option: "sell",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "filled",
    currency: { eur: "eu", chn: "cn" },
    pip: -6,
    time: new Date(),
  },
  {
    option: "buy",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "cancelled",
    currency: { usd: "us", yen: "jp" },
    pip: 0,
    time: new Date(),
  },
  {
    option: "sell",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "filled",
    currency: { chn: "cn", usd: "us" },
    pip: 26,
    time: new Date(),
  },
  {
    option: "sell",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "filled",
    currency: { chn: "cn", usd: "us" },
    pip: 26,
    time: new Date(),
  },
  {
    option: "sell",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "filled",
    currency: { yen: "jp", usd: "us" },
    pip: 26,
    time: new Date(),
  },
  {
    option: "sell",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "filled",
    currency: { aud: "au", usd: "us" },
    pip: 26,
    time: new Date(),
  },
  {
    option: "sell",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "filled",
    currency: { cad: "ca", usd: "us" },
    pip: 26,
    time: new Date(),
  },
  {
    option: "sell",
    takeprofit: [0.1, 0.6, 0.7],
    stoploss: [1.2, 1.6],
    range: "0.506 - 0.402",
    status: "filled",
    currency: { pds: "gb-ukm", usd: "us" },
    pip: 26,
    time: new Date(),
  },
];
export class BothSignals extends Component {
  render() {
    return (
      <div>
        <div className="page-dash-title mb-4">
          <h1>Signals</h1>
        </div>
        <div className="container-fluid">
          <div className="row">
            {signal.map((signal, i) => {
              return (
                <div className="col-4" key={i}>
                  <div className="signal-one mb-4">
                    <Signal propkey={i} signal={signal} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default BothSignals;
