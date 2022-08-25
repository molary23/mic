const capitalizeOne = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeAll = (str) => {
  return str.split(" ").map(capitalizeOne).join(" ");
};
