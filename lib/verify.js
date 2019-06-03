import CodenotaryFoundationClient from "./codenotaryFoundation";
import CodenotaryBlockchainClient from "./codenotaryBlockchain";

import hashFile from "../utils/hashFile"
import hashMeta from "../utils/hashMeta"
import { assetLevel, assetStatus } from "../utils/enums"

class Verify {

	constructor(options) {
		const { blockchainUrl, blockchainAddress, assetUrl, checksums } = options

		if (!blockchainUrl || !blockchainAddress) throw Error("Missing blockchain configuration")
		if (!assetUrl) throw Error("Missing asset configuration")

		this.blockchainClient = new CodenotaryBlockchainClient(blockchainUrl, blockchainAddress);
		this.assetClient = new CodenotaryFoundationClient(assetUrl);
		this.algorithms = [...checksums, "sha256"]
	}

	async hash(hash) {

		const { valid, meta } = await this.blockchainClient.verify(hash)

		let asset = {}

		if (valid) {
			const { owner, level, status, timestamp } = meta
			const metaHash = hashMeta(owner, level, status, timestamp);
			asset = await this.asset(hash, metaHash)
			return { hash, level: assetLevel(level), status: assetStatus(status), ...asset }
		}
		return { hash, status: assetStatus() }
	}

	async file(file, onProgress) {

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
