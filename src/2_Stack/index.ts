import IStack from "./IStack"
import MyArray from "../1_Array"

export default class ArrayStack<T> implements IStack<T>{

    list: MyArray<T>
    constructor(capacity= 10){
        this.list = new MyArray<T>(capacity)
    }

    /**
     * 入栈
     * @param t 
     */
    push(t: T): void {
       this.list.addLast(t)
    }

    /**
     * 出栈
     * @returns
     */
    pop(): T {
        return this.list.removeLast()
    }

    /**
     * 查看栈顶元素
     */
    peek(): T {
        return this.list.getLast()
    }

    /**
     * 返回栈的长度
     * @returns 
     */
    getSize(): number {
        return this.list.getSize()
    }

    /**
     * 判断栈是否为空
     * @returns 
     */
    isEmpty(): boolean {
        return this.list.isEmpty()
    }

    /**
     * 返回栈的容量
     * @returns 
     */
    getCapacity():number{
        return this.list.getCapacity()
    }

    /**
     * 转换成字符串
     * @returns 
     */
    toString(): string{
        let prefix = `Stack: `
        let s = '['
        for(let i = 0; i< this.list.getSize(); i++){
            s += this.list.get(i)
            if(i < this.list.size -1){
                s += ','
            }
        }
        s += '] top'
        return prefix + s
    }

}