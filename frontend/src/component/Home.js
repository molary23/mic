import React from "react";

function Home(props) {
  return (
    <div className="main-home" id="home" ref={props.homeRef}>
      <div className="main-home-top">
        <div className="container-fluid">
          <div className="row flex-column-reverse flex-md-row">
            <div className="col-md-5 col-12">
              <div className="home-top-text">
                <h1 className="mb-4">Increase Your Profit With Our Signals</h1>
                <p>
                  Trade Forex, Indexes and Cryptocurrency following signals
                  provided by our team expert forex traders.
                </p>
                <a
                  type="button"
                  href="//dashboard.micearnbusiness.org/register"
                  className="btn default-btn"
                  target="_blank"
                  rel="noreferrer"
                >
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
          <div className="page-title mb-5 mt-3">
            <h1>Why MIC Earn Business</h1>
          </div>
          <p>
            With an accuracy of 85% or higher, you can keep your drawdown very
            low and get the maximum profit. All results are verified. Check your
            Dashboard for signal performance updates.
          </p>
          <div className="home-get-started">
            <div className="container">
              <div className="page-title mb-5 mt-3">
                <h1>Get Started in 4 Easy Steps</h1>
              </div>
              <div className="start-steps">
                <div className="row ">
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="start-card">
                      <h3 className="start-icon">01</h3>
                      <div className="start-step">
                        <h2>subscribe</h2>
                        <p>
                          Subscribe to our premium plans to have access to daily
                          signals with more than 85% accuracy.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="start-card">
                      <h3 className="start-icon">02</h3>
                      <div className="start-step">
                        <h2>copy</h2>
                        <p>
                          We've done all the hard work for you. Simply copy the
                          signals provided by our signal providers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="start-card">
                      <h3 className="start-icon">03</h3>
                      <div className="start-step">
                        <h2>trade</h2>
                        <p>
                          Execute our signals on the trading platform of your
                          choice, you will be able to trade like a pro.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="start-card">
                      <h3 className="start-icon">04</h3>
                      <div className="start-step">
                        <h2>profit</h2>
                        <p>
                          Grow your trading account by consistently turning huge
                          profit and highly impressive returns with low-risk.
                        </p>
                      </div>
                    </div>
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

export default Home;
