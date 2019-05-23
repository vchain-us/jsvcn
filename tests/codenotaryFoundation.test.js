import codenotaryFoundationClient from "../lib/codenotaryFoundation"

const TEST_URL = "http://test.local"
const RESPONSE = { "name": "myapp.dmg.zip", "hash": "5886500e487980b92ea17e53235d0547ae1efdbd219797c128085066e52de57b", "filename": "myapp.dmg.zip", "size": 9293703, "fileSize": 9293703, "url": "", "level": 1, "visibility": "PRIVATE", "status": "TRUSTED", "publisher": "peter@vchain.us", "metaHash": "eeba7b482eb38d24a9b3850e6541d69007d802a40803645de40f0ce73204d6c4", "verificationCount": 6, "publisherCount": 1, "createdAt": "2019-03-28T14:17:42.713085", "publisherCompany": "Binvision Kft.", "publisherWebsiteUrl": "http://www.whatever.com", "kind": null, "contentType": null, "metadata": null }

describe('foundation client', () => {

	beforeEach(() => {
		fetch.resetMocks()
	})

	it('should accept api url', () => {

		const client = new codenotaryFoundationClient(TEST_URL);
		expect(client.apiUrl).toEqual(TEST_URL);

	});

	describe('getArtifactByHashAndMetaHash', () => {

		const client = new codenotaryFoundationClient(TEST_URL);


		it('should throw error when first parameter is missing', async () => {

			let errorMessage = 'No error thrown.';
			try {
				await client.getArtifactByHashAndMetaHash(undefined, "")
			} catch (error) {
				errorMessage = error.message;
			}
			expect(errorMessage).toBe("First argument hash is missing or invalid.");

		})

		it('should throw error when second parameter is missing', async () => {

			let errorMessage = 'No error thrown.';
			try {
				await client.getArtifactByHashAndMetaHash("a")
			} catch (error) {
				errorMessage = error.message;
			}
			expect(errorMessage).toBe("Second argument metahash is or invalid.");

		})

		it('should return with response object', async () => {

			fetch.mockResponseOnce(JSON.stringify(RESPONSE))

			const data = await client.getArtifactByHashAndMetaHash("a", "b")
			expect(data).toEqual(RESPONSE);

		});

		it('should return with empty object when network error occours', async () => {

			fetch.mockReject("Network Error")

			const data = await client.getArtifactByHashAndMetaHash("a", "b")
			expect(data).toEqual({});

		});
	});
})

