<template>
  <div class="main">
    <div class="design">
      <div class="botD">
        <div class="box dark">

        </div>
        <div class="box divided">

        </div>
        <div class="box darkRight">

        </div>
      </div>
      <div class="topD">
        <div class="box lightRight">

        </div>
      </div>
    </div>
    <div class="words">
      <h1>Adding another dimension</h1>
      <canvas id="three" width="300" height="300"></canvas>
    </div>
    <router-link to="/sixth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Fifth',
  data () {
    return {

    }
  },
  mounted() {
    this.init()

  },
  methods: {
    init() {
      let renderer = new THREE.WebGLRenderer({canvas: document.getElementById('three'), antialias: true})
      renderer.setClearColor(0x2A3990)
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5)

      let camera = new THREE.PerspectiveCamera(35,window.innerWidth / window.innerHeight, 1, 15000)
      let light = new THREE.AmbientLight(0xffffff, 0.5)
      let light1 = new THREE.PointLight(0xffffff, 0.5)
      let scene = new THREE.Scene()
      let geometry = new THREE.SphereGeometry( 50, 8, 6 )
      let material = new THREE.MeshBasicMaterial( {color: 0x800080, wireframe:true} )
      let area = new THREE.CubeGeometry(500,500,500)
      let boxMat = new THREE.MeshStandardMaterial({wireframe: true})
      let box = new THREE.Mesh(area, boxMat )

      let spheres = []
      let x
      let y
      let z
      let num

      function Sphere(x,y,z) {
        this.rotation = { x:(Math.random() -.5) * .1, y:(Math.random() -.5) * .1, z:(Math.random() -.5) * .1}
        this.x = x
        this.y = y
        this.z = z
        this.dx = Math.random() -.5 * 5
        this.dy = Math.random() -.5 * 5
        this.dz = Math.random() -.5 * 5
        this.sphere = new THREE.Mesh( geometry, material )
        // this.sphere.position.set(x, y, -z)
        scene.add( this.sphere );

        this.update = function(){
          this.sphere.rotation.x += this.rotation.x
          this.sphere.rotation.y += this.rotation.y
          this.sphere.rotation.z += this.rotation.z
          if (this.x + 30 > 500 || this.x - 30 < 0) {
            this.dx = -this.dx
          }
          if (this.y + 30 > 500 || this.y - 30 < 0) {
            this.dy = -this.dy
          }
          if (this.z + 30 > 500 || this.z - 30 < 0) {
            this.dz = -this.dz
          }
          this.x += this.dx
          this.y += this.dy
          this.z += this.dz
          this.sphere.position.set(this.x, this.y, -this.z)
        }
      }

      function init() {
        camera.rotation.set( -0.50, 0.55, 0 )
        camera.position.set(800,800,800)
        scene.add(light)
        scene.add(light1)
        box.position.set(250,250,-250)
        scene.add(box)

        spheres = []
        for (var i = 0; i < 20; i++) {
          x = Math.random() * (500 - 25 * 2) + 15
          y = Math.random() * (500 - 25 * 2) + 15
          z = Math.random() * (500 - 25 * 2) + 15
          spheres.push(new Sphere(x,y,z))
        }
        requestAnimationFrame(render)
      }

      init()
      function render() {
        for (var i = 0; i < spheres.length; i++) {
          spheres[i].update()
        }
        renderer.render(scene,camera)
        requestAnimationFrame(render)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvas{
  background-color: white;
}
.main{
  position: absolute;
  z-index: 10;
  background-color: #2A3990;
  width: 100%;
  height:100%;
}
.design{
  z-index: -1;
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
}
.botD{
  display: flex;
  flex-direction: row-reverse;
}
.topD{
  display: flex;
  flex-direction: row-reverse;
}
.words{
  height: 97vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 2rem;
}
h1{
  font-size: 4.5rem;
  margin-top: 0rem;
}
h2{
  font-size: 1.5rem;
}
</style>
