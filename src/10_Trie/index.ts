import BSTMap from "../7_Map/BSTMap";
type Char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' 
| 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' 
| 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' 
| 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' 
| 'Y' | 'Z' | '.'
class Node{
    isWord: boolean // 当前节点是否标识为单词的结尾
    next: BSTMap<Char, Node>
    constructor(isWord?: boolean){
        this.isWord = isWord
        this.next = new BSTMap<Char, Node>()
    }
}

// 多叉树
export default class Trie{
    root: Node
    size: number
    constructor(){
        this.root = new Node()
        this.size = 0
    }

    isEmpty(){
        return this.size === 0
    }

    getSize(){
        return this.size
    }

    // 添加元素
    add(words: string){
        let cur = this.root
        for(let i=0; i< words.length; i++){
            let c = words[i] as Char
            if(cur.next.get(c) === null){
                cur.next.add(c, new Node())
            }
            cur = cur.next.get(c)
        }
        if(!cur.isWord){
            cur.isWord = true
            this.size++
        }
    }

    // 查询某个单词是否存在
    contains(words: string){
        let cur = this.root
        for(let i=0; i< words.length; i++){
            let c = words[i] as Char
            if(cur.next.get(c) === null){
                return false
            }
            cur = cur.next.get(c)
        }
        return cur.isWord
    }

    // 查询是否在Trie中有单词以prefix为前缀
    isPrefix(prefix: string){
        let cur = this.root
        for(let i=0; i< prefix.length; i++){
            let c = prefix[i] as Char
            if(cur.next.get(c)=== null){
                return false
            }
            cur = cur.next.get(c)
        }
        return true
    }

    // Returns if the word is in the data structure
    // d..r, .代表一个字符
    search(words: string){
        return this.match(this.root, words, 0)
    }

    // 递归
    match(node: Node, words: string, index: number): boolean{
        if(index === words.length){
            return node.isWord
        }
        let c = words.charAt(index) as Char
        if(c !== '.'){
            if(node.next.get(c) === null){
                return false
            }
            return this.match(node.next.get(c), words, index+1)
        }
        
        

    }

}