<template>
  <div class="main">
    <div class="whiteHalf">
      <div class="title">
        <h1>Three.js</h1>
      </div>
      <div class="grid">
        <canvas id="ctx" width="300" height="300"></canvas>
      </div>
    </div>
    <div class="blueHalf">
      <div class="list">
        <div class="listItem">
          <div class="dot"/>
          <h2>Adds a Z axis</h2>
        </div>
        <button type="button" name="button" v-on:click="cameraExample">
          <div class="listItem">
            <div class="dot"/>
            <h2>Manages camera</h2>
          </div>
        </button>
        <button type="button" name="button" v-on:click="lightingExample">
          <div class="listItem">
            <div class="dot"/>
            <h2>Manages lighting</h2>
          </div>
        </button>
        <button type="button" name="button" v-on:click="modelsExample">
          <div class="listItem">
            <div class="dot"/>
            <h2>Import models &amp; textures</h2>
          </div>
        </button>
        <button type="button" name="button" v-on:click="animationsExample">
          <div class="listItem">
            <div class="dot"/>
            <h2>Manage animations</h2>
          </div>
        </button>
          <div class="listItem">
            <div class="dot"/>
            <h2>Build VR simulations</h2>
          </div>
      </div>

    </div>
    <router-link to="/seventh">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Sixth',
  data () {
    return {
      scene: new THREE.Scene(),
      renderer: {},
      model: {},
      camera: {},
      light: {},
      gltf: {},
      mixer: undefined,
      cameraActive: false,
      lightingActive: 0,
      modelActive: false,
      animateActive: false,
      clock: new THREE.Clock()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let self = this
      self.renderer = new THREE.WebGLRenderer({canvas: document.getElementById('ctx'), antialias: true})
      self.renderer.setClearColor(0xffffff)
      self.renderer.setPixelRatio(window.devicePixelRatio)
      self.renderer.setSize(window.innerWidth/2.5, window.innerWidth/2.5)

      let area = new THREE.CubeGeometry(15,15,15)
      let boxMat = new THREE.MeshPhysicalMaterial({color: 0x800080, emissive:"rgba(200,0,200,1)", reflectivity: 0, metalness: .5})
      self.model = new THREE.Mesh(area, boxMat )
      self.model.rotation.y = -.9
      self.model.rotation.x = 0.5
      self.camera = new THREE.PerspectiveCamera(70,(window.innerWidth/2.5) / (window.innerHeight/2.5), 1, 15000)
      self.light = new THREE.PointLight(0xffffff, .7)
      self.light.position.set(1,1,25)
      self.scene.add(self.light)
      self.scene.add(self.model)
      self.camera.position.set(1,1,25)

      let loader = new THREE.GLTFLoader()
      loader.load( 'static/knight/scene.gltf', function( data ) {
      self.gltf = data;
      self.gltf.scene.scale.set(.12,.12,.12)
      self.gltf.scene.visible = false
      self.gltf.scene.rotation.x = 0.5

      let animations = self.gltf.animations
        if ( self.gltf.animations && animations.length ) {
          self.mixer = new THREE.AnimationMixer( self.gltf.scene );

          for ( var i = 0; i < animations.length; i ++ ) {
            let animation = animations[ i ];
            let action = self.mixer.clipAction( animation );
            if ( self.animateActive ) action.play();
          }
        }

        self.scene.add( self.gltf.scene );
      }, undefined, function ( error ) {
        console.error( error );
      } )

      self.animate();
    },
    cameraExample(){
      let self = this
      if (self.cameraActive === false) {
        self.camera.position.set(1,1,125)
        self.cameraActive = true
      }else {
        self.camera.position.set(1,1,25)
        self.cameraActive = false
      }
    },
    lightingExample(){
      let self = this
      if(self.lightingActive === 0){
        self.model.material.color = {b:1, g:1, r:1 }
        self.model.material.emissive = {b:.5, g:.5, r:.5}
        self.light.color = {b:0, g:0, r:1}
        self.lightingActive = 1
      }else if (self.lightingActive === 1) {
        self.light.color = {b:1, g:0, r:0}
        self.lightingActive = 2
      }else if (self.lightingActive === 2) {
        self.light.color = {b:0, g:1, r:0}
        self.lightingActive = 3
      }else if (self.lightingActive === 3) {
        self.light.color = {b:0, g:0, r:0}
        self.lightingActive = 4
      }else if (self.lightingActive === 4) {
        self.light.color = {b:1, g:1, r:1}
        self.lightingActive = 0
        self.model.material.color = {b:0.5019607843137255, g:0, r:0.5019607843137255 }
        self.model.material.emissive = {b:0.7843137254901961, g:0, r:0.7843137254901961}
      }
    },
    modelsExample(){
      let self = this
      if (self.modelActive === false) {
        self.gltf.scene.visible = true
        self.model.visible = false
        self.modelActive = true
      }else {
        self.gltf.scene.visible = false
        self.model.visible = true
        self.modelActive = false
      }
    },
    animationsExample(){
      let self = this
      if (self.animateActive === false) {
        self.animateActive = true
        for ( var i = 0; i < self.gltf.animations.length; i ++ ) {
          let clip = self.gltf.animations[ i ];
          let action = self.mixer.existingAction( clip );
          action.play()
          self.animateActive ? action.play() : action.stop();
        }
      } else {
        self.animateActive = false
        for ( var i = 0; i < self.gltf.animations.length; i ++ ) {
          let clip = self.gltf.animations[ i ];
          let action = self.mixer.existingAction( clip );
          action.play()
          self.animateActive ? action.play() : action.stop();
        }
      }
    },
    animate(){
      let self = this
      if ( self.mixer ) self.mixer.update( self.clock.getDelta() )

      if (self.modelActive) {
        self.gltf.scene.rotation.y += .01
      }else {
        self.model.rotation.y += .01
      }
      requestAnimationFrame( self.animate )
      self.renderer.render( self.scene, self.camera )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button{
  border: none;
  background-color: #2A3990;
}
.whiteHalf{
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.blueHalf{
  background-color: #2A3990;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.main{
  background-color: #f8f8ff;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
h1{
  font-size: 3.5rem;
  color: #2A3990;
  padding-bottom: 0rem;
}
h2{
  color: white;
  font-size: 1.9rem;
  margin: 0;
}
.listItem{
  display: flex;
  flex-direction: row;
  align-items: center;
}
#ctx{
  background-color: white;
}
.list{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
}
.dot{
  width: 1.5rem;
  height: 1.5rem;
  background: white;
  border-radius: 50%;
  margin-right: 1rem;
  margin-left: 1rem;
}
.drawing{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: inherit;
}
p{
  margin-left: 2rem;
  margin-top: .25rem;
  margin-bottom: .25rem;
  color: white;
}
.one{
  text-indent: 1rem;
}
.two{
  text-indent: 2rem;
}
</style>
