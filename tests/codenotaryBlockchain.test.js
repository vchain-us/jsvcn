import codenotaryBlockchainClient from "../lib/codenotaryBlockchain"

const TEST_URL = "http://test.local"
const VALID_RESPONSE = { "jsonrpc": "2.0", "result": "0x000000000000000000000000f5e4f09d16bc21821faf4ddc15bd7c7bb58f137b00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005ca376f7", "id": 2 }
const INVALID_RESPONSE = { "jsonrpc": "2.0", "result": "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000", "id": 1 }

const VALID = ["0xf5e4f09d16bc21821faf4ddc15bd7c7bb58f137b", "level", "status", "timestamp"]
const INVALID = ["0x0000000000000000000000000000000000000000", "", "", ""]

describe('blockchain client', () => {
	const client = new codenotaryBlockchainClient(TEST_URL, {}, "123");

	beforeEach(() => {
		fetch.resetMocks()
	})

	describe('verify', () => {



		it('should throw error when first parameter is missing', async () => {

			let errorMessage = 'No error thrown.';
			try {
				await client.verify()
			} catch (error) {
				errorMessage = error.message;
			}
			expect(errorMessage).toBe("Hash argument is missing");

		})


		it('should return with response valid object', async () => {

			// overwrite bc methods
			client.methods = { verify: () => ({ call: () => VALID }) }

			const data = await client.verify("a")

			expect(data.valid).toBeTruthy();
			expect(data.meta.owner).toEqual(VALID[0])
			expect(data.meta.level).toEqual(VALID[1])
			expect(data.meta.status).toEqual(VALID[2])
			expect(data.meta.timestamp).toEqual(VALID[3])
		});

		it('should return with response invalid object', async () => {

			// overwrite bc methods
			client.methods = { verify: () => ({ call: () => INVALID }) }

			const data = await client.verify("a")

			expect(data.valid).toBeFalsy();
			expect(data.meta.owner).toEqual(INVALID[0])
			expect(data.meta.level).toEqual(INVALID[1])
			expect(data.meta.status).toEqual(INVALID[2])
			expect(data.meta.timestamp).toEqual(INVALID[3])

		});

	});

	describe('isValidResponse', () => {

		it('should be invalid when input is empty', () => {

			expect(client.isValidResponse()).toBeFalsy()

		});

		it('should be invalid when input is array without 0. item', () => {

			expect(client.isValidResponse([])).toBeFalsy()

		});


		it('should be invalid when value is "0x0000000000000000000000000000000000000000"', () => {

			expect(client.isValidResponse(["0x0000000000000000000000000000000000000000"])).toBeFalsy()

		});
	})
})
