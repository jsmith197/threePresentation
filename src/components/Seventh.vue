<template>
  <div class="main">
    <div class="words">
      <h1>Flow</h1>
      <h2>Grab the dom elements and attach event listeners to keys/mouse movements</h2>
      <h2>Create an empty scene by defining a renderer</h2>
      <h2>Initialize the scene with the camera, lights, models, animations</h2>
      <h2>Animate the scene listening for any events you've set up</h2>
      <h2>Update the scene</h2>
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
    <router-link to="/eighth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Seventh',
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
