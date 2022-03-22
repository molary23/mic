export default function decrypt(encoded) {
  const salt = "the greatest TO EVER DO it is Molary",
    textToChars = (text) => text.split("").map((c) => c.charCodeAt(0)),
    applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
}