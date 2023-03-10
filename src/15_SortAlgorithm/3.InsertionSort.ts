/** 插入排序
 * 通过构建有序序列，对于未排列数据，在已排序序列中从后向前扫描，找到相应位置并插入
 * 步骤：
 * （1）从第一个元素开始，该元素可以认为已经被排序
 * （2）取出下一个元素，在已经排序的元素序列中从后向前扫描
 * （3）如果该元素（已排序）大于新元素，将该元素移到下一个位置
 * （4）重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
 * （5）将新元素插入到该位置后
 * （6）重复步骤2~5
 */

export default function insertionSort(arr: any){
    let n = arr.length
    let temp
    for(let i=0; i< n; i++){
        for(let j = i; j>0; j--){
            if(arr[j] < arr[j-1]){
                temp = arr[j-1]
                arr[j-1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

