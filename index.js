
import getEnv from 'env-universal';
import Verify from './lib/verify';
import browserFileReader from './utils/browserFileReader'
// import serverFileReader from './utils/serverFileReader'
import { ASSET_URL, BLOCKCHAIN_URL } from './config'

class Jsvcn {

	constructor(options) {
		const confg = options || {}
		// environment 
		this.env = getEnv();

		// endpoints		
		this.assetUrl = confg.assetUrl || ASSET_URL;
		this.blockchainUrl = confg.blockchainUrl || BLOCKCHAIN_URL;

		// filereader
		// todo node.js env  fileReader = (env.is.client) ? browserFileReader : serverFileReader
		this.fileReader = confg.fileReader || browserFileReader
	}


	verify = (input) => {
		const { blockchainUrl, assetUrl } = this
		const verify = new Verify({ blockchainUrl, assetUrl })

		if (typeof input === "string") {
			return verify.hash(input)

		} else if (input instanceof File) { //todo serverfile 

			return verify.file(input, this.fileReader)

		} else {

			throw new Error("Wrong input, please provide hash or file instance")

		}
	}
}

export default Jsvcn;

