import FileReader from 'filereader'

const fr = new FileReader();

const fileReader = (file, chunkSize, options) => {
	const { onSuccess, onError, onChunk } = options || {}

	if (!(file instanceof File)) throw Error("Invalid file argument, provide a file.");
	if (!chunkSize) throw Error("Missing second argument: chunk size");

	let offset = 0;

	fr.onerror = (err) => {
		if (onError) onError(err);
	}

	fr.onload = function () {
		if (onChunk) onChunk({
			data: fr.result,
			offset,
			fileSize: file.size,
			chunkSize: chunkSize
		});

		offset += chunkSize;
		seek(file, chunkSize, offset, onSuccess);
	};

	seek(file, chunkSize, offset, onSuccess);
}

const seek = (file, chunkSize, offset, onSuccess) => {
	if (offset >= file.size) {
		if (onSuccess) onSuccess({
			data: null,
			offset: file.size,
			fileSize: file.size,
			chunkSize: chunkSize,
		})
		return;
	}
	const slice = file.slice(offset, offset + chunkSize);
	fr.readAsArrayBuffer(slice);
}


export default fileReader;

