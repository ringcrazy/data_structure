/**
 * 区间内的统计查询（logN)
 * 平衡二叉树：最大深度 - 最小深度 <= 1
 * 如果区间有n个元素，数组表示需要有多少节点: 4n
 */

import Merger from "./IMerger"

export default class SegementTree<T>{
    data: T[]
    tree: T[]
    merger: Merger<T>
    constructor(arr: T[], merger: Merger<T>){
        this.data = new Array<T>()
        for(let i=0; i<arr.length; i++){
            this.data[i] = arr[i]
        }
        this.merger = merger
        this.tree = new Array<T>(4 * arr.length)
        this.buildSegmentTree(0, 0, this.data.length -1)
    }

    // 在treeIndex的位置创建表示区间[l...r]的线段树
    buildSegmentTree(treeIndex: number, l: number, r: number){
        if(l === r){
            this.tree[treeIndex] = this.data[l]
            return
        }
        let leftTreeIndex = this.leftChild(treeIndex)
        let rightTreeIndex = this.rightChild(treeIndex)
        let mid = l + Math.floor((r-l)/2)
        this.buildSegmentTree(leftTreeIndex, l, mid)
        this.buildSegmentTree(rightTreeIndex, mid+1, r)
        this.tree[treeIndex] = this.merger.merge(this.tree[leftTreeIndex], this.tree[rightTreeIndex])
    }


    getSize(){
        return this.data.length
    }

    get(index: number){
        if(index < 0 || index >= this.data.length){
            throw new Error('Index is illegal')
        }
        return this.data[index]
    }

    leftChild(index: number){
        return 2*index + 1
    }

    rightChild(index: number){
        return 2*index + 2
    }

    // 打印成树状结构
    toString(){
        let result = ''
        result += '['
        for(let i=0; i< this.tree.length; i++){
            if(this.tree[i] !== null){
                result += this.tree[i]
            }else{
                result += null
            }
            if(i !== this.tree.length - 1){
                result += ','
            }
        }
        result += ']'
        return result
    }

    query(queryL: number, queryR: number){
        // 检查合法性
        return this._query(0, 0, this.data.length -1, queryL, queryR)
    }

    // 查询操作
    // 在以treeIndex为根的线段树中[l...r]范围内，搜索区间[queryL...queryR]的值
    _query(treeIndex:number, l: number, r: number, queryL: number, queryR: number): T{
        if(l === queryL && r === queryR){
            return this.tree[treeIndex]
        }
        let mid = l + Math.floor((r-l)/2)
        let leftTreeIndex = this.leftChild(treeIndex)
        let rightTreeIndex = this.rightChild(treeIndex)

        if(queryL >= mid + 1){
            return this._query(rightTreeIndex, mid+ 1, r, queryL, queryR)
        }else if(queryR <= mid){
            return this._query(leftTreeIndex, l, mid, queryL, queryR)
        }
        let leftResult = this._query(leftTreeIndex, l, mid, queryL, mid)
        let rightResult = this._query(rightTreeIndex, mid+1, r, mid+1, queryR)
        return this.merger.merge(leftResult, rightResult)
    }

    set(index: number, t: T){
        // 检查合法性
        if(index < 0 || index >= this.data.length){
            throw new Error('Index is illegal')
        }
        this.data[index] = t
        this._set(0, 0, this.data.length -1, index, t)
    }

    // 在以treeIndex为根的线段树中更新index的值为e
    _set(treeIndex: number, l: number, r: number, index: number, t: T){
        if(l=== r){
            this.tree[treeIndex] = t
            return
        }
        let mid = l + Math.floor((r-l)/2)
        let leftTreeIndex = this.leftChild(treeIndex)
        let rightTreeIndex = this.rightChild(treeIndex)
        if(index >= mid+ 1){
            this._set(rightTreeIndex, mid+1, r, index,t)
        }
        else{
            this._set(leftTreeIndex, l, mid, index, t)
        }
        this.tree[treeIndex] = this.merger.merge(this.tree[leftTreeIndex], this.tree[rightTreeIndex])
    }
}