import { status, level } from "../lib/enums"

describe('status', () => {

	it('should return with TRUSTED when value is 0', () => {

		expect(status(0)).toBe("TRUSTED")
	});

	it('should return with UNTRUSTED when value is 1', () => {

		expect(status(1)).toBe("UNTRUSTED")
	});

	it('should return with UNKNOWN when value is 2', () => {

		expect(status(2)).toBe("UNKNOWN")
	});

	it('should return with UNSUPPORTED when value is 3', () => {

		expect(status(3)).toBe("UNSUPPORTED")
	});

	it('should return with UNKNOWN when value is empty', () => {

		expect(status()).toBe("UNKNOWN")
	});

	it('should return with UNKNOWN when value is invalid', () => {

		expect(status(62738)).toBe("UNKNOWN")
	});


});


describe('level', () => {

	it('should return with UNKNOWN when value is 0', () => {

		expect(level(0)).toBe("UNKNOWN")
	});

	it('should return with EMAIL_VERIFIED when value is 1', () => {

		expect(level(1)).toBe("EMAIL_VERIFIED")
	});

	it('should return with SOCIAL_VERIFIED when value is 2', () => {

		expect(level(2)).toBe("SOCIAL_VERIFIED")
	});

	it('should return with ID_VERIFIED when value is 3', () => {

		expect(level(3)).toBe("ID_VERIFIED")
	});

	it('should return with LOCATION_VERIFIED when value is 4', () => {

		expect(level(4)).toBe("LOCATION_VERIFIED")
	});

	it('should return with VCHAIN when value is 99', () => {

		expect(level(99)).toBe("VCHAIN")
	});

	it('should return with ID_VERIFIED when value is invalid', () => {

		expect(level(61782)).toBe("UNKNOWN")
	});

	it('should return with DISABLED when value is -1', () => {

		expect(level(-1)).toBe("DISABLED")
	});

});