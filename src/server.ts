import { http } from './http'
import './websocket/client'
import './websocket/admin'

http.listen(3333, () => console.log('Server running at http://localhost:3333'))
