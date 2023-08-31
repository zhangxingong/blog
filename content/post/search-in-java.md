+++
title = "常用搜索算法 | JAVA"
date = 2023-08-31T10:02:00+08:00
tags = ["笔记","学习","基础","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

>在Java中，顺序查找和哈希查找是两种常见的查找算法。

**1. 顺序查找**

顺序查找是一种基本的查找算法，它逐个遍历待查找的元素，直到找到目标元素或者遍历完所有元素。

下面是一个简单的顺序查找示例代码：


```java
public static int sequentialSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}
```
>在这个示例中，我们定义了一个名为`sequentialSearch`的静态方法，它接受一个整数数组`arr`和一个目标整数`target`作为参数。
>方法使用一个`for`循环遍历数组中的每个元素，如果找到了目标元素，则返回该元素的索引。如果遍历完所有元素都没有找到目标元素，则返回-1。

**2. 哈希查找**

>哈希查找是一种基于哈希表实现的查找算法。它将元素的关键字通过哈希函数转换为数组的索引，并使用该索引直接访问数组中的元素。
>由于直接访问数组中的元素，所以哈希查找的时间复杂度通常为O(1)。

下面是一个简单的哈希查找示例代码：


```java
public class HashMap {
    private int[] arr;
    private int capacity;

    public HashMap(int capacity) {
        this.capacity = capacity;
        arr = new int[capacity];
    }

    public void put(int key, int value) {
        int index = hash(key);
        arr[index] = value;
    }

    public int get(int key) {
        int index = hash(key);
        return arr[index];
    }

    private int hash(int key) {
        return key % capacity;
    }
}
```
>在这个示例中，我们定义了一个名为`HashMap`的类，它实现了哈希表的存储和查找功能。
>该类使用一个整数数组`arr`来存储元素，并使用一个容量参数`capacity`来指定数组的大小。
>类中包含了一个`put`方法用于存储元素，一个`get`方法用于查找元素，以及一个`hash`方法用于计算元素的索引。
>在`hash`方法中，我们使用了简单的取模运算作为哈希函数。
