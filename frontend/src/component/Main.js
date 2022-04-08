import React, { useRef } from "react";

import Home from "../component/Home";
import About from "../component/About";
import Service from "../component/Service";
import Contact from "../component/Contact";
import Faq from "../component/Faq";
import Refer from "../component/Refer";
import MainNav from "../layout/MainNav";
import Footer from "../layout/Footer";
import SubFooter from "../layout/SubFooter";

function Main() {
  const serviceRef = useRef(),
    contactRef = useRef(),
    aboutRef = useRef(),
    homeRef = useRef(),
    faqRef = useRef(),
    timeRef = useRef(),
    moneyRef = useRef(),
    accuracyRef = useRef(),
    consistentRef = useRef(),
    supportRef = useRef(),
    workRef = useRef();

  return (
    <div>
      <MainNav
        {...{
          homeRef,
          aboutRef,
          serviceRef,
          faqRef,
          contactRef,
          timeRef,
          moneyRef,
          accuracyRef,
          consistentRef,
          supportRef,
          workRef,
        }}
      />
      <Home homeRef={homeRef} />
      <About aboutRef={aboutRef} />
      <Service
        serviceRef={serviceRef}
        timeRef={timeRef}
        moneyRef={moneyRef}
        accuracyRef={accuracyRef}
        consistentRef={consistentRef}
        supportRef={supportRef}
        workRef={workRef}
      />
      <Refer />
      <Faq faqRef={faqRef} />
      <Contact contactRef={contactRef} />
      <SubFooter />
      <Footer />
    </div>
  );
}

export default Main;
