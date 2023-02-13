export default interface IUF{
    getSize(): number
    isConnected(p: number, q: number): boolean
    unionElements(p: number, q: number): void
}