import React from "react";

import time from "../asset/images/time.png";
import money from "../asset/images/money.png";
import work from "../asset/images/work.png";
import consistent from "../asset/images/consistent.png";
import accuracy from "../asset/images/accuracy.png";
import support from "../asset/images/support.png";

function Service(props) {
  const { serviceRef } = props;
  return (
    <div id="service" ref={serviceRef}>
      <div className="main-home-service">
        <div className="container">
          <div className="service-text-image-box">
            <div className="row">
              <div className="col-sm-6">
                <div className="service-image" id="saveMoney">
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
            <div className="row flex-column-reverse flex-md-row">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <div className="service-image" id="saveTime">
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
                <div className="service-image" id="hardWork">
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
            <div className="row flex-column-reverse flex-md-row">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <div className="service-image" id="consistent">
                  <img
                    src={consistent}
                    alt="MIC Business team are consistent in delivering signals"
                    className="img-responsive"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="service-text-image-box">
            <div className="row">
              <div className="col-sm-6">
                <div className="service-image" id="accuracy">
                  <img
                    src={accuracy}
                    alt="MIC Business signals are accurate and timely"
                    className="img-responsive"
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="service-text">
                  <h1 className="">Unbeatable Accuracy</h1>
                  <p>
                    With an accuracy of 85% or higher, you can keep your
                    drawdown very low and get the maximum profit. All results
                    are verified. Check your Dashboard for signal performance
                    updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="service-text-image-box">
            <div className="row flex-column-reverse flex-md-row">
              <div className="col-md-6">
                <div className="service-text">
                  <h1 className="">24/7 Support</h1>
                  <p>
                    You can contact us at any time of the day. We will contact
                    you in the shortest time. You can always send us a message
                    with your question. We are always there for you.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="service-image" id="support">
                  <img
                    src={support}
                    alt="MIC Business support team are available 24/7"
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
