import "./extend-array-with-sort-by"

describe("Extend Array", () => {

  describe("Array.sortByAsc", () => {

    it("Should sort by ASC", () => {

      const input = [
        {id: "a", att1: "3"},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input
        .sortByAsc<{id:string, att1:string}, string>(obj => obj.att1)

      expect(result.map<any>(obj => obj.id)).toEqual(["c", "d", "a", "b", "e"])


    })

  })

  describe("Array.sortByDesc", () => {

    it("Should sort by DESC", () => {
      const input = [
        {id: "a", att1: "3"},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input
        .sortByDesc<{id:string, att1:string}, string>(obj => obj.att1)

      expect(result.map<any>(obj => obj.id)).toEqual(["e", "b", "a", "d", "c"])

    })

  })

  describe("Array.buildSort", () => {

    it("Should sort by multiple", () => {
      const input = [
        {id: "a", att1: "3", att2: "1"},
        {id: "b", att1: "2", att2: "5"},
        {id: "c", att1: "1", att2: "3"},
        {id: "d", att1: "2", att2: "2"},
        {id: "e", att1: "1", att2: "4"},
      ]

      const result = input.buildSort()
        .asc(obj => obj.att1)
        .desc(obj => obj.att2)
        .sort()


      expect(result.map<any>(obj => obj.id)).toEqual(["e", "c", "b", "d", "a"])
    })

  })

})