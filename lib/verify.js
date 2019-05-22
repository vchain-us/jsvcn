import CodenotaryFoundationClient from "./codenotaryFoundation";
import CodenotaryBlockchainClient from "./CodenotaryBlockchain";

import hashFile from "../utils/hashFile"
import metahash from "../utils/metaHash";

const verifyHash = async (hash, { blockchainUrl, assetUrl }) => {

	const blockchainClient = new CodenotaryBlockchainClient(blockchainUrl);

	const response = await blockchainClient.verify(hash)

	if (!response) throw Error("Error during blockchain verification.")

	const { isValid, result } = response

	let metaData = {}

	if (isValid) {

		const metaHash = metahash(result);

		const foundationClient = new CodenotaryFoundationClient(assetUrl);

		metaData = await foundationClient.getArtifactByHashAndMetaHash(hash, metaHash)

	}

	return { isValid, metaData }
}

const verifyFile = async (file, fileReader, { blockchainUrl, assetUrl }) => {

	const hash = await hashFile(file, fileReader)

	const response = await verifyHash(hash, { meta }, { blockchainUrl, assetUrl })

	return response;
}

export {
	verifyFile,
	verifyHash
}

export default { verifyFile, verifyHash }