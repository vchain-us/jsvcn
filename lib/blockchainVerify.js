import Web3 from "web3";
import AssetsRelay from "../contracts/AssetsRelay.json";

const blockchainVerify = async (hash, { apiUrl }) => {
	try {
		const provider = new Web3.providers.HttpProvider(apiUrl);
		const web3 = new Web3(apiUrl);
		web3.setProvider(provider);

		const contract = new web3.eth.Contract(
			AssetsRelay.abi,
			"0x495021fe1a48a5b0c85ef1abd68c42cdfc7cda08"
		);

		process.versions = { node: "10", v8: "e" };

		const result = await contract.methods.verify(hash).call();
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

export default blockchainVerify;