import React from "react";

function Start() {
  return (
    <div id="start">
      <div className="main-home-start"></div>
      <div className="main-home-start-box">
        <div className="container">
          <div className="page-title mb-5">
            <h1>Get Started in 4 Easy Steps</h1>
          </div>
          <div className="start-steps">
            <div className="row ">
              <div className="col-md-3 col-12">
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
              <div className="col-md-3 col-12">
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
              <div className="col-md-3 col-12">
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
              <div className="col-md-3 col-12">
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
  );
}

export default Start;
