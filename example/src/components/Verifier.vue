<template>
  <div>
    <h1>Jsvcn Demo</h1>
    <h3>Select a file</h3>
    <input type="file" id="file" name="file" @change="onFileChange">

    <h3>Results:</h3>
    <p>Status: {{asset.status}}</p>
    <p v-if="progress!==0">Progress {{progress}}</p>
    <p>
      Raw response:
      <br>
      <textarea rows="10">{{asset}}</textarea>
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
    progress: 0
  }),
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];

      const jsvcn = new Jsvcn();
      jsvcn.verify(file, this.onProgressChange).then(response => {
        this.asset = response;
      });
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
