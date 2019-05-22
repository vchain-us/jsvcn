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

	verify = async (hash) => {
		try {
			const result = await this.methods.verify(hash).call();
			const isValid =
				result &&
				result[0] &&
				result[0] !== "0x0000000000000000000000000000000000000000";

			return {
				isValid,
				result
			};
		} catch (e) {
			console.error(e);
			return null;
		}
	}
}

export default CodenotaryBlockchainClient;