const util = require('../util')

describe("util", () => {
  describe("uniqueArray", () => {
    it("returns an array with unique values", () => {
      const nonUniqueArray = [1, 2, 2, 2, 6, 9];
      const result = util.uniqueArray(nonUniqueArray);
      expect(result).toHaveLength(4);
      expect(result).toEqual([1, 2, 6, 9]);
    });
  });
});
