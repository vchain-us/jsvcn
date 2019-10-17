import hashFile from "../utils/hashFile"
import hashMeta from "../utils/hashMeta"
import { assetLevel, assetStatus } from "../utils/enums"
import { isValidLocalPath } from "../utils/misc";

class Verify {

	constructor(clientService, options) {
		const { validationOnly, checksums, organization } = options;
		this.algorithms = (typeof checksums === 'object') ? ["sha256", ...checksums] : ["sha256"];
		this.validationOnly = !!validationOnly;
		this.organization = organization;
		this.clientMode = clientService.type

		if (this.clientMode === 'blockchain') {
			this.blockchainService = clientService.service.blockchainService;
			this.assetService = clientService.service.assetService;
		} else {
			this.apiService = clientService.service
		}
	}

	async hash(hash) {
		if (!hash || typeof hash !== 'string') throw Error("Hash should be a valid string")

		let response = {};

		if (this.clientMode === 'blockchain') {

			const { valid, meta } = (this.organization) ? await this.blockchainService.verifyAgainstOrganization(hash, this.organization) : await this.blockchainService.verify(hash)

			const { owner, level, status, timestamp } = meta

			response = {
				hash,
				level: assetLevel(level),
				status: assetStatus(status),
				timestamp,
				owner
			}

			if (valid && !this.validationOnly) {
				const metaHash = hashMeta(owner, level, status, timestamp);
				const asset = await this.asset(hash, metaHash)
				response = { ...asset, ...response }
			}

		} else {
			const { data } = (this.organization) ? await this.apiService.verifyAgainstOrganization(hash, this.organization) : await this.apiService.verify(hash)
			response = data
			response.verification.status = assetStatus(data.verification.status)
			response.verification.level = assetLevel(data.verification.level)
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

	// TODO move to another module eg. Inspect
	async asset(hash, metaHash) {
		return await this.assetService.getArtifactByHashAndMetaHash(hash, metaHash)
	}
}

export default Verify
