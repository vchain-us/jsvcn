import hashFile from "../utils/hashFile"

const TEST_FILE = new File([new Blob(['foo', 'bar'])], "test.png", { type: "image/png" });
const HASH = "c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2";
describe('hashFile', () => {

	it('should throw an error when first argument is not a file', () => {

		expect(() => { hashFile("e") }).toThrowError("Invalid frist argument, provide a file.")

	});


	it('should return with a hash', () => {

		return expect(hashFile(TEST_FILE)).resolves.toBe(HASH);

	});

	it('onProgress callback should return with progress', done => {
		function callback(percent) {
			expect(percent).toEqual(0);
			done()
		}

		hashFile(TEST_FILE, callback)
	});


});