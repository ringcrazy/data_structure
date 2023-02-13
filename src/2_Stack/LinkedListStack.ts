import IStack from "./IStack";
import LinkedList from '../4_LinkList/LinkListWithDummyHead'

export default class LinkedListStack<T> implements IStack<T>{

    list: LinkedList<T>
    constructor(){
        this.list = new LinkedList<T>()
    }
    push(t: T): void {
        this.list.addFirst(t)
    }
    pop(): T {
        return this.list.removeFirst()
    }
    peek(): T {
        return this.list.getFirst()
    }
    getSize(): number {
        return this.list.getSize()
    }
    isEmpty(): boolean {
        return this.list.isEmpty()
    }
}