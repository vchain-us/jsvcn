
const mockHash = jest.fn()
const mockFile = jest.fn()
const mockUrl = jest.fn()

jest.mock('../modules/verify', () => () => ({
	hash: mockHash,
	file: mockFile,
	url: mockUrl,
}));

import Jsvcn from '../index'
import { ASSET_URL, BLOCKCHAIN_URL } from '../config'

const TEST_PATH = "file://whatever.jpg"

const TEST_URL = "http://test.local"

const TEST_FILE = new File(["foo"], "foo.txt", {
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
		
	});

	describe('constructor', () => {

		it('should accept custom asset api url', () => {

			const jsvcn = new Jsvcn({ assetUrl: TEST_URL });
			expect(jsvcn.assetUrl).toEqual(TEST_URL);

		});

		it('should accept custom blockhain api url', () => {

			const jsvcn = new Jsvcn({ blockchainUrl: TEST_URL });
			expect(jsvcn.blockchainUrl).toEqual(TEST_URL);

		});

	});


	describe('jsvcn veriy method', () => {

		const jsvcn = new Jsvcn();

		it('should call url verify when input is a local path starts with file://', () => {
			jsvcn.verify(TEST_PATH)
			expect(mockUrl).toHaveBeenCalled();
		});

		it('should call hash verify when input is string', () => {
			jsvcn.verify("hajshdkhashdk23z7682368")
			expect(mockHash).toHaveBeenCalled();
		});

		it('should call file verify when input is File instance', () => {
			jsvcn.verify(TEST_FILE);
			expect(mockFile).toHaveBeenCalled();
		});

		it('should throw error when first argument is not string or file', () => {

			expect(() => { jsvcn.verify(1267162) }).toThrowError("Invalid frist argument, please provide a hash OR file OR local file url")

		});

	});

});