import urlReader from "../utils/urlReader"

const TEST_FILE = "https://cors-anywhere.herokuapp.com/https://www.vchain.us/wp-content/uploads/2019/01/ico5.png" //= "file://" + process.cwd() + "/package.json";
const CHUNK_SIZE = 1000
const FILE_SIZE = 1487
const CHUNK_SIZE_BIG = 1500
const HASH = "x"

describe('urlReader', () => {

	it('should throw an error when second argument is not provided', () => {

		expect(() => { urlReader(TEST_FILE) }).toThrowError("Missing second argument: chunk size")

	});


	it('onSuccess should return with null data, last chunk\'s size and full sfilesize', done => {
		urlReader(TEST_FILE, CHUNK_SIZE, {
			onSuccess: function (data) {
				expect(data.data).toEqual(null);
				expect(data.chunkSize).toEqual(FILE_SIZE - CHUNK_SIZE);
				expect(data.fileSize).toEqual(FILE_SIZE);
				done()
			}
		})
	});


	it('onChunk should return with chunk data, chunk size and chunk size as file size (until now) when the file is biger than the chunk size', done => {
		urlReader(TEST_FILE, CHUNK_SIZE, {
			onChunk: function (data) {
				expect(data.data).toEqual(new ArrayBuffer(1));
				expect(data.fileSize).toEqual(CHUNK_SIZE);
				expect(data.chunkSize).toEqual(CHUNK_SIZE);
				done()
			}
		})
	});

	it('onChunk should return with chunk data, chunk size and file size (until now) when the file is smaller than the chunk size', done => {
		urlReader(TEST_FILE, CHUNK_SIZE_BIG, {
			onChunk: function (data) {
				expect(data.data).toEqual(new ArrayBuffer(1));
				expect(data.fileSize).toEqual(FILE_SIZE);
				expect(data.chunkSize).toEqual(CHUNK_SIZE_BIG);
				done()
			}
		})
	});


});