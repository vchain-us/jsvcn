
import sha256 from "js-sha256";

const CHUNK_SIZE = 1024 * 1024 * 50; // 1024 * 1024 * N == N megs

let hash = null

const hashFile = (file, fileReader, callback) => {

  hash = sha256.create();

  if (file instanceof File) {

    if (!loader) throw Error("Cannot find a loder for this file type");
    fileReader(file, CHUNK_SIZE, (err, chunk) => onChunkRead(err, chunk, callback));

  } else {
    throw Error("Invalid input");
  }
}

const onChunkRead = (err, chunk, callback) => {
  if (err) {
    callback(err);
    return;
  }

  if (chunk.state === "in_progress") {
    hash.update(chunk.data);
    callback(null, chunk);
  }

  if (chunk.state === "finished") {
    chunk.fileHash = hash.hex();
    callback(null, chunk);
  }
}

export default hashFile;
