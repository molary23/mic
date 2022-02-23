import React, { Component } from "react";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";

const bonus = [
  {
    amount: 200,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
  {
    amount: 400,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
  {
    amount: 250,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
  {
    amount: 600,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
  {
    amount: 700,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
  {
    amount: 100,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
  {
    amount: 500,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
  {
    amount: 400,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
  {
    amount: 650,
    createdAt: new Date(),

    updatedAt: new Date(),
  },
];

export class Bonuses extends Component {
  state = {
    sender: "bonus",
    loading: true,
  };
  render() {
    const { sender, loading } = this.state;
    return (
      <div>
        {loading && <ProgressBar />}
        <div className="bonus card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Bonus</h1>
          </div>

          <TableHead
            sender={sender}
            head={["S/N", "amount", "date created", "date approved"]}
          >
            <TableBody sender={sender} tablebody={bonus} />
          </TableHead>
        </div>
      </div>
    );
  }
}

export default Bonuses;
