<template>
  <div id="app">
    <h1>Jsvcn Demo</h1>
    <p>
      <router-link to="/">Verify</router-link>&nbsp;
      <router-link to="/sign">Sign</router-link>&nbsp;
      <router-link to="/untrust">Untrust</router-link>&nbsp;
      <router-link to="/unsupport">Unsupport</router-link>&nbsp;
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

input,
textarea {
  width: 300px;
}

p {
  margin: 20px;
}
</style>
