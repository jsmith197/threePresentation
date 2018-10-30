<template>
  <div class="main">
    <div class="whiteHalf">
      <div class="title">
        <h1>Canvas</h1>
      </div>
      <div class="grid">
        <canvas id="ctx" width="300" height="300"></canvas>
      </div>
    </div>
    <div class="blueHalf">
      <div class="list" v-if="listing">
        <div class="list1 listItem">
          <div class="dot"/>
          <h2>X, Y coordinate system</h2>
        </div>
        <button type="button" name="button" v-on:click="arrows">
          <div class="list2 listItem">
            <div class="dot" v-on:click="arrows"/>
            <h2>{x:0, y:0} is top left</h2>
          </div>
        </button>
        <button type="button" name="button" v-on:click="drawExample">
          <div class="list3 listItem">
            <div class="dot"/>
            <h2>Draw things</h2>
          </div>
        </button>
        <button type="button" name="button" v-on:click="manyExample">
          <div class="list4 listItem">
            <div class="dot"/>
            <h2>Draw many things (OOP)</h2>
          </div>
        </button>
        <button type="button" name="button" v-on:click="animationExample">
          <div class="list5 listItem">
            <div class="dot"/>
            <h2>Animate things</h2>
          </div>
        </button>
      </div>
      <div class="drawing" v-if="drawing">
        <p>let circles = [ ]</p>
        <br>
        <p>function Circle(x, y, col){</p>
        <p class="one">this.x = x</p>
	      <p class="one">this.y = y</p>
        <p class="one">this.col = col</p>
        <br>
        <p class="one">this.draw = function () {</p>
        <p class="two">draws the thing</p>
        <p class="one">}</p>
        <p>}</p>
        <br>
        <p>function init() {</p>
        <p class="one">circles = [ ]</p>
        <p class="one">for(10){</p>
        <p class="two">let col = purple</p>
        <p class="two">let x = (random number)</p>
        <p class="two">let y = (random number)</p>
        <p class="two">circles.push(new Circle(x, y, col)</p>
		    <p class="one">}</p>
        <p>}</p>
        <p>init()</p>
        <button type="button" name="button" v-on:click="back"><p>Back</p></button>
      </div>
      <div class="drawing" v-if="animating">
        <p>let circles = [ ]</p>
        <br>
        <p>function Circle(x, y, col){</p>
        <p class="one">this.vel = { x:(-1 to 1), y:(-1 to 1) }</p>
	      <p class="one">this.draw = function () {}</p>
        <br>
        <p class="one">this.update = function () {</p>
        <p class="two">this.x += this.vel.x</p>
        <p class="two">this.y += this.vel.y</p>
        <p class="two">this.draw()</p>
        <p class="one">}</p>
        <p>}</p>
        <br>
        <p>function init() {}</p>
        <p>function animate() {</p>
        <p class="one">requestAnimationFrame(animate)</p>
        <p class="one">clear canvas</p>
        <p class="one">for(# of circles){</p>
        <p class="one">circles.update</p>
		    <p class="one">}</p>
        <p>}</p>
        <p>init()</p>
        <p>animate()</p>
        <button type="button" name="button" v-on:click="back"><p>Back</p></button>
      </div>
    </div>
    <router-link to="/fifth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Fourth',
  created: function () {
    window.addEventListener('keyup', this.keyboardUp)
    window.addEventListener('keydown', this.keyboardDown)
  },
  data () {
    return {
      listing: true,
      drawing: false,
      animating: false,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const canvas = document.getElementById('ctx')
      canvas.width = window.innerWidth/2.5
      canvas.height = window.innerWidth/2.5
      const ctx = canvas.getContext('2d')

      ctx.moveTo(0,0)
      ctx.lineTo(canvas.width,0)
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.lineTo(0, 0)
      ctx.stroke()

      let lines = []
      let num = 20

      function Line(num) {
        this.num = num
        ctx.beginPath();
        ctx.moveTo(0, this.num)
        ctx.lineTo(canvas.width, this.num);
        ctx.stroke()
        ctx.beginPath();
        ctx.moveTo(this.num, 0)
        ctx.lineTo(this.num, canvas.height);
        ctx.stroke()
      }

      for (var i = 0; i < 40; i++) {
        lines.push(new Line(num))
        num = num + 20
      }
    },
    arrows(){
      const canvas = document.getElementById('ctx')
      const ctx = canvas.getContext('2d')
      let lines = []
      let num = 0
      let num2 = 10


      function draw(){
        ctx.strokeStyle = "red"
        ctx.beginPath()
        ctx.moveTo(0, num)
        ctx.lineTo(20, num)
        ctx.stroke()
        ctx.moveTo(num, 0)
        ctx.lineTo(num, 20)
        ctx.stroke()
      }

      function animate() {
        if (num < canvas.width + 10) {
        requestAnimationFrame(animate)
        draw()
        num ++
        }
      }
    animate()
    },
    drawExample(){
      const canvas = document.getElementById('ctx')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.lineWidth="10"
      ctx.strokeStyle="blue"
      ctx.rect(40,40,100,100)
      ctx.stroke()

      ctx.beginPath();
      ctx.arc(200, 200, 15, 0, Math.PI * 2, false);
      ctx.strokeStyle = "purple";
      ctx.stroke();
      ctx.fillStyle = "purple";
      ctx.fill();
    },
    manyExample(){
      const canvas = document.getElementById('ctx')
      const ctx = canvas.getContext('2d')
      let x
      let y
      let circles = []

      function Circle(x, y) {
        this.x = x
        this.y = y

        ctx.beginPath();
        ctx.arc(this.x, this.y, 15, 0, Math.PI * 2, false);
        ctx.strokeStyle = "purple";
        ctx.stroke();
        ctx.fillStyle = "purple";
        ctx.fill();
      }
      for (var i = 0; i < 10; i++) {
        x = Math.random() * (canvas.width)
        y = Math.random() * (canvas.height)
        circles.push(new Circle(x,y))
      }
      this.listing = false
      this.drawing = true
    },
    animationExample (){
      const canvas = document.getElementById('ctx')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let x
      let y
      let circles = []



      function Circle(x, y) {
        this.x = x
        this.y = y
        this.dx = Math.random() -.5
        this.dy = Math.random() -.5

        this.draw = function draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 15, 0, Math.PI * 2, false);
          ctx.strokeStyle = "purple";
          ctx.stroke();
          ctx.fillStyle = "purple";
          ctx.fill();
        }
        this.update = function update() {
          this.x += this.dx
          this.y += this.dy
          if (this.x + 15 > canvas.width || this.x - 15 < 0) {
            this.dx = -this.dx
          }
          if (this.y + 15 > canvas.height || this.y - 15 < 0) {
            this.dy = -this.dy
          }

          this.draw()
        }

      }
      function init() {
        circles = []
        for (var i = 0; i < 10; i++) {
          x = Math.random() * (canvas.width - 15 * 2) + 15
          y = Math.random() * (canvas.height - 15 * 2) + 15
          circles.push(new Circle(x,y))
        }
      }
      function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (var i = 0; i < circles.length; i++) {
          circles[i].update()

        }
      }
      this.listing = false
      this.animating = true
      init()
      animate()
    },
    back(){
      this.listing = true
      this.drawing = false
      this.animating = false
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
