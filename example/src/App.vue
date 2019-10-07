<template>
  <div id="app">
    <div
      class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
    >
      <h5 class="my-0 mr-md-auto font-weight-normal">Jsvcn demo</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <router-link class="p-2 text-dark" to="/">Verify</router-link>&nbsp;
        <router-link class="p-2 text-dark" to="/sign">Sign</router-link>&nbsp;
        <router-link class="p-2 text-dark" to="/untrust">Untrust</router-link>&nbsp;
        <router-link class="p-2 text-dark" to="/unsupport">Unsupport</router-link>&nbsp;
      </nav>
      <a class="btn btn-outline-primary" href="#">Github</a>
    </div>
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
input,
textarea {
  width: 300px;
}

p {
  margin: 20px;
}
</style>
