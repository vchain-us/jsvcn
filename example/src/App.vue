<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://codenotary.io">
          <img src="@/assets/logo.svg" width="80" />
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Authenticate</router-link>&nbsp;
          <router-link class="navbar-item" to="/sign">Notarize</router-link>&nbsp;
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <input class="input" placeholder="Email" type="text" v-model="email" />
              </p>
              <p class="control">
                <input class="input" placeholder="Password" type="password" v-model="password" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container">
        <router-view v-bind="globalProps"></router-view>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    email: "peter+1234@vchain.us",
    password: "asdasdasd1A",
    staging: true
  }),
  computed: {
    globalProps() {
      return { email: this.email, password: this.password };
    },
    isAuthRequired() {
      return $this.$route.name === "sign";
    }
  },
  components: {}
};
</script>

<style>
body,
html {
  height: 100%;
}

.navbar {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
}

.result {
  background: white;
  overflow: scroll;
  height:500px;
  padding: 20px;
}
</style>