import {byAttributeASC, byAttributeDESC, combine, CompareBuilder, sortByASC, sortByDESC} from "./index";


describe("Compare Builder", () => {

  describe("byAttributeASC", () => {

    it("Should sort by Attribute ASC", () => {

      const input = [
        {id: "a", att1: "3"},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input.slice().sort(byAttributeASC(obj => obj.att1))

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

      const result = input.slice().sort(byAttributeASC(obj => obj.att1))

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

      const result = input.slice().sort(byAttributeASC(obj => obj.att1))

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

      const result = input.slice().sort(byAttributeASC(obj => obj.att1))

      expect(result.map(obj => obj.id)).toEqual(["c", "d", "a", "b", "e"])
    })

  })

  describe("byAttributeDESC", () => {

    it("Should sort by Attribute DESC", () => {

      const input = [
        {id: "a", att1: "3"},
        {id: "b", att1: "4"},
        {id: "c", att1: "1"},
        {id: "d", att1: "2"},
        {id: "e", att1: "5"},
      ]

      const result = input.slice().sort(byAttributeDESC(obj => obj.att1))

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

      const result = input.slice().sort(byAttributeDESC(obj => obj.att1))

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

      const result = input.slice().sort(byAttributeDESC(obj => obj.att1))

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

      const result = input.slice().sort(byAttributeDESC(obj => obj.att1))

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
            byAttributeASC(obj => obj.att1),
            byAttributeDESC(obj => obj.att2)
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
            byAttributeASC(obj => obj.att1),
            byAttributeASC(obj => obj.att2)
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

  describe("sortByASC", () => {

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
            sortByASC<{id:string, att1:string, att2:string, att3:string}, string>(obj => obj.att1)
            .desc(obj => obj.att2)
            .asc(obj => obj.att3)
            .build()
        )

      expect(result.map(obj => obj.id)).toEqual(["c", "e", "d", "b", "a"])

    })

  })

  describe("sortByDESC", () => {

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
          sortByDESC<{id:string, att1:string, att2:string, att3:string}, string>(obj => obj.att1)
            .desc(obj => obj.att2)
            .asc(obj => obj.att3)
            .build()
        )

      expect(result.map(obj => obj.id)).toEqual(["d", "b", "a", "c", "e"])

    })

  })

})