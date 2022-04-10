import keys from "./config/keys";

export default function encrypt(text, type) {
  let salt;
  if (type === "local") {
    salt = keys.localKey;
  } else if (type === "mail") {
    salt = keys.mailKey;
  }
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0)),
    byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2),
    applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
}
