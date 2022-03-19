import React, { useState, useEffect } from "react";
import { BiUpArrowCircle } from "react-icons/bi";
function GoUp() {
  const [show, setShow] = useState(false);
  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const checkPosition = () => {
    let winScroll = window.scrollY,
      toTop = 50;
    if (winScroll > toTop) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
  }, []);

  return (
    <div
      className={`scroll-up ${show ? "showscroller" : ""}`}
      onClick={scrollUp}
    >
      <BiUpArrowCircle />
    </div>
  );
}

export default GoUp;
