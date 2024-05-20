// const { send } = require("./internals/request.js");
// const { read } = require("./internals/response.js");
const { send, read } = require("./internals");
function makeRequire(url, data) {
  send(url, data);
  return read();
}
const responseData = makeRequire("https://google.com", "hello");
console.log(responseData);
