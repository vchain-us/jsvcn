class CodenotaryFoundationClient {

  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  getArtifactByHashAndMetaHash = async (hash, metahash) => {

    const url = this.apiUrl + "/artifact/" + hash + "/" + metahash;

    const response = await fetch(metahashEndpoint, {
      method: "GET"
    });

    return await response.json();
  };
}

export default CodenotaryFoundationClient
