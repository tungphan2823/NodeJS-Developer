const http = require("http");
const PORT = 3000;
const friends = [
  {
    id: 0,
    name: "Tesla",
  },
  {
    id: 1,
    name: "Newton",
  },
  {
    id: 2,
    name: "Alex",
  },
];
const server = http.createServer((req, res) => {
  const items = req.url.split("/");
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("request", friend);
      friends.push(JSON.parse(friend));
      
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    // res.writeHead(200, {
    //   "Content-Type": "application/json",
    // });
    if (items.length === 3) {
      const friendIndex = +items[2];
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>Message</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
