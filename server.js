const jsonServer = require("json-server");
const server = jsonServer.create();
const serverPort = process.env.PORT || 3000;
const data = require("./mock_data");
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, _res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.use(router);
server.listen(serverPort, () => {
  console.log("JSON Server is running");
});
