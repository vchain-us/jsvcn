<template>
  <div>
    <h1>Jsvcn Demo</h1>
    <h3>Select a file</h3>
    <input type="file" id="file" name="file" @change="onFileChange" />

    <h3>Vertification against the Blockchain:</h3>
    <p>Status: {{asset.status}}</p>
    <p v-if="progress!==0">Progress {{progress}}</p>
    <p>
      Raw response:
      <br />
      <textarea rows="10">{{asset}}</textarea>
    </p>

    <h3>Vertification against Organization "vchain.us":</h3>
    <p>Status: {{orgAsset.status}}</p>
    <p v-if="orgProgress!==0">Progress {{orgProgress}}</p>
    <p>
      Raw response:
      <br />
      <textarea rows="10">{{orgAsset}}</textarea>
    </p>
  </div>
</template>

<script>
import Jsvcn from "jsvcn";

export default {
  props: {
    msg: String
  },
  data: () => ({
    asset: {},
    orgAsset: {},
    progress: 0,
    orgProgress: 0
  }),
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];

      const jsvcn = new Jsvcn();
      const { asset } = await jsvcn.verify(file, this.onProgressChange);
      this.asset = asset;

      const jsvcnOrg = new Jsvcn();
      const { asset: orgAsset } = await jsvcn.verify(
        file,
        this.onProgressChange,
        "vchain.us"
      );
      this.orgAsset = orgAsset;
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
