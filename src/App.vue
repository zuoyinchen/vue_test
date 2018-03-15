
<template>
  <div id="app">
    
    <router-view/>
   
  </div>
</template>

<script>
import tabnav from '@/components/tabnav'
export default {
  name: 'App',
  data(){
    return {
      
    }
  }
}
</script>

<style>
@import './assets/fonts/iconfont.css';
html,body,div,p,ul,li,span,nav,header{
  margin:0;
  padding:0;
}
html,body{
  height:100%;
  background:#e8e8e8;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
