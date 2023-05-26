/**
 * AVL树本质上还是一棵二叉搜索树，它的特点是：
 * 1.本身首先是一棵二分搜索树
 * 2.带有平衡条件：每个节点的左右子树的高度之差的绝对值（平衡因子）最多为1
 * 也就是说，AVL树，本质上是带了平衡功能的二分查找树
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

    // 节点的高度 = 左右子树较大的高度 + 1
    getHeight(node: Node<K,V>): number{
        if(node === null){
            return 0
        }
        return node.height
    }

    // 获取节点node的平衡因子，左右子树的高度差
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

        // 平衡维护
        // LL
        if(balanceFactor > 1 && this.getBalanceFactor(node.left)>=0){
            return this.rightRotate(node)
        }

        // RR
        if(balanceFactor < -1 && this.getBalanceFactor(node.right) <=0){
            return this.leftRotate(node)
        }

        // LR
        if(balanceFactor > 1 && this.getBalanceFactor(node.left)< 0){
            node.left = this.leftRotate(node.left)
            return this.rightRotate(node)
        }

        // RL
        if(balanceFactor < -1 && this.getBalanceFactor(node.right) > 0){
            node.right = this.rightRotate(node.right)
            return this.leftRotate(node)
        }

        return node
    }

    /** 对节点y进行向右旋转操作，返回旋转后新的根节点x
     *         y                           x
     *        / \      向右旋转            /  \
     *       x   T4   ----------->       z    y
     *      / \                         / \  / \      
     *     z   T3                      T1 T2 T3 T4
     *    /\
     *   T1 T2
     *  
     */
    rightRotate(y: Node<K,V>): Node<K,V>{
        let x = y.left
        let t3 = x.right
        x.right = y
        y.left = t3

        // 更新height
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right))+1
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right))+1
        return x

    }

    /** 对节点y进行向左旋转操作，返回旋转后新的根节点x
     *         y                           x
     *        / \      向左旋转            /  \
     *       T1  x   ----------->        y    z
     *          / \                     / \  / \      
     *         T2  z                   T1 T2 T3 T4
     *             /\
     *            T3 T4
     *  
     */
    leftRotate(y: Node<K,V>): Node<K,V>{
        let x = y.right
        let t2 = x.left
        x.left = y
        y.right = t2

        // 更新height
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right))+1
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right))+1
        return x
    }

    /**
     * LL/RR
     */

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
    isBST(){
        let list = new Array()
        this.inOrder(this.root, list)
        for(let i=0; i<list.length-1; i++){
            let min = list[i]
            if(list[i+1]> min){
                return true
            }
        }
        return false
    }

    inOrder(node: Node<K,V>, result: Array<K>){
        if(node === null){
            return 
        }
        this.inOrder(node.left, result)
        result.push(node.key)
        this.inOrder(node.right, result)
    }

    // 判断是否为平衡二叉树
    // 每一个子树的左右子树的高度差不能超过1，平衡因子<=1
    isBalanced(){
        return this._isBalanced(this.root)
    }

    // 判断以Node为根的二叉树是否是一颗平衡二叉树
    _isBalanced(node: Node<K,V>): boolean{
        if(node === null){
            return true
        }
        let balanceFactor = this.getBalanceFactor(node)
        if(Math.abs(balanceFactor) > 1){
            return false
        }
        return this._isBalanced(node.left) && this._isBalanced(node.right)
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