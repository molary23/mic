module.exports = function formattedDate(date) {
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    paddededmonth = `${month}`.length < 2 ? `0${month}` : month;
  formatttedDate = `${year}-${paddededmonth}-${day}`;
  return formatttedDate;
};
