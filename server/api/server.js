const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Source and destination paths
const src = path.join(__dirname, "db.json");
const dest = path.join(os.tmpdir(), "db.json");

// Copy db.json into the writable tmp directory on each invocation
fs.copyFileSync(src, dest);

// Create and configure JSON Server
const server = jsonServer.create();
const router = jsonServer.router(dest);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1"
  })
);
server.use(router);

// Export the configured server (no server.listen here)
module.exports = server;
