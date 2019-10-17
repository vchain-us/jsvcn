import hashFile from "../utils/hashFile"
import { assetLevel, assetStatus } from "../utils/enums"
import { isValidLocalPath } from "../utils/misc";

class Sign {

	constructor(clientService) {
		this.clientService = clientService.service;
	}

	async hash(hash, signType, signData) {
		if (!hash || typeof hash !== 'string') throw Error("Hash should be a valid string")

		let response = {}

		signData = {
			...signData,
			kind: signData.kind || "",
			size: signData.size || 0,
			name: signData.name || hash,
			contentType: signData.contentType || ""
		}

		if (signType === "SIGN") {
			response = await this.clientService.sign(hash, signData)
		} else if (signType === "UNTRUST") {
			response = await this.clientService.untrust(hash)
		} else if (signType === "UNSUPPORT") {
			response = await this.clientService.unsupport(hash)
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
		console.log(file)
		signData = {
			...signData,
			kind: "file",
			size: file.size,
			name: file.name,
			contentType: file.type
		}

		return await this.hash(hashes.sha256, signType, signData)

	}

	async url(path, onProgress, signType, signData) {
		if (!path || !isValidLocalPath(path)) throw Error("Invalid frist argument, provide a local file path starts with file://");

		const hashes = await hashFile(path, ["sha256"], onProgress)

		signData = {
			...signData,
			kind: "file",
			size,
			name,
			contentType
		}


		return await this.hash(hashes.sha256, signType, signData)
	}

}

export default Sign
