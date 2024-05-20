// const request = require("./request");
// const response = require("./response");
// module.exports = {
//   send: request.send,
//   read: response.read,
//   REQUEST_TIMEOUT: request.REQUEST_TIMEOUT,
// };
module.exports = {
  ...require("./request"),
  ...require("./response"),
};
