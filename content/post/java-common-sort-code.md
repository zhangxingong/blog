+++
title = "Java常用算法 | JAVA"
date = 2023-08-31T09:52:00+08:00
tags = ["笔记","学习","基础","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

>Java常用算法包括：

1. 排序算法：冒泡排序、选择排序、插入排序、希尔排序、归并排序、快速排序、堆排序等。
2. 查找算法：顺序查找、二分查找、哈希查找等。
3. 字符串匹配算法：暴力匹配、KMP算法、Boyer-Moore算法等。
4. 图论算法：最短路径算法（Dijkstra算法、Floyd-Warshall算法）、最小生成树算法（Prim算法、Kruskal算法）等。
5. 动态规划算法：背包问题、最长公共子序列、最长上升子序列等。
6. 贪心算法：最小生成树、单源最短路径等。
7. 分治算法：快速排序、归并排序等。
8. 网络流算法：最大流问题、最小割问题等。
9. 数学算法：欧几里得算法、素数判断、大数计算等。

>以上仅是Java语言中常用的一些算法，还有很多其他的算法可以应用于Java开发中。


**在Java中，有很多不同的排序算法可以实现。下面是一些常见的排序算法的Java实现：**

1. **冒泡排序（Bubble Sort）**


```java
public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换 arr[j] 和 arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```
2. **选择排序（Selection Sort）**


```java
public static void selectionSort(int[] arr) {
    int n = arr.length;

    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 交换 arr[minIndex] 和 arr[i]
        int temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
}
```
3. **插入排序（Insertion Sort）**


```java
public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        // 将大于key的元素向后移动一位
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}
```
4. **快速排序（Quick Sort）**


```java
public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        // pi是分区索引，arr[pi]现在的位置就是正确的位置
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);  // 对左边进行快速排序
        quickSort(arr, pi + 1, high); // 对右边进行快速排序
    }
}
```
5. **归并排序（Merge Sort）**

归并排序的实现稍微复杂一些，因为它涉及到创建新的数组。以下是一个递归的实现：


```java
public static void mergeSort(int[] arr) {
    if (arr.length < 2) { return; } // 如果数组长度小于2，则直接返回数组本身，这是一个递归的基本条件。
    int mid = arr.length / 2; // 中间点，用于分割左右两个数组。
    int[] left = new int[mid]; // 左半部分数组。
    int[] right = new int[arr.length - mid]; // 右半部分数组。
    for (int i = 0; i < mid; i++) { left[i] = arr[i]; } // 将左半部分数组拷贝到left。
    for (int i = mid; i < arr.length; i++) { right[i - mid] = arr[i]; } // 将右半部分数组拷贝到right。
    mergeSort(left); // 对左半部分进行归并排序。
    mergeSort(right); // 对右半部分进行归并排序。
    merge(arr, left, right); // 将排好序的左右两部分合并到原数组。
}
```

**在计算机科学中，排序是一种将一组数据按照某种顺序排列的方法。以下是两种常见的排序算法：堆排序和希尔排序。**

**1. 堆排序**

堆排序是一种比较高效的排序算法，它利用了二叉堆的性质进行排序。

以下是一个简单的Java实现：


```java
public class HeapSort {
    public void sort(int arr[]) {
        int n = arr. length;

        // 构建一个大顶堆（注意，我们从下标为n/2开始调整，因为从0开始的数组实际上是一个小顶堆）
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);

        // 一个个从堆顶取出元素
        for (int i=n-1; i>=0; i--) {
            // 将当前最大的元素arr[0]和arr[i]交换
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            // 调整剩余元素，使其保持大顶堆的性质
            heapify(arr, i, 0);
        }
    }

    void heapify(int arr[], int n, int i) {
        int largest = i;  // 初始化最大元素为根节点
        int l = 2 * i + 1;  // 左子节点
        int r = 2 * i + 2;  // 右子节点

        // 如果左子节点大于根节点
        if (l < n && arr[l] > arr[largest])
            largest = l;

        // 如果右子节点大于目前的最大元素
        if (r < n && arr[r] > arr[largest])
            largest = r;

        // 如果最大元素不是根节点，就将最大元素和根节点交换，然后递归地调整交换后的子树。
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            heapify(arr, n, largest);
        }
    }
}
```

>希尔排序（Shell Sort）是插入排序的一种优化版本，也称为缩小增量排序。
>它通过将原始数据集分成若干个子序列，对每个子序列进行插入排序，然后逐步缩小子序列的间隔，最终整个序列变成一个有序序列。

**以下是Java实现希尔排序的代码：**


```java
public static void shellSort(int[] arr) {
    int n = arr.length;
    int gap = n / 2;

    while (gap > 0) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;

            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            arr[j] = temp;
        }

        gap /= 2;
    }
}
```
>在这个实现中，我们首先计算一个初始间隔`gap`，然后对每个子序列进行插入排序。随着`gap`的逐渐减小，子序列的长度逐渐减小，最终整个序列变成一个有序序列。
