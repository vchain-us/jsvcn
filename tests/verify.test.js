
const mockVerify = { verify:  jest.fn()}
const mockGetArtifactByHashAndMetaHash = jest.fn()


jest.mock('../lib/codenotaryFoundation', () => () => ({
	getArtifactByHashAndMetaHash: mockGetArtifactByHashAndMetaHash,
}));

import Verify from '../modules/verify'

const HASH = "abc"

const TEST_URL = "http://test.local"

const BASE_CONFIG_API = {mode: 'api'}

const BASE_CONFIG_BLOCKCHAIN = { mode: 'blockchain', blockchainUrl: TEST_URL, assetUrl: TEST_URL, blockchainAssetAddress: "123", blockchainOrganizationAddress: "123" }

const VALIDATIONONLY_CONFIG = { ...BASE_CONFIG_BLOCKCHAIN, validationOnly: true }


const TEST_FILE = new File(["foo"], "foo.txt", {
	type: "text/plain",
});

describe('verify', () => {
	describe('constructor', () => {

		it('should throw error when blockchain url is not present in config', () => {

			expect(() => { new Verify(mockVerify, { blockchainUrl: null }); }).toThrowError("blockchainUrl is missing from configuration")

		});

		it('should throw error when asset url is not present in config', () => {

			expect(() => { new Verify(mockVerify, { ...BASE_CONFIG_BLOCKCHAIN, assetUrl: null }); }).toThrowError("assetUrl is missing from configuration")

		});

		it('should throw error when blockchain address is not present in config', () => {

			expect(() => { new Verify(mockVerify, { ...BASE_CONFIG_BLOCKCHAIN, blockchainAssetAddress: null }); }).toThrowError("blockchainAssetAddress is missing from configuration")

		});

		it('should throw error when blockchain contract is not present in config', () => {

			expect(() => { new Verify(mockVerify, { ...BASE_CONFIG_BLOCKCHAIN, blockchainOrganizationAddress: null }); }).toThrowError("blockchainOrganizationAddress is missing from configuration")

		});

		it('should have sha256 algo perconfigured', () => {

			const verify = new Verify(mockVerify, { ...BASE_CONFIG_BLOCKCHAIN });

			expect(verify.algorithms).toEqual(["sha256"]);

		});


		it('should add checksums from config to algorithms', () => {

			const verify = new Verify(mockVerify, { ...BASE_CONFIG_BLOCKCHAIN, checksums: ["sha1"] });

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
			const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

			mockVerify.mockReturnValue({ valid: false, meta: {} });

			const response = await verify.hash(HASH)
			expect(response).toHaveProperty("status");
			expect(response).toHaveProperty("level");
			expect(response).toHaveProperty("hash");
			expect(response).toHaveProperty("owner");
			expect(response).toHaveProperty("timestamp");
		});


		it('should return with blockchain values (status and level) and not from codenotary asset response', async () => {
			const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

			mockVerify.mockReturnValue({ valid: true, meta: { status: 1, level: 1 } });
			verify.asset = () => ({ status: 2, level: 2 })

			const response = await verify.hash(HASH)
			expect(response.status).toBe("UNTRUSTED");
			expect(response.level).toBe("EMAIL_VERIFIED");
		});


		it('should return with the hash and status when the verified asset is on the blockchain but requested with validation only', async () => {
			const verify = new Verify(mockVerify, VALIDATIONONLY_CONFIG);

			mockVerify.mockReturnValue({ valid: true, meta: {} });
			verify.asset = () => ({ arg: "" })

			const response = await verify.hash(HASH)
			expect(response).toHaveProperty("status");
			expect(response).toHaveProperty("level");
			expect(response).toHaveProperty("hash");
			expect(response).toHaveProperty("owner");
			expect(response).toHaveProperty("timestamp");

		});


		it('should return with hash, status, level and asset arguments when the verified asset is on the blockchain', async () => {
			const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

			mockVerify.mockReturnValue({ valid: true, meta: {} });
			verify.asset = () => ({ arg: "" })

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
			const verify = new Verify(mockVerify, BASE_CONFIG_BLOCKCHAIN);

			mockVerify.mockReturnValue({ valid: true, meta: {} });
			verify.asset = () => ({ arg: "" })

			const response = await verify.file(TEST_FILE)
			expect(response).toHaveProperty("status");
			expect(response).toHaveProperty("hash");
			expect(response).toHaveProperty("checksums");
			expect(response).toHaveProperty("arg");

		});

	});


});