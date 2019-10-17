import axios from "axios";


class CodenotaryApiClient {

  constructor(apiUrl, credentials) {
    const { email, password, notarizationPassword } = credentials

    this.apiUrl = apiUrl
    this.email = email
    this.password = password
    this.notarizationPassword = notarizationPassword
  }


  async verify(hash) {
    return await axios.get(`${this.apiUrl}/authenticate/${hash}`);
  }


  async verifyAgainstOrganization(hash, organization) {
    return await axios.get(`${this.apiUrl}/authenticate/${hash}?org=${organization}`);
  }

  async sign(hash, { kind,
    name,
    size,
    contentType,
    metadata }) {

    return await axios.post(`${this.apiUrl}/notarize`, {
      kind,
      name,
      hash,
      size,
      contentType,
      metadata,
    }, {
      auth: {
        username: this.email,
        password: this.password
      },
      header: {
        'x-notarization-password': this.notarizationPassword ? this.notarizationPassword : undefined
      }
    });
  };

  async untrust(hash) {
    return await axios.post(`${this.apiUrl}/untrust`, {
      params: {
        hash,
      },
      withCredentials: true,
      auth: {
        username: this.email,
        password: this.password
      },
      header: {
        'x-notarization-password': this.notarizationPassword
      }
    });
  };

  async unsupport(hash) {
    return await axios.post(`${this.apiUrl}/unsupport`, {
      params: {
        hash,
      },
      withCredentials: true,
      auth: {
        username: this.email,
        password: this.password
      },
      header: {
        'x-notarization-password': this.notarizationPassword
      }
    });
  };

}

export default CodenotaryApiClient
