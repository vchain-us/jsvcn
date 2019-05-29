import Web3 from "web3";
import AssetsRelay from "../contracts/AssetsRelay.json";

class CodenotaryBlockchainClient {

	constructor(apiUrl) {
		const provider = new Web3.providers.HttpProvider(apiUrl);

		const web3 = new Web3(apiUrl);
		web3.setProvider(provider);

		const contract = new web3.eth.Contract(
			AssetsRelay.abi,
			"0x495021fe1a48a5b0c85ef1abd68c42cdfc7cda08"
		);

		this.methods = contract.methods;
	}

	isValidResponse(response) {
		return !!(
			response &&
			response[0] &&
			response[0] !== "0x0000000000000000000000000000000000000000");
	}

	async verify(hash){
		if (!hash) throw new Error("Hash argument is missing")

		try {
			const response = await this.methods.verify(hash).call();

			const valid = this.isValidResponse(response)
			const [owner, level, status, timestamp] = response;

			return {
				valid,
				meta: { owner, level, status, timestamp }
			};
		} catch (e) {
			throw new Error("Blockchain is not responding", e)
		}
	}
}

export default CodenotaryBlockchainClient;