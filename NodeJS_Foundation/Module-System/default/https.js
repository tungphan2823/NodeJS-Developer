const { send } = require("./request.js");
const { read } = require("./response.js");
function makeRequire(url, data) {
  send(url, data);
  return read();
}
const responseData = makeRequire("https://google.com", "hello");
console.log(responseData);
