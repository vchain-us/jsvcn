const mockVerify = {
	type: 'blockchain',
	service: {
		blockchainService: {
			verify: jest.fn()
		}
	}
}
const mockGetArtifactByHashAndMetaHash = jest.fn()


jest.mock('../lib/codenotaryFoundation', () => () => ({
	getArtifactByHashAndMetaHash: mockGetArtifactByHashAndMetaHash,
}));

import Verify from '../modules/verify'

const HASH = "abc"

const TEST_URL = "http://test.local"

const BASE_CONFIG_API = {
	apiUrl: TEST_URL,
}

const BASE_CONFIG_BLOCKCHAIN = {
	blockchainUrl: TEST_URL,
	assetUrl: TEST_URL,
	blockchainAssetAddress: "123",
	blockchainOrganizationAddress: "123"
}

const VALIDATIONONLY_CONFIG = {
	...BASE_CONFIG_BLOCKCHAIN,
	validationOnly: true
}


const TEST_FILE = new File(["foo"], "foo.txt", {
	type: "text/plain",
});

describe('verify', () => {

	it('should have sha256 algo perconfigured', () => {

		const verify = new Verify(mockVerify, {
			...BASE_CONFIG_BLOCKCHAIN
		});

		expect(verify.algorithms).toEqual(["sha256"]);

	});


	it('should add checksums from config to algorithms', () => {

		const verify = new Verify(mockVerify, {
			...BASE_CONFIG_BLOCKCHAIN,
			checksums: ["sha1"]
		});

		expect(verify.algorithms).toEqual(["sha256", "sha1"]);

	});

});


describe('hash', () => {


	it('should throw error when no hash provided', async () => {

		const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

		let errorMessage = 'Nope';
		try {
			await verify.hash();
		} catch (error) {
			errorMessage = error.message;
		}
		expect(errorMessage).toBe("Hash should be a valid string");
	});


	it('should return with the hash and status when the verified asset is not on the blockchain', async () => {
		mockVerify.service.blockchainService.verify = () => ({
			valid: false,
			meta: {}
		})

		const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

		const response = await verify.hash(HASH)
		expect(response).toHaveProperty("status");
		expect(response).toHaveProperty("level");
		expect(response).toHaveProperty("hash");
		expect(response).toHaveProperty("owner");
		expect(response).toHaveProperty("timestamp");
	});


	it('should return with blockchain values (status and level) and not from codenotary asset response', async () => {
		mockVerify.service.blockchainService.verify = () => ({
			valid: true,
			meta: {
				status: 1,
				level: 1
			}
		});

		const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);


		verify.asset = () => ({
			status: 2,
			level: 2
		})

		const response = await verify.hash(HASH)
		expect(response.status).toBe("UNTRUSTED");
		expect(response.level).toBe("EMAIL_VERIFIED");
	});


	it('should return with the hash and status when the verified asset is on the blockchain but requested with validation only', async () => {

		mockVerify.service.blockchainService.verify = () => ({
			valid: true,
			meta: {}
		});

		const verify = new Verify(mockVerify, VALIDATIONONLY_CONFIG);

		verify.asset = () => ({
			arg: ""
		})

		const response = await verify.hash(HASH)
		expect(response).toHaveProperty("status");
		expect(response).toHaveProperty("level");
		expect(response).toHaveProperty("hash");
		expect(response).toHaveProperty("owner");
		expect(response).toHaveProperty("timestamp");

	});


	it('should return with hash, status, level and asset arguments when the verified asset is on the blockchain', async () => {
		mockVerify.service.blockchainService.verify = () => ({
			valid: true,
			meta: {}
		});

		const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

		verify.asset = () => ({
			arg: ""
		})

		const response = await verify.hash(HASH)
		expect(response).toHaveProperty("status");
		expect(response).toHaveProperty("hash");
		expect(response).toHaveProperty("level");
		expect(response).toHaveProperty("arg");

	});

});


describe('file', () => {

	it('should throw error when no hash provided', async () => {

		const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

		let errorMessage = 'Nope';
		try {
			await verify.file("e");
		} catch (error) {
			errorMessage = error.message;
		}
		expect(errorMessage).toBe("Invalid frist argument, provide a file.");
	});


	it('should return with the hash, status, checksums and asset arguments', async () => {

		mockVerify.service.blockchainService.verify = () => ({
			valid: true,
			meta: {}
		});

		const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

		verify.asset = () => ({
			arg: ""
		})

		const response = await verify.file(TEST_FILE)
		expect(response).toHaveProperty("status");
		expect(response).toHaveProperty("hash");
		expect(response).toHaveProperty("checksums");
		expect(response).toHaveProperty("arg");

	});

});