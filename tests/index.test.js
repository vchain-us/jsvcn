import Jsvcn from '../index'

import { ASSET_URL, BLOCKCHAIN_URL } from '../config'

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

			const jsvcn = new Jsvcn({ assetUrl: "http://localhost" });
			expect(jsvcn.assetUrl).toEqual("http://localhost");

		});

		it('should accept custom blockhain api url', () => {

			const jsvcn = new Jsvcn({ blockchainUrl: "http://localhost" });
			expect(jsvcn.blockchainUrl).toEqual("http://localhost");

		});


		it('should accept custom filereader', () => {

			const customReader = (e) => console.log(e)

			const jsvcn = new Jsvcn({ fileReader: customReader });
			expect(jsvcn.fileReader).toEqual(customReader);

		});


	});


	describe('jsvcn veriy method', () => {


		const jsvcn = new Jsvcn();

		it('should throw error when first argument is not string or file', () => {

			expect(jsvcn.verify(1267162).toThrowError("Wrong input, please provide hash or file instance"))

		});

	});

});