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

class UnionFind_2 implements IUF{
    parent: Array<number>

    constructor(size?: number){
        this.parent = new Array(size)
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