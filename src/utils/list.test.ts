import { getNextIndex, getPrevIndex } from "./list";

describe("utils", () => {
  describe("list", () => {
    describe("getNextIndex", () => {
      it("returns next index when current index is in the middle", () => {
        const result = getNextIndex(["a", "b", "c"], 1);
        expect(result).toStrictEqual(2);
      });

      it("returns next index when current index is the last", () => {
        const result = getNextIndex(["a", "b", "c"], 2);
        expect(result).toStrictEqual(0);
      });
    });

    describe("getPrevIndex", () => {
      it("returns previous index when current index is in the middle", () => {
        const result = getPrevIndex(["a", "b", "c"], 1);
        expect(result).toStrictEqual(0);
      });

      it("returns next index when current index is the first one", () => {
        const result = getPrevIndex(["a", "b", "c"], 0);
        expect(result).toStrictEqual(2);
      });
    });
  });
});
