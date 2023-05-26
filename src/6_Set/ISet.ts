export default interface ISet<T>{
    add(t:T): void // 不能添加重复元素
    remove(t:T): void 
    contains(t:T): boolean
    getSize(): number
    isEmpty(): boolean 
}
