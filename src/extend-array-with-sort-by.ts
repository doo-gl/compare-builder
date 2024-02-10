import {AttributeExtractor, CompareBuilder} from "./index";

export class ArraySort<T> {

  private input:Array<T>
  private compareBuilder = new CompareBuilder<T>()

  constructor(input:Array<T>) {
    this.input = input
  }

  /**
   * Takes an attribute extractor and appends it to the list of sorts to perform on this collection
   * The attributes extracted will be used to sort the Array in Ascending order
   *
   * Call `sort()` or `toSorted()` to sort the Array using the built-up sorts.
   *
   * @param attributeExtractor
   */
  asc<R> (attributeExtractor:AttributeExtractor<T, R>):ArraySort<T> {
    this.compareBuilder.asc(attributeExtractor)
    return this
  }

  /**
   * Takes an attribute extractor and appends it to the list of sorts to perform on this collection
   * The attributes extracted will be used to sort the Array in Descending order
   *
   * Call `sort()` or `toSorted()` to sort the Array using the built-up sorts.
   *
   * @param attributeExtractor
   */
  desc<R> (attributeExtractor:AttributeExtractor<T, R>):ArraySort<T> {
    this.compareBuilder.desc(attributeExtractor)
    return this
  }

  /**
   * Sorts the Array, in place, according to the sorts that have been built-up.
   *
   * If no sorts have been built-up, it will sort based on the default Array sort, without any comparator.
   */
  sort():Array<T> {
    return this.input.sort(this.compareBuilder.build())
  }

  /**
   * Sorts the Array, returning a shallow copy, according to the sorts that have been built-up.
   *
   * If no sorts have been built-up, it will sort based on the default Array sort, without any comparator.
   */
  toSorted():Array<T> {
    return this.input.slice().sort(this.compareBuilder.build())
  }
}

declare global {
  interface Array<T> {
    sortByAsc: <T, R> (attributeExtractor?:AttributeExtractor<T, R>) => Array<T>
    sortByDesc: <T, R> (attributeExtractor?:AttributeExtractor<T, R>) => Array<T>
    buildSort: () => ArraySort<T>
  }
}

Array.prototype.sortByAsc = function<T, R>(attributeExtractor?:AttributeExtractor<T, R>):Array<T> {
  return new ArraySort<T>(this)
    .asc(attributeExtractor ?? ((val:any) => val))
    .sort()
}

Array.prototype.sortByDesc = function<T, R>(attributeExtractor?:AttributeExtractor<T, R>):Array<T> {
  return new ArraySort<T>(this)
    .desc(attributeExtractor ?? ((val:any) => val))
    .sort()
}

Array.prototype.buildSort = function<T>():ArraySort<T> {
  return new ArraySort<T>(this)
}