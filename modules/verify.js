import CodenotaryFoundationClient from "../lib/codenotaryFoundation";
import CodenotaryBlockchainClient from "../lib/codenotaryBlockchain";

import hashFile from "../utils/hashFile"
import hashMeta from "../utils/hashMeta"
import { assetLevel, assetStatus } from "../utils/enums"

class Verify {

	constructor(options) {
		const { blockchainUrl, blockchainAddress, assetUrl, checksums } = options

		if (!blockchainUrl) throw Error("Blockchain url is missing from configuration")
		if (!blockchainAddress) throw Error("Blockchain address is missing from configuration")
		if (!assetUrl) throw Error("Asset url is missing from configuration")

		this.blockchainClient = new CodenotaryBlockchainClient(blockchainUrl, blockchainAddress);
		this.assetClient = new CodenotaryFoundationClient(assetUrl);
		this.algorithms = (typeof checksums === 'object') ? ["sha256", ...checksums] : ["sha256"];
	}

	async hash(hash) {
		if (!hash || typeof hash !== 'string') throw Error("Hash should be a valid string")

		const { valid, meta } = await this.blockchainClient.verify(hash)

		let asset = {}

		if (valid) {
			const { owner, level, status, timestamp } = meta
			const metaHash = hashMeta(owner, level, status, timestamp);
			asset = await this.asset(hash, metaHash)
			return {...asset, hash, level: assetLevel(level), status: assetStatus(status) }
		}
		return { hash, status: assetStatus() }
	}

	async file(file, onProgress) {

		if (!file || !(file instanceof File)) throw Error("Invalid frist argument, provide a file.");

		const hashes = await hashFile(file, this.algorithms, onProgress)

		const asset = await this.hash(hashes.sha256)

		return {
			checksums: hashes, ...asset,
		}
	}

	async asset(hash, metaHash) {
		return await this.assetClient.getArtifactByHashAndMetaHash(hash, metaHash)
	}
}

export default Verify
