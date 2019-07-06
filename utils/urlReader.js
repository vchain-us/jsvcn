const urlReader = (path, chunkSize, options) => {
	const { onSuccess, onError, onChunk } = options || {}
	if (!chunkSize) throw Error("Missing second argument: chunk size");
	readChunk(path, chunkSize, 0, chunkSize, 0, onSuccess, onError, onChunk);
}

function readChunk(path, chunkSize, offset, end, fileSize, onSuccess, onError, onChunk) {

	const xhr = new XMLHttpRequest();
	xhr.responseType = "arraybuffer";

	xhr.onload = () => {
		const data = xhr.response.slice(1);
		const dataLength = data.byteLength
		fileSize = fileSize + dataLength;
		const nextEnd = end + chunkSize
		if (onChunk) onChunk({
			data,
			offset,
			fileSize,
			chunkSize
		});

		if (end + dataLength < nextEnd) {
			if (onSuccess) onSuccess({
				data: null,
				offset,
				fileSize,
				chunkSize: dataLength
			})
			return; // exit loop
		}
		readChunk(path, chunkSize, end, nextEnd, fileSize, onSuccess, onError, onChunk);

	};

	xhr.open("get", path, true);
	xhr.onerror = (err) => {
		if (onError) onError(err)
	}
	const chunkEnd = offset + chunkSize < end ? offset + chunkSize : end;

	xhr.setRequestHeader("Range", "bytes=" + offset + "-" + chunkEnd);
	xhr.send();
}

export default urlReader
