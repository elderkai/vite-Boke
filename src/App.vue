<template>
<div>
 <router-view/>
</div>
</template>
<script>
import {ref} from 'vue';
export default{
  setUp(){
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin:0;
  padding:0;
}
ul {    
  list-style: none;    /*清除列表默认样式*/
  padding: 0;      /*清除padding*/
  margin: 0;
}
li{
  float: left;
}
a:link{
  text-decoration: none;;
}
</style>