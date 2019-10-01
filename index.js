
import Verify from './modules/verify';
import Sign from './modules/sign';

import { ASSET_URL, BLOCKCHAIN_URL, BLOCKCHAIN_ASSET_ADDRESS, BLOCKCHAIN_ORG_ADDRESS, API_URL } from './config'
import { isValidLocalPath } from './utils/misc'

class Jsvcn {

	constructor(options) {

		const config = options || {}

		this.assetUrl = config.assetUrl || ASSET_URL;

		this.apiUrl = config.apiUrl || API_URL;
		this.credentials = config.credentials || null
		this.blockchainUrl = config.blockchainUrl || BLOCKCHAIN_URL;
		this.blockchainAssetAddress = config.blockchainAssetAddress || BLOCKCHAIN_ASSET_ADDRESS;
		this.blockchainOrganizationAddress = config.blockchainOrganizationAddress || BLOCKCHAIN_ORG_ADDRESS;

		this.checksums = config.checksums || []
		this.validationOnly = !!config.validationOnly

	}


	verify(input, onProgress, organization) {
		const { blockchainUrl, assetUrl, apiUrl, checksums, validationOnly, blockchainAssetAddress, blockchainOrganizationAddress } = this

		const verify = new Verify({ apiUrl, assetUrl, blockchainUrl, blockchainAssetAddress, blockchainOrganizationAddress, validationOnly, checksums }, organization)

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
		const { apiUrl, credentials } = this
		const sign = new Sign({ apiUrl, credentials })

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
		const { apiUrl, credentials } = this
		const sign = new Sign({ apiUrl, credentials })

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
		const { apiUrl, credentials } = this
		const sign = new Sign({ apiUrl, credentials })

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

