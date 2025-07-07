const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));
const router = jsonServer.router(data);

server.use(jsonServer.defaults());
server.use(jsonServer.rewriter({ "/api/*": "/$1" }));
server.use(router);

module.exports = server;
