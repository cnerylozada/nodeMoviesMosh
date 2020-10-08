exports.tokenExpiratonTimeInSeconds = 5 * 60;

exports.isValidEmail = (email) =>
  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email);
