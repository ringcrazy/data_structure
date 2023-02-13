export default class LinkedListWithDummyHead<T>{
    
    // 头节点
    dummyHead: LinkedNodeWithDummyHead<T>

    // 链表长度
    size: number

    constructor(){
        this.dummyHead = new LinkedNodeWithDummyHead(null, null)
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
        this.add(0, e)
    }

    /**
     * 在链表的index(0-based)位置添加新的元素e
     */
    add(index:number, e:T){
        if(index < 0 || index > this.size){
            throw new Error('Add failed. Illegal index')
        }
        let node = new LinkedNodeWithDummyHead(e)
        let prev = this.dummyHead
        for(let i=0; i< index; i++){
            prev = prev.next
        }
        node.next = prev.next
        prev.next = node
        // prev.next = new LinkListNode(e, prev.next)
        this.size++
        
    }

    /**
     * 获取链表的第index（0-based)个位置的元素
     */
    get(index: number){
        if(index < 0 || index >= this.size){
            throw new Error('Get failed. Illegal index')
        }
        let current = this.dummyHead.next
        for(let i=0;i<index; i++){
            current = current.next
        }
        return current.e
    }

    /**
     * 获得链表的第一个元素
     */
    getFirst(){
        return this.get(0)
    }

    // 获取链表的最后一个元素
    getLast(){
        return this.get(this.size -1)
    }

    set(index:number, e:T){
        if(index < 0 || index >= this.size){
            throw new Error('Set failed. Illegal index')
        }
        let cur = this.dummyHead.next
        for(let i=0; i< index; i++){
            cur = cur.next
        }
        cur.e = e
    }

    // 查看列表是否包含某元素
    contains(e:T): boolean{
        let cur = this.dummyHead.next
        while(cur !== null){
            if(cur.e === e){
                return true
            }
            cur = cur.next
        }
        return false
    }

    toString(): string{
        let s = ''
        let cur = this.dummyHead.next
        while(cur !== null){
            s += (cur.e+ '->')
            cur = cur.next
        }
        // 等价于
        // for(let cur= this.dummyHead.next; cur != null; cur = cur.next){
        //     s += `${cur}->`
        // }
        return s
    }

    // 从链表中删除元素
    remove(index: number): T{
        if(index < 0 || index >= this.size){
            throw new Error('Removed failed. Index is illegal')
        }
        let prev = this.dummyHead
        for(let i=0;i< index; i++){
            prev = prev.next
        }
        let retNode = prev.next
        prev.next = retNode.next
        retNode.next = null
        this.size--
        return retNode.e
    }

    removeFirst(){
        return this.remove(0)
    }

    removeLast(){
        return this.remove(this.size - 1)
    }

    // 删除特定的元素
    removeElement(t: T){
        let prev = this.dummyHead
        while(prev.next){
            let cur = prev.next
            if(cur.e === t){
                prev.next = cur.next
                cur.next = null
            }
            prev = prev.next
        }
    }
}

class LinkedNodeWithDummyHead<T>{
    e:T | null
    next: LinkedNodeWithDummyHead<T>  | null
    constructor(e:T, next?: LinkedNodeWithDummyHead<T>){
        this.e = e
        this.next = next
    }
}