
import Verify from './modules/verify';
import { ASSET_URL, BLOCKCHAIN_URL, BLOCKCHAIN_ASSET_ADDRESS, BLOCKCHAIN_ORG_ADDRESS } from './config'
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
}

export default Jsvcn;

