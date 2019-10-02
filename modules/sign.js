import CodenotaryApiClient from "../lib/codenotaryApi";

import hashFile from "../utils/hashFile"
import { assetLevel, assetStatus } from "../utils/enums"
import { isValidLocalPath } from "../utils/misc";

class Sign {

	constructor(options) {
		const { apiUrl, credentials } = options

		if (!apiUrl) throw Error("apiUrl is missing from configuration")
		if (!credentials) throw Error("credentials are missing from configuration")

		this.apiClient = new CodenotaryApiClient(apiUrl, credentials);
	}

	async hash(hash, signType, signData) {
		if (!hash || typeof hash !== 'string') throw Error("Hash should be a valid string")

		let response = {}

		signData = {
			...signData,
			kind: signData.kind || "hash",
			size: signData.size || 0,
			name: signData.name || "",
			contentType: signData || ""
		}

		if (signType === "SIGN") {
			response = await this.apiClient.sign(hash, signData)
		} else if (signType === "UNTRUST") {
			response = await this.apiClient.untrust(hash)
		} else if (signType === "UNSUPPORT") {
			response = await this.apiClient.unsupport(hash)
		}

		return {
			...response,
			level: assetLevel(response.level),
			status: assetStatus(response.status),
		}

	}

	async file(file, onProgress, signType, signData) {

		if (!file || !(file instanceof File)) throw Error("Invalid frist argument, provide a file.");

		const hashes = await hashFile(file, ["sha256"], onProgress)

		signData = {
			...signData,
			kind,
			size,
			name,
			contentType
		}

		return await this.hash(hashes.sha256, signType, signData)

	}

	async url(path, onProgress, signType, signData) {
		if (!path || !isValidLocalPath(path)) throw Error("Invalid frist argument, provide a local file path starts with file://");

		const hashes = await hashFile(path, ["sha256"], onProgress)

		signData = {
			...signData,
			kind,
			size,
			name,
			contentType
		}


		return await this.hash(hashes.sha256, signType, signData)
	}

}

export default Sign
