
import Verify from './lib/verify';
import browserFileReader from './utils/fileReader'
// import serverFileReader from './utils/serverFileReader'
import { ASSET_URL, BLOCKCHAIN_URL, BLOCKCHAIN_ADDRESS } from './config'

class Jsvcn {

	constructor(options) {
		const config = options || {}

		// endpoints		
		this.assetUrl = config.assetUrl || ASSET_URL;
		this.blockchainUrl = config.blockchainUrl || BLOCKCHAIN_URL;
		this.blockchainAddress = config.blockchainAddress || BLOCKCHAIN_ADDRESS;
		// filereader
		// todo node.js env  fileReader = (env.is.client) ? browserFileReader : serverFileReader
		this.fileReader = config.fileReader || browserFileReader
	}


	verify(input, onProgress) {
		const { blockchainUrl, assetUrl } = this
		const verify = new Verify({ blockchainUrl, assetUrl })

		if (typeof input === "string") {

			return verify.hash(input)

		} else if (input instanceof File) {

			return verify.file(input, onProgress)

		} else {

			throw new Error("Invalid frist argument, please provide a hash or a File.")

		}
	}
}

export default Jsvcn;

