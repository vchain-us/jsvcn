<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-third">
        <div class="card">
          <div class="card-content">
            <label class="label">Authenticate a file</label>
            <div class="file">
              <label class="file-label">
                <input class="file-input" type="file" id="file" name="file" @change="onFileChange" @click="resetState" />
                <span class="file-cta">
                  <span class="file-label">Choose a file…</span>
                </span>
              </label>
            </div>
            <br />
            <p class="control">
              <label>Against:</label>
              <input
                class="input"
                placeholder="Organization name (optional)"
                type="text"
                @click="resetState" 
                v-model="organization"
              />
            </p>
          </div>
        </div>
      </div>
      <div class="column is-one-third">
        <div v-if="progress">Progress...</div>

        <div v-if="asset">
          <h3>
            Authentication:
            <strong>{{asset.verification.status}}</strong>.
          </h3>
          <br />
          <br />
          <div class="result">
            <vue-json-pretty :data="asset"></vue-json-pretty>
          </div>
        </div>
      </div>

      <div class="column is-one-third" v-if="organization!=''">
        <div v-if="orgProgress">Org. Progress...</div>
        <div v-if="orgAsset">
          <h3>
            Authentication against
            <strong>{{organization}}</strong>
            :
            <strong>{{orgAsset.verification.status}}</strong>
          </h3>
          <br />
          <br />
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
    msg: String
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
    staging: true,
    organization: ""
  }),
  methods: {
    async verify(target) {
      const jsvcn = new Jsvcn();
      try {
        const result = await jsvcn.verify(target, this.onProgressChange);
        this.asset = result;
      } catch (e) {
        alert(e.message);
      }
    },
    async verifyAgainstOrg(target) {
      const jsvcnOrg = new Jsvcn();
      try {
        const result = await jsvcnOrg.verify(
          target,
          this.onProgressChange,
          this.organization
        );
        this.orgAsset = result;
      } catch (e) {
        this.resetState();
        alert(e.message);
      }
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
      this.asset = null;
      this.orgAsset = null;
      this.progress = false;
    }
  }
};
</script>
