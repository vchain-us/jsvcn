import axios from "axios";
import qs from "qs";


class CodenotaryApiClient {

  constructor(apiUrl, credentials) {
    const { email, password, notarizationPassword } = credentials

    this.apiUrl = apiUrl
    this.email = email
    this.password = password
    this.notarizationPassword = notarizationPassword
  }


  async verify(hash) {
    return await axios.get(`${this.apiUrl}/verify/${hash}`);
  }

  async sign(hash, metadata) {
    return await axios.post(`${this.apiUrl}/sign/`, {
      params: {
        hash,
        metadata,
        email,
        password
      },
      header: {
        'x-notarization-password': notarizationPassword
      }
    });
  };

  async untrust(hash) {
    return await axios.post(`${this.apiUrl}/untrust/`, {
      params: {
        hash,
        metadata,
        email,
        password
      },
      header: {
        'x-notarization-password': notarizationPassword
      }
    });
  };

  async unsupport(hash) {
    return await axios.post(`${this.apiUrl}/unsupport/`, {
      params: {
        hash,
        metadata,
        email,
        password
      },
      header: {
        'x-notarization-password': notarizationPassword
      }
    });
  };

}

export default CodenotaryApiClient
