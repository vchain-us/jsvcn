<template>
  <div id="app">
    <Verifier/>
  </div>
</template>

<script>
import Verifier from './components/Verifier.vue'

export default {
  name: 'app',
  components: {
    Verifier
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

input, textarea{
  width: 300px;
}

p{
  margin: 20px;
}
</style>
