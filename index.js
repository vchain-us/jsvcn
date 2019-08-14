
import Verify from './modules/verify';
import { ASSET_URL, BLOCKCHAIN_URL, BLOCKCHAIN_ASSET_ADDRESS, BLOCKCHAIN_ORG_ADDRESS } from './config'
import { isValidLocalPath } from './utils/misc'
import AssetsRelay from "./contracts/AssetsRelay.json";
import OrganisationsRelay from "./contracts/OrganisationsRelay.json";

class Jsvcn {

	constructor(options) {
		const config = options || {}

		// endpoints		
		this.assetUrl = config.assetUrl || ASSET_URL;
		this.validationOnly = !!config.validationOnly
		this.checksums = config.checksums || []
		this.against = config.against || "ALL";
		this.blockchainUrl = config.blockchainUrl || BLOCKCHAIN_URL;

		if (this.against === "ALL") {
			this.blockchainAddress = config.blockchainAddress || BLOCKCHAIN_ASSET_ADDRESS;
			this.blockchainContract = config.blockchainContract || AssetsRelay;
		} else if (this.against === "ORGANIZATION") {
			this.blockchainAddress = config.blockchainAddress || BLOCKCHAIN_ORG_ADDRESS;
			this.blockchainContract = config.blockchainContract || OrganisationsRelay;
		}
	}


	verify(input, onProgress) {
		const { blockchainUrl, blockchainAddress, blockchainContract, assetUrl, checksums, validationOnly } = this
		const verify = new Verify({ blockchainUrl, blockchainAddress, blockchainContract, assetUrl, validationOnly, checksums })

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

