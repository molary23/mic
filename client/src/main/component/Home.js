import React from "react";

function Home() {
  return (
    <div className="main-home">
      <div className="main-home-top"></div>
      <div className="main-home-intro">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <div className="intro-1">
                <i className="far fa-grin-beam fa-3x" />
                <h4 className="mt-2">Signal</h4>
              </div>
            </div>
            <div className="col-sm">
              <div className="intro-2">
                <i className="fas fa-kiss-beam fa-3x" />
                <h4 className="mt-2">Take Profit</h4>
              </div>
            </div>
            <div className="col-sm">
              <div className="intro-3">
                <i className="fas fa-eye-dropper fa-3x" />

                <h4 className="mt-2">Stop Loss</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-home-middle"></div>
      <div className="main-home-about">
        <h1>Lorem Ipsum</h1>
        <p>
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is pleasure,
          but because those who do not know how to pursue pleasure rationally
          encounter consequences that are extremely painful. Nor again is there
          anyone who loves or pursues or desires to obtain pain of itself,
          because it is pain, but because occasionally circumstances occur in
          which toil and pain can procure him some great pleasure. To take a
          trivial example, which of us ever undertakes laborious physical
          exercise, except to obtain some advantage from it? But who has any
          right to find fault with a man who chooses to enjoy a pleasure that
          has no annoying consequences, or one who avoids a pain that produces
          no resultant pleasure?
        </p>
      </div>

      <div className="main-home-contact"></div>
    </div>
  );
}

export default Home;
