import React, { useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../asset/images/logo.png";

function MainNav(props) {
  const { homeRef, aboutRef, serviceRef, faqRef, contactRef } = props,
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
      contact = contactRef.current;

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
                href="//dashboard.micearnbusiness.org/"
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
                href="//dashboard.micearnbusiness.org/#/register"
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
