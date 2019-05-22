import hashMeta from "../utils/hashMeta"

const ABCD_HASH = "32c6a50aba0b30f63f124f4b2bb47dc027b9e48f838f71d1debe69d8680ecf70";

describe('metahash', () => {

	it('should return empty string when first arg is empty', () => {
		expect(hashMeta(null, "a", "b", "c")).toEqual("");
	});

	it('should return empty string when second arg is empty', () => {
		expect(hashMeta("a", null, "b", "c")).toEqual("");
	});

	it('should return empty string when third arg is empty', () => {
		expect(hashMeta("a", "b", null, "c")).toEqual("");
	});

	it('should return empty string when fourth arg is empty', () => {
		expect(hashMeta("a", "b", "c")).toEqual("");
	});

	it('should return with valid sha256 hash when all args are provided', () => {
		expect(hashMeta("a", "b", "c", "d")).toEqual(ABCD_HASH);
	});


});