export default class LinkedList<T>{
    
    // 头节点
    head: LinkListNode<T> | null | undefined

    // 链表长度
    size: number

    constructor(){
        this.head = null
        this.size = 0
    }

    // 获取链表中的元素个数
    getSize():number{
        return this.size
    }

    // 判断链表是否为空
    isEmpty(): boolean{
        return this.size === 0
    }

    // 在链表头添加元素
    addFirst(e: T){
        // let node = new LinkListNode(e)
        // node.next = this.head
        // this.head = node
        this.head = new LinkListNode(e, this.head)
    }

    /**
     * 在链表的index(0-based)位置添加新的元素e
     */
    add(index:number, e:T){
        if(index < 0 || index > this.size){
            throw new Error('Add failed. Illegal index')
        }
        if(index === 0){
            this.addFirst(e)
        }else{
            let node = new LinkListNode(e)
            let prev = this.head
            for(let i=0; i< index; i++){
                prev = prev!.next
            }
            node.next = prev!.next
            prev!.next = node
            // prev.next = new LinkListNode(e, prev.next)
            this.size++
        }
    }

    // 虚拟头节点
}

export class LinkListNode<T>{
    e:T
    next: LinkListNode<T> | undefined | null
    constructor(e:T, next?: LinkListNode<T> | null){
        this.e = e
        this.next = next
    }
}