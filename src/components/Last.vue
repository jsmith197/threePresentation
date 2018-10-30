<template>
  <div class="main">
    <div class="words">
      <h1>Contact</h1>
      <a class="link" href="https://github.com/404-kid/"><h2>GitHub || 404-kid/</h2></a>
      <a class="link" href="https://www.linkedin.com/in/b-sol/"><h2>Linkedin || in/b-sol/</h2></a>
      <a class="link" href="http://job-sol.surge.sh/#/"><h2>Personal Site</h2></a>
      <h3>You can find all the examples on my GitHub</h3>
    </div>
    <div class="design">
      <div class="botD">

      </div>
    </div>
    <router-link to="/twelfth">
      <div class="next">
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Last',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link{
  color: #434343;
  text-decoration: none;
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
  flex-direction: column;
  align-items: center;
}
.main{
  background-color: #f8f8ff
}
h1{
  font-size: 5rem;
  color: #2A3990;
  padding-bottom: 0rem;
}
h2{
  margin: 0;
  font-size: 3.5rem;
  padding-bottom: 3rem;
}
h3{
  font-size: 2rem;
}
.design{
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
}

</style>
