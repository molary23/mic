import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "../contexts/ThemeContext";

export default function ThemeContextWrapper(props) {
  let mode = localStorage.getItem("mode"),
    display;
  if (mode === "n") {
    display = themes.dark;
  } else if (mode === "d") {
    display = themes.light;
  } else if (mode === "i") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      display = themes.dark;
    }
  } else if (mode === "a") {
    let hour = new Date().getHours();
    if (hour > 7 && hour < 20) {
      display = themes.dark;
    }
  }
  const [theme, setTheme] = useState(display);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.remove("dark-content");
        break;
      case themes.dark:
        document.body.classList.add("dark-content");
        break;
      default:
        document.body.classList.add("white-content");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
