import React from "react";

import Contact from "./Contact";
import Service from "./Service";

function Home() {
  return (
    <div className="main-home">
      <div className="main-home-top"></div>
      <div className="main-home-intro">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="intro-1">
                <div className="intro-icon">
                  <i className="fas fa-satellite-dish fa-2x" />
                </div>
                <h4 className="mt-2">Signal</h4>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati
                </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="intro-2">
                <div className="intro-icon">
                  <i className="fas fa-chart-line fa-2x" />
                </div>
                <h4 className="mt-2">Take Profit</h4>
                <p>
                  Et harum quidem rerum facilis est et expedita distinctio. Nam
                  libero tempore, cum soluta nobis est eligendi optio cumque
                  nihil impedit quo minus id quod maxime
                </p>
              </div>
            </div>
            <div className="col-sm">
              <div className="intro-3">
                <div className="intro-icon">
                  <i className="fas fa-hand-holding-usd fa-2x" />
                </div>

                <h4 className="mt-2">Stop Loss</h4>
                <p>
                  Itaque earum rerum hic tenetur a sapiente delectus, ut aut
                  reiciendis voluptatibus maiores alias consequatur aut
                  perferendis doloribus asperiores repellat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-home-middle"></div>
      <div className="main-home-about">
        <div className="container">
          <h1>Lorem Ipsum</h1>
          <p>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is
            pleasure, but because those who do not know how to pursue pleasure
            rationally encounter consequences that are extremely painful. Nor
            again is there anyone who loves or pursues or desires to obtain pain
            of itself, because it is pain, but because occasionally
            circumstances occur in which toil and pain can procure him some
            great pleasure. To take a trivial example, which of us ever
            undertakes laborious physical exercise, except to obtain some
            advantage from it? But who has any right to find fault with a man
            who chooses to enjoy a pleasure that has no annoying consequences,
            or one who avoids a pain that produces no resultant pleasure?
          </p>
        </div>
      </div>

      <Service />
      <Contact />
    </div>
  );
}

export default Home;
