import axios from "axios";


class CodenotaryApiClient {

  constructor(apiUrl, credentials) {
    const { email, password, otp, notarizationPassword } = credentials

    this.apiUrl = apiUrl
    this.email = email
    this.password = password
    this.otp = otp
    this.notarizationPassword = notarizationPassword
  }


  async verify(hash) {
    return await axios.get(`${this.apiUrl}/authenticate/${hash}`);
  }


  async verifyAgainstOrganization(hash, organization) {
    return await axios.get(`${this.apiUrl}/authenticate/${hash}?org=${organization}`);
  }

  async verifyAgainstPublicKeys(hash, publicKeys) {
    const keysQs = publicKeys.join(',');
    return await axios.get(`${this.apiUrl}/authenticate/${hash}?signerIds=${keysQs}`);
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
        password: this.password,
        otp: this.otp
      },
      header: {
        'x-notarization-password': this.notarizationPassword ? this.notarizationPassword : undefined
      }
    });
  };

  async untrust(hash, { kind,
    name,
    size,
    contentType,
    metadata }) {
    return await axios.post(`${this.apiUrl}/untrust`, {
      kind,
      name,
      hash,
      size,
      contentType,
      metadata,
    }, {
      params: {
        hash,
      },
      auth: {
        username: this.email,
        password: this.password,
        otp: this.otp
      },
      header: {
        'x-notarization-password': this.notarizationPassword ? this.notarizationPassword : undefined
      }
    });
  };

  async unsupport(hash, { kind,
    name,
    size,
    contentType,
    metadata }) {
    return await axios.post(`${this.apiUrl}/unsupport`, {
      kind,
      name,
      hash,
      size,
      contentType,
      metadata,
    }, {
      params: {
        hash,
      },
      auth: {
        username: this.email,
        password: this.password,
        otp: this.otp
      },
      header: {
        'x-notarization-password': this.notarizationPassword ? this.notarizationPassword : undefined
      }
    });
  };

}

export default CodenotaryApiClient
