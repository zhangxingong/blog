+++
title = "Java数组详解 -- 基础知识与常用操作"
date = "2023-12-20T14:31:07+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#_5)
+   [发现宝藏](#_11)
+   [一、初识数组](#_14)
+   +   [1. 数组的定义](#1__18)
    +   [2. 数组的特点](#2__28)
    +   [3. 声明和初始化数组](#3__43)
    +   [4. 默认初始化值](#4__78)
+   [二、访问和操作数组元素](#_87)
+   +   [1. 数组的索引和范围](#1__89)
    +   [2. 通过索引访问数组元素](#2__93)
    +   [3. 修改数组元素的值](#3__103)
+   [三、数组的长度和属性](#_113)
+   +   [1. 数组的长度计算](#1__115)
    +   [2. 数组的长度属性](#2__125)
    +   [3. 数组越界的错误](#3__129)
+   [四、数组的遍历](#_133)
+   +   [1. for循环遍历数组](#1_for_137)
    +   [2. 增强for循环遍历数组](#2_for_148)
    +   [3. 遍历多维数组](#3__159)
+   [五、多维数组](#_174)
+   +   [1. 二维数组的定义和初始化](#1__178)
    +   [2. 访问和操作二维数组元素](#2__190)
+   [六、数组的注意事项和扩展](#_212)
+   +   [1. 数组长度的不可变性](#1__214)
    +   [2. 数组的复制和排序](#2__218)
    +   [3. 数组的查找](#3__244)
    +   [4. 动态数组的实现：ArrayList](#4_ArrayList_261)
+   [总结](#_268)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码以及可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 一、初识数组

**数组是一种可以容纳多个相同类型数据元素的数据结构**。它是Java编程中常用的数据类型，用于存储和操作一组数据。数组提供了一个**连续的内存空间**来存储多个元素，并**通过索引来访问和操作**其中的每个元素。

### 1. 数组的定义

在Java中，可以使用以下语法来定义一个数组：

```java
  dataType[] arrayName;
```

其中，**dataType**表示数组中元素的数据类型，**arrayName**是数组的名称。

### 2. 数组的特点

**1. 数组具有以下特点：**

+   **数组长度固定**：一旦数组被创建，其长度就是固定的，无法动态改变
+   .**存储相同类型的数据**：数组中的元素必须是相同类型的数据
+   **连续的内存空间**：数组中的元素在内存中是连续存储的，可以通过索引快速访问

![在这里插入图片描述](https://img-blog.csdnimg.cn/758d7598fd32408996fe068e09254a90.png#pic_center)

+   正是因为数组的在内存空间的地址是连续的，所以我们在**删除或者增添**元素的时候，就难免要**移动其他元素**的地址。例如删除下标为3的元素，如图所示：

![在这里插入图片描述](https://img-blog.csdnimg.cn/1a344cd2edb649939584e06d03968a11.png#pic_center)

+   **数组的元素是不能删除的，只能覆盖**

### 3. 声明和初始化数组

**1. 声明数组的语法**

要声明一个数组，可以使用以下语句：

```java
  dataType[] arrayName;
```

其中，**dataType**是数组中元素的数据类型，**arrayName**是数组的名称。

**2. 静态初始化和动态初始化**

在声明数组的同时，可以进行初始化操作。数组的初始化可以分为静态初始化和动态初始化两种方式。

+   静态初始化

静态初始化是指在声明数组的同时，为数组元素赋初值。可以使用以下语法进行静态初始化：

```java
  dataType[] arrayName = {element1, element2, ...};
```

其中，**dataType**是数组中元素的数据类型，**arrayName**是数组的名称，**element1, element2**, …是要赋给数组元素的值。

+   动态初始化

动态初始化是指在声明数组后，再为数组分配内存空间，并为数组元素赋初值。可以使用以下语法进行动态初始化：

```java
  dataType[] arrayName = new dataType[arrayLength];
```

其中，**dataType**是数组中元素的数据类型，**arrayName**是数组的名称，**arrayLength**是数组的长度，表示可以存储的元素个数。

### 4. 默认初始化值

在Java中，如果没有为数组中的元素赋初值，那么数组会自动进行默认初始化，**根据数据类型不同采用不同的默认值**。下面是一些常见数据类型的默认初始化值：

+   **int**类型的数组，**默认元素值为 0**
+   **double**类型的数组，**默认元素值为 0.0**
+   **boolean**类型的数组，**默认元素值为 false**
+   **char**类型的数组，**默认元素值为空字符 \\u0000**

## 二、访问和操作数组元素

### 1. 数组的索引和范围

数组中的每个元素都通过一个非负整数索引来访问。**索引从 0 开始**，依次递增。例如，第一个元素的索引为 0，第二个元素的索引为 1，以此类推。数组的长度为 n，则**有效索引范围为 0 到 n - 1**。

### 2. 通过索引访问数组元素

要访问数组中的元素，可以使用以下语法：

```java
  arrayName[index]
```

其中，**arrayName**是数组的名称，**index**是要访问的元素的索引。通过该语法可以获取数组中指定索引位置的元素值。

### 3. 修改数组元素的值

通过索引访问数组元素后，还可以对该元素进行赋值操作，从而修改元素的值。使用以下语法来修改数组元素的值：

```java
  arrayName[index] = newValue;
```

其中，**arrayName**是数组的名称，**index**是要修改的元素的索引，**newValue**是要赋给该元素的新值。

## 三、数组的长度和属性

### 1. 数组的长度计算

通过使用 length 属性，可以获取数组的长度。长度表示数组中元素的个数，而非数组占用的内存空间大小。要获取数组的长度，可以使用以下语法：

```java
  int length = arrayName.length;
```

其中，**arrayName**是数组的名称，**length**是用于存储数组长度的变量。

### 2. 数组的长度属性

数组的长度是在创建数组时指定的，一旦创建后，长度就是固定的。使用length属性可以获取数组的长度值，常用于遍历数组或检查数组是否越界。

### 3. 数组越界的错误

在访问数组元素时，需要确保所使用的索引在有效范围内，否则会发生数组越界的错误。如果索引小于0或大于等于数组长度，都会导致数组越界错误。在编写代码时，**应格外注意数组索引的范围**。

## 四、数组的遍历

数组的遍历是指依次访问数组中的每个元素。**遍历数组可以通过循环结构实现，常见的有for循环和增强for循环**。

### 1. for循环遍历数组

```java
for (int i = 0; i &lt; arrayName.length; i++) {
    // 访问数组元素：arrayName[i]
    // 执行其他操作
}
```

在for循环中，使用一个循环变量i来作为索引，从 0 开始逐渐增加，直到达到数组长度减 1 为止。**该方法适用于需要根据索引进行操作的情况。**

### 2. 增强for循环遍历数组

```java
for (dataType element : arrayName) {
    // 访问数组元素：element
    // 执行其他操作
}
```

增强 for 循环是Java 5中引入的一种遍历数组的简化方法。它可以直接遍历数组中的每个元素，不需要使用索引变量。**该方法适用于只需要访问数组元素而不需要索引的情况。**

### 3. 遍历多维数组

**遍历多维数组可以嵌套使用多个循环，每层循环负责遍历一维数组的元素。**

```java
for (int i = 0; i &lt; arrayName.length; i++) {
    for (int j = 0; j &lt; arrayName[i].length; j++) {
        // 访问数组元素：arrayName[i][j]
        // 执行其他操作
    }
}
```

通过嵌套的循环，可以依次遍历每个二维数组的元素。

## 五、多维数组

**多维数组是指包含多个一维数组的数组**。例如，二维数组是一种常见的多维数组，它包含多个一维数组作为其元素。

### 1. 二维数组的定义和初始化

在Java中，可以使用以下语法来定义二维数组：

```java
  dataType[][] arrayName = new dataType[rowLength][columnLength];
```

其中，**dataType**是二维数组中元素的数据类型，**arrayName**是二维数组的名称，**rowLength**表示二维数组的行数，**columnLength**表示二维数组的列数。

二维数组的初始化可以通过静态初始化和动态初始化两种方式，与一维数组类似。

### 2. 访问和操作二维数组元素

要访问二维数组中的元素，可以使用以下语法：

```java
  arrayName[rowIndex][columnIndex]
```

其中，**arrayName**是二维数组的名称，**rowIndex**是要访问的元素所在行的索引，**columnIndex**是要访问的元素所在列的索引。

可以通过修改二维数组元素的值，来操作二维数组。与一维数组类似，使用以下语法来修改二维数组的元素值：

```java
  arrayName[rowIndex][columnIndex] = newValue;
```

## 六、数组的注意事项和扩展

### 1. 数组长度的不可变性

数组一旦创建后，其长度就是固定的，无法动态改变。如果需要存储更多的元素，可以考虑使用动态数组或集合类。

### 2. 数组的复制和排序

+   可以使用 **System.arraycopy()** 方法或 **Arrays.copyOf()** 方法来**复制数组**

使用 System.arraycopy() 方法：

```java
int[] sourceArray = {1, 2, 3, 4, 5};
int[] targetArray = new int[sourceArray.length];

System.arraycopy(sourceArray, 0, targetArray, 0, sourceArray.length);
```

使用 Arrays.copyOf() 方法：

```java
int[] sourceArray = {1, 2, 3, 4, 5};
int[] targetArray = Arrays.copyOf(sourceArray, sourceArray.length);
```

+   可利用**Arrays.sort()** 方法对数组进行 **排序**

```java
 // 使用 Arrays.sort() 方法对数组进行排序
 Arrays.sort(numbers);
}
```

### 3. 数组的查找

通过 **binarySearch** 方法能对排序好的数组进行**二分查找**法操作

```java
import java.util.Arrays;

public class BinarySearchExample {
    public static void main(String[] args) {
        // 示例数组，必须为已排序的数组
        int[] array = {10, 20, 30, 40, 50, 60, 70};
        int key = 40;

        int index = Arrays.binarySearch(array, key);
}
```

### 4. 动态数组的实现：ArrayList

在Java中，除了使用数组外，还可以使用 ArrayLis t类来实现动态数组。ArrayList 可以自动调整长度，并提供了丰富的方法来操作和管理元素。（详情请到个人主页查看关于ArrayList的入门博客）

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注,点赞，收藏支持一下。  

