+++
title = "提升Java开发效率：掌握HashMap的常见方法与基本原理"
date = "2023-12-20T14:26:45+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#_4)
+   [发现宝藏](#_10)
+   [一、概述](#_14)
+   +   [1. 认识HashMap](#1_HashMap_16)
    +   [2. HashMap 的作用和重要性](#2_HashMap__30)
    +   [3. 简要讲解 HashMap 的基本原理和实现方式](#3__HashMap__41)
+   [二、了解 HashMap 创建及其的常见操作方法](#_HashMap__89)
+   +   [1. HashMap的创建](#1_HashMap_91)
    +   [2. 添加元素 put()](#2__put_128)
    +   [3. 访问元素 get()](#3__get_140)
    +   [4. 删除元素 remove()](#4__remove_154)
    +   [5. 计算大小 size()](#5__size_184)
    +   [6. 迭代 HashMap for-each](#6__HashMap_foreach_194)
    +   [7.判断是否为空 isEmpty()](#7_isEmpty_235)
    +   [8. 判断 HashMap 中是否存在指定 key containsKey()](#8__HashMap__key_containsKey_245)
    +   [9. 获取指定 key 对应对 value，如果找不到 key ，则返回设置的默认值 getOrDefault()](#9__key__value_key__getOrDefault_257)
+   [总结](#_306)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 一、概述

### 1. 认识HashMap

+   HashMap 是一个散列表，它**存储的内容是键值对(key-value)映射**
    
+   HashMap 实现了 Map 接口，**根据键的 HashCode 值存储数据**，具有很快的访问速度，最多允许一条记录的键为 null，不支持线程同步
    
+   HashMap 是**无序**的，即不会记录插入的顺序
    
+   HashMap **继承于AbstractMap**，实现了 **Map**、**Cloneable**、**java.io.Serializable** 接口
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/066e6a384472430997a49b51cfc98524.png)

+   HashMap 的 key 与 value 类型可以相同也可以不同，可以是字符串（String）类型的 key 和 value，也可以是整型（Integer）的 key 和字符串（String）类型的 value

### 2. HashMap 的作用和重要性

> **HashMap**是Java中最常用的数据结构之一，它**实现了 Map 接口**，提供了键值对存储和检索的功能。HashMap 的作用和重要性体现在以下几个方面：

+   **存储和检索**：HashMap 可以存储大量的键值对数据，并通过键快速检索对应的值。它使用哈希算法将键映射到数组的位置，从而实现**高效的查找**操作。这使得HashMap在处理大量数据时，可以**快速地插入、获取和删除**元素。
+   **高效性能**：由于 HashMap 的内部实现利用了哈希算法，它的查找操作的平均时间复杂度为O(1)（常数时间）。这意味着HashMap 在大多数情况下能够以非常高效的方式执行插入和查找操作，使得它成为处理大规模数据的理想选择。
+   **灵活性**：HashMap 中的键和值可以是任意类型的对象。这使得我们可以根据具体需求将不同类型的数据存储在 HashMap 中，而**不受限于特定的数据类型**。
+   **唯一键**：HashMap 要求键的唯一性，这意味着**每个键只能在 HashMap 中出现一次**。这对于通过键来查找值的场景非常有用，例如存储用户信息时，可以将用户ID作为键，以便快速地检索该用户的信息。
+   **扩展性**：HashMap 可以动态地扩展，**根据存储数据的增长自动调整容量**，从而避免了手动进行容量管理的繁琐操作。

### 3. 简要讲解 HashMap 的基本原理和实现方式

> 当使用 HashMap 存储数据时，它会**根据键的哈希值将键值对映射到内部的数组中**。基本原理可以概括为以下几步：

**1. HashMap函数**

+   **哈希函数**：哈希表中**元素是由哈希函数确定**的,将数据元素的关键字 **Key 作为自变量**，通过一定的函数关系（称为哈希函数），**计算出的值，即为该元素的存储地址**。哈希表中哈希函数的设计是相当重要的，这也是建哈希表过程中的关键问题之一
    
+   **哈希函数计算**：当我们向HashMap中插入一个键值对时，HashMap会**调用键的hashCode()方法来计算其哈希值**。哈希值是一个整数，用于将键映射到数组的索引位置
    
+   **哈希值转换**：为了**确保哈希值适合作为数组的索引**，HashMap会对计算得到的哈希值进行一些转换操作。**常用**的转换方法是**使用哈希值与数组长度进行取模运算**，得到一个在数组范围内的索引值
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/415ca500f85144a39d4ffa529cacb581.png)

**2. HashMap存储**

+   **数组存储**：HashMap**内部维护了一个数组**，**每个数组元素对应一个桶**（bucket）。**每个桶可以存储一个或多个键值对**。当插入或查找元素时，HashMap**根据计算得到的索引值找到对应的桶**，然后在桶中进行相应的操作
    
+   **动态扩容**：为了提高HashMap的性能，在存储的键值对数量达到一定阈值后，HashMap会自动进行扩容操作。**扩容过程涉及重新计算键的哈希值，并重新分配键值对到更大的数组中**。这样可以减少哈希冲突，提高操作效率
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/cb1c11ef182f47ba8d99eefc47907c42.png)

**3. HashMap冲突处理**

+   **冲突处理**：由于不同的键可能具有相同的哈希值，这就会导致冲突。当发生**冲突**时，HashMap使用**链表或红黑树**等数据结构来**存储具有相同哈希值的键值对**。这些数据结构**允许在冲突的位置上存储多个键值对**，并通过**比较键的equals()方法来区分**它们
    
+   **链表**：在**JDK 8之前**，HashMap使用链表来解决冲突。**当多个键值对被映射到同一个桶时，它们会形成一个链表。通过遍历链表来查找、插入或删除键值对**。但是，当链表长度过长时，会影响HashMap的性能
    
+   **红黑树**：从**JDK 8开始**，当**链表长度超过一个阈值（默认为8）时，链表会被自动转换为红黑树**，以提高操作效率。**红黑树的查找、插入和删除操作具有较低的时间复杂度**，可以在平均情况下保持对数时间复杂度
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/e6ff42f0663146fb8a8d7d25015ee38e.png)

+   **Entry对象**：HashMap**使用Entry对象来表示键值对**。每个**Entry对象包含了键、值以及指向下一个Entry的引用（形成链表或红黑树结构）**。在JDK 8之前，每个Entry对象还包含了指向前一个Entry的引用，以支持快速删除操作

> 总的来说，HashMap 通过哈希函数计算键的哈希值，并将键值对映射到内部数组中的桶中。采用链表或红黑树等数据结构解决哈希冲突，并通过动态扩容来提高性能。这种实现方式使得 HashMap 能够在常数时间复杂度内执行插入、查找和删除操作。

## 二、了解 HashMap 创建及其的常见操作方法

### 1. HashMap的创建

**1. 关于包装类**  
HashMap 中的元素实际上是对象，一些常见的基本类型可以使用它的包装类，基本类型对应的包装类表如下：

| 基本类型 | 引用类型 |
| --- | --- |
| boolean | Boolean |
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| char | Character |

**2. HashMap要使用包装类型而不是基本类型**

+   **泛型限制**：**HashMap 是一个泛型类**，它可以存储任意类型的键和值。然而，**泛型类型参数只能是类而不能是基本类型**。因此，如果要将基本类型作为键或值存储在 HashMap 中，就需要将其包装为相应的包装类型，例如 Integer、Double、Boolean 等。
    
+   **空值处理**：**基本类型是不允许为 null 的，而包装类型可以为 null**。在 HashMap 中，键和值都可以为 null。对于基本类型，当我们需要在 HashMap 中存储一个空值时，必须使用对应的包装类型。
    

**3. 创建HashMap的示例**

+   HashMap 类位于 java.util 包中，使用前需要引入它，语法格式如下：

```java
import java.util.HashMap; // 引入 HashMap 类
```

+   以下实例我们创建一个 HashMap 对象 Sites， 整型（Integer）的 key 和字符串（String）类型的 value：

```java
HashMap<Integer, String> Sites = new HashMap<Integer, String>();
```

### 2. 添加元素 put()

+   要向HashMap添加元素，你可以使用 **put()** 方法。put() 方法接受两个参数，**第一个参数是键（Key）**，**第二个参数是值（Value）**。以下是一个添加元素到 HashMap 的示例：

```java
  map.put("A", 1);
  map.put("B", 2);
  map.put("C", 3);
```

+   需要注意的是，HashMap 允许将null作为键和值。如果你尝试将null作为键添加到 HashMap 中，它将只有一个键为 null 的键值对。另外，由于 **HashMap 不是线程安全的，如果在多线程环境下使用 HashMap，请考虑使用线程安全的 ConcurrentHashMap**。

### 3. 访问元素 get()

+   要访问HashMap中的元素，你可以使用 **get()** 方法。get() 方法**接受一个参数**，即**要获取的键（Key）**，并**返回**与**该键关联的值（Value）**

```java
  int value1 = map.get("A"); // 访问键为"A"的值
  int value2 = map.get("B"); // 访问键为"B"的值
```

+   需要注意的是，如果**指定的键不存在于 HashMap 中，get() 方法将返回 null**。因此，在使用 get() 方法获取值之前，最好先使用**containsKey()** 方法 **检查** HashMap 中是否存在指定的键
    
+   另外，HashMap还提供了其他方法来访问元素，如**keySet()方法可返回所有键的集合**，**values()方法可返回所有值的集合**，**entrySet()方法可返回包含键值对的集合**。通过使用这些方法，你可以**遍历HashMap中的所有键值对并执行相应的操作**
    

### 4. 删除元素 remove()

+   使用 **remove(Object key)** 方法：这个方法接受一个键作为参数，并从 HashMap 中删除对应的键值对。例如，如果你要删除键为 “key1” 的元素，可以使用以下代码：

```java
  HashMap<String, String> hashMap = new HashMap<>();
  hashMap.remove("key1");
```

+   使用**迭代器遍历**并删除元素：你可以使用 **Iterator** 来遍历 **HashMap** 的键值对，并使用 remove() 方法删除元素。这种方法适用于需要按条件删除元素的情况。例如，如果你要删除所有值为"value1"的键值对，可以使用以下代码：

```java
HashMap<String, String> hashMap = new HashMap<>();
Iterator<Map.Entry<String, String>> iterator = hashMap.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<String, String> entry = iterator.next();
    if (entry.getValue().equals("value1")) {
        iterator.remove();
    }
}
```

+   删除所有键值对 (key-value) 可以使用 **clear** 方法：

```java
 hashMap.clear();
```

### 5. 计算大小 size()

+   要计算HashMap的大小（即键值对的数量），你可以使用size()方法。该方法返回HashMap中键值对的数量。
+   以下是使用size()方法计算HashMap大小的示例代码：

```java
  int size = hashMap.size();
```

### 6. 迭代 HashMap for-each

+   可以使用 **for-each** 来迭代 HashMap 中的元素
    
+   如果你**只想获取 key，可以使用 keySet() 方法**，然后可以通过 get(key) 获取对应的 value，如果你**只想获取 value，可以使用 values()** 方法
    

```java
// 引入 HashMap 类      
import java.util.HashMap;

public class RunoobTest {
    public static void main(String[] args) {
        // 创建 HashMap 对象 Sites
        HashMap<Integer, String> Sites = new HashMap<Integer, String>();
        // 添加键值对
        Sites.put(1, "Google");
        Sites.put(2, "Runoob");
        Sites.put(3, "Taobao");
        Sites.put(4, "Zhihu");
        // 输出 key 和 value
        for (Integer i : Sites.keySet()) {
            System.out.println("key: " + i + " value: " + Sites.get(i));
        }
        // 返回所有 value 值
        for(String value: Sites.values()) {
          // 输出每一个value
          System.out.print(value + ", ");
        }
    }
}
```

+   执行以上代码，输出结果如下：

> key: 1 value: Google  
> key: 2 value: Runoob  
> key: 3 value: Taobao  
> key: 4 value: Zhihu  
> Google, Runoob, Taobao, Zhihu,

### 7.判断是否为空 isEmpty()

+   要判断HashMap是否为空，你可以使用isEmpty()方法。该方法会返回一个布尔值，表示HashMap是否为空
    
+   以下是使用isEmpty()方法判断HashMap是否为空的示例代码：
    

```java
 System.out.println("Is HashMap empty? " + hashMap.isEmpty()
```

### 8. 判断 HashMap 中是否存在指定 key containsKey()

+   要判断 HashMap 是否包含某个特定的键（key），你可以使用 **containsKey(Object key)** 方法。该方法接受一个键作为参数，并返回一个布尔值，表示 HashMap 是否包含该键
    
+   以下是使用 containsKey(Object key) 方法判断 HashMap 是否包含某个键的示例代码：
    

```java
System.out.println("Does HashMap contain key 'key2'? " + hashMap.containsKey("key1"));
```

### 9. 获取指定 key 对应对 value，如果找不到 key ，则返回设置的默认值 getOrDefault()

+   getOrDefault() 方法获取指定 key 对应对 value，如果找不到 key ，则返回设置的默认值
    
+   getOrDefault() 方法的语法为：
    

> hashmap.getOrDefault(Object key, V defaultValue)

+   参数说明：

> 1. key - 键  
> 2. defaultValue - 当指定的key并不存在映射关系中，则返回的该默认值

+   返回值：返回 key 相映射的的 value，如果给定的 key 在映射关系中找不到，则返回指定的默认值

```java
import java.util.HashMap;

class Main {
    public static void main(String[] args) {
        // 创建一个 HashMap
        HashMap<Integer, String> sites = new HashMap<>();

        // 往 HashMap 添加一些元素
        sites.put(1, "Google");
        sites.put(2, "Runoob");
        sites.put(3, "Taobao");
        System.out.println("sites HashMap: " + sites);

        // key 的映射存在于 HashMap 中
        // Not Found - 如果 HashMap 中没有该 key，则返回默认值
        String value1 = sites.getOrDefault(1, "Not Found");
        System.out.println("Value for key 1:  " + value1);

        // key 的映射不存在于 HashMap 中
        // Not Found - 如果 HashMap 中没有该 key，则返回默认值
        String value2 = sites.getOrDefault(4, "Not Found");
        System.out.println("Value for key 4: " + value2);
    }
}
```

+   执行以上程序输出结果为：

> Value for key 1: Google  
> Value for key 4: Not Found

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


