<template>
  <div class="columns">
    <div class="column">
      <div class="card">
        <div class="card-content">
          <label class="label">Notarize a file</label>
          <input class="file" type="file" id="file" name="file" @change="onFileChange" />
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <label class="label">Notarize a hash</label>
          <div class="field is-grouped">
            <p class="control">
              <input class="input" type="text" v-model="hash" />
            </p>
            <p class="control">
              <button class="button" @click="onHashSend">Send</button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div v-if="progress">Progress: {{progress}}</div>
      <div v-if="asset">
        <p v-if="progress!==0">Progress {{progress}}</p>
        <p>
          <textarea class="textarea" style="width:100%" rows="10">{{asset.data}}</textarea>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Jsvcn from "../../../index";

export default {
  props: {
    msg: String,
    email: String,
    password: String
  },
  data: () => ({
    asset: null,
    hash: null,
    orgAsset: null,
    progress: 0,
    orgProgress: 0,
    staging: true
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

body,html{
  height: 100%;
}
</style>