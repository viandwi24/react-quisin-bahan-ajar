const { Quiz, Connect: ConnectDB } = require('./db')
const { initServer } = require('./routes')

;(async () => {
  console.log('Starting server...')

  await ConnectDB()
  console.log('📚 Connected to mongodb://localhost:27017')

  const { app, port: portServer, start: startServer } =  initServer()
  await startServer()
  console.log(`🚀 Server ready at http://localhost:${portServer}`)
})()
