export default (str, len = 35) => {
  if (str.length > len) {
    return `${str.slice(0, len)}...`;
  }
  return str;
};
