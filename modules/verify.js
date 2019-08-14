import CodenotaryFoundationClient from "../lib/codenotaryFoundation";
import CodenotaryBlockchainClient from "../lib/codenotaryBlockchain";

import hashFile from "../utils/hashFile"
import hashMeta from "../utils/hashMeta"
import { assetLevel, assetStatus } from "../utils/enums"
import { isValidLocalPath } from "../utils/misc";

class Verify {

	constructor(options) {
		const { blockchainUrl, blockchainAddress, blockchainContract, assetUrl, validationOnly, checksums } = options

		if (!blockchainUrl) throw Error("Blockchain url is missing from configuration")
		if (!blockchainAddress) throw Error("Blockchain address is missing from configuration")
		if (!blockchainContract) throw Error("Blockchain contract is missing from configuration")
		if (!assetUrl) throw Error("Asset url is missing from configuration")

		this.blockchainClient = new CodenotaryBlockchainClient(blockchainUrl, blockchainContract, blockchainAddress);
		this.assetClient = new CodenotaryFoundationClient(assetUrl);
		this.algorithms = (typeof checksums === 'object') ? ["sha256", ...checksums] : ["sha256"];
		this.validationOnly = !!validationOnly
	}

	async hash(hash) {
		if (!hash || typeof hash !== 'string') throw Error("Hash should be a valid string")

		const { valid, meta } = await this.blockchainClient.verify(hash)

		const { owner, level, status, timestamp } = meta

		const response = {
			hash,
			level: assetLevel(level),
			status: assetStatus(status),
			timestamp,
			owner
		}

		let asset = {}

		if (valid && !this.validationOnly) {
			const metaHash = hashMeta(owner, level, status, timestamp);
			asset = await this.asset(hash, metaHash)
			return { ...asset, ...response }
		}

		return response
	}

	async file(file, onProgress) {

		if (!file || !(file instanceof File)) throw Error("Invalid frist argument, provide a file.");

		const hashes = await hashFile(file, this.algorithms, onProgress)

		const asset = await this.hash(hashes.sha256)

		return {
			checksums: hashes, ...asset,
		}
	}

	async url(path, onProgress) {
		if (!path || !isValidLocalPath(path)) throw Error("Invalid frist argument, provide a local file path starts with file://");

		const hashes = await hashFile(path, this.algorithms, onProgress)

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
