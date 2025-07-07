const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Source: db.json within deployment bundle
const src = path.join(__dirname, "db.json");
// Destination: writable path in serverless environment
const dst = path.join(os.tmpdir(), "db.json");

// Always copy fresh db.json from read-only bundle into tmp
fs.copyFileSync(src, dst);

const server = jsonServer.create();
const router = jsonServer.router(dst);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({ "/api/*": "/$1" }));
server.use(router);

module.exports = server;
