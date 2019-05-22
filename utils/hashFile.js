
import sha256 from "js-sha256";
import fileReader from "./fileReader";
import { CHUNK_SIZE } from "../config"

const progress = (offset, size) => Math.round((offset / size) * 100)

const hashFile = (file, onProgress) => {
  const hash = sha256.create();

  if (!(file instanceof File)) throw Error("Invalid frist argument, provide a file.");

  return new Promise(
    (resolve, reject) => {
      fileReader(file, CHUNK_SIZE, {
        onSuccess: () => {
          const h = hash.hex();
          resolve(h)
        },
        onChunk: ({ offset, fileSize, data }) => {
          hash.update(data);
          if (onProgress) {
            const percent = progress(offset, fileSize)
            onProgress(percent)
          }
        },
        onError: (err) => reject(err)
      });
    }
  )
}

export default hashFile;
