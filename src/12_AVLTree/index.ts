/**
 * AVL树本质上还是一棵二叉搜索树，它的特点是：
 * 1.本身首先是一棵二叉搜索树
 * 2.带有平衡条件：每个节点的左右子树的高度之差的绝对值（平衡因子）最多为1
 * 也就是说，AVL树，本质上是带了平衡功能的二叉查找树
 */

class Node<K,V>{
    left: Node<K,V>
    right: Node<K,V>
    key: K
    value: V
    height: number
    constructor(k: K, v: V){
        this.key = k
        this.value = v
        this.left = null
        this.right = null
        this.height = 1
    }
}

export default class AVLTree<K,V> {
    root: Node<K,V>
    size: number

    constructor(){
        this.root = null
        this.size = 0
    }

    getHeight(node: Node<K,V>): number{
        if(node === null){
            return 0
        }
        return node.height
    }

    // 获取节点node的平衡因子
    getBalanceFactor(node: Node<K,V>): number{
        if(node === null){
            return 0
        }
        return this.getHeight(node.left) - this.getHeight(node.right)
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

        // 更新height
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right))
        
        // 计算平衡因子
        let balanceFactor = this.getBalanceFactor(node)
        if(Math.abs(balanceFactor) > 1){
            console.log('unbalance ' + balanceFactor)
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

    // 判断是否为二分搜索树
    // 先进行中序遍历，遍历完成后，是一个排序好的列表
    isBST(){}

    // 判断是否为平衡二叉树
    isBalance(){}

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