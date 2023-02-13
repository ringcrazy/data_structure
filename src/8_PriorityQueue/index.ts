import IQueue from "../3_Queue/IQueue"
import MaxHeap from "./Heap"

type Comparable<T> = {
    compareTo: number
    equals: boolean
}
export default class PriorityQueue<T extends Comparable<T>> implements IQueue<T>{

    maxHeap: MaxHeap<T>
    constructor(){
        this.maxHeap = new MaxHeap<T>()
    }
    enqueue(t: T): void {
        this.maxHeap.add(t)
    }
    dequeue(): T {
        return this.maxHeap.extractMax()
    }
    getFront(): T {
        return this.maxHeap.findMax()
    }
    getSize(): number {
        return this.maxHeap.getSize()
    }
    isEmpty(): boolean {
        return this.maxHeap.isEmpty()
    }

}