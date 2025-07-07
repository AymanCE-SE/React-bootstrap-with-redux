// api/server.js
const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Logging & static middlewares
server.use(middlewares);

// Rewrite paths from /api/* to resources directly
server.use(jsonServer.rewriter({ "/api/*": "/$1" }));

// Block any write operations
server.use((req, res, next) => {
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return res.status(404).json({ error: "Write operations not allowed" });
  }
  next();
});

server.use(router);

module.exports = server;
