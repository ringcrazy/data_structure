export default interface Map<K, V>{
    add(k:K, v: V): void
    remove(k:K): V
    contains(k: K): boolean
    get(k: K): V
    set(k:K, v:V): void
    getSize(): number
    isEmpty(): boolean
}