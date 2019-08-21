<template>
  <div>
    <h1>Jsvcn Demo</h1>

    <p>Environment:</p>
    <label for="checkbox">
      Staging:
      <input type="checkbox" id="checkbox" v-model="staging" />
    </label>
    <br />
    <fieldset>
      <legend>Verify a file</legend>
      <input type="file" id="file" name="file" @change="onFileChange" />
    </fieldset>
    <br />
    <fieldset>
      <legend>Verify a hash</legend>
      <input type="text" v-model="hash" @change="onHashChange" />
    </fieldset>

    <h1>Results</h1>

    <div v-if="progress">Progress: {{progress}}</div>
    <div v-if="orgProgress">Org. Progress: {{orgProgress}}</div>

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

    <fieldset v-if="orgAsset">
      <legend>Vertification against Organization {{org}}:</legend>
      <p>Status: {{orgAsset.status}}</p>
      <p v-if="orgProgress!==0">Progress {{orgProgress}}</p>
      <p>
        Raw response:
        <br />
        <textarea rows="10">{{orgAsset}}</textarea>
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
    },
    org() {
      return this.staging ? "summitsport.hu" : "vchain.us";
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
        this.org
      );
      this.orgAsset = result;
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      await this.verify(file);
      await this.verifyAgainstOrg(file);
    },
    async onHashChange() {
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
