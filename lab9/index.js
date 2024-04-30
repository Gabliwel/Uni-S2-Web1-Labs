const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = new Server(server)

const PORT = 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    socket.on('chat msg', (payload) => {
        io.emit('chat msg', payload)
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
