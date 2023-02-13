export default interface IQueue<T>{

    // 入队
    enqueue(t:T):void

    // 出队
    dequeue(): T

    // 查看队首元素
    getFront():T

    // 查看队列长度
    getSize():number

    // 查看队列是否为空
    isEmpty(): boolean
}