import AssetsRelay from "../contracts/AssetsRelay.json";
import OrganisationsRelay from "../contracts/OrganisationsRelay.json";

const NULL_USER = "0x0000000000000000000000000000000000000000";

class CodenotaryBlockchainClient {

	constructor(apiUrl, assetAddress, organizationAddress) {

		const ethers = (this.isNodeOrJest()) ? require('ethers') : this.loadEthersFromBrowserBundle();

		const provider = new ethers.providers.JsonRpcProvider(apiUrl);

		this.assetContract = new ethers.Contract(assetAddress, AssetsRelay.abi, provider)
		this.organizationContract = new ethers.Contract(organizationAddress, OrganisationsRelay.abi, provider)
	}

	isNodeOrJest() {
		return typeof window === 'undefined' || (process && process.env && process.env.JEST_WORKER_ID !== undefined)
	}
	// we intentionally keep ethers as an external dependency and use the browser bundle provided by the author
	loadEthersFromBrowserBundle() {
		if (window && window.ethers) {
			return window.ethers;
		}
		throw Error("In browser enivronment please include ethers.js bundle into your HTML page and make sure it loads before this library.");
	}

	isValidResponse(response) {
		return !!(
			response &&
			response[0] &&
			response[0] !== NULL_USER);
	}

	async verify(hash) {
		if (!hash) throw new Error("Hash argument is missing")

		try {
			const response = await this.assetContract.functions.verify(hash);
			const valid = this.isValidResponse(response)

			const { 0: owner, 1: level, 2: status, 3: timestamp } = response;

			return {
				valid,
				meta: { owner, level, status, timestamp }
			};
		} catch (e) {
			throw new Error(e)
		}
	}

	async verifyByIndex(hash, i) {
		try {
			const response = await this.assetContract.functions.verifyByIndex(hash, i);
			console.log(response)
			const valid = this.isValidResponse(response)

			const { 0: owner, 1: level, 2: status, 3: timestamp } = response;

			return {
				valid,
				meta: { owner, level, status, timestamp }
			};
		} catch (e) {
			console.log("Error in iteration " + i)
			throw new Error(e)
		}
	}

	async verifyAgainstOrganization(hash, organizationName) {
		const organization = await this.getOrganization(organizationName);
		return await this.verifyAgainstPublicKeys(hash, organization.members);
	}


	async verifyAgainstPublicKey(hash, publicKey) {
		return await this.verifyAgainstPublicKeys(hash, [publicKey]);
	}

	async verifyAgainstPublicKeys(hash, publicKeys) {
		if (!hash) throw new Error("Hash argument is missing")
		if (!publicKeys) throw new Error("PublicKeys argument is missing")

		let i = await this.assetContract.functions.getAssetCountForHash(hash)
		i = Number(i)-1;
		while (i >= 0) {
			const response = await this.verifyByIndex(hash, i);
			console.log(hash, i)

			if (response.valid && publicKeys.includes(response.owner)) return response;
			i = i - 1;
		}

		return {
			valid: false,
			meta: {
				status: 2, level: 0, timestamp: {
					"_hex": "0x00"
				}, NULL_USER
			}
		};

	}


	async getOrganization(organization) {
		try {
			const response = await this.organizationContract.getOrganisation(organization);

			if (this.isValidResponse(response)) {
				const { 0: owner, 1: members, 2: hash, 3: timestamp } = response;

				return {
					owner,
					members,
					hash,
					timestamp
				}
			} else {
				throw new Error("Organization does not exist.")
			}
		} catch (e) {
			throw new Error(e)
		}
	}
}

export default CodenotaryBlockchainClient;
