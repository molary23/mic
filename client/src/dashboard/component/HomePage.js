import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";

import PrivateRoute from "../../util/PrivateRoute";

import Footer from "../../layout/Footer";
import SubNav from "../../layout/SubNav";
import SideNav from "../../layout/SideNav";
import Signals from "./admin/Signals";

function HomePage(props) {
  const [open, setOpen] = useState(true);

  const toggleOpen = (opt) => {
    setOpen(opt);
  };

  return (
    <div className="HomePage">
      <SubNav onClick={toggleOpen} />
      <SideNav act={open} />
      <section>
        <div className="dashboard-content mt-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="dashboard-intro card">
                  <div className="container-">
                    <div className="row">
                      <div className="col-8">
                        <div className="dashboard-welcome">
                          <h3 className="mb-3">Welcome back Adeola!</h3>
                          <p>
                            You have 20 days left in your current Subscription.
                          </p>
                        </div>
                      </div>
                      <div className="col-4 days-left-section">
                        <div className="days-left">
                          <button className="btn dashboard-pay-btn">
                            Pay Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="referral-details">
                  <p>Copied to Clipboard!</p>
                  <div className="referral-id-box card">
                    <div className="referrral-id  ms-2  pt-1">
                      <code>http://localhost:3000/referral/:molary</code>
                    </div>
                    <div className="copy-referrral-id">
                      <button type="button" className="btn">
                        <i className="far fa-copy" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="sub-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-chart-line" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>Active</h2>
                        <p>30 days left</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="referrals-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-user-friends " />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>20</h2>
                        <p>Referrals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bonus-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-hand-holding-usd" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>$20</h2>
                        <p>Bonus</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          Homepage
          <Outlet />
          {/*<Routes>
          <Route
            exact
            path="/admin-signals"
            element={<PrivateRoute Component={Signals} />}
          />
        </Routes>*/}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
