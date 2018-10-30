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
      <h1>Three.js, Vue, and You</h1>
      <h2>Building native dynamic 3D environments using a FEF</h2>
      <h2>Job Smith</h2>
    </div>
    <router-link to="/second">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'First',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  background-color: #2A3990;
}
.design{
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
  justify-content: center;
  padding: 2rem;
}
h1{
  font-size: 4.5rem;
}
h2{
  font-size: 1.5rem;
}
</style>
