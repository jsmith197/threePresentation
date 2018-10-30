<template>
  <div class="main">
    <div class="words">
      <h1>Advantages</h1>
      <h2>Access to the virtual DOM</h2>
      <h2>Easier debugging</h2>
      <h2>State management</h2>
      <h2>Access to plugins</h2>
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
    <router-link to="/tenth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Ninth',
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
  padding-bottom: 2rem;
}
h2{
  font-size: 3rem;
  padding-bottom: 3rem;
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
