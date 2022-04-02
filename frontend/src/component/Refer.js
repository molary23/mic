import React from "react";

import { IoShareSocialOutline } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";

function Refer() {
  return (
    <div id="refer">
      <div className="main-home-refer"></div>
      <div className="main-home-refer-box">
        <div className="container">
          <div className="refer-title mb-5">
            <h1 className="mb-5">Refer and Earn</h1>
            <h3 className="mb-3">
              With us there is more than one way to earn, refer families and
              friends and end cashback reward that could be withdrawn or used
              for premium subscription.
            </h3>
            <h4 className="mb-3">You can earn in this 3 steps</h4>
          </div>
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="refer-card">
                <div className="refer-icon">
                  <FaRegUserCircle />
                </div>
                <div className="refer-step">
                  <h2>Join</h2>
                  <p>
                    With us there is more than one way to earn, refer families
                    and friends
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="refer-card">
                <div className="refer-icon">
                  <IoShareSocialOutline />
                </div>
                <div className="refer-step">
                  <h2>Share</h2>
                  <p>
                    With us there is more than one way to earn, refer families
                    and friends
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="refer-card">
                <div className="refer-icon">
                  <GiTakeMyMoney />
                </div>
                <div className="refer-step">
                  <h2>Earn</h2>
                  <p>
                    With us there is more than one way to earn, refer families
                    and friends
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Refer;
