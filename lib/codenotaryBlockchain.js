import Web3 from "web3";
import AssetsRelay from "../contracts/AssetsRelay.json";

class CodenotaryBlockchainClient {

	constructor(apiUrl) {
		// dirty web3 fix for browser env 
		process.versions = { node: "10", v8: "e" };

		const provider = new Web3.providers.HttpProvider(apiUrl);

		const web3 = new Web3(this.apiUrl);
		web3.setProvider(provider);

		this.contract = new web3.eth.Contract(
			AssetsRelay.abi,
			"0x495021fe1a48a5b0c85ef1abd68c42cdfc7cda08"
		);

		this.methods = contract.methods;
	}

	isValidResponse = (response) =>
		response &&
		response[0] &&
		response[0] !== "0x0000000000000000000000000000000000000000";

	verify = async (hash) => {
		try {
			const response = await this.methods.verify(hash).call();
			if (this.isValidResponse(response)) {
				const [owner, level, status, timestamp] = response;
				return {
					valid,
					meta: { owner, level, status, timestamp }
				};
			} else {
				throw new Error("Invalid blockchain response")
			}
		} catch (e) {
			throw new Error("Blockchain is not responding")
		}
	}
}

export default CodenotaryBlockchainClient;