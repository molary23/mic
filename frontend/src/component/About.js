import React from "react";

import { AiOutlineBarChart } from "react-icons/ai";
import { CgSignal } from "react-icons/cg";
import { RiExchangeDollarFill, RiShieldUserLine } from "react-icons/ri";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

import dashboard from "../asset/images/mic dashboard.jpeg";

function About(props) {
  return (
    <div ref={props.aboutRef} id="about">
      <div className="main-home-middle"></div>
      <div className="main-home-about" id="about">
        <div className="container">
          <h1 className="mb-5">Searching For Consistent Profitability?</h1>
          <div className="row pt-5">
            <div className="col-md-8 col-12">
              <ul className="about-ul">
                <li className="mb-4">
                  <span className="list-icon">
                    <RiExchangeDollarFill />
                  </span>
                  <h4>
                    Forex, Indices, Commodities, Stocks And Cryptocurrency
                    Signals
                  </h4>
                </li>
                <li className="mb-4">
                  <span className="list-icon">
                    <AiOutlineBarChart />
                  </span>
                  <h4>
                    Leverage Years Of Trading Experience Of Our Signal Provider
                  </h4>
                </li>
                <li className="mb-4">
                  <span className="list-icon">
                    <RiShieldUserLine />
                  </span>
                  <h4>Access To Over 30 Plus Accurate Signal Providers</h4>
                </li>
                <li className="mb-4">
                  <span className="list-icon">
                    <CgSignal />
                  </span>
                  <h4>Up To 25 Signals Per Day</h4>
                </li>
                <li className="mb-4">
                  <span className="list-icon">
                    <MdOutlineMarkEmailUnread />
                  </span>
                  <h4>Instant Email Alert For Every Signal Generated</h4>
                </li>
                <li className="mb-4">
                  <span className="list-icon">
                    <HiOutlineChatAlt2 />
                  </span>
                  <h4>Chat 24/7 With Our Team For Any Trade Assistance</h4>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-12">
              <img
                src={dashboard}
                alt="MIC Business save time by getting signal to you fast"
                className="img-responsive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
