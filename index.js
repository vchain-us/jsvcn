
import Verify from './modules/verify';
import { ASSET_URL, BLOCKCHAIN_URL, BLOCKCHAIN_ASSET_ADDRESS, BLOCKCHAIN_ORG_ADDRESS } from './config'
import { isValidLocalPath } from './utils/misc'
import AssetsRelay from "./contracts/AssetsRelay.json";
import OrganisationsRelay from "./contracts/OrganisationsRelay.json";

class Jsvcn {

	constructor(options) {

		this.assetContract = AssetsRelay;
		this.organizationContract = OrganisationsRelay;

		const config = options || {}

		this.assetUrl = config.assetUrl || ASSET_URL;
		this.blockchainUrl = config.blockchainUrl || BLOCKCHAIN_URL;
		this.checksums = config.checksums || []
		this.validationOnly = !!config.validationOnly
		this.assetAddress = config.blockchainAssetAddress || BLOCKCHAIN_ASSET_ADDRESS;
		this.organizationAddress = config.blockchainOrganizationAddress || BLOCKCHAIN_ORG_ADDRESS;
	}


	verify(input, onProgress, against) {
		const { blockchainUrl, assetUrl, checksums, validationOnly, assetContract, assetAddress, organizationContract, organizationAddress } = this

		const blockchainAddress = (against === "ORGANIZATION") ? organizationAddress : assetAddress;
		const blockchainContract = (against === "ORGANIZATION") ? organizationContract : assetContract;

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

