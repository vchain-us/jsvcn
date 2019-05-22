
import getEnv from 'env-universal';
import browserFileReader from './utils/browserFileReader'
// import serverFileReader from './utils/serverFileReader'
import { ASSET_URL, BLOCKCHAIN_URL } from './config'
import { verifyHash, verifyFile } from './lib/verify';

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

		if (typeof input === "string") {
			return verifyHash(input, { blockchainUrl, assetUrl })

		} else if (input instanceof File) { //todo serverfile 

			return verifyFile(input, this.fileReader, { blockchainUrl, assetUrl })

		} else {

			throw new Error("Wrong input, please provide hash or file instance")

		}
	}
}

export default Jsvcn;

