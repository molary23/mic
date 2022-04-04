import React from "react";

import Accordion from "../layout/Accordion";

function Faq(props) {
  return (
    <div id="faq" ref={props.faqRef}>
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
                  title={
                    <div>
                      How do I get started with{" "}
                      <a href="//micearnbusiness.org">MicEarnBusiness</a>?
                    </div>
                  }
                  content={
                    <div>
                      Click{" "}
                      <a href="//dashboard.micearnbusiness.org">Register</a> and
                      set up your account. From within your account you will be
                      able to subscribe to our premium plan.
                    </div>
                  }
                  active={true}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title="How does it work exactly?"
                  content="When you subscribe to our premium plan, there are various signal providers with proven track records on our platform, by default you are following all signal providers but you can choose to follow and unfollow any signal provider. Just copy their signals and apply it on the trading platform of your choice. and you are good to go."
                  active={false}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title={
                    <div>
                      Who is <a href="//micearnbusiness.org">MicEarnBusiness</a>{" "}
                      for?
                    </div>
                  }
                  content={
                    <div>
                      There are all kinds of traders from all over the world. We
                      start with hassle-free forex trading and are for traders
                      who have the ambition to stay consistent in the market. We
                      are suitable for completely new traders to all the way up
                      cutting-edge professional traders.
                    </div>
                  }
                  active={false}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title="What is the minimum trading account balance I need to get started?"
                  content="You can get started with a minimum account balance of $100 but we do recommend a minimum 0f $500 for better result."
                  active={false}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title="What should I expect from your service?"
                  content="We take on the hard work for you, by sending Forex signals so you don't have to endlessly sit in front of your computer waiting for a signal. With over 20 Signal providers to choose from you can be rest assured of maximum profitability."
                  active={false}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title="How many Forex Signals per week can I expect?"
                  content="We send up to 15 Forex Signals daily depending on the number of signal providers you are following and numbers of currency pairs you have selected, basically covering EUR/USD, USD/CHF, EUR/CHF, USD/CAD, USD/JPY, GBP/USD, EUR/GBP, AUD/USD, CHF/JPY, AUD/JPY, EUR/JPY, NZD/JPY, GBP/JPY, NZD/USD, GOLD, CRUDE OIL and many more currency pairs.
 "
                  active={false}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title={
                    <div>
                      What are{" "}
                      <a href="//micearnbusiness.org">MicEarnBusiness</a>{" "}
                      Strategies based on?
                    </div>
                  }
                  content={
                    <div>
                      Depending on the individual signal provider, their
                      strategy is based on a particular combination of setups
                      based on price action, fundamental analysis, technical
                      indicators and economic events and so on.
                    </div>
                  }
                  active={false}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title={
                    <div>
                      How can I execute the{" "}
                      <a href="//micearnbusiness.org">MicEarnBusiness</a>{" "}
                      Signals?
                    </div>
                  }
                  content={
                    <div>
                      Once you receive the signal on your dashboard and email
                      notification , you can enter or exit the trade manually on
                      the trading platform of your choice.
                    </div>
                  }
                  active={false}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title={<div>Am I locked into a contract?</div>}
                  content={
                    <div>
                      Absolutely not, it's not a recurring payment subscription
                      system which means you will have to manually renew you
                      subscription upon the expiration of the current
                      subscription. For further assistance feel free to message
                      us at{" "}
                      <a href="mailto:info@micearnbusiness.org">
                        info@micearnbusiness.org
                      </a>
                      and our team will assist you.
                    </div>
                  }
                  active={false}
                />
              </div>
              <div className="col-md-6 col-12">
                <Accordion
                  title="How do I contact you?"
                  content="We're always up for a chat. Click in the bottom right corner of this website to chat to our 24/7 live chat team, or fill out our contact form, or head over to our FAQ share for answers to your questions.
 "
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
