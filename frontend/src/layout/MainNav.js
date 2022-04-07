import React, { useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../asset/images/logo.png";

function MainNav(props) {
  const {
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
    } = props,
    [active, setActive] = useState(0),
    [display, setDisplay] = useState(false),
    [focus, setFocus] = useState(false),
    location = useLocation(),
    navigate = useNavigate(),
    page = location.pathname.split("/")[1];

  const addFocus = () => {
    let winScroll = window.scrollY;
    if (winScroll > 100) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };

  const scrollToSection = (where, active) => {
    window.scrollTo({
      top: where.offsetTop,
      behavior: "smooth",
    });
    setActive((active) => active);
    setDisplay(!display);
  };

  const clickMover = (e) => {
    let linkid = e.target.id;
    if (page !== "") {
      navigate("/", { replace: true });
    } else {
      switch (linkid) {
        case "homelink": {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setActive((active) => 0);
          break;
        }
        case "aboutlink": {
          scrollToSection(aboutRef.current, 1);
          break;
        }
        case "servicelink": {
          scrollToSection(serviceRef.current, 2);
          break;
        }
        case "faqlink": {
          scrollToSection(faqRef.current, 3);
          break;
        }
        case "contactlink": {
          scrollToSection(contactRef.current, 4);
          break;
        }
        default:
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setActive((active) => 0);
          break;
      }
    }
  };

  const changeFocus = () => {
    const about = aboutRef.current,
      home = homeRef.current,
      service = serviceRef.current,
      faq = faqRef.current,
      contact = contactRef.current,
      time = timeRef.current,
      money = moneyRef.current,
      work = workRef.current,
      consistent = consistentRef.current,
      accuracy = accuracyRef.current,
      support = supportRef.current;

    let winScroll = window.scrollY;
    if (winScroll >= 0 && winScroll < home.clientHeight) {
      setActive((active) => 0);
    } else if (
      winScroll >= about.offsetTop &&
      winScroll < about.offsetTop + about.clientHeight
    ) {
      setActive((active) => 1);
    } else if (
      winScroll >= service.offsetTop &&
      winScroll < service.offsetTop + service.clientHeight
    ) {
      setActive((active) => 2);
      /* work.classList.remove("scaled");
      money.classList.remove("scaled");
      consistent.classList.remove("scaled");
      accuracy.classList.remove("scaled");
      support.classList.remove("scaled");
      time.classList.remove("scaled");*/
    } else if (
      winScroll >= faq.offsetTop &&
      winScroll < faq.offsetTop + faq.clientHeight
    ) {
      setActive((active) => 3);
    } else if (
      winScroll >= contact.offsetTop &&
      winScroll < contact.offsetTop + contact.clientHeight
    ) {
      setActive((active) => 4);
    }

    if (
      winScroll >= time.offsetTop - 100 &&
      winScroll < time.offsetTop + time.clientHeight &&
      time.classList.contains("scaled") === false
    ) {
      work.classList.remove("scaled");
      money.classList.remove("scaled");
      consistent.classList.remove("scaled");
      accuracy.classList.remove("scaled");
      support.classList.remove("scaled");
      time.classList.add("scaled");
    } else if (
      winScroll >= money.offsetTop - 100 &&
      winScroll < money.offsetTop + money.clientHeight &&
      money.classList.contains("scaled") === false
    ) {
      work.classList.remove("scaled");
      consistent.classList.remove("scaled");
      accuracy.classList.remove("scaled");
      support.classList.remove("scaled");
      time.classList.remove("scaled");
      money.classList.add("scaled");
    } else if (
      winScroll >= work.offsetTop - 100 &&
      winScroll < work.offsetTop + work.clientHeight &&
      work.classList.contains("scaled") === false
    ) {
      money.classList.remove("scaled");
      consistent.classList.remove("scaled");
      accuracy.classList.remove("scaled");
      support.classList.remove("scaled");
      time.classList.remove("scaled");
      work.classList.add("scaled");
    } else if (
      winScroll >= consistent.offsetTop - 100 &&
      winScroll < consistent.offsetTop + consistent.clientHeight &&
      consistent.classList.contains("scaled") === false
    ) {
      work.classList.remove("scaled");
      money.classList.remove("scaled");
      accuracy.classList.remove("scaled");
      support.classList.remove("scaled");
      time.classList.remove("scaled");
      consistent.classList.add("scaled");
    } else if (
      winScroll >= accuracy.offsetTop - 100 &&
      winScroll < accuracy.offsetTop + accuracy.clientHeight &&
      accuracy.classList.contains("scaled") === false
    ) {
      work.classList.remove("scaled");
      money.classList.remove("scaled");
      consistent.classList.remove("scaled");
      support.classList.remove("scaled");
      time.classList.remove("scaled");
      accuracy.classList.add("scaled");
    } else if (
      winScroll >= support.offsetTop - 100 &&
      winScroll < support.offsetTop + support.clientHeight &&
      support.classList.contains("scaled") === false
    ) {
      work.classList.remove("scaled");
      money.classList.remove("scaled");
      consistent.classList.remove("scaled");
      accuracy.classList.remove("scaled");
      time.classList.remove("scaled");
      support.classList.add("scaled");
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", changeFocus, { passive: true });
    window.addEventListener("scroll", addFocus, { passive: true });
    return () => {
      window.removeEventListener("scroll", changeFocus);
      window.removeEventListener("scroll", addFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={`${
        focus ? "show-bg" : ""
      } navbar navbar-expand-sm navbar-light fixed-top top-nav`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="MIC Earn Business Logo" className="nav-logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbarMenu"
          onClick={() => {
            setDisplay(!display);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${!display ? "collapse" : ""}  navbar-collapse`}
          id="mainNavbarMenu"
        >
          <ul className="navbar-nav ms-auto right-nav">
            <li className="nav-item">
              <span
                className={`${
                  active === 0 ? "active-nav" : ""
                } nav-link home-link`}
                onClick={(e) => clickMover(e)}
                id="homelink"
              >
                Home
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`${
                  active === 1 ? "active-nav" : ""
                } nav-link about-link`}
                id="aboutlink"
                onClick={(e) => clickMover(e)}
              >
                About
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`${
                  active === 2 ? "active-nav" : ""
                } nav-link service-link`}
                id="servicelink"
                onClick={(e) => clickMover(e)}
              >
                Services
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`${
                  active === 3 ? "active-nav" : ""
                } nav-link faq-link`}
                id="faqlink"
                onClick={(e) => clickMover(e)}
              >
                FAQ
              </span>
            </li>
            <li className="nav-item">
              <span
                className={`${
                  active === 4 ? "active-nav" : ""
                } nav-link contact-link`}
                id="contactlink"
                onClick={(e) => clickMover(e)}
              >
                Contact
              </span>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="//dashboard.micearnbusiness.org"
                target="_blank"
                rel="noreferrer"
              >
                Login
              </a>
            </li>
            <li className="nav-item">
              <a
                type="button"
                className="btn nav-link default-btn"
                href="//dashboard.micearnbusiness.org/register"
                target="_blank"
                rel="noreferrer"
              >
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
