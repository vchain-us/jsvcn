
import Verify from './modules/verify';
import { ASSET_URL, BLOCKCHAIN_URL, BLOCKCHAIN_ADDRESS } from './config'
import { isValidLocalPath } from './utils/misc'

class Jsvcn {

	constructor(options) {
		const config = options || {}

		// endpoints		
		this.assetUrl = config.assetUrl || ASSET_URL;
		this.blockchainUrl = config.blockchainUrl || BLOCKCHAIN_URL;
		this.blockchainAddress = config.blockchainAddress || BLOCKCHAIN_ADDRESS;
		this.validationOnly = !! config.validationOnly
		this.checksums = config.checksums || []
	}


	verify(input, onProgress) {
		const { blockchainUrl, blockchainAddress, assetUrl, checksums, validationOnly } = this
		const verify = new Verify({ blockchainUrl, blockchainAddress, assetUrl, validationOnly, checksums })

		if (isValidLocalPath(input)) {

			return verify.url(input)

		} else if (typeof input === "string") {

			return verify.hash(input)

		} else {

			throw new Error("Invalid frist argument, please provide a hash OR file OR local file url")

		}

	}
}

export default Jsvcn;

