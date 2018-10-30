<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height:100%;
}
html{
  width: 100%;
  height:100%;
}
body{
  margin: 0rem;
  overflow:hidden;
}
.box{
  height: 9rem;
  width: 9rem;
}
.divided{
  background-color: #3949AB;
  width: 0;
  height: 0;
  border-top: 9rem solid #7890CD;
  border-right: 9rem solid transparent;
}
.darkRight{
  width: 0;
  height: 0;
  border-top: 9rem solid #212D74;
  border-left: 9rem solid transparent;
}
.lightRight{
  width: 0;
  height: 0;
  border-top: 9rem solid #7890CD;
  border-left: 9rem solid transparent;
}
.dark{
  background-color: #212D74;
}
.next {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-left: 50px solid rgba(255, 255, 255, 0.3);
  border-bottom: 25px solid transparent;
  margin: 1rem;
  z-index: 0;
}
.pinkDiv{
  background-color: #9C254D;
  width: 0;
  height: 0;
  border-bottom: 9rem solid #F06292;
  border-right: 9rem solid transparent;
}
.pinkD{
  background-color: #D23369
}
.pinkLR{
  width: 0;
  height: 0;
  border-bottom: 9rem solid #F06292;
  border-left: 9rem solid transparent;
}
</style>
