/** 选择排序
 * 首先在未排序的序列中找到最小（大）元素，存放到排序序列的起始位置。
 * 然后再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
 * 以此类推，直到所有元素均排序完毕
 * 
 */

export default function selectionSort(arr: any){
    let n = arr.length
    let minIndex, temp
    for(let i =0; i< n; i++){
        for(let j= i+1; j<n; j++){
            minIndex = i
            if(arr[j] < arr[minIndex]){ // 找到最小的数
                minIndex = j // 将最小数的索引保存
            }
        }
        // 交换第一个位置和最小数的位置
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
    }
    return arr
}