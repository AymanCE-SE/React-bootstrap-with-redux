import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("api/db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(router);

// Export the handler for Vercel
export default server;