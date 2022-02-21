import React from "react";

import phone from "../asset/images/phone.png";

function Service() {
  return (
    <div>
      <div className="main-home-service">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <div className="service-first-image m-auto ">
                <img
                  src={phone}
                  alt="MIC Business on Phone"
                  className="img-responsive"
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="service-first-text m-auto ">
                <h1>Signal at your Fingertips</h1>
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled and demoralized by the charms
                  of pleasure of the moment, so blinded by desire, that they
                  cannot foresee the pain and trouble that are bound to ensue;
                  and equal blame belongs to those who fail in their duty
                  through weakness of will,
                </p>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="service-second-text m-auto ">
                <h1>Get notified on Signal change</h1>
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit, sed quia non numquam eius
                  modi tempora incidunt ut labore et dolore magnam aliquam
                  quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                  exercitationem ullam corporis suscipit laboriosam, nisi ut
                  aliquid ex ea commodi consequatur? Quis autem vel eum iure
                  reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?
                </p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="service-second-image m-auto ">
                <img
                  src={phone}
                  alt="MIC Business on Phone"
                  className="img-responsive"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
