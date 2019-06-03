import hashFile from "../utils/hashFile"

const TEST_FILE = new File([new Blob(['foo', 'bar'])], "test.png", { type: "image/png" });
const HASH_SHA256 = "c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2";
const HASH_MD5 = "3858f62230ac3c915f300c664312c63f";
const HASH_SHA1 = "8843d7f92416211de9ebb963ff4ce28125932878";
describe('hashFile', () => {

	it('should throw an error when first argument is not a file', () => {

		expect(() => { hashFile("e") }).toThrowError("Invalid frist argument, provide a file.")

	});


	it('should return with empty values when no algorithm was defined', () => {

		return expect(hashFile(TEST_FILE)).resolves.toStrictEqual({ sha256: undefined, sha1: undefined, md5: undefined });

	});

	it('should return with a hash when second parameter is a valid algo', () => {

		return expect(hashFile(TEST_FILE, "sha256")).resolves.toStrictEqual({ sha256: HASH_SHA256, sha1: undefined, md5: undefined });

	});


	it('should return with chekcums when second parameter is a valid array of algorithms', () => {

		return expect(hashFile(TEST_FILE, ["sha256", "md5", "sha1"], null)).resolves.toStrictEqual({ sha256: HASH_SHA256, sha1: HASH_SHA1, md5: HASH_MD5 });

	});

	it('onProgress callback should return with progress', done => {
		function callback(percent) {
			expect(percent).toEqual(0);
			done()
		}

		hashFile(TEST_FILE, "sha256", callback)
	});


});