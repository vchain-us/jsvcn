
import Verify from './modules/verify';
import Sign from './modules/sign';

import { ASSET_URL, BLOCKCHAIN_URL, BLOCKCHAIN_ASSET_ADDRESS, BLOCKCHAIN_ORG_ADDRESS, API_URL } from './config'
import { isValidLocalPath } from './utils/misc'

class Jsvcn {

	constructor(options) {

		const config = options || {}

		this.assetUrl = config.assetUrl || ASSET_URL;

		this.blockchainUrl = config.blockchainUrl || BLOCKCHAIN_URL;
		this.blockchainAssetAddress = config.blockchainAssetAddress || BLOCKCHAIN_ASSET_ADDRESS;
		this.blockchainOrganizationAddress = config.blockchainOrganizationAddress || BLOCKCHAIN_ORG_ADDRESS;

		this.checksums = config.checksums || []
		this.validationOnly = !!config.validationOnly
	}


	verify(input, onProgress, organization) {
		const { blockchainUrl, assetUrl, checksums, validationOnly, blockchainAssetAddress, blockchainOrganizationAddress } = this

		const verify = new Verify({ assetUrl, blockchainUrl, blockchainAssetAddress, blockchainOrganizationAddress, validationOnly, checksums }, organization)

		if (input instanceof File) {
			return verify.file(input, onProgress)

		} else if (isValidLocalPath(input)) {

			return verify.url(input)

		} else if (typeof input === "string") {

			return verify.hash(input)

		} else {

			throw new Error("Invalid frist argument, please provide a hash OR file OR local file url")

		}

	}

	sign(input, onProgress) {
		const sign = new Sign({ apiUrl })

		if (input instanceof File) {
			return sign.file(input, onProgress)

		} else if (isValidLocalPath(input)) {

			return sign.url(input)

		} else if (typeof input === "string") {

			return sign.hash(input)

		} else {

			throw new Error("Invalid frist argument, please provide a hash OR file OR local file url")

		}
	}

	untrust(input, onProgress) {
		const status = "UNTRUST"
		const sign = new Sign({ apiUrl })

		if (input instanceof File) {
			return sign.file(input, onProgress, status)

		} else if (isValidLocalPath(input)) {

			return sign.url(input, status)

		} else if (typeof input === "string") {

			return sign.hash(input, status)

		} else {

			throw new Error("Invalid frist argument, please provide a hash OR file OR local file url")

		}

	}

	unsupport(input, onProgress) {
		const status = "UNSUPPORT"
		const sign = new Sign({ apiUrl })

		if (input instanceof File) {
			return sign.file(input, onProgress, status)

		} else if (isValidLocalPath(input)) {

			return sign.url(input, status)

		} else if (typeof input === "string") {

			return sign.hash(input, status)

		} else {

			throw new Error("Invalid frist argument, please provide a hash OR file OR local file url")

		}

	}
}

export default Jsvcn;

