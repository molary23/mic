import React from "react";
import PropTypes from "prop-types";

function DateFormat(props) {
  const { date } = props;
  let time,
    newDate = new Date(date);

  let hours = newDate.getHours(),
    minutes = newDate.getMinutes(),
    ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let day = newDate.getDate(),
    month = newDate.getMonth() + 1,
    year = newDate.getFullYear();
  day = `0${day}`.slice(-2);
  month = `${month}`.length < 2 ? `0${month}` : month;
  let strTime = hours + ":" + minutes + " " + ampm;
  let strDate = `${day}/${month}/${year}`;
  time = `${strTime} ${strDate}`;

  return <div>{time}</div>;
}

DateFormat.propTypes = {
  date: PropTypes.string.isRequired,
};

export default DateFormat;
