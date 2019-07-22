import ethers from "ethers/dis/ethers.min.js";
import AssetsRelay from "../contracts/AssetsRelay.json";

class CodenotaryBlockchainClient {

	constructor(apiUrl, address) {
		const provider = new ethers.providers.JsonRpcProvider(apiUrl);
		this.contract = new ethers.Contract(address, AssetsRelay.abi, provider)
	}

	isValidResponse(response) {
		return !!(
			response &&
			response[0] &&
			response[0] !== "0x0000000000000000000000000000000000000000");
	}

	async verify(hash) {
		if (!hash) throw new Error("Hash argument is missing")

		try {
			const response = await this.contract.functions.verify(hash);
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
}

export default CodenotaryBlockchainClient;
