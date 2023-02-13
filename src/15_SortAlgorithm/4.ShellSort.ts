/**
 * 希尔排序：// ?
 * 加快速度改进了插入排序，交换不相邻的元素对数组的局部进行排序，并最终用插入排序将局部有序的
 * 数组排序，在此选择增量gap = length/2,缩小增量以gap = gap/2的方式，用序列{n/2, (n/2)/2, ...1}来表示
 * [7,6,9,3,1,5,2,4]=> [7,1],[6,5],[9,2],[3,4]=>[1,7],[5,6],[2,9],[3,4] 每组单独排序（插入排序）
 * [1,5,2,3,7,6,9,4]=> [1,2,7,9],[5,3,6,4]=> [1,2,7,9],[3,4,5,6] 每组单独排序（插入排序）
 * [1,3,2,4,7,5,9,6]=> [1,3,2,4,7,5,9,6] 每组单独排序（插入排序）
 * 
 */

export default function shellSort(arr: any){
    let n = arr.length
    for(let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)){
        for(let i = gap; i< n; i++){
            let current = arr[i]
            for(let j=i; j>= gap; j= j-gap){
                if(current < arr[j-gap]){
                    arr[j] = arr[j-gap]
                }
            }
        }
    }
}


/**
 * void shellsort(int a[], int n) {   
   int gap = n / 2;  
   int i, j;  
   int tmp;  
   for(gap = n / 2; gap > 0; gap /= 2)  {   //增量起始值为n/2,之后逐次减半  
      //从第gap个元素，逐个对其所在组进行直接插入排序操作
      for(i = gap; i < n; i++)  {
          tmp=a[i];  
          j = i;
          if(a[j] < a[j - gap]) {
             while(j - gap >= 0 && tmp < a[j - gap]) {
                 //移动法
                 a[j] = a[j - gap];
                 j = j - gap;
             }
             a[j] = temp;
          }
       }  
    }
}
 */