export default function typeCheck(data, typeStr) {
  return Object.prototype.toString.call(data) === typeStr;
}
