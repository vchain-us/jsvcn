const echoCb = (data) => console.log(data)

const urlReader = (path, chunkSize, config) => {
	const options = config || {}
	const onChunk = options.onChunk || echoCb
	const onSuccess = options.onSuccess || echoCb
	const onError = options.onError || echoCb

	if (!chunkSize) throw Error("Missing second argument: chunk size");
	readChunk(path, chunkSize, 0, chunkSize - 1, 0, onSuccess, onError, onChunk);
}

const readChunk = (path, chunkSize, offset, end, fileSize, onSuccess, onError, onChunk) => {

	const xhr = new XMLHttpRequest();
	xhr.responseType = "arraybuffer";

	xhr.onload = function () {
		const data = xhr.response
		const dataLength = data.byteLength
		fileSize = fileSize + dataLength;

		onChunk({
			data,
			offset,
			fileSize,
			chunkSize: dataLength
		});

		if (end + dataLength < end + chunkSize ) {
			onSuccess({
				data: null,
				fileSize
			})
			return; // exit loop
		}

		readChunk(path, chunkSize, end + 1, end + chunkSize, fileSize, onSuccess, onError, onChunk);
	};

	xhr.open("get", path, true);
	xhr.onerror = (err) => {
		if (onError) onError(err)
	}

	xhr.setRequestHeader("Range", "bytes=" + offset + "-" + end);
	xhr.send();
}

export default urlReader
