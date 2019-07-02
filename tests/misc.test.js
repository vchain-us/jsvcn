import { isValidLocalPath } from "../utils/misc"


describe('misc ', () => {

	describe('isValidLocalPath ', () => {

		it('should return true when input string starts with file://', () => {

			expect(isValidLocalPath("file://e")).toBeTruthy()

		});

		it('should return false when input string is http address', () => {

			expect(isValidLocalPath("http://e")).toBeFalsy()

		});

		it('should return false when input is not string', () => {

			expect(isValidLocalPath(1)).toBeFalsy()

		});

		it('should return false when input is not string', () => {

			expect(isValidLocalPath("text")).toBeFalsy()

		});

	});


});
