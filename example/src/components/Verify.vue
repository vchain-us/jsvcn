<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <div class="card">
          <div class="card-content">
            <label class="label">Authenticate a file</label>
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
            <label class="label">Authenticate a hash</label>
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
      <div class="column is-one-third">
        <div v-if="progress">Progress...</div>

        <div v-if="asset">
          <h3>Authentication against *</h3>
          <div class="result">
            <vue-json-pretty :data="asset"></vue-json-pretty>
          </div>
        </div>
      </div>

      <div class="column is-one-third" v-if="organization!=''">
        <div v-if="orgProgress">Org. Progress...</div>
        <div v-if="orgAsset">
          <h3>
            Authentication against organization:
            <strong>{{organization}}</strong>
          </h3>
          <div class="result">
            <vue-json-pretty :data="orgAsset"></vue-json-pretty>
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
    organization: String
  },
  components: {
    VueJsonPretty
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
            assetUrl: "https://api.staging.codenotary.io/foundation/v1",
            blockchainUrl: "https://main.staging.codenotary.io",
            blockchainAssetAddress:
              "0x05ce69454a13c8ac0bd20fdc48b09068f5c0a5ed",
            blockchainOrganizationAddress:
              "0x4a9a0547949ec55ecbf06738e8c2bad747f410bb"
          }
        : undefined;
    }
  },
  methods: {
    async verify(target) {
      const jsvcn = new Jsvcn(this.config);
      const result = await jsvcn.verify(target, this.onProgressChange);
      this.asset = result;
    },
    async verifyAgainstOrg(target) {
      const jsvcnOrg = new Jsvcn(this.config);
      const result = await jsvcnOrg.verify(
        target,
        this.onProgressChange,
        this.organization
      );
      this.orgAsset = result;
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      await this.verify(file);
      await this.verifyAgainstOrg(file);
    },
    async onHashSend() {
      await this.verify(this.hash);
      await this.verifyAgainstOrg(this.hash);
    },
    onProgressChange(progress) {
      this.progress = progress; // returns only when file size is 50Mb+..
    },
    onOrgProgressChange(progress) {
      this.orgProgress = progress; // returns only when file size is 50Mb+..
    },
    resetState() {
      this.asset = {};
      this.orgAsset = {};
      this.progress = 0;
    }
  }
};
</script>
