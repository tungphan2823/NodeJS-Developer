const { send } = require("./request");
const { read } = require("./response");
function makeRequire(url, data) {
  send(url, data);
  return read();
}
const responseData = makeRequire("https://google.com", "hello");
console.log(responseData);
