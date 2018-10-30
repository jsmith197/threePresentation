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
      <h1>Implementing a FEF</h1>
      <img src="/static/logo.png" alt="">
    </div>
    <router-link to="/ninth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Eighth',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img{
  margin-left: 12rem;
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
