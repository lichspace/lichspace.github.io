# JavaScript最大堆排序
```
/**
 * javascript最大堆排序
 * 相关资料：
 * 可视化展示方案：https://www.cs.usfca.edu/~galles/visualization/HeapSort.html
 * 文章：https://medium.com/swlh/data-structures-heaps-b039868a521b
 * npm包：https://www.npmjs.com/package/@datastructures-js/heap
 */

class Heap {
  constructor(data) {
    this.data = data;
    this.length = this.heapSize = data.length;
  }
  // array A索引 a,b互换
  exchange(A, a, b) {
    if (a === b) return;
    let tmp = A[a];
    A[a] = A[b];
    A[b] = tmp;
  }

  build() {
    for (let i = Math.floor(this.heapSize / 2); i >= 0; i--) {
      this.heapify(this.data, i);
    }
    return this;
  }
  //最大堆
  heapify(A, i) {
    let largest = i;
    let iLeft = 2 * i + 1;
    let iRight = 2 * i + 2;

    if (iLeft < this.heapSize && A[iLeft] > A[i]) {
      largest = iLeft;
    }

    if (iRight < this.heapSize && A[iRight] > A[largest]) {
      largest = iRight;
    }

    if (largest !== i) {
      console.log(
        "A[%d]:%d  left[%d]:%d  right[%d]:%d ",
        i,
        A[i],
        iLeft,
        A[iLeft],
        iRight,
        A[iRight]
      );
      this.exchange(A, i, largest);
      //console.table(this.data);
      this.heapify(A, largest);
    }
  }
  //重置
  resetHeapSize() {
    this.heapSize = this.data.length;
  }

  sort() {
    this.build();
    for (let i = this.length - 1; i > 0; i--) {
      this.exchange(this.data, 0, i);
      this.heapSize--;
      this.heapify(this.data, 0);
    }
    this.resetHeapSize();
  }
}

const test = new Heap([1, 2, 35, 67, 4, 55, 99, 65, 88, 333, 22, 9]);
test.sort();
console.log(test.data.join());
```