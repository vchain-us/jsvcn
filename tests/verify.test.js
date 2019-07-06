
const mockVerify = jest.fn()
const mockGetArtifactByHashAndMetaHash = jest.fn()
jest.mock('../lib/codenotaryBlockchain', () => () => ({
	verify: mockVerify,
}));

jest.mock('../lib/codenotaryFoundation', () => () => ({
	getArtifactByHashAndMetaHash: mockGetArtifactByHashAndMetaHash,
}));

import Verify from '../modules/verify'

const HASH = "abc"

const TEST_URL = "http://test.local"

const BASE_CONFIG = { blockchainUrl: TEST_URL, assetUrl: TEST_URL, blockchainAddress: "123" }

const VALIDATIONONLY_CONFIG = { blockchainUrl: TEST_URL, assetUrl: TEST_URL, blockchainAddress: "123", validationOnly: true }


const TEST_FILE = new File(["foo"], "foo.txt", {
	type: "text/plain",
});

describe('verify', () => {
	describe('constructor', () => {

		it('should throw error when blockchain url is not present in config', () => {

			expect(() => { new Verify({ blockchainUrl: null }); }).toThrowError("Blockchain url is missing from configuration")

		});

		it('should throw error when asset url is not present in config', () => {

			expect(() => { new Verify({ blockchainUrl: TEST_URL, blockchainAddress: "123", assetUrl: null }); }).toThrowError("Asset url is missing from configuration")

		});

		it('should throw error when blockchain address is not present in config', () => {

			expect(() => { new Verify({ blockchainUrl: TEST_URL, assetUrl: TEST_URL }); }).toThrowError("Blockchain address is missing from configuration")

		});

		it('should have sha256 algo perconfigured', () => {

			const verify = new Verify({ ...BASE_CONFIG });

			expect(verify.algorithms).toEqual(["sha256"]);

		});


		it('should add checksums from config to algorithms', () => {

			const verify = new Verify({ ...BASE_CONFIG, checksums: ["sha1"] });

			expect(verify.algorithms).toEqual(["sha256", "sha1"]);

		});

	});


	describe('hash', () => {


		it('should throw error when no hash provided', async () => {

			const verify = new Verify(BASE_CONFIG);

			let errorMessage = 'Nope';
			try {
				await verify.hash();
			} catch (error) {
				errorMessage = error.message;
			}
			expect(errorMessage).toBe("Hash should be a valid string");
		});


		it('should return with the hash and status when the verified asset is not on the blockchain', async () => {
			const verify = new Verify(BASE_CONFIG);

			mockVerify.mockReturnValue({ valid: false, meta: {} });

			const response = await verify.hash(HASH)
			expect(response).toHaveProperty("status");
			expect(response).toHaveProperty("hash");

		});

		it('should return with the hash and status when the verified asset is on the blockchain but requested with validation only', async () => {
			const verify = new Verify(VALIDATIONONLY_CONFIG);

			mockVerify.mockReturnValue({ valid: true, meta: {} });

			const response = await verify.hash(HASH)
			expect(response).toHaveProperty("status");
			expect(response).toHaveProperty("hash");

		});


		it('should return with hash, status, level and asset arguments when the verified asset is on the blockchain', async () => {
			const verify = new Verify(BASE_CONFIG);

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

			const verify = new Verify(BASE_CONFIG);

			let errorMessage = 'Nope';
			try {
				await verify.file("e");
			} catch (error) {
				errorMessage = error.message;
			}
			expect(errorMessage).toBe("Invalid frist argument, provide a file.");
		});


		it('should return with the hash, status, checksums and asset arguments', async () => {
			const verify = new Verify(BASE_CONFIG);

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