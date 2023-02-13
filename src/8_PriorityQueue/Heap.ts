/**
 * 完全二叉树，将元素顺序排列成树的形状
 * 堆：堆中某个节点的值总是不大于其父节点的值
 * 使用数组来表示一个完全二叉树
 * 
 * parent(i)= (i-1)/2
 * left child(i) = 2i + 1
 * right child(i) = 2i + 2
 */
import MyArray from "../1_Array"
export default class MaxHeap<T> {
    data: MyArray<T> 
    constructor(capacity?: number){
        this.data  = new MyArray<T>(capacity)
    }

    isEmpty(): boolean{
        return this.data.size === 0
    }

    getSize(): number{
        return this.data.size
    }

    parent(i:number){
        if(i===0){
            throw new Error(`index-0 doesn't have parent.`)
        }
        return (i-1)/2
    }

    leftChild(i: number): number{
        return 2*i + 1
    }

    rightChild(i: number): number{
        return 2*i + 2
    }

    add(t:T){
        this.data.addLast(t)
        this.shiftUp(this.getSize() - 1)
    }

    // 上浮
    shiftUp(k: number): void {
        while(k>0 && this.data.get(k) > this.data.get(this.parent(k))){
            this.data.swap(k, this.parent(k))
            k = this.parent(k)
        }
    }

    // 查看堆中的最大元素
    findMax(){
        if(this.data.getSize() === 0){
            throw new Error('Can not findMax when heap is empty')
        }
        return this.data.get(0)
    }

    // 取出堆中的最大元素
     extractMax(): T{
        let ret = this.findMax()
        this.data.swap(0, this.data.getSize()-1)
        this.data.removeLast()
        this.siftDown(0)
        return ret
     }

    // 用于检测新传入的index是否存在
    hasIndex(index: number){
        if(index < 0 || index > this.data.getSize() - 1){
            return false
        }
        return true
    }

    // 下沉
    siftDown(k: number){
        let inspect = k
        while(true){
            // 到达尾部(既没有左节点，也没有右节点)
            if(!this.hasIndex(this.leftChild(inspect)) && !this.hasIndex(this.rightChild(inspect))){
                break
            }

            // 堆的数据结构肯定是先有左节点，后有右节点
            let maxIndex = this.leftChild(inspect)
            // 如果右节点存在，且大于左节点
            if(this.hasIndex(this.rightChild(inspect)) && this.data.get(this.rightChild(inspect))> this.data.get(this.leftChild(inspect))){
                maxIndex = this.rightChild(inspect)
            }

            // 如果当前节点小于（要比较的节点）
            if(this.data.get(inspect)> this.data.get(maxIndex)){
                this.data.swap(inspect, maxIndex)
                inspect = maxIndex
            }else{
                break
            }
        }
    }

    shiftDown(k: number){
        // while( 2*k < count){
        //     let j = 2*k // 在此轮循环中，data[k]和data[j]交换位置
        //     if( j+1 <= count && data[j+1]> data[j]){
        //         j +=1
        //     }
        //     if(data[k] >= data[j]){
        //         break
        //     }
        //     swap(data[k], data[j])
        //     k = j
        // }
    }

    // 取出最大元素后再放入一个新的元素
    replace(t: T){
        let ret = this.findMax()
        this.data.set(0, t)
        this.siftDown(0)
        return ret
    }

    // 将任意一个数组整理成堆的形状
    // 从最后一个非叶子节点，进行下沉操作： 最后一个节点的父亲节点
    heapify(arr: MyArray<T>){
        this.data = arr
        for(let i= this.parent(this.data.getSize()-1); i>=0; i--){
            this.siftDown(i)
        }
    }

    // 原地堆排序
    heapSort(arr: []){
        let n = arr.length-1
        // 将数组arr构建为堆，从最后一个非叶子节点开始
        for(let i = (n-1)/2; i >=0; i--){
            this.__shiftDown(arr, n, i)
        }

        for(let j= n-1; j>0; j--){
            // swap(arr[0], arr[i])
            this.__shiftDown(arr, j, 0)
        }
    }

    __shiftDown(arr: [], n: number, i: number){}
}