
import Verify from './modules/verify';
import Sign from './modules/sign';
import CodenotaryFoundationClient from "./lib/codenotaryFoundation";
import CodenotaryBlockchainClient from "./lib/codenotaryBlockchain";
import CodenotaryApiClient from "./lib/codenotaryApi";

import { ASSET_URL, BLOCKCHAIN_URL, BLOCKCHAIN_ASSET_ADDRESS, BLOCKCHAIN_ORG_ADDRESS, API_URL } from './config'
import { isValidLocalPath } from './utils/misc'

class Jsvcn {

	constructor(options) {

		const config = options || {}
		const mode = config.mode || 'api'

		const credentials = config.credentials || {}

		const assetUrl = config.assetUrl || ASSET_URL;
		const apiUrl = config.apiUrl || API_URL;
		const blockchainUrl = config.blockchainUrl || BLOCKCHAIN_URL;
		const blockchainAssetAddress = config.blockchainAssetAddress || BLOCKCHAIN_ASSET_ADDRESS;
		const blockchainOrganizationAddress = config.blockchainOrganizationAddress || BLOCKCHAIN_ORG_ADDRESS;
		this.checksums = config.checksums || []
		this.validationOnly = !!config.validationOnly

		// init clients
		this.clientService = (mode === 'blockchain') ? ({
			type: 'blockchain',
			service: {
				blockchainService: new CodenotaryBlockchainClient(blockchainUrl, blockchainAssetAddress, blockchainOrganizationAddress),
				assetService: new CodenotaryFoundationClient(assetUrl)
			}
		}) : ({
			type: 'api',
			service: new CodenotaryApiClient(apiUrl, credentials)
		});

	}


	verify(input, onProgress, against) {

		const { checksums, validationOnly } = this

    const organization = typeof against === "string" ? against : undefined

		const signers = Array.isArray(against) ? against : undefined

    const verify = new Verify(this.clientService, { organization, signers, checksums, validationOnly })

		if (input instanceof File) {
			return verify.file(input, onProgress)

		} else if (isValidLocalPath(input)) {

			return verify.url(input)

		} else if (typeof input === "string") {

			return verify.hash(input)

		} else {

			throw new Error("Invalid frist argument, please provide hash, file or local file url")

		}

	}

	sign(input, signData, onProgress) {
		const sign = new Sign(this.clientService)

		if (input instanceof File) {
			return sign.file(input, onProgress, "SIGN", signData)

		} else if (isValidLocalPath(input)) {

			return sign.url(input, "SIGN", signData)

		} else if (typeof input === "string") {

			return sign.hash(input, "SIGN", signData)

		} else {

			throw new Error("Invalid frist argument, please provide hash, file or local file url")

		}
	}

	untrust(input, onProgress) {
		const sign = new Sign(this.clientService)

		if (input instanceof File) {
			return sign.file(input, onProgress, "UNTRUST")

		} else if (isValidLocalPath(input)) {

			return sign.url(input, "UNTRUST")

		} else if (typeof input === "string") {

			return sign.hash(input, "UNTRUST")

		} else {

			throw new Error("Invalid frist argument, please provide hash, file or local file url")

		}

	}

	unsupport(input, onProgress) {
		const sign = new Sign(this.clientService)

		if (input instanceof File) {
			return sign.file(input, onProgress, "UNSUPPORT")

		} else if (isValidLocalPath(input)) {

			return sign.url(input, "UNSUPPORT")

		} else if (typeof input === "string") {

			return sign.hash(input, "UNSUPPORT")

		} else {

			throw new Error("Invalid frist argument, please provide hash, file or local file url")

		}

	}
}

export default Jsvcn;

