import sha256 from "js-sha256";


const hashMeta = (owner, level, status, timestamp) => {
	if (owner && level && status && timestamp) {
		const str = `${owner}-${level}-${status}-${timestamp}`;
		return sha256(str);
	}
	return "";
};

export default hashMeta