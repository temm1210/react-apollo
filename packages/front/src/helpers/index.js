import moment from "moment";

export function styleModify(selector, styleObj) {
  // const documentTmp = doc;
  for (const key in styleObj) {
    document.querySelector(selector).style[key] = styleObj[key];
  }
}

export function makeDate(date) {
  const now = moment();
  const dataDate = moment(date);
  const diff = now.diff(dataDate);
  return diff > 80000000
    ? moment(dataDate).format("YYYY-MM-DD HH:mm")
    : moment(date).fromNow();
}
