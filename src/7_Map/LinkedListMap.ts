import IMap from './IMap'

class LinkedList<K,V>{
    
    // 头节点
    head: LinkListNode<K,V> | null | undefined

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
    addFirst(k:K, v: V ){
        // let node = new LinkListNode(e)
        // node.next = this.head
        // this.head = node
        this.head = new LinkListNode(k, v, this.head)
    }

    /**
     * 在链表的index(0-based)位置添加新的元素e
     */
    add(index:number, k:K ,v: V){
        if(index < 0 || index > this.size){
            throw new Error('Add failed. Illegal index')
        }
        if(index === 0){
            this.addFirst(k, v)
        }else{
            let node = new LinkListNode(k, v)
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

    /**
     * 获取节点
     */
    getNode(k: K){
        let cur = this.head
        while(cur !== null){
            if(cur.key === k){
                return cur
            }
            cur = cur.next
        }
    }

    /**
     * 查找节点
     */
    get(k: K){
        let node = this.getNode(k)
        return node === null ? null : node.value
    }
    
    /**
     * 判断是否包含节点
     */
    contains(k: K): boolean{
        let node = this.getNode(k)
        return node === null ? false : true
    }

    /**
     * 添加节点
     */
    addNode(k: K, v: V){
        let node = this.getNode(k)
        if(node === null){
            this.addFirst(k, v)
        }else{
            // 更新value
            node.value = v
        }
    }

    /**
     * 设置节点
     */
    set(k:K, newValue:V){
        let node = this.getNode(k)
        if(node === null){
            throw new Error(`${k} doesn't exist!`)
        }
        node.value = newValue
    }

    /**
     * 删除节点
     */
    remove(k: K){
        let prev = this.head
        if(prev === null){
            throw new Error('Can not remove element in an empty LinkedList')
        }
        while(prev !== null){
            if(prev.key === k){
                break
            }
            prev = prev.next
        }
        if(prev !== null){
            let delNode = prev
            prev.next = delNode.next
            delNode.next = null
            this.size --
            return delNode.value
        }
        return null
    }
}

class LinkListNode<K,V>{
    key: K
    value: V
    next: LinkListNode<K,V> | undefined | null
    constructor(k:K, v: V, next?: LinkListNode<K,V> | null){
        this.key = k
        this.value = v
        this.next = next
    }
}

export default class LinkedListMap<K,V> implements IMap<K,V>{

    list: LinkedList<K,V>
    constructor(){
        this.list = new LinkedList<K,V>()
    }
    add(k: K, v: V): void {
       this.list.addNode(k,v)
    }
    remove(k: K): V {
        return this.list.remove(k)
    }
    contains(k: K): boolean {
        return this.list.contains(k)
    }
    get(k: K): V {
        return this.list.get(k)
    }
    set(k: K, v: V): void {
        this.list.set(k, v)
    }
    getSize(): number {
        return this.list.getSize()
    }
    isEmpty(): boolean {
        return this.list.isEmpty()
    }

}