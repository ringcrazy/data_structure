class Node<K,V>{
    left: Node<K,V>
    right: Node<K,V>
    key: K
    value: V
    constructor(k: K, v: V){
        this.key = k
        this.value = v
        this.left = null
        this.right = null
    }
}

export default class BSTMap<K,V> {
    root: Node<K,V>
    size: number

    constructor(){
        this.root = null
        this.size = 0
    }

    add(k:K, v:V){
        this.root = this.addNode(this.root, k, v)
    }

    // 向以node为根的二分搜索树中插入元素(key, value)
    // 返回插入新节点后二分搜索树的根
    addNode(node: Node<K,V>, k: K, v: V){
        if(node === null){
            this.size++
            return new Node<K,V>(k, v)
        }
        if(k<node.key){
            node.left =  this.addNode(node.left, k, v)
        }else if(k> node.key){
            node.right =  this.addNode(node.right, k, v)
        }else{
            node.value = v
        }
        return node
    }

    // 返回以node为根节点的二分搜索树中，key所在的节点
    getNode(node: Node<K,V>, k: K): Node<K,V>{
        if(node === null){
            return null
        }
        if(k<node.key){
            return this.getNode(node.left, k)
        }else if(k > node.key){
            return this.getNode(node.right, k)
        }else{
            return node
        }
    }

    contains(k: K){
        let node =  this.getNode(this.root, k)
        return node === null ? false: true
    }

    isEmpty(){
        return this.size === 0
    }

    get(k: K){
        let node = this.getNode(this.root, k)
        return node === null ? null : node.value
    }

    getSize(): number{
        return this.size
    }

}