import fileReader from "../utils/fileReader"

const TEST_FILE = new File([new Blob(['foo', 'bar'])], "test.png", { type: "image/png" });
const CHUNK_SIZE = 1
const FILE_SIZE = 6

describe('fileReader', () => {

	it('should throw an error when first argument is not a file', () => {

		expect(() => { fileReader("e", 1) }).toThrowError("Invalid file argument, provide a file.")

	});

	it('should throw an error when second argument is not provided', () => {

		expect(() => { fileReader(TEST_FILE) }).toThrowError("Missing second argument: chunk size")

	});

	it('should return with success object', done => {

		fileReader(TEST_FILE, CHUNK_SIZE, {
			onSuccess: function (data) {
				expect(data.data).toEqual(null);
				expect(data.offset).toEqual(FILE_SIZE);
				expect(data.fileSize).toEqual(FILE_SIZE);
				expect(data.chunkSize).toEqual(CHUNK_SIZE);
				done()
			}
		})
	});


	it('should return with chunk object and same size', done => {
		fileReader(TEST_FILE, CHUNK_SIZE, {
			onChunk: function (data) {
				expect(data.data).toEqual(new ArrayBuffer(1));
				expect(data.offset).toEqual(0);
				expect(data.fileSize).toEqual(FILE_SIZE);
				expect(data.chunkSize).toEqual(CHUNK_SIZE);
				done()
			}
		})
	});


});