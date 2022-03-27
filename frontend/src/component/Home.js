import React, { useEffect, useState } from "react";

import { GiArcheryTarget } from "react-icons/gi";
import { AiOutlineBarChart } from "react-icons/ai";
import { CgSignal } from "react-icons/cg";
import { RiExchangeDollarFill, RiShieldUserLine } from "react-icons/ri";
import { HiOutlineUserGroup, HiOutlineChatAlt2 } from "react-icons/hi";
import {
  MdOutlineSupportAgent,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";

import dashboard from "../asset/images/mic dashboard.jpeg";

function Home() {
  return (
    <div className="main-home" id="home">
      <div className="main-home-top">
        <div className="">
          <div className="row">
            <div className="col-md-5 col-12">
              <div className="home-top-text">
                <h1 className="mb-4">Why MIC Earn Business</h1>
                <p>
                  With an accuracy of 85% or higher, you can keep your drawdown
                  very low and get the maximum profit. All results are verified.
                  Check your Dashboard for signal performance updates.
                </p>
                <a type="button" href="/" className="btn ">
                  Register
                </a>
              </div>
            </div>
            <div className="col-md-7">
              <div className="home-top-image"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-home-intro">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="intro-1">
                <div className="intro-icon mb-5">
                  <GiArcheryTarget />
                </div>
                <h4 className="mt-2 mb-4">Unbeatable Accuracy</h4>
                <p>
                  With an accuracy of 85% or higher, you can keep your drawdown
                  very low and get the maximum profit. All results are verified.
                  Check your Dashboard for signal performance updates.
                </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="intro-2">
                <div className="intro-icon mb-5">
                  <HiOutlineUserGroup />
                </div>
                <h4 className="mt-2 mb-4">Refer and Earn</h4>
                <p>
                  With us there is more than one way to earn, refer families and
                  friends and end cashback reward that could be withdrawn or
                  used for premium subscription.
                </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="intro-3">
                <div className="intro-icon mb-5">
                  <MdOutlineSupportAgent />
                </div>

                <h4 className="mt-2 mb-4">24/7 Support</h4>
                <p>
                  You can contact us at any time of the day. We will contact you
                  in the shortest time. You can always send us a message with
                  your question. We are always there for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default Home;
