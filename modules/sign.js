import CodenotaryApiClient from "../lib/codenotaryApi";

import hashFile from "../utils/hashFile"
import { assetLevel, assetStatus } from "../utils/enums"
import { isValidLocalPath } from "../utils/misc";

class Sign {

	constructor(options) {
		const { apiUrl, checksums } = options

		if (!apiUrl) throw Error("apiUrl is missing from configuration")

		this.apiClient = new CodenotaryApiClient(apiUrl);
		this.algorithms = (typeof checksums === 'object') ? ["sha256", ...checksums] : ["sha256"];
	}

	async hash(hash, status) {
		if (!hash || typeof hash !== 'string') throw Error("Hash should be a valid string")

		const response = await this.apiClient.sign(hash, this.organization)

		const { owner, level, status, timestamp } = response

		return {
			hash,
			level: assetLevel(level),
			status: assetStatus(status),
			timestamp,
			owner
		}

	}

	async file(file, onProgress, status) {

		if (!file || !(file instanceof File)) throw Error("Invalid frist argument, provide a file.");

		const hashes = await hashFile(file, this.algorithms, onProgress)

		const asset = await this.hash(hashes.sha256, status)

		return {
			checksums: hashes, ...asset,
		}
	}

	async url(path, onProgress, status) {
		if (!path || !isValidLocalPath(path)) throw Error("Invalid frist argument, provide a local file path starts with file://");

		const hashes = await hashFile(path, this.algorithms, onProgress)

		const asset = await this.hash(hashes.sha256, status)

		return {
			checksums: hashes, ...asset,
		}
	}

}

export default Sign
