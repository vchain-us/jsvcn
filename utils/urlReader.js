const urlReader = (path, chunkSize, options) => {

	const { onSuccess, onError, onChunk } = options || {}
	if (!chunkSize) throw Error("Missing second argument: chunk size");

	readChunk(path, chunkSize, 0, chunkSize, onSuccess, onError, onChunk);
}

function readChunk(file, chunkSize, pos, fileLen, onSuccess, onError, onChunk) {
	if (pos > fileLen) {
		if (onSuccess) onSuccess({
			data: null,
			offset: pos,
			fileSize: fileLen,
			chunkSize: chunkSize,
		})
		console.log("success", fileLen)
		return;
	}
	const chunkEnd = pos + chunkSize < fileLen ? pos + chunkSize : fileLen;
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 206) {
			if(onChunk) onChunk({
				data: xhr.result,
				offset: pos,
				fileSize: fileLen,
				chunkSize: chunkSize
			});
			console.log("chunk",pos, fileLen, xhr.result)
			//request next chunk
			fileLen = parseInt(xhr.getResponseHeader("Content-Range").split("/")[1]);
			readChunk(file, chunkSize, pos + chunkSize + 1, fileLen, onSuccess, onError, onChunk);
		}
	};
	xhr.open("get", file, true);
	xhr.onerror = (err) => {
		if (onError) onError(err)
		console.log(err)
	}
	xhr.setRequestHeader("Range", "bytes=" + pos + "-" + chunkEnd);
	xhr.send();
}

export default urlReader;
