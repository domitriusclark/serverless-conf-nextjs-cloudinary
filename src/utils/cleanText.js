export default function cleanText(text) {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
}
