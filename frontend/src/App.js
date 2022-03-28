import React, { useRef } from "react";
import "./style/main.css";

import Home from "./component/Home";
import About from "./component/About";
import Service from "./component/Service";
import Contact from "./component/Contact";
import Faq from "./component/Faq";
import MainNav from "./layout/MainNav";
import Footer from "./layout/Footer";
import SubFooter from "./layout/SubFooter";

function App() {
  const serviceRef = useRef(),
    contactRef = useRef(),
    aboutRef = useRef(),
    homeRef = useRef(),
    faqRef = useRef();

  return (
    <div className="App">
      <MainNav {...{ homeRef, aboutRef, serviceRef, faqRef, contactRef }} />
      <Home homeRef={homeRef} />
      <About aboutRef={aboutRef} />
      <Service serviceRef={serviceRef} />
      <Faq faqRef={faqRef} />
      <Contact contactRef={contactRef} />
      <SubFooter />
      <Footer />
    </div>
  );
}

export default App;
