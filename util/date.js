export function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function getTime(date) {
  return date.toISOString().slice(11, 13);
}

export function fixAcceptedTime(time) {
  let fixedTime = time.slice(4, 21);
  return fixedTime;
}
