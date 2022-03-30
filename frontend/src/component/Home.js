import React from "react";

import { GiArcheryTarget } from "react-icons/gi";

import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineSupportAgent } from "react-icons/md";

function Home(props) {
  return (
    <div className="main-home" id="home" ref={props.homeRef}>
      <div className="main-home-top">
        <div className="">
          <div className="row flex-column-reverse flex-md-row">
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
    </div>
  );
}

export default Home;
