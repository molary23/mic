module.exports = function formattedDate(date) {
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    formatttedDate = `${year}-${month}-${day}`;
  return formatttedDate;
};
