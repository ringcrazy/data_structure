// import MyArray from '../../src/1_Array'
// import ArrayStack from '../../src/2_Stack'
// import Queue from '../../src/3_Queue'
// import LoopQueue from '../../src/3_Queue/loop'

// class Student{
//   name: string
//   age: number
//   constructor(studentName:string, studentAge: number){
//     this.name = studentName
//     this.age = studentAge
//   }
// }

// const arrList = new MyArray<Student>(10)
// arrList.addLast(new Student('Alice',100))
// arrList.addLast(new Student('Bob', 66))
// arrList.addLast(new Student('Charlie', 88))

// // console.log(arrList.toString())


// let arrayStack = new ArrayStack(10)
// arrayStack.push(10)
// arrayStack.push('ab')
// arrayStack.push('cd')
// arrayStack.push('ef')
// arrayStack.push(10)
// console.log(arrayStack.toString())

// arrayStack.pop()

// // console.log(arrayStack.toString())

// function testQueue(ctor){
//   const capacity = 100000
//   let startTime = Date.now()
//   let list = new ctor(capacity)
//   for(let i=0; i<capacity; i++){
//     list.enqueue(i)
//   }
//   for(let i=0; i<capacity; i++){
//     list.dequeue()
//   }
//   let endTime = Date.now()
//   let duration = (endTime - startTime)/ 1000
//   return duration
// }

// const durationQueue = testQueue(Queue)
// const durationLoopQueue = testQueue(LoopQueue)
// console.log(`Queue duration=${durationQueue}`)
// console.log(`LoopQueue duration=${durationLoopQueue}`)


// import SegementTree from '../../src/9_SegmentTree'

// let nums = [-2, 0, 3, -5, 2, -1]

// let segTree = new SegementTree<number>(nums, {
//     merge: function(a, b){
//         return a + b
//     }
// })
// console.log(segTree.toString())


import bubbleSort from '../../src/15_SortAlgorithm/1.BubbleSort'
import selectionSort from '../../src/15_SortAlgorithm/2.SelectionSort'
import insertionSort from '../../src/15_SortAlgorithm/3.insertionSort'
let arr = [5,2,3,8,1]
console.log('bubbleSort', bubbleSort(arr.concat()))
console.log('selectionSort', selectionSort(arr.concat()))
console.log('insertionSort', insertionSort(arr.concat()))
console.log(arr)
