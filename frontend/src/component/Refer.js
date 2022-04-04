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
            <h3 className="mb-5">
              With us there is more than one way to earn, refer families and
              friends to register and subscribe to our premium plans and earn
              cash back rewards, rewards can be withdrawn and used for your
              premium subscription.
            </h3>
            <h4 className="mb-5">You can earn in this 3 simple steps</h4>
          </div>
          <div className="refer-steps">
            <div className="row ">
              <div className="col-md-4 col-12">
                <div className="refer-card">
                  <div className="refer-icon">
                    <FaRegUserCircle />
                  </div>
                  <div className="refer-step">
                    <h2>Join</h2>
                    <p>
                      Register to create an account where you will be able to
                      copy your referral links.
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
                      Share your referral links with families and friends to
                      have then register and subscribe.
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
                      Enjoy cash rewards on their first and subsequent
                      subscription, withdraw rewards or subscribe with it.
                    </p>
                  </div>
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
