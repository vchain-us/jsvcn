<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://codenotary.io">
          <img src="@/assets/logo.svg" style="max-height: 50px; margin: 5px;" />
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
                <input
                  :class="isAuthRequired && email ==='' ? 'input is-danger' : 'input'"
                  placeholder="Email"
                  type="text"
                  v-model="email"
                />
              </p>
              <p class="control">
                <input
                  :class="isAuthRequired && password==='' ? 'input is-danger' : 'input'"
                  placeholder="Password"
                  type="password"
                  v-model="password"
                />
              </p>
              <p class="control">
                <input
                  class="input"
                  placeholder="Organization (optional)"
                  type="text"
                  v-model="organization"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="section">
      <router-view v-bind="globalProps"></router-view>
    </section>
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    email: "",
    password: "",
    organization: "",
    staging: true
  }),
  computed: {
    globalProps() {
      return {
        email: this.email,
        password: this.password,
        organization: this.organization
      };
    },
    isAuthRequired() {
      return this.$route.name === "sign";
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