+++
title = "哈希冲突的三种解决方案"
date = "2024-02-02T16:19:42+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
hiddenFromHomePage = true
+++




## 哈希冲突的解决办法：

1.  开放地址法
2.  拉链法（链地址法）
3.  再哈希法

## 一、开放地址法

原理是当发生hash冲突时，会以当前地址为基准，然后根据**寻址方法**（探查寻址），去寻找下一次地址。若依旧发生冲突，则继续寻址，直到找到一个空的位置为止。 通用的散列函数形式为：

**Hi=（H（key）+di）% m （i=1，2，…，n）**

其中H（key）为哈希函数，m 为表长，di称为增量序列。增量序列的取值方式不同，相应的再散列方式也不同。

### 寻址方法

**1\. 线性探查**

**顺序查找**表的下一个单元，直到找到一个空单元或查遍全表。

即当hash值为3冲突时(假设此时hash表长度为11)，利用**线性探查**的过程为：

H1 = (3+1)%11 = 4，此时若4依旧冲突，则再hash，即

H2 = (3+2)%11 = 5 .... 通过这种线性增长增量系列，直到找到空的位置为止。

**2\. 二次探查**

这种方法的特点是，当哈希冲突时，在表的左右进行跳跃探测，比较灵活。

此时di = 1^2, -1^2, 2^2, -2^2 ....

假设当hash值为3冲突时(假设此时hash表长度为11)，利用**二次探查**的过程为：

H1 = (3+1^2)%11 = 4,此时若4依旧冲突，则再hash,即

H2 = (3+(-1)^2)%11 = 2 ...

通过该方法直到找到空位置为止。

**3\. 伪随机探测**

这种方法即是产生一些随机系列值，并给定随机数作为起点。

假设当hash值为3冲突时(假设此时hash表长度为11)，利用**伪随机探测**的过程为：

假设产生的随机系列为2，5，9 ....，则

H1 = (3+2)%11 = 5

H2 = (3+5)%11 = 8

通过该方法直到找到空位置为止。

## 二、拉链法

拉链法应用于hashMap和hashSet中，当产生hash冲突时，则会以该hash冲突的位置构建一个单链表（即将所有哈希地址为i的元素构成一个称为同义词链的单链表），并将单链表的头指针存储在哈希表的第i个位置中。

**链地址法适用于经常进行插入和删除的情况。**

## 三、再哈希法

指使用哈希函数计算散列位置时，当不同散列出现同一位置时就再次使用哈希，直到不冲突。
