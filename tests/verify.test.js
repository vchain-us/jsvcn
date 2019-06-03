import Verify from "../lib/verify"

describe('verify', () => {


	describe('hash', () => {
	
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