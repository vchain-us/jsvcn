
import Verify from './lib/verify';
import browserFileReader from './utils/fileReader'
// import serverFileReader from './utils/serverFileReader'
import { ASSET_URL, BLOCKCHAIN_URL } from './config'

class Jsvcn {

	constructor(options) {
		const confg = options || {}

		// endpoints		
		this.assetUrl = confg.assetUrl || ASSET_URL;
		this.blockchainUrl = confg.blockchainUrl || BLOCKCHAIN_URL;

		// filereader
		// todo node.js env  fileReader = (env.is.client) ? browserFileReader : serverFileReader
		this.fileReader = confg.fileReader || browserFileReader
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

