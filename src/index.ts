
export type Comparator<T> = (obj1:T|undefined|null, obj2:T|undefined|null) => number
export type AttributeExtractor<T, R> = (value:T) => R

export const byAttributeDesc = <T, R>(attributeExtractor:AttributeExtractor<T, R>):Comparator<T> => {
  return (object1:T|undefined|null, object2:T|undefined|null) => {
    if (object1 === undefined || object2 === undefined || object1 === null || object2 === null) {
      return -1; // nulls and undefined last
    }
    const attribute1:R = attributeExtractor(object1);
    const attribute2:R = attributeExtractor(object2);

    if (attribute1 === null || attribute1 === undefined) {
      return 1 // nulls and undefined last
    }
    if (attribute2 === null || attribute2 === undefined) {
      return -1 // nulls and undefined last
    }
    if (attribute1 > attribute2) {
      return -1;
    }
    if (attribute1 < attribute2) {
      return 1;
    }
    // therefore attribute1 === attribute2
    return 0;
  }
};

export const byAttributeAsc = <T, R>(attributeExtractor:AttributeExtractor<T, R>):Comparator<T> => {
  return (object1:T|undefined|null, object2:T|undefined|null) => {
    if (object1 === undefined || object2 === undefined || object1 === null || object2 === null) {
      return -1; // nulls and undefined last
    }
    const attribute1:R = attributeExtractor(object1);
    const attribute2:R = attributeExtractor(object2);
    if (attribute1 === null || attribute1 === undefined) {
      return 1 // nulls and undefined last
    }
    if (attribute2 === null || attribute2 === undefined) {
      return -1 // nulls and undefined last
    }
    if (attribute1 > attribute2) {
      return 1;
    }
    if (attribute1 < attribute2) {
      return -1;
    }
    // therefore attribute1 === attribute2
    return 0;
  }
};

export const combine = <T>(...comparators:Array<Comparator<T>>):Comparator<T> => {
  return (object1:T|null|undefined, object2:T|null|undefined) => {
    for (let comparatorIndex = 0; comparatorIndex < comparators.length; comparatorIndex++) {
      const comparator = comparators[comparatorIndex];
      const result = comparator(object1, object2);
      if (result !== 0) {
        return result
      }
    }
    return 0;
  }
}

export class CompareBuilder<T> {

  private comparators:Array<Comparator<T>> = new Array<Comparator<T>>()

  asc<R>(attributeExtractor:AttributeExtractor<T, R>):CompareBuilder<T> {
    this.comparators.push(byAttributeAsc(attributeExtractor))
    return this
  }

  desc<R>(attributeExtractor:AttributeExtractor<T, R>):CompareBuilder<T> {
    this.comparators.push(byAttributeDesc(attributeExtractor))
    return this
  }

  build() {
    return combine(...this.comparators)
  }
}

export const sortByAsc = <T, R>(attributeExtractor:AttributeExtractor<T, R>):CompareBuilder<T> => {
  return new CompareBuilder<T>().asc(attributeExtractor)
}

export const sortByDesc = <T, R>(attributeExtractor:AttributeExtractor<T, R>):CompareBuilder<T> => {
  return new CompareBuilder<T>().desc(attributeExtractor)
}