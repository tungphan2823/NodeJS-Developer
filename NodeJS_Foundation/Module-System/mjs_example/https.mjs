import { send } from "./request.mjs";
import { read } from "./response.mjs";
function makeRequire(url, data) {
  send(url, data);
  return read();
}
const responseData = makeRequire("https://google.com", "hello");
console.log(responseData);
