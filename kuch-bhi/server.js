const http = require('http')
const socketIO = require('socket.io')

function handler (req, res) {
  res.writeHead(200)
  res.end('Cool')
}

const app = http.createServer(handler)
const io = socketIO(app)

io.on('connection', function (socket) {
  console.log('Someone connected to me')

  socket.on('join', function (address) {
    console.log('Someone joined ' + address)

    socket.join(address)

    socket.on('transaction', function (data) {
      socket.to(address).emit('transaction', data)
    })
  })
})

app.listen(9090)
