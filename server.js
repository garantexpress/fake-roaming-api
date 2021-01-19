const db = { users: [] };
// Create 1000 users
for (let i = 0; i < 1000; i++) {
  db.users.push({ id: i, name: `user${i}` });
}

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
