import React, { useRef } from "react";

import Home from "../component/Home";
import About from "../component/About";
import Service from "../component/Service";
import Contact from "../component/Contact";
import Faq from "../component/Faq";
import Start from "../component/Start";
import Refer from "../component/Refer";
import MainNav from "../layout/MainNav";
import Footer from "../layout/Footer";
import SubFooter from "../layout/SubFooter";

function Main() {
  const serviceRef = useRef(),
    contactRef = useRef(),
    aboutRef = useRef(),
    homeRef = useRef(),
    faqRef = useRef();

  return (
    <div>
      <MainNav {...{ homeRef, aboutRef, serviceRef, faqRef, contactRef }} />
      <Home homeRef={homeRef} />
      <About aboutRef={aboutRef} />
      <Service serviceRef={serviceRef} />
      <Start />
      <Refer />
      <Faq faqRef={faqRef} />
      <Contact contactRef={contactRef} />
      <SubFooter />
      <Footer />
    </div>
  );
}

export default Main;
