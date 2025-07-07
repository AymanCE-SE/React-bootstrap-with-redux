const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Copy db.json into the **temporary** writable directory
const tmpDb = path.join(os.tmpdir(), "db.json");
if (!fs.existsSync(tmpDb)) {
  fs.copyFileSync(path.join(__dirname, "db.json"), tmpDb);
}

const server = jsonServer.create();
const router = jsonServer.router(tmpDb);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({ "/api/*": "/$1" }));
server.use(router);

module.exports = server;
