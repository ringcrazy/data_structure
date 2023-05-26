import IUF from "./IUnionFind";
class UnionFind_1 implements IUF{
    ids: Array<number>

    constructor(size?: number){
        this.ids = new Array(size)

        // 初始化集合编号
        for(let i=0; i< this.ids.length; i++){
            this.ids[i] = i
        }
    }

    getSize(): number {
        return this.ids.length
    }
    isConnected(p: number, q: number): boolean {
        return this.find(p) === this.find(q)
    }
    unionElements(p: number, q: number): void {
        let pId = this.find(p)
        let qId = this.find(q)
        if(pId === qId) return
        for(let i=0; i< this.ids.length; i++){
            if(this.ids[i] === pId){
                this.ids[i] = qId
            }
        }
    }

    find(p: number){
        if(p< 0 || p>= this.ids.length){
            throw new Error('p is out of bound')
        }
        return this.ids[p]
    }

}

// 使用数组来存储树形结构
class UnionFind_2 implements IUF{
    parent: Array<number>

    constructor(size?: number){
        this.parent = new Array(size)

        // 每个节点都指向自己，独立的成为一个节点
        for(let i=0; i< this.parent.length; i++){
            this.parent[i] = i
        }
    }

    getSize(): number {
        return this.parent.length
    }
    isConnected(p: number, q: number): boolean {
        return this.find(p) === this.find(q)
    }
    unionElements(p: number, q: number): void {
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if(pRoot === qRoot){
            return
        }
        this.parent[pRoot] = qRoot
    }

    // 查找过程， 查找元素所对应的集合编号
    find(p: number){

        if(p < 0 || p >= this.parent.length){
            throw new Error('p is out of bound')
        }
        while(p != this.parent[p]){
            p = this.parent[p]
        }
        return p
    }

}

// 基于size的优化
class UnionFind_3 implements IUF{
    parent: Array<number>
    sz: Array<number>
    constructor(size?: number){
        this.parent = new Array(size)

        // 每个节点都指向自己，独立的成为一个节点
        for(let i=0; i< this.parent.length; i++){
            this.parent[i] = i
            this.sz[i] = 1
        }
    }

    getSize(): number {
        return this.parent.length
    }
    isConnected(p: number, q: number): boolean {
        return this.find(p) === this.find(q)
    }

    // 根据两个元素所在的树的元素个数不同判断合并方向
    // 将元素个数少的集合合并到元素个数多的集合上
    unionElements(p: number, q: number): void {
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if(pRoot === qRoot){
            return
        }
        if(this.sz[pRoot] < this.sz[qRoot]){
            this.parent[pRoot] = qRoot
            this.sz[qRoot] += this.sz[pRoot]
        }else{
            this.parent[qRoot] = pRoot
            this.sz[pRoot] += this.sz[qRoot]
        }
        
    }

    // 查找过程， 查找元素所对应的集合编号
    find(p: number){

        if(p < 0 || p >= this.parent.length){
            throw new Error('p is out of bound')
        }
        while(p != this.parent[p]){
            p = this.parent[p]
        }
        return p
    }

}

// 基于rank的优化（深度：depth)
class UnionFind_4 implements IUF{
    parent: Array<number>
    rank: Array<number>
    constructor(size?: number){
        this.parent = new Array(size)

        // 每个节点都指向自己，独立的成为一个节点
        for(let i=0; i< this.parent.length; i++){
            this.parent[i] = i
            this.rank[i] = 1
        }
    }

    getSize(): number {
        return this.parent.length
    }
    isConnected(p: number, q: number): boolean {
        return this.find(p) === this.find(q)
    }

    // 根据两个字数所在的树的高度不同
    // 将少合并到多的集合上
    unionElements(p: number, q: number): void {
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if(pRoot === qRoot){
            return
        }
        if(this.rank[pRoot] < this.rank[qRoot]){
            this.parent[pRoot] = qRoot
        }else if(this.rank[pRoot] > this.rank[qRoot]){
            this.parent[qRoot] = pRoot
        }else{
            this.parent[qRoot] = pRoot
            this.rank[pRoot] += 1
        }
        
    }

    // 查找过程， 查找元素所对应的集合编号
    find(p: number){

        if(p < 0 || p >= this.parent.length){
            throw new Error('p is out of bound')
        }
        while(p != this.parent[p]){
            p = this.parent[p]
        }
        return p
    }

}

// 路径压缩 parent[p] = parent[parent[p]]
class UnionFind_5 implements IUF{
    parent: Array<number>
    rank: Array<number>
    constructor(size?: number){
        this.parent = new Array(size)

        // 每个节点都指向自己，独立的成为一个节点
        for(let i=0; i< this.parent.length; i++){
            this.parent[i] = i
            this.rank[i] = 1
        }
    }

    getSize(): number {
        return this.parent.length
    }
    isConnected(p: number, q: number): boolean {
        return this.find(p) === this.find(q)
    }

    // 根据两个字数所在的树的高度不同
    // 将少合并到多的集合上
    unionElements(p: number, q: number): void {
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if(pRoot === qRoot){
            return
        }
        if(this.rank[pRoot] < this.rank[qRoot]){
            this.parent[pRoot] = qRoot
        }else if(this.rank[pRoot] > this.rank[qRoot]){
            this.parent[qRoot] = pRoot
        }else{
            this.parent[qRoot] = pRoot
            this.rank[pRoot] += 1
        }
        
    }

    // 查找过程， 查找元素所对应的集合编号
    find(p: number){

        if(p < 0 || p >= this.parent.length){
            throw new Error('p is out of bound')
        }
        while(p != this.parent[p]){
            this.parent[p] = this.parent[this.parent[p]]
            p = this.parent[p]
        }
        return p
    }

}

class UnionFind_6 implements IUF{
    parent: Array<number>
    rank: Array<number>
    constructor(size?: number){
        this.parent = new Array(size)

        // 每个节点都指向自己，独立的成为一个节点
        for(let i=0; i< this.parent.length; i++){
            this.parent[i] = i
            this.rank[i] = 1
        }
    }

    getSize(): number {
        return this.parent.length
    }
    isConnected(p: number, q: number): boolean {
        return this.find(p) === this.find(q)
    }

    // 根据两个字数所在的树的高度不同
    // 将少合并到多的集合上
    unionElements(p: number, q: number): void {
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if(pRoot === qRoot){
            return
        }
        if(this.rank[pRoot] < this.rank[qRoot]){
            this.parent[pRoot] = qRoot
        }else if(this.rank[pRoot] > this.rank[qRoot]){
            this.parent[qRoot] = pRoot
        }else{
            this.parent[qRoot] = pRoot
            this.rank[pRoot] += 1
        }
        
    }

    // 查找过程， 查找元素所对应的集合编号
    find(p: number){
        if(p < 0 || p >= this.parent.length){
            throw new Error('p is out of bound')
        }
        if(p != this.parent[p]){
            this.parent[p] = this.find(this.parent[p])
        }
        return this.parent[p]
    }
}
