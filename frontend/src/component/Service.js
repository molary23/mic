import React from "react";

import time from "../asset/images/time.jpg";
import money from "../asset/images/money.jpg";
import work from "../asset/images/work.jpg";
import consistent from "../asset/images/consistent.jpg";

function Service() {
  return (
    <div>
      <div className="main-home-service" id="service">
        <div className="container">
          <div className="service-text-image-box">
            <div className="row">
              <div className="col-sm-6">
                <div className="service-image">
                  <img
                    src={money}
                    alt="MIC Business help you save money"
                    className="img-responsive"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="service-text">
                  <h1 className="">We save your money</h1>
                  <p>
                    Making money consistently in the forex market requires years
                    of experience, including losing a lot of money. We save you
                    from loss and trade with our expertise to make you money
                    from the beginning.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="service-text-image-box">
            <div className="row">
              <div className="col-sm-6">
                <div className="service-text">
                  <h1 className="">We save you time</h1>
                  <p>
                    You don't have to spend hours every day in front of charts
                    and news channels. We will do it for you while you can spend
                    that time elsewhere. You can use our services to make money
                    while you work or spend time with your family.
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="service-image">
                  <img
                    src={time}
                    alt="MIC Business save time by getting signal to you fast"
                    className="img-responsive"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="service-text-image-box">
            <div className="row">
              <div className="col-sm-6">
                <div className="service-image">
                  <img
                    src={work}
                    alt="MIC Business get the hard part of the job done"
                    className="img-responsive"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="service-text">
                  <h1 className="">We do the hard work</h1>
                  <p>
                    Our team of professional traders scans the market 24 hours a
                    day, 7 days a week. We analyze and decipher markets and
                    economies for you. We all make the same deal. We all make
                    money!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="service-text-image-box">
            <div className="row">
              <div className="col-sm-6">
                <div className="service-text">
                  <h1 className="">We are consistent</h1>
                  <p>
                    Consistency is the name of the game. We are disciplined and
                    patient traders and know what we are doing. As a result,
                    unlike other similar services, we have always been able to
                    make a profit.
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="service-image">
                  <img
                    src={consistent}
                    alt="MIC Business team are consistent in delivering signals"
                    className="img-responsive"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
