jest.mock('../lib/verify', () => ({
	verifyHash: jest.fn(),
	verifyFile: jest.fn()
}))

import Jsvcn from '../index'
import verify from '../lib/verify'
import { ASSET_URL, BLOCKCHAIN_URL } from '../config'

const URL = "http://test.local"

const FILE = new File(["foo"], "foo.txt", {
	type: "text/plain",
});

describe('jsvcn', () => {
	describe('configuration by default', () => {

		const jsvcn = new Jsvcn();

		it('should read asset endpoint from configuration', () => {

			expect(jsvcn.assetUrl).toEqual(ASSET_URL);

		});

		it('should read blockchain endpoint from configuration', () => {

			expect(jsvcn.blockchainUrl).toEqual(BLOCKCHAIN_URL);

		});

		it('should be aware of current js environment', () => {
			expect(jsvcn.env.is.client).toBeFalsy();
			expect(jsvcn.env.is.server).toBeFalsy();
			expect(jsvcn.env.is.test).toBeTruthy();
		});

		it('should use some kind of file reader by default', () => {

			expect(jsvcn.fileReader).toBeInstanceOf(Function);

		});
	});

	describe('constructor', () => {

		it('should accept custom asset api url', () => {

			const jsvcn = new Jsvcn({ assetUrl: URL });
			expect(jsvcn.assetUrl).toEqual(URL);

		});

		it('should accept custom blockhain api url', () => {

			const jsvcn = new Jsvcn({ blockchainUrl: URL });
			expect(jsvcn.blockchainUrl).toEqual(URL);

		});


		it('should accept custom filereader', () => {

			const customReader = (e) => console.log(e)

			const jsvcn = new Jsvcn({ fileReader: customReader });
			expect(jsvcn.fileReader).toEqual(customReader);

		});


	});


	describe('jsvcn veriy method', () => {

		const jsvcn = new Jsvcn();

		it('should call verifyHash when input is string', () => {
			jsvcn.verify("hajshdkhashdk23z7682368")
			expect(verify.verifyHash).toHaveBeenCalled();
		});

		it('should call verifyFile when input is File instance', () => {
			jsvcn.verify(FILE);
			expect(verify.verifyFile).toHaveBeenCalled();

		});


		it('should throw error when first argument is not string or file', () => {

			expect(() => { jsvcn.verify(1267162) }).toThrowError("Wrong input, please provide hash or file instance")

		});

	});

});