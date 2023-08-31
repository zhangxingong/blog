+++
title = "二分搜索算法 | JAVA"
date = 2023-08-31T09:20:00+08:00
tags = ["笔记","学习","基础","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++


>二分搜索（Binary Search）是一种在有序数组中查找特定元素的搜索算法。
>搜索过程从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束；
>如果目标值大于或小于中间元素，则在数组大于或小于中间元素的那一半中查找，
>而不是整个数组。

**以下是用Java实现的二分搜索算法：**


```java
public class BinarySearch {
    // Returns index of x if it is present in arr[], else return -1
    int binarySearch(int arr[], int x) {
        int l = 0, r = arr.length - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;

            // Check if x is present at mid
            if (arr[m] == x)
                return m;

            // If x greater, ignore left half
            if (arr[m] < x)
                l = m + 1;

            // If x is smaller, ignore right half
            else
                r = m - 1;
        }

        // if we reach here, then element was not present
        return -1;
    }

    // Driver method to test above
    public static void main(String args[]) {
        BinarySearch bs = new BinarySearch();
        int arr[] = {2, 3, 4, 10, 40};
        int n = arr.length;
        int x = 10;
        int result = bs.binarySearch(arr, x);
        if (result == -1)
            System.out.println("Element not present in array");
        else
            System.out.println("Element found at index " + result);
    }
}
```

>这段代码首先在数组中查找中间元素，然后根据中间元素与目标值的大小关系来决定接下来在哪一半的数组中继续搜索。
>这样，每次比较都可以排除一半的元素，大大提高了搜索效率。
