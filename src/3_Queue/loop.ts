import IQueue from "./IQueue";

// 循环队列
export default class LoopQueue<T> implements IQueue<T>{
    front: number
    tail: number
    size: number
    data: Array<T>
    constructor(capacity= 10){
        this.front = 0
        this.tail = 0
        this.size = 0 
        this.data = new Array<T>(capacity + 1)
    }
    enqueue(t: T): void {
        if((this.tail+1)%this.data.length === this.front){
            this.resize(2* this.size)
        }
        this.data[this.tail]= t
        this.size++
        this.tail = (this.tail+1)% this.data.length
    }
    dequeue(): T {
        let result = this.data[this.front]
        this.data[this.front] = null as any
        this.front = (this.front + 1)% this.data.length
        this.size--
        return result
    }
    getFront(): T {
        if(this.isEmpty()){
            throw new Error('Queue is empty')
        }
        return this.data[this.front]
    }
    getSize(): number {
        return this.size
    }

    // 判断是否为空队列(头部指针和尾部指针相同)
    isEmpty(): boolean {
        return this.front === this.tail
    }

    // 获取列表容量
    getCapacity(){
        return this.data.length -1
    }

    // 扩容
    resize(newCapacity: number){
        let newList = new Array<T>(newCapacity+1)
        for(let i=0; i<this.size; i++){
            newList[i] = this.data[(i+ this.front)% this.data.length]
        }
        this.data = newList
        this.front = 0
        this.tail = this.size
    }

    toString(){
        let prefix = `LoopQueue: `
        let s = 'front ['
        for(let i = this.front;  i != this.tail; i = (i+1) % this.data.length){
            s += this.data[this.front]
            if((i+1)%this.data.length != this.tail){
                s += ','
            }
        }
        s += '] tail'
        return prefix + s
    }

}