<template>
  <div >
    <div class="cover" v-on:click="request" v-if="!controlsEnabled"/>
    <canvas id="three"></canvas>
    <router-link to="/last">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default{
  name: 'Seventeenth',
  data(){
      return {
        socket: io('localhost:3001'),
        scene: new THREE.Scene(),
        renderer: {},
        player: {},
        camera: {},
        direction: {x:0,y:0,z:0},
        prevTime: {},
        velocity: {x:0,y:0,z:0},
        mouse: {x: {}, y:{}},
        pitchObject: {},
        canJump: true,
        controlsEnabled: true,
        havePointer: 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document,
        opp:{},
        vertex: new THREE.Vector3(),
        color: new THREE.Color()
    }
  },
  created: function () {
      document.addEventListener( 'mousemove', this.mouseMove, false )
      document.addEventListener( 'keydown', this.onKeyDown, false )
      document.addEventListener( 'keyup', this.onKeyUp, false )
  },
  mounted() {
    this.init()
  },
  methods: {
    mouseMove( event ) {
      let self = this

      if ( self.controlsEnabled=== false ) return

      self.mouse.x = event.movementX || event.mozMovementX || event.webkitMovementX || 0
      self.mouse.y = event.movementY || event.mozMovementY || event.webkitMovementY || 0

      self.socket.emit('INPUT', {
        inputId: 'mouse',
        mouse: self.mouse,
      })

    },
    buildPlayer (){
      let self = this
      self.socket.emit('CREATE_PLAYER')
			self.camera.rotation.set( 0, 0, 0 )

			self.pitchObject = new THREE.Object3D()
			self.pitchObject.add( self.camera )

      let Geo = new THREE.CubeGeometry(10,10,10)
      let Mat = new THREE.MeshPhysicalMaterial({color: 0x9C254D, emissive:"rgba(156,37,77,1)", reflectivity: 0, metalness: .5})
      self.opp = new THREE.Mesh(Geo, Mat)
      self.opp.position.set(0,5,0)
      self.scene.add(self.opp)
      self.player = new THREE.Mesh(Geo, Mat)
			self.player.position.y = 10
			self.player.add( self.pitchObject )

			self.controlsEnabled = false
    },
    request () {
      let self = this
      self.controlsEnabled = true
      document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock
      document.body.requestPointerLock()
    },
    onKeyDown(event) {
      let self = this
      switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
          self.socket.emit('INPUT', {
            inputId: 'forward',
            state: true,
          })
          break;

        case 37: // left
        case 65: // a
          self.socket.emit('INPUT', {
            inputId: 'left',
            state: true,
          })
          break;

        case 40: // down
        case 83: // s
          self.socket.emit('INPUT', {
            inputId: 'backward',
            state: true,
          })
          break;

        case 39: // right
        case 68: // d
          self.socket.emit('INPUT', {
            inputId: 'right',
            state: true,
          })
          break;

        case 32: // space
          if ( self.canJump === true ) self.velocity.y += 250;
          self.canJump = false;
          break;

      }
    },
    onKeyUp(event) {
      let self = this
      switch( event.keyCode ) {

        case 38: // up
        case 87: // w

          self.socket.emit('INPUT', {
            inputId: 'forward',
            state: false,
          })
          break;

        case 37: // left
        case 65: // a
          self.socket.emit('INPUT', {
            inputId: 'left',
            state: false,
          })
          break;

        case 40: // down
        case 83: // s
          self.socket.emit('INPUT', {
            inputId: 'backward',
            state: false,
          })
          break;

        case 39: // right
        case 68: // d
          self.socket.emit('INPUT', {
            inputId: 'right',
            state: false,
          })
          break;
      }
    },
    init() {
      let self = this

      self.socket.on('id', function(data) {
        self.id = data.id
      })


			if ( self.havePointer ) {

				let element = document.body

				let pointerlockchange = function ( event ) {

					if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
						self.controlsEnabled = true;
					} else {
						self.controlsEnabled = false;
					}

				}

				document.addEventListener( 'pointerlockchange', pointerlockchange, false )
				document.addEventListener( 'mozpointerlockchange', pointerlockchange, false )
				document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false )

      }

			self.prevTime = performance.now()

      self.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
      self.scene.background = new THREE.Color( 0x7890CD );

      let light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 )
      light.position.set( 0.5, 1, 0.75 )
      self.scene.add( light )

      var floorGeometry = new THREE.PlaneBufferGeometry( 2000, 2000, 100, 100 );
				floorGeometry.rotateX( - Math.PI / 2 );
				// vertex displacement
				var position = floorGeometry.attributes.position;
				for ( var i = 0, l = position.count; i < l; i ++ ) {
					self.vertex.fromBufferAttribute( position, i );
					self.vertex.x += Math.random() * 20 - 10;
					self.vertex.y += Math.random() * 2;
					self.vertex.z += Math.random() * 20 - 10;
					position.setXYZ( i, self.vertex.x, self.vertex.y, self.vertex.z );
				}
				floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices
				position = floorGeometry.attributes.position;
				var colors = [];
				for ( var i = 0, l = position.count; i < l; i ++ ) {
					self.color.setHSL( Math.random() * 0.3 + 0.5 , Math.random() * 0.3 + 0.5, Math.random() * 0.25 + 0.75 );
					colors.push( self.color.r, self.color.g, self.color.b );
				}
				floorGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
				var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
				var floor = new THREE.Mesh( floorGeometry, floorMaterial );
				self.scene.add( floor )

      self.buildPlayer()
      self.scene.add( self.player );



      self.renderer = new THREE.WebGLRenderer( {canvas: document.getElementById('three'), antialias: true} )
      self.renderer.setPixelRatio( window.devicePixelRatio )
      self.renderer.setSize( window.innerWidth, window.innerHeight )


      self.animate()


    },
    animate(){
      let self = this
      requestAnimationFrame( self.animate );

      if ( self.controlsEnabled === true ) {
        let time = performance.now()
        let delta = delta = 0.0159

        self.socket.emit("POSITION", {
          position: self.player.position
        })

        self.socket.on('newPostions', function(data) {
          for (var i = 0; i < data.player.length; i++) {
            if (data.player[i].id == self.id) {
              self.player.rotation.y = data.player[i].rotation
              self.pitchObject.rotation.x = data.player[i].pitch
              self.player.translateX( data.player[i].velocity.x * delta / 200)
              self.player.translateZ( data.player[i].velocity.z * delta / 200)
            }else {
              self.opp.position.x = data.player[i].position.x
              self.opp.position.z = data.player[i].position.z
              self.opp.rotation.y = data.player[i].rotation
            }
          }
        })

        self.prevTime = time;

      }
      self.renderer.render( self.scene, self.camera )
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cover{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
