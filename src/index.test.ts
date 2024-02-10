import {byAttributeAsc, byAttributeDesc, combine, CompareBuilder, sortByAsc, sortByDesc} from "./index";


describe("Compare Builder", () => {

  describe("byAttributeAsc", () => {

    it("Should sort by Attribute ASC", () => {

      const input = [
        {id: "a", att1: "3"},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input.slice().sort(byAttributeAsc(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["c", "d", "a", "b", "e"])

    })

    it("Should put nulls last", () => {

      const input = [
        {id: "a", att1: null},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input.slice().sort(byAttributeAsc(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["c", "d", "b", "e", "a"])

    })

    it("Should put undefined last", () => {

      const input = [
        {id: "a", att1: undefined},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input.slice().sort(byAttributeAsc(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["c", "d", "b", "e", "a"])

    })

    it("Should sort numbers", () => {
      const input = [
        {id: "a", att1: 3},
        {id: "b", att1: 4},
        {id: "c", att1: 1},
        {id: "d", att1: 2},
        {id: "e", att1: 5},
      ]

      const result = input.slice().sort(byAttributeAsc(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["c", "d", "a", "b", "e"])
    })

  })

  describe("byAttributeDesc", () => {

    it("Should sort by Attribute Desc", () => {

      const input = [
        {id: "a", att1: "3"},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input.slice().sort(byAttributeDesc(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["e", "b", "a", "d", "c"])

    })

    it("Should put nulls last", () => {

      const input = [
        {id: "a", att1: null},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input.slice().sort(byAttributeDesc(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["e", "b", "d", "c", "a"])

    })

    it("Should put undefined last", () => {

      const input = [
        {id: "a", att1: undefined},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input.slice().sort(byAttributeDesc(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["e", "b", "d", "c", "a"])

    })

    it("Should sort numbers", () => {
      const input = [
        {id: "a", att1: 3},
        {id: "b", att1: 4},
        {id: "c", att1: 1},
        {id: "d", att1: 2},
        {id: "e", att1: 5},
      ]

      const result = input.slice().sort(byAttributeDesc(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["e", "b", "a", "d", "c"])
    })

  })

  describe("combine", () => {

    it("Should combine different directions", () => {

      const input = [
        {id: "a", att1: "3", att2: "1"},
        {id: "b", att1: "2", att2: "5"},
        {id: "c", att1: "1", att2: "3"},
        {id: "d", att1: "2", att2: "2"},
        {id: "e", att1: "1", att2: "4"},
      ]

      const result = input.slice()
        .sort(
          combine(
            byAttributeAsc(obj => obj.att1),
            byAttributeDesc(obj => obj.att2)
          )
        )

      expect(result.map(obj => obj.id)).toEqual(["e", "c", "b", "d", "a"])

    })

    it("Should combine same directions", () => {

      const input = [
        {id: "a", att1: "3", att2: "1"},
        {id: "b", att1: "2", att2: "5"},
        {id: "c", att1: "1", att2: "3"},
        {id: "d", att1: "2", att2: "2"},
        {id: "e", att1: "1", att2: "4"},
      ]

      const result = input.slice()
        .sort(
          combine(
            byAttributeAsc(obj => obj.att1),
            byAttributeAsc(obj => obj.att2)
          )
        )

      expect(result.map(obj => obj.id)).toEqual(["c", "e", "d", "b", "a"])

    })

  })

  describe("CompareBuilder", () => {

    it("Should build comparator", () => {

      const input = [
        {id: "a", att1: "2", att2: "1", att3: "4"},
        {id: "b", att1: "2", att2: "2", att3: "5"},
        {id: "c", att1: "1", att2: "3", att3: "2"},
        {id: "d", att1: "2", att2: "2", att3: "3"},
        {id: "e", att1: "1", att2: "1", att3: "1"},
      ]

      const result = input.slice()
        .sort(
          new CompareBuilder<{id:string, att1:string, att2:string, att3:string}>()
            .asc(obj => obj.att1)
            .desc(obj => obj.att2)
            .asc(obj => obj.att3)
            .build()
        )

      expect(result.map(obj => obj.id)).toEqual(["c", "e", "d", "b", "a"])

    })

  })

  describe("sortByAsc", () => {

    it("Should build comparator builder with ASC first", () => {

      const input = [
        {id: "a", att1: "2", att2: "1", att3: "4"},
        {id: "b", att1: "2", att2: "2", att3: "5"},
        {id: "c", att1: "1", att2: "3", att3: "2"},
        {id: "d", att1: "2", att2: "2", att3: "3"},
        {id: "e", att1: "1", att2: "1", att3: "1"},
      ]

      const result = input.slice()
        .sort(
            sortByAsc<{id:string, att1:string, att2:string, att3:string}, string>(obj => obj.att1)
              .desc(obj => obj.att2)
              .asc(obj => obj.att3)
              .build()
        )

      expect(result.map(obj => obj.id)).toEqual(["c", "e", "d", "b", "a"])

    })

  })

  describe("sortByDesc", () => {

    it("Should build comparator builder with DESC first", () => {

      const input = [
        {id: "a", att1: "2", att2: "1", att3: "4"},
        {id: "b", att1: "2", att2: "2", att3: "5"},
        {id: "c", att1: "1", att2: "3", att3: "2"},
        {id: "d", att1: "2", att2: "2", att3: "3"},
        {id: "e", att1: "1", att2: "1", att3: "1"},
      ]

      const result = input.slice()
        .sort(
          sortByDesc<{id:string, att1:string, att2:string, att3:string}, string>(obj => obj.att1)
            .desc(obj => obj.att2)
            .asc(obj => obj.att3)
            .build()
        )

      expect(result.map(obj => obj.id)).toEqual(["d", "b", "a", "c", "e"])

    })

  })

})