const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

// Create server & router
const server = jsonServer.create();

// Correct file path
const filePath = path.join(__dirname, "db.json");
const router = jsonServer.router(filePath);

const middlewares = jsonServer.defaults();

// Middlewares
server.use(middlewares);
server.use(cors());

// Rewrite URLs properly
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1"
  })
);

// Use router
server.use(router);

// Export server — no server.listen()
module.exports = server;
