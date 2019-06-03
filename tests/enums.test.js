import { assetStatus, assetLevel } from "../utils/enums"

describe('status', () => {

	it('should return with TRUSTED when value is 0', () => {

		expect(assetStatus(0)).toBe("TRUSTED")
	});

	it('should return with UNTRUSTED when value is 1', () => {

		expect(assetStatus(1)).toBe("UNTRUSTED")
	});

	it('should return with UNKNOWN when value is 2', () => {

		expect(assetStatus(2)).toBe("UNKNOWN")
	});

	it('should return with UNSUPPORTED when value is 3', () => {

		expect(assetStatus(3)).toBe("UNSUPPORTED")
	});

	it('should return with UNKNOWN when value is empty', () => {

		expect(assetStatus()).toBe("UNKNOWN")
	});

	it('should return with UNKNOWN when value is invalid', () => {

		expect(assetStatus(62738)).toBe("UNKNOWN")
	});


});


describe('level', () => {

	it('should return with UNKNOWN when value is 0', () => {

		expect(assetLevel(0)).toBe("UNKNOWN")
	});

	it('should return with EMAIL_VERIFIED when value is 1', () => {

		expect(assetLevel(1)).toBe("EMAIL_VERIFIED")
	});

	it('should return with SOCIAL_VERIFIED when value is 2', () => {

		expect(assetLevel(2)).toBe("SOCIAL_VERIFIED")
	});

	it('should return with ID_VERIFIED when value is 3', () => {

		expect(assetLevel(3)).toBe("ID_VERIFIED")
	});

	it('should return with LOCATION_VERIFIED when value is 4', () => {

		expect(assetLevel(4)).toBe("LOCATION_VERIFIED")
	});

	it('should return with VCHAIN when value is 99', () => {

		expect(assetLevel(99)).toBe("VCHAIN")
	});

	it('should return with ID_VERIFIED when value is invalid', () => {

		expect(assetLevel(61782)).toBe("UNKNOWN")
	});

	it('should return with DISABLED when value is -1', () => {

		expect(assetLevel(-1)).toBe("DISABLED")
	});

});