
import getEnv from 'env-universal';
import browserFileReader from './utils/browserFileReader'
// import serverFileReader from './utils/serverFileReader'

import metahash from "./utils/metaHash";
import blockchainVerify from "./lib/blockchainVerify";


const FOUNDATION_HOST = "https://api.codenotary.io/foundation/v1";
const BLOCKCHAIN_HOST = "https://main.codenotary.io"

const env = getEnv();


const verifyFile = async (file) => {

	// const fileReader = (env.is.client) ? browserFileReader : serverFileReader
	const fileReader = browserFileReader;

	const hash = await hashFile(file, fileReader)

	const response = await verifyHash(hash, { meta })

	return response;
}


const verifyHash = async (hash) => {

	//TODO validhash?

	const response = await blockchainVerify(hash, { apiUrl: BLOCKCHAIN_HOST })

	if (!response) {
		throw Error("Error during blockchain verification.")
		return null
	}

	const { isValid, result } = response
	let metaData = {}

	if (isValid) {

		const metaHash = metahash(result);

		metaData = foundationMetadata(hash, metaHash, { apiUrl: FOUNDATION_HOST })

	}

	return { isValid, metaData }
}


export { verifyHash, verifyFile };
