const REQUEST_TIMEOUT = 500;

function encrypt(data) {
  return "encrypted data";
}
function send(url, data) {
  const encryptData = encrypt(data);
  console.log(`${encryptData} to ${url}`);
}
export { REQUEST_TIMEOUT, send };
