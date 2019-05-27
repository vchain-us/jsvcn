const level = (value) => {
	switch (value) {
		case 0:
			return "UNKNOWN";
		case 1:
			return "EMAIL_VERIFIED";
		case 2:
			return "SOCIAL_VERIFIED";
		case 3:
			return "ID_VERIFIED";
		case 4:
			return "LOCATION_VERIFIED";
		case 99:
			return "VCHAIN";
		case -1:
			return "DISABLED";
		default:
			return "UNKNOWN";
	}
}

const status = (value) => {
	switch (value) {
		case 0:
			return "TRUSTED";
		case 1:
			return "UNTRUSTED";
		case 2:
			return "UNKNOWN";
		case 3:
			return "UNSUPPORTED";
		default:
			return "UNKNOWN";
	}
}

export {
	status,
	level
}