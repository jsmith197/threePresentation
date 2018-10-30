<template>
  <div class="main">
    <div class="words">
      <div class="side">
        <h1>Client</h1>
        <h2>Build properties list / state the socket connection</h2>
        <h2>Set up mounted init method / Socket.emit new player</h2>
        <div class="arrow">
          <div class="line"/>
          <div class="headR"/>
        </div>
        <h2>The event handelers / in-game interactions recive inputs and emit them to the server</h2>
        <div class="arrow">
          <div class="line"/>
          <div class="headR"/>
        </div>
        <br><br><br><br><br>
        <h2>The updates are recived and then rendered in the animate method</h2>
      </div>
      <div class="side">
        <h1 id="server">Server</h1>
        <h2>Creates the player object and pushes it to the players object</h2>
        <div class="arrow">
          <div class="headL"/>
          <div class="line"/>
        </div>
        <h2>Recives inputs with socket.on and updates player object properties</h2>
        <h2>The updates are constantly emited using a setInterval function</h2>
        <div class="arrow">
          <div class="headL"/>
          <div class="line"/>
        </div>
      </div>
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
    <router-link to="/seventeenth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Sixteenth',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#server{
  margin-bottom: 6rem;
}
.arrow{
  display: flex;
  flex-direction: row;
}
.headR{
  width: 0;
  height: 0;
  border-top: 1rem solid transparent;
  border-left: 2rem solid #2A3990;
  border-bottom: 1rem solid transparent;
}
.headL{
  width: 0;
height: 0;
border-top: 1rem solid transparent;
border-right: 2rem solid #2A3990;
border-bottom: 1rem solid transparent;
}
.line{
  height: 1rem;
  width: 100%;
  background-color: #2A3990;
  margin: .5rem 0rem;
}
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
  flex-direction: row;
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
  font-size: 1.5rem;
  padding-bottom: 1rem;
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
.side{
  width: 50%;
  padding: 1rem
}
</style>
