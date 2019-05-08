const fr = null

const browserFileReader = (file, chunkSize, callback) => {
	let offset = 0;

	fr = new FileReader();
	fr.onload = function () {
		callback(null, {
			offset,
			fileSize: file.size,
			state: "in_progress",
			data: fr.result
		});

		offset += chunkSize;
		seek(file, chunkSize, offset, callback);
	};

	fr.onerror = callback;

	seek(file, chunkSize, offset, callback);
}

const seek = (file, chunkSize, offset, callback) => {
	if (offset >= file.size) {
		callback(null, {
			state: "finished"
		});
		return;
	}

	const slice = file.slice(offset, offset + chunkSize);
	fr.readAsArrayBuffer(slice);
}


export default browserFileReader;