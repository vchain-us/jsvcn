<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card mb-4 shadow-sm">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">Enterprise</h4>
            </div>
            <div class="card-body">
              <fieldset>
                <legend>Environment</legend>

                <label for="checkbox">
                  Staging:
                  <input type="checkbox" id="checkbox" v-model="staging" />
                </label>
              </fieldset>
              <fieldset>
                <legend>Credentials</legend>
                <label>Email</label>
                <br />
                <input type="text" v-model="email" />
                <br />
                <label>Password</label>
                <br />
                <input type="password" v-model="password" />
              </fieldset>
            </div>
          </div>
        </div>

        <div class="col">
          <fieldset>
            <legend>Sign a file</legend>
            <input type="file" id="file" name="file" @change="onFileChange" />
          </fieldset>
          <fieldset>
            <legend>Sign a hash</legend>
            <input type="text" v-model="hash" />
            <button @click="onHashSend">Sign</button>
          </fieldset>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h1>Results</h1>

          <div v-if="progress">Progress: {{progress}}</div>

          <fieldset v-if="asset">
            <legend>Vertification against *</legend>
            <p>Status: {{asset.status}}</p>
            <p v-if="progress!==0">Progress {{progress}}</p>
            <p>
              Raw response:
              <br />
              <textarea rows="10">{{asset}}</textarea>
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jsvcn from "../../../index";

export default {
  props: {
    msg: String
  },
  data: () => ({
    asset: null,
    hash: null,
    orgAsset: null,
    progress: 0,
    orgProgress: 0,
    staging: true,
    email: "peter+1234@vchain.us",
    password: "asdasdasd1A"
  }),
  computed: {
    config() {
      return this.staging
        ? {
            apiUrl: "http://localhost:8080",
            credentials: {
              email: this.email,
              password: this.password
            }
          }
        : {
            apiUrl: "https://api.codenotary.io",
            credentials: {
              email: this.email,
              password: this.password
            }
          };
    }
  },
  methods: {
    async sign(target) {
      const jsvcn = new Jsvcn(this.config);
      const result = await jsvcn.sign(target, {}, this.onProgressChange);
      this.asset = result;
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      await this.sign(file);
    },
    async onHashSend() {
      await this.sign(this.hash);
    },
    onProgressChange(progress) {
      this.progress = progress; // returns only when file size is 50Mb+..
    },
    resetState() {
      this.asset = {};
      this.progress = 0;
    }
  }
};
</script>
<style>
.container {
  display: flex;
}
</style>