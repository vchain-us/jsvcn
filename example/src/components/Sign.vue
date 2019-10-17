<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
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
            <hr />
            <p class="control">
              <input
                :class="isAuthRequired && email ==='' ? 'input is-danger' : 'input'"
                placeholder="Email"
                type="text"
                v-model="email"
              />
            </p>
            <br/>
            <p class="control">
              <input
                :class="isAuthRequired && password==='' ? 'input is-danger' : 'input'"
                placeholder="Password"
                type="password"
                v-model="password"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div v-if="progress">Notarization in progress..</div>
        <div v-if="asset">
          <h3 class="h3">
            <strong>{{asset.data.name}}</strong> notarization:
            <strong>successful</strong>.
          </h3>
          <br />
          <br />
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
  },
  data: () => ({
    email: "",
    password: "",
    asset: null,
    hash: null,
    orgAsset: null,
    progress: false,
    staging: true
  }),
  components: {
    VueJsonPretty
  },

  methods: {
    async sign(target) {
      const jsvcn = new Jsvcn({
        credentials: {
          email: this.email,
          password: this.password
        }
      });
      try {
        this.progress = true;
        const result = await jsvcn.sign(target, {});
        this.asset = result;
        this.progress = false;
      } catch (e) {
        alert(e.message);
      }
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      await this.sign(file);
    },
    async onHashSend() {
      await this.sign(this.hash);
    },
    resetState() {
      this.asset = {};
      this.progress = 0;
    }
  }
};
</script>
