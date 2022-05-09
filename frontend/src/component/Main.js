import React, { useRef, useEffect } from "react";

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

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

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
