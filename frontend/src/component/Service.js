import React, { useEffect, useState } from "react";

import time from "../asset/images/time.png";
import money from "../asset/images/money.png";
import work from "../asset/images/work.png";
import consistent from "../asset/images/consistent.png";

function Service(props) {
  const [scale, setScale] = useState();

  const scaleFocus = () => {
    const money = document.getElementById("saveMoney"),
      time = document.getElementById("saveTime"),
      hardWork = document.getElementById("hardWork"),
      consistent = document.getElementById("consistent"),
      winScroll = window.scrollY + 50;

    if (
      winScroll >= money.offsetTop &&
      winScroll < money.offsetTop + money.clientHeight
    ) {
      setScale((scale) => 0);
    } else if (
      winScroll >= time.offsetTop &&
      winScroll < time.offsetTop + time.clientHeight
    ) {
      setScale((scale) => 1);
    } else if (
      winScroll >= hardWork.offsetTop &&
      winScroll < hardWork.offsetTop + hardWork.clientHeight
    ) {
      setScale((scale) => 2);
    } else if (
      winScroll >= consistent.offsetTop &&
      winScroll < consistent.offsetTop + consistent.clientHeight
    ) {
      setScale((scale) => 3);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scaleFocus, { passive: true });
    return () => {
      window.removeEventListener("scroll", scaleFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="service" ref={props.serviceRef}>
      <div className="main-home-service">
        <div className="container">
          <div className="service-text-image-box">
            <div className="row">
              <div className="col-sm-6">
                <div
                  className={`${scale === 0 ? "scaled" : ""} service-image`}
                  id="saveMoney"
                >
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
                <div
                  className={`${scale === 1 ? "scaled" : ""} service-image`}
                  id="saveTime"
                >
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
                <div
                  className={`${scale === 2 ? "scaled" : ""} service-image`}
                  id="hardWork"
                >
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
                <div
                  className={`${scale === 3 ? "scaled" : ""} service-image`}
                  id="consistent"
                >
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
