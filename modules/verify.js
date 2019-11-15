import hashFile from "../utils/hashFile"
import hashMeta from "../utils/hashMeta"
import { assetLevel, assetStatus } from "../utils/enums"
import { isValidLocalPath } from "../utils/misc";

class Verify {

	constructor(clientService, options) {
		const { validationOnly, checksums, organization, signers } = options;
		this.algorithms = (typeof checksums === 'object') ? ["sha256", ...checksums] : ["sha256"];
		this.validationOnly = !!validationOnly;
		this.organization = organization;
		this.signers = signers || [];
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

			let data
			if (this.organization) {
				data = await this.blockchainService.verifyAgainstOrganization(hash, this.organization)
			} else if (this.signers.length > 0) {
				data = await this.blockchainService.verifyAgainstPublicKeys(hash, this.signers)
			} else {
				data = await this.blockchainService.verify(hash)
			}

			const { valid, meta } = data
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
				response = { ...asset, verification: response }
			}

			return response

		} else {
			let data 
			if (this.organization) {
				data = await this.apiService.verifyAgainstOrganization(hash, this.organization)
			} else if (this.signers.length > 0) {
				data = await this.apiService.verifyAgainstPublicKeys(hash, this.signers)
			} else {
				data = await this.apiService.verify(hash)
			}
			response = data.data
			response.verification.status = assetStatus(response.verification.status)
			response.verification.level = assetLevel(response.verification.level)
			return response

		}

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
