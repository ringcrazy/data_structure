import IQueue from "./IQueue";
import { LinkListNode } from '../4_LinkList'
export default class LinkedListQueue<T> implements IQueue<T>{

    front: LinkListNode<T> | null
    tail: LinkListNode<T> | null
    size: number
    constructor(){
        this.front = null
        this.tail = null
        this.size = 0
    }

    // 入队
    enqueue(t: T): void {
        let node = new LinkListNode(t)
        if(this.tail === null){
            this.tail = node
            this.front = this.tail

        }else{
            this.tail.next = node
            this.tail = this.tail.next
        }
        this.size++
    }
    dequeue(): T {
        // removeFirst
        if(this.front === null){
            throw new Error('Cannot dequeue from an empty queue')
        }
        let retNode = this.front
        this.front = retNode.next
        retNode.next = null
        this.size--
        return retNode.e
    }
    getFront(): T {
        if(this.front === null){
            throw new Error('Cannot dequeue from an empty queue')
        }
        return this.front.e
    }
    getSize(): number {
        return this.size
    }
    isEmpty(): boolean {
        return this.size === 0
    }

}