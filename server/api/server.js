import { create, router as _router, defaults, rewriter } from 'json-server';
import cors from 'cors';

const server = create();
const router = _router('api/db.json');
const middlewares = defaults();

server.use(cors());
server.use(middlewares);
server.use(rewriter({ '/api/*': '/$1' }));
server.use(router);

export default server;