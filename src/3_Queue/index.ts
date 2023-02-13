import IQueue from "./IQueue"
import MyArray from "../1_Array"

export default class Queue<T> implements IQueue<T>{
    list: MyArray<T>
    constructor(capacity=10){
        this.list = new MyArray(capacity)
    }
    enqueue(t: T): void {
        this.list.addLast(t)
    }
    dequeue(): T {
        return this.list.removeFirst()
    }
    getFront(): T {
        return this.list.getFirst()
    }
    getSize(): number {
        return this.list.getSize()
    }
    isEmpty(): boolean {
        return this.list.isEmpty()
    }

    toString(){
        let prefix = `Queue: `
        let s = 'front ['
        for(let i = 0; i< this.list.getSize(); i++){
            s += this.list.get(i)
            if(i < this.list.size -1){
                s += ','
            }
        }
        s += '] tail'
        return prefix + s
    }
}