import {AttributeExtractor, CompareBuilder} from "./index";

export class ArraySort<T> {

  private input:Array<T>
  private compareBuilder = new CompareBuilder<T>()

  constructor(input:Array<T>) {
    this.input = input
  }

  asc<R> (attributeExtractor:AttributeExtractor<T, R>):ArraySort<T> {
    this.compareBuilder.asc(attributeExtractor)
    return this
  }

  desc<R> (attributeExtractor:AttributeExtractor<T, R>):ArraySort<T> {
    this.compareBuilder.desc(attributeExtractor)
    return this
  }

  sort():Array<T> {
    return this.input.sort(this.compareBuilder.build())
  }

  toSorted():Array<T> {
    return this.input.slice().sort(this.compareBuilder.build())
  }
}

declare global {
  interface Array<T> {
    sortByASC: <T, R> (attributeExtractor:AttributeExtractor<T, R>) => ArraySort<T>
    sortByDESC: <T, R> (attributeExtractor:AttributeExtractor<T, R>) => ArraySort<T>
  }
}

Array.prototype.sortByASC = function<T, R>(attributeExtractor:AttributeExtractor<T, R>):ArraySort<T> {
  return new ArraySort<T>(this)
    .asc(attributeExtractor)
}

Array.prototype.sortByDESC = function<T, R>(attributeExtractor:AttributeExtractor<T, R>):ArraySort<T> {
  return new ArraySort<T>(this)
    .desc(attributeExtractor)
}