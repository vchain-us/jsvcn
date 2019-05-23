import CodenotaryFoundationClient from "./codenotaryFoundation";
import CodenotaryBlockchainClient from "./codenotaryBlockchain";

import hashFile from "../utils/hashFile"
import hashMeta from "../utils/hashMeta"

class Verify {

	constructor(options) {
		const { blockchainUrl, assetUrl } = options

		if (!blockchainUrl) throw Error("Missing blockchain configuration")
		if (!assetUrl) throw Error("Missing asset configuration")

		this.blockchainClient = new CodenotaryBlockchainClient(this.blockchainUrl);
		this.assetClient = new CodenotaryFoundationClient(this.assetUrl);
	}
	hash = async (hash) => {

		const response = await this.blockchainClient.verify(hash)

		const { valid, meta } = response

		let asset = {}

		if (valid) {
			const { owner, level, status, timestamp } = meta
			const metaHash = hashMeta(owner, level, status, timestamp);

			asset = await this.assetClient.getArtifactByHashAndMetaHash(hash, metaHash)
		}

		return { valid, asset }
	}

	file = async (file, onProgress) => {

		const hash = await hashFile(file, onProgress)

		return this.hash(hash)
	}
}

export default Verify