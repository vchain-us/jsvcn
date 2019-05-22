
import getEnv from 'env-universal';
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
		if (typeof input === "string") {

			return hashVerifier(input, { blockchainUrl: this.blockchainUrl, assetUrl: this.assetUrl })

		} else if (input instanceof File) { //todo serverfile 

			return fileVerifier(input, this.fileReader)

		} else {

			throw new Error("Wrong input, please provide hash or file instance")

		}
	}
}

export default Jsvcn;

