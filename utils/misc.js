const isValidLocalPath = (file) => typeof file === "string" && (file.lastIndexOf("file://", 0) === 0 || file.lastIndexOf("http://", 0) === 0 || file.lastIndexOf("https://", 0) === 0)

export { isValidLocalPath }