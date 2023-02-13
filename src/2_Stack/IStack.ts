export default interface IStack<T>{
    push(t:T):void

    pop(): T

    peek():T

    getSize():number

    isEmpty():boolean
}