import { create, router as _router, defaults } from 'json-server'
import cors from 'cors'
const server = create()
const router = _router('db.json')
const middlewares = defaults()

server.use(cors())
server.use(middlewares)
server.use('/api', router)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log('JSON Server is running'))
