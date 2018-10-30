const app = require('express')()
const http = require('http').Server(app)
let id

server = app.listen(3001, function(){
    console.log('server is running on port 3001')
})

let delta = 0.0159

let Player = function(id) {
  let self = {}
  self.position = {x:0,y:0,z:0}
  self.id = id
  self.moveForward = false,
  self.moveBackward = false,
  self.moveLeft = false,
  self.moveRight = false,
  self.velocity = {x:0,y:0,z:0},
  self.direction = {x:0,y:0,z:0},
  self.rotation = 0,
  self.pitch = 0,
  self.mouse = {x:0, y:0}

  self.update = function() {


    self.direction.z = Number( self.moveForward ) - Number( self.moveBackward );
    self.direction.x = Number( self.moveLeft ) - Number( self.moveRight );
    self.direction.x = Math.round(self.direction.x)
    self.direction.y = Math.round(self.direction.y)
    self.direction.z = Math.round(self.direction.z)

    self.velocity.x -= self.velocity.x * 5.0 * delta
    self.velocity.z -= self.velocity.z * 5.0 * delta

    if ( self.moveForward || self.moveBackward ) self.velocity.z -= self.direction.z * 200.0 * delta
    if ( self.moveLeft || self.moveRight ) self.velocity.x -= self.direction.x * 200.0 * delta



  }

  self.moveMouse = function() {
    self.rotation -= self.mouse.x * 0.0004
    self.pitch -= self.mouse.y * 0.0004

    self.pitch = Math.max( - Math.PI / 2, Math.min( Math.PI / 2, self.pitch ) )
  }
  Player.list[id] = self
  return self
}

Player.onConnect = function(socket) {
  let player = Player(socket.id)
  socket.on('POSITION', function(data) {
    player.position = data.position
  })
  socket.on('INPUT', function(data) {
    switch (data.inputId) {
      case 'forward':
        player.moveForward = data.state
        break;
      case 'left':
        player.moveLeft = data.state
        break;
      case 'backward':
        player.moveBackward = data.state
        break;
      case 'right':
        player.moveRight = data.state
        break;
      case 'mouse':
        player.mouse = data.mouse
        player.moveMouse()
        break;
    }
  })
}

Player.onDisconnect = function(id){
  delete Player.list[id]
}

Player.update = function() {
  let pack = []
  for (var i in Player.list){
  var player = Player.list[i]
  player.update()
    pack.push({
      id: player.id,
      position:player.position,
      rotation: player.rotation,
      pitch: player.pitch,
      velocity: player.velocity,
    })
  }
  return pack
}

const io = require('socket.io')(server)

Player.list = {}
let SOCKET_LIST = {}

io.on('connection', function(socket) {
    socket.on('CREATE_PLAYER', function(data) {
      console.log("player")
      socket.id = Math.random() * 100000000000000000
      SOCKET_LIST[socket.id] = socket
      socket.emit('id',{id: socket.id})
      Player.onConnect(socket)
    })

    socket.on('disconnect', function() {
      delete SOCKET_LIST[socket.id]
      Player.onDisconnect(socket.id)
    })
})

setInterval(function() {
let pack = {
  player:Player.update()
}
for (let i in SOCKET_LIST){
  let socket = SOCKET_LIST[i]
  socket.emit('newPostions',pack)
}


},1000/60)
