const isValidLocalPath = (file) => typeof file === "string" && file.lastIndexOf("file://", 0) === 0

export { isValidLocalPath }