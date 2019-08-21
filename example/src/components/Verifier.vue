<template>
  <div>
    <h1>Jsvcn Demo</h1>

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

    <div>Progress: {{progress}}</div>
    <div>Org. Progress: {{orgProgress}}</div>

    <fieldset v-if="asset">
      <legend>Vertification:</legend>
      <p>Status: {{asset.status}}</p>
      <p v-if="progress!==0">Progress {{progress}}</p>
      <p>
        Raw response:
        <br />
        <textarea rows="10">{{asset}}</textarea>
      </p>
    </fieldset>

    <fieldset v-if="orgAsset">
      <legend>Vertification against Organization "vchain.us":</legend>
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
    orgProgress: 0
  }),
  methods: {
    async verify(target) {
      const jsvcn = new Jsvcn();
      const result = await jsvcn.verify(target, this.onProgressChange);
      console.log(result)
      this.asset = result;
    },
    async verifyAgainstOrg(target) {
      const jsvcnOrg = new Jsvcn();
      const result = await jsvcnOrg.verify(
        target,
        this.onProgressChange,
        "summitsport.hu"
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
