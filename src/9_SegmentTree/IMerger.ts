export default interface Merger<T>{
    merge(a: T, b: T): T
}