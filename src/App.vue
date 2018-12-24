<template>
  <div id="app" class=" w-100 h-100" style="min-height:100%">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    font-family: 'Hanna';
  }
  html, body{
    width:100%;
    height:100%;
    min-height:100%;
    overflow:hidden;
  }
  ul, ol, li{
    list-style: none;
  }
</style>
