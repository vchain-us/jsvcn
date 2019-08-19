import CodenotaryFoundationClient from "../lib/codenotaryFoundation";
import CodenotaryBlockchainClient from "../lib/codenotaryBlockchain";

import hashFile from "../utils/hashFile"
import hashMeta from "../utils/hashMeta"
import { assetLevel, assetStatus } from "../utils/enums"
import { isValidLocalPath } from "../utils/misc";

class Verify {

	constructor(options, organization) {
		const { blockchainUrl, blockchainAssetAddress, blockchainOrganizationAddress, assetUrl, validationOnly, checksums } = options

		if (!blockchainUrl) throw Error("blockchainUrl is missing from configuration")
		if (!assetUrl) throw Error("assetUrl is missing from configuration")
		if (!blockchainAssetAddress) throw Error("blockchainAssetAddress is missing from configuration")
		if (!blockchainOrganizationAddress) throw Error("blockchainOrganizationAddress is missing from configuration")

		this.blockchainClient = new CodenotaryBlockchainClient(blockchainUrl, blockchainAssetAddress, blockchainOrganizationAddress);
		this.assetClient = new CodenotaryFoundationClient(assetUrl);
		this.algorithms = (typeof checksums === 'object') ? ["sha256", ...checksums] : ["sha256"];
		this.validationOnly = !!validationOnly
		this.organization = organization
	}

	async hash(hash) {
		if (!hash || typeof hash !== 'string') throw Error("Hash should be a valid string")

		const { valid, meta } = (this.organization) ? await this.blockchainClient.verifyAgainstOrganization(hash, this.organization) : await this.blockchainClient.verify(hash)

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
