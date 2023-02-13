import ISet from "./ISet"
import BST from '../5_Tree/BST'
export default class BSTSet<T> implements ISet<T>{
    bst: BST<T>
    constructor(){
        this.bst = new BST<T>()
    }
    add(t: T): void {
        this.bst.add(t)
    }
    remove(t: T): void {
        this.bst.remove(t)
    }
    contains(t: T): boolean {
        return this.bst.contains(t)
    }
    getSize(): number {
        return this.bst.getSize()
    }
    isEmpty(): boolean {
        return this.bst.isEmpty()
    }
}