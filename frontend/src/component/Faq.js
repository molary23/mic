import React from "react";

import Accordion from "../layout/Accordion";

function Faq() {
  return (
    <div>
      <div className="main-home-faq"></div>
      <div className="main-home-faq-box">
        <div className="container">
          <div className="page-title mb-3">
            <h1 className="mb-4">FAQ</h1>
            <h4 className="mb-5">Frequently Asked Questions</h4>
          </div>
          <div className="faq-box">
            <div className="row">
              <div className="col-md-6 col-12">
                <Accordion
                  title="How do you sleep at  night"
                  content="I sleep soundly on a water bed"
                  active={true}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title="Are you even happy"
                  content="Sure"
                  active={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
