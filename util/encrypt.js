module.exports = function crypt(text) {
  const salt = "the greatest TO EVER DO it is Molary",
    textToChars = (text) => text.split("").map((c) => c.charCodeAt(0)),
    byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2),
    applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};
