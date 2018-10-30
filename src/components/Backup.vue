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
  name: 'Backup',
  data(){
      return {
        socket: io('localhost:3001'),
        scene: new THREE.Scene(),
        renderer: {},
        player: {},
        camera: {},
        direction: {},
        prevTime: {},
        controls: {},
        velocity: {x:0,y:0,z:0},
        mouse: {x: {}, y:{}},
        pitchObject: {},
        canJump: true,
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        controlsEnabled: true,
        pie: Math.PI / 2,
        havePointer: 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document,
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

      self.player.rotation.y -= self.mouse.x * 0.0004
      self.pitchObject.rotation.x -= self.mouse.y * 0.0004

      self.pitchObject.rotation.x = Math.max( - self.pie, Math.min( self.pie, self.pitchObject.rotation.x ) )
    },
    buildPlayer (){
      let self = this

			self.camera.rotation.set( 0, 0, 0 )

			self.pitchObject = new THREE.Object3D()
			self.pitchObject.add( self.camera )

      let Geo = new THREE.CubeGeometry(10,10,10)
      let Mat = new THREE.MeshPhysicalMaterial({color: 0x800080, emissive:"rgba(200,0,200,1)", reflectivity: 0, metalness: .5})
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
          self.moveForward = true;
          break;

        case 37: // left
        case 65: // a
          self.moveLeft = true;
          break;

        case 40: // down
        case 83: // s
          self.moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          self.moveRight = true;
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
          self.moveForward = false;
          break;

        case 37: // left
        case 65: // a
          self.moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          self.moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          self.moveRight = false;
          break;
      }
    },
    init() {
      let self = this

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

			self.prevTime = performance.now();
      self.direction = new THREE.Vector3();

      self.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 1000 );
      self.scene.background = new THREE.Color( 0xffffff );

      let light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
      light.position.set( 0.5, 1, 0.75 );
      self.scene.add( light );

      self.buildPlayer()
      self.scene.add( self.player );
      let floorGeometry = new THREE.CubeGeometry(1000,-1,1000)
      let floorMaterial = new THREE.MeshStandardMaterial({wireframe: true})
      let floor = new THREE.Mesh(floorGeometry, floorMaterial )
      self.scene.add( floor )


      self.renderer = new THREE.WebGLRenderer( {canvas: document.getElementById('three'), antialias: true} )
      self.renderer.setPixelRatio( window.devicePixelRatio )
      self.renderer.setSize( window.innerWidth, window.innerHeight )


      self.animate()


    },
    animate(){
      let self = this
      requestAnimationFrame( self.animate );

      if ( self.controlsEnabled === true ) {
        let time = performance.now();
        let delta = ( time - self.prevTime ) / 1000

        self.direction.z = Number( self.moveForward ) - Number( self.moveBackward );
        self.direction.x = Number( self.moveLeft ) - Number( self.moveRight );
        self.direction.normalize(); // this ensures consistent movements in all directions

        self.velocity.x -= self.velocity.x * 5.0 * delta
        self.velocity.z -= self.velocity.z * 5.0 * delta

        if ( self.moveForward || self.moveBackward ) self.velocity.z -= self.direction.z * 200.0 * delta
        if ( self.moveLeft || self.moveRight ) self.velocity.x -= self.direction.x * 200.0 * delta


        self.player.translateX( self.velocity.x * delta );
        self.player.translateZ( self.velocity.z * delta );

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
