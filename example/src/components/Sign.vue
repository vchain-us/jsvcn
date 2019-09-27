<template>
  <div>
    <p>Environment:</p>
    <label for="checkbox">
      Staging:
      <input type="checkbox" id="checkbox" v-model="staging" />
    </label>
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
    <br />
    <fieldset>
      <legend>Sign a file</legend>
      <input type="file" id="file" name="file" @change="onFileChange" />
    </fieldset>
    <br />
    <fieldset>
      <legend>Sign a hash</legend>
      <input type="text" v-model="hash" @change="onHashChange" />
    </fieldset>

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
    email: "",
    password: ""
  }),
  computed: {
    config() {
      return this.staging
        ? {
            apiUrl: "https://api.staging.codenotary.io",
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
      console.log(this.config)
      const jsvcn = new Jsvcn(this.config);
      const result = await jsvcn.sign(target, {}, this.onProgressChange);
      this.asset = result;
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      await this.verify(file);
      await this.verifyAgainstOrg(file);
    },
    async onHashChange() {
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
