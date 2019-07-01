
import sha256 from "js-sha256";
import sha512 from "js-sha512"
import sha1 from "js-sha1"
import md5 from "js-md5"
import fileReader from "./fileReader";
import { CHUNK_SIZE } from "../config"

const progress = (offset, size) => Math.round((offset / size) * 100)

const hashFile = (file, hashAlgorithms, onProgress) => {

  const algos = typeof hashAlgorithms === "string" ? [hashAlgorithms] : (hashAlgorithms || [])

  const hash = {
    sha256: algos.includes("sha256") ? sha256.create() : undefined,
    sha1: algos.includes("sha1") ? sha1.create() : undefined,
    md5: algos.includes("md5") ? md5.create() : undefined,
    sha512: algos.includes("sha512") ? sha512.create() : undefined
  }

  if (!(file instanceof File)) throw Error("Invalid frist argument, provide a file.");

  return new Promise(
    (resolve, reject) => {
      fileReader(file, CHUNK_SIZE, {
        onSuccess: () => {
          const hex = {
            sha256: algos.includes("sha256") ? hash.sha256.hex() : undefined,
            sha1: algos.includes("sha1") ? hash.sha1.hex() : undefined,
            md5: algos.includes("md5") ? hash.md5.hex() : undefined,
            sha512: algos.includes("sha512") ? hash.sha512.hex() : undefined
          }
          resolve(hex)
        },
        onChunk: ({ offset, fileSize, data }) => {
          if (algos.includes("sha256")) hash.sha256.update(data);
          if (algos.includes("sha1")) hash.sha1.update(data);
          if (algos.includes("md5")) hash.md5.update(data);
          if (algos.includes("sha512")) hash.sha512.update(data);

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
