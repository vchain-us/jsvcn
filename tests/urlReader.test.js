import urlReader from "../utils/urlReader"

const TEST_FILE = "file://" + process.cwd() + "/package.json";
const CHUNK_SIZE = 10

console.log(TEST_FILE)
describe('urlReader', () => {

	it('should throw an error when second argument is not provided', () => {

		expect(() => { urlReader(TEST_FILE) }).toThrowError("Missing second argument: chunk size")

	});

	
	it('should work', ()=>{
		urlReader(TEST_FILE, CHUNK_SIZE)

	})
	
	it('should return with success object', done => {
		console.log(TEST_FILE)
		urlReader(TEST_FILE, CHUNK_SIZE, {
			onSuccess: function (data) {
				console.log(data)
				expect(data.data).toEqual(null);
				expect(data.offset).toEqual(FILE_SIZE);
				expect(data.fileSize).toEqual(FILE_SIZE);
				expect(data.chunkSize).toEqual(CHUNK_SIZE);
				done()
			}
		})
	});

/*
	it('should return with chunk object and same size', done => {
		urlReader(TEST_FILE, CHUNK_SIZE, {
			onChunk: function (data) {
				expect(data.data).toEqual(new ArrayBuffer(1));
				expect(data.offset).toEqual(0);
				expect(data.fileSize).toEqual(FILE_SIZE);
				expect(data.chunkSize).toEqual(CHUNK_SIZE);
				done()
			}
		})
	});
	*/

});