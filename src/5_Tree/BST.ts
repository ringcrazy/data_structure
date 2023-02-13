import ArrayStack from '../2_Stack'
import LinkedListQueue from '../3_Queue/LinkedListQueue'
export class Node<E>{
    e: E
    left: Node<E>
    right: Node<E>
    constructor(e:E){
        this.e = e
        this.left = null
        this.right = null
    }
}

export default class BST<T>{
    size: number
    root: Node<T> | null
    constructor(){
        this.size = 0
        this.root = null
    }

    getSize(){
        return this.size
    }

    isEmpty(){
        return this.size === 0
    }

    add(t: T){
        this._add(this.root, t)
    }

    // 向以node为根的二分搜索树中插入元素t, 递归算法
    _add(node: Node<T>, t:T){
        if(node.e === t){
            return
        }
        else if(node.e < 0 && node.left === null){
            node.left = new Node(t)
            this.size++
            return
        }
        else if(node.e > 0 && node.right === null){
            node.right = new Node(t)
            this.size++
            return
        }
        if(t < node.e){
            this._add(node.left, t)
        }else{
            this._add(node.right, t)
        }

    }

    /**
     * 向以node为根的二分搜索树中插入元素e，递归算法
     * 返回插入新节点后二分搜索树的根
     * @param node 
     * @param t 
     * @returns 返回插入新节点后二分搜索树的根
     */
    add2(node: Node<T>, t: T){
        if(node === null){
            this.size++
            return new Node(t)
        }
        if(t<node.e){
            node.left = this.add2(node.left, t)
        }else if(t > node.e){
            node.right  = this.add2(node.right, t)
        }
        return node
    }

    contains(t: T): boolean{
        return this._contains(this.root, t)
    }

    // 看以node为根的二分搜索树中是否包含元素t,递归算法
    _contains(node: Node<T>, t: T): boolean{
        if(node === null){
            return false
        }
        if(t === node.e){
            return true
        }
        if(t < node.e){
            return this._contains(node.left, t)
        }else{
            return this._contains(node.right, t)
        }
    }

    // 前序遍历 节点-左子树-右子树
    preOrder(node: Node<T>){
        if(node === null){
            return
        }
        console.log(node.e)
        this.preOrder(node.left)
        this.preOrder(node.right)
    }

    // 中序遍历, 左子树-节点-右子树
    inOrder(node: Node<T>){
        if(node === null){
            return
        }
        this.inOrder(node.left)
        console.log(node.e)
        this.inOrder(node.right)
    }

    // 后序遍历 左子树-右子树-节点
    postOrder(node: Node<T>){
        if(node === null){
            return
        }
        this.postOrder(node.left)
        this.postOrder(node.right)
        console.log(node.e)
    }

    // 前序遍历（非递归）
    preOrderStack(){
        let stack = new ArrayStack<Node<T>>()
        stack.push(this.root)
        while(!stack.isEmpty()){
            const cur = stack.pop()
            console.log(cur.e)
            if(cur.right !== null){
                stack.push(cur.right)
            }
            if(cur.left !== null){
                stack.push(cur.left)
            }
        }
    }

    // 层序遍历
    levelOrder(){
        let queue = new LinkedListQueue<Node<T>>()
        queue.enqueue(this.root)
        while(!queue.isEmpty()){
            let cur = queue.dequeue()
            console.log(cur.e)
            if(cur.left !== null){
                queue.enqueue(cur.left)
            }
            if(cur.right !== null){
                queue.enqueue(cur.right)
            }
        }
    }

    // 寻找二分搜索树中的最小元素
    // 返回以node为根的二分搜索树的最小值所在的节点
    minimum(node: Node<T>): Node<T>{
        if(node.left === null){
            return node
        }
        return  this.minimum(node.left)
        
    }

    // 寻找二分搜索树中的最大元素
    // 返回以node为根的二分搜索树的最大元素所在的节点
    maximum(node: Node<T>): Node<T>{
        if(node.right === null){
            return node
        }
        return this.maximum(node.right)
    }

    // 删除掉以node为根的二分搜索树中的最小节点
    // 返回删除节点后新的二分搜索树的根
    removeMin(node: Node<T>): Node<T>{
        if(node.left === null){
            let rightNode = node.right
            node.right = null
            this.size--
            return rightNode
        }
        node.left = this.removeMin(node.left)
        return node
    }

    // 删除掉以node为根的二分搜索树中的最大节点
    // 返回删除节点后新的二分搜索树的根
    removeMax(node: Node<T>): Node<T>{
        if(node.right === null){
            let leftNodes = node.left
            node.left = null
            this.size--
            return leftNodes
        }
        node.right = this.removeMax(node.right)
        return node
    }

    remove(t: T){
        this._remove(this.root, t)
    }
    // 删除掉任意值
    _remove(node: Node<T>, t: T): Node<T>{
        if(node === null){
            return null
        }
        if(t<node.e){
            node.left = this._remove(node.left, t)
        }
        if(t > node.e){
            node.right = this._remove(node.right, t)
        }
        else{
            if(node.left === null){
                let rightNode = node.right
                node.right = null
                this.size--
                return rightNode
            }
            if(node.right === null){
                let leftNode = node.left
                node.left = null
                this.size--
                return leftNode
            }
            // 左右子树均不为空
            let successor = this.minimum(node.right)
            successor.right = this.removeMin(node.right)
            successor.left = node.left
            return successor

        }
    }
}