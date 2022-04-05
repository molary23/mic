import React, { useState, useEffect } from "react";
import { BiUpArrowCircle } from "react-icons/bi";
function GoUp() {
  const [show, setShow] = useState(false),
    mode = localStorage.getItem("mode");
  let hour = new Date().getHours();
  const changeAuto = () => {
    if (mode === "a") {
      if (hour > 7 && hour < 20) {
        if (!document.body.classList.contains("dark-content")) {
          document.body.classList.add("dark-content");
        }
      }
    }
  };

  const scrollUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const checkPosition = () => {
    let winScroll = window.scrollY,
      toTop = 500;
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

  useEffect(changeAuto, [hour, mode]);

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
