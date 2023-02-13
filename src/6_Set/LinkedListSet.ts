import ISet from "./ISet";
import LinkedList from '../4_LinkList/LinkListWithDummyHead'

export class LinkedListSet<T> implements ISet<T>{
    list: LinkedList<T>
    constructor(){
        this.list = new LinkedList<T>()
    }
    add(t: T): void {
        if(!this.list.contains(t)){
            this.list.addFirst(t)
        }
    }
    remove(t: T): void {
        this.list.removeElement(t)
    }
    contains(t: T): boolean {
        return this.list.contains(t)
    }
    getSize(): number {
        return this.list.getSize()
    }
    isEmpty(): boolean {
        return this.list.isEmpty()
    }
}