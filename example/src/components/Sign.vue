<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <div class="notification is-link">
<pre>
jsvcn.sign([file|hash]).then((response) => {
    ... 
});
</pre>
          <a href="https://github.com/vchain-us/jsvcn/">Read more</a> | <a href="https://github.com/vchain-us/jsvcn/blob/master/example/src/components/Verify.vue">Source</a>
        </div>
        <div class="card">
          <div class="card-content">
            <label class="label">Notarize a file</label>
            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" id="file" name="file" @change="onFileChange" />
                <span class="file-cta">
                  <span class="file-label">Choose a file…</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <br />
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
      <div class="column is-half">
        <div v-if="progress">Progress..</div>
        <div v-if="asset">
          <h3>Notarization response:</h3>
          <div class="result">
            <vue-json-pretty :data="asset.data"></vue-json-pretty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Jsvcn from "../../../index";
import VueJsonPretty from "vue-json-pretty";

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
    progress: false,
    staging: true
  }),
  components: {
    VueJsonPretty
  },
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
      this.progress = true;
      const result = await jsvcn.sign(target, {}, this.onProgressChange);
      this.progress = false;
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
