
export default class MyArray<T>{
    size: number
    data: Array<T>
    constructor(capacity: number){
        this.size = 0
        this.data = new Array<T>(capacity)
    }

    // 获取数组中元素个数
    getSize(): number{
        return this.size
    }

    // 获取数组的容量
    getCapacity(): number{
        return this.data.length
    }

    // 返回数组是否为空
    isEmpty(): boolean{
        return this.size === 0
    }

    // 添加元素
    add(index: number, e: T){
        if(this.size === this.data.length){
            // 扩容
            this.resize(2* this.size)
        }
        if(index < 0 || index > this.size){
            throw new Error('Add failed. Require index >=0 and index < size')
        }
        for(let i= this.size-1; i>= index; i--){
            this.data[i+1] = this.data[i]
        }
        this.data[index] = e
        this.size++
    }

    // 在所有元素前添加一个新元素
    addFirst(e: T){
        this.add(0, e)
    }

    // 在所有元素后添加一个元素
    addLast(e: T){
        this.add(this.size, e)
    }

    // 获取index索引位置元素
    get(index: number){
        if(index < 0 || index >= this.size){
            throw new Error('Get failed. Index is illegal')
        }
        return this.data[index]
    }

    // 获取初始值
    getFirst(){
        return this.get(0)
    }

    // 获取最后一个值
    getLast(){
        return this.get(this.size - 1)
    }

    // 修改index索引位置的元素
    set(index: number, e:T){
        if(index < 0 || index >= this.size){
            throw new Error('Get failed. Index is illegal')
        }
        this.data[index] = e
    }

    // 转换为字符串
    toString(): string{
        let prefix = `Array: size=${this.size}, capacity= ${this.data.length}`
        let s = '['
        for(let i = 0; i< this.size; i++){
            s += this.data[i]
            if(i < this.size -1){
                s += ','
            }
        }
        s += ']'
        return prefix + s
    }

    // 查找数组中是否有元素e
    contains(e: T): boolean{
        for(let i=0;i<this.size; i++){
            if(e === this.data[i]){
                return true
            }
        }
        return false
    }

    // 查找数组中元素e所在的索引，如果不存在元素e，则返回-1
    find(e: T): number{
        for(let i=0;i<this.size; i++){
            if(e === this.data[i]){
                return i
            }
        }
        return -1
    }

    // 删除指定位置的元素
    remove(index:number): T{
        if(index< 0 || index >= this.size){
            throw new Error('Remove failed. Index is illegal')
        }
        let result = this.data[index]
        for(let i=index; i<this.size; i++){
            this.data[index] = this.data[index + 1]
        }
        this.size--
        if(this.size === this.data.length /4 ){
            this.resize(this.data.length / 2)
        }
        return result
    }

    // 删除第一个元素
    removeFirst(): T{
        return this.remove(0)
    }

    // 删除最后一个元素
    removeLast(): T{
        return this.remove(this.size - 1)
    }

    // 从数组中删除元素e
    removeElement(e:T){
        let index = this.find(e)
        if(index !== -1){
            this.remove(index)
        }
    }

    // 从数组中删除所有的元素e
    removeAllElement(e:T){
        let index 
        while((index = this.find(e)) > -1){
            this.remove(index)
        }
    }

    resize(newCapacity: number):void{
        let newData = new Array<T>(newCapacity)
        for(let i=0;i<this.size; i++){
            newData[i] = this.data[i]
        }
        this.data = newData
    }

    swap(i: number, j: number){
        if(i<0 || i>= this.size || j<0 || j>= this.size){
            throw new Error('swap index is illegal')
        }
        const temp = this.data[i]
        this.data[i] = this.data[j]
        this.data[j] = temp
    }
}