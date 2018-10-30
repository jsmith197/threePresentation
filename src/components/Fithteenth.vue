<template>
  <div class="main">
    <div class="words">
      <h1>Socket.io</h1>
      <h2>Allows for multiple clients to share data simultaneously</h2>
      <h2>Can make a game multiplayer</h2>
      <h2>Takes game logic off the clients' end and puts it on the server</h2>
      <h2>Standardizes the animation refresh rate</h2>
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
    <router-link to="/sixteenth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Fithteenth',
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
  margin: 0;
  font-size: 2.7rem;
  padding-bottom: 3.5rem;
}
.link{
  position: absolute;
  z-index: 1;
  color: #434343;
  text-decoration: none;
}
.design{
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
}

</style>
