import { type } from "os";

class CodenotaryFoundationClient {

  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  getArtifactByHashAndMetaHash = async (hash, metahash) => {
    if (!hash || typeof hash !== "string") throw Error("First argument hash is missing or invalid.")
    if (!metahash || typeof metahash !== "string") throw Error("Second argument metahash is or invalid.")

    const url = this.apiUrl + "/artifact/" + hash + "/" + metahash;

    let data = {}

    try {
      const response = await fetch(url, {
        method: "GET"
      });
      data = await response.json();

    } catch (error) {
      console.log(error)
    }

    return data
  };
}

export default CodenotaryFoundationClient
