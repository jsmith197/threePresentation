<template>
  <div class="main">
    <div class="words">
      <h1>Base definitions</h1>
      <h2>Canvas: A HTML element used to draw graphics (&lt;canvas&gt;&lt;/canvas&gt;)</h2>
      <h2>Three.js: A library used to render WebGL scenes</h2>
      <h2>Vue: A component based FEF (like React)</h2>
      <h2>Electron: A framework used to build Native apps</h2>
      <h2>Socket.io: A library used to make real time web apps (Instant messenger)</h2>
    </div>
    <div class="design">
      <div class="topD">
        <div class="pinkDiv box">

        </div>
        <div class="pinkD box">

        </div>
        <div class="pinkLR box">

        </div>

      </div>
      <div class="botD">

      </div>
    </div>
    <router-link to="/fourth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Third',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topD{
  display: flex;
  flex-direction: row-reverse;
}
.botD{
  width: 100vw;
  height: 2rem;
  background-color: #2A3990;
}
.words{
  color: #434343;
  height: 97vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 2rem;
}
.main{
  background-color: #f8f8ff
}
h1{
  font-size: 4rem;
  color: #2A3990;
  padding-bottom: 0rem;
}
h2{
  font-size: 2rem;
  padding-bottom: 2.5rem;
  margin: 0;
}
.design{
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
}

</style>
