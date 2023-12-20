+++
title = "JS常见内置函数大全数组篇（内附详细案例）"
date = "2023-12-20T14:10:46+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++


#### 文章目录

+   [前言](#_1)
+   [发现宝藏](#_7)
+   +   [1\. every() 检测数组元素的每个元素是否都符合条件](#1_every__17)
    +   [2\. filter() 检测数组元素，并返回符合条件所有元素的数组](#2_filter__70)
    +   [3\. find() 返回符合传入测试（函数）条件的数组元素](#3_find__117)
    +   [4\. map() 通过指定函数处理数组的每个元素，并返回处理后的数组](#4_map__166)
    +   [5\. slice() 选取数组的的一部分，并返回一个新数组](#5_slice__210)
    +   [6\. splice() 从数组中添加或删除元素](#6_splice__251)
    +   [7\. shift() 删除数组的第一个元素](#7_shift__292)
    +   [8\. unshift() 向数组的开头添加一个或更多元素，并返回新的长度](#8_unshift__331)
    +   [9\. pop() 删除数组的最后一个元素并返回删除的元素](#9_pop__367)
    +   [10\. push() 向数组的末尾添加一个或更多元素，并返回新的长度](#10_push__404)
+   [总结](#_445)

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

JavaScript 数组提供了许多内置函数，用于执行各种操作，如添加、删除、查找、迭代和转换数组元素。一些常用的数组函数包括 push()、pop()、shift()、unshift()、concat()、forEach()、map()、filter()、reduce() 等。

### 1\. every() 检测数组元素的每个元素是否都符合条件

**1\. 实例**

检测数组 ages 的所有元素是否都大于 18 :

```javascript
var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18;
}

function myFunction() {
    document.getElementById("demo").innerHTML = ages.every(checkAdult);
}
```

输出结果为:

```javascript
false
```

**2\. 定义和用法**

every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）

every() 方法使用指定函数检测数组中的所有元素：

```auto
如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测

如果所有元素都满足条件，则返回 true
```

注意： every() 不会对空数组进行检测

注意： every() 不会改变原始数组

**3\. 语法**

```javascript
array.every(function(currentValue,index,arr), thisValue)
```

**4\. 参数说明**

![在这里插入图片描述](https://img-blog.csdnimg.cn/d8be2196be9b436380e3b259d1768d0f.png)

**5\. 技术细节**

> 返回值： 布尔值 - 如果所有元素都通过检测返回 true，否则返回 false

### 2\. filter() 检测数组元素，并返回符合条件所有元素的数组

1.  实例

返回数组 ages 中所有元素都大于 18 的元素:

```javascript
var ages = [32, 33, 16, 40];

function checkAdult(age) {
    return age >= 18;
}

function myFunction() {
    document.getElementById("demo").innerHTML = ages.filter(checkAdult);
}
```

输出结果为:

```javascript
32,33,40
```

**2\. 定义和用法**

filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素

注意： filter() 不会对空数组进行检测

注意： filter() 不会改变原始数组

**3\. 语法**

```javascript
array.filter(function(currentValue,index,arr), thisValue)
```

**4\. 参数说明**

![在这里插入图片描述](https://img-blog.csdnimg.cn/3d4f678f776c4e1485dc4d840c3a47af.png)

**5\. 技术细节**

> 返回值：返回数组，包含了符合条件的所有元素，如果没有符合条件的元素则返回空数组

### 3\. find() 返回符合传入测试（函数）条件的数组元素

**1\. 实例**

获取数组中第一个值为 18 或更大的元素的值：

```javascript
var ages = [3, 10, 18, 20];

function checkAdult(age) {
  return age >= 18;
}

function myFunction() {
  document.getElementById("demo").innerHTML = ages.find(checkAdult);
}
```

**2\. 定义和用法**

​find()​ 方法返回数组中第一个通过测试的元素的值（作为函数提供）

​find()​ 方法对数组中存在的每个元素执行一次函数：

```auto
如果找到函数返回 true 值的数组元素，则 find() 返回该数组元素的值（并且不检查剩余值）

否则返回 undefined
```

注释：​find()​ 不对空数组执行该函数

注释：​find()​ 不会改变原始数组

**3\. 语法**

```javascript
array.find(function(currentValue, index, arr), thisValue)
```

**4\. 参数值**

![在这里插入图片描述](https://img-blog.csdnimg.cn/02f440e80e9240b8b35758657a980141.png)

5.  技术细节

> 1\. 返回值： 如果数组中的任何元素通过测试，则返回数组元素值，否则返回 undefined

> 2\. JavaScript 版本: ECMAScript 6

### 4\. map() 通过指定函数处理数组的每个元素，并返回处理后的数组

**1\. 实例**

返回一个数组，数组中元素为原始数组的平方根:

```javascript
var numbers = [4, 9, 16, 25];

function myFunction() {
    x = document.getElementById("demo")
    x.innerHTML = numbers.map(Math.sqrt);
}
```

输出结果为:

```javascript
2,3,4,5
```

**2\. 定义和用法**

map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值

map() 方法按照原始数组元素顺序依次处理元素

注意： map() 不会对空数组进行检测

注意： map() 不会改变原始数组

**3\. 语法**

```javascript
array.map(function(currentValue,index,arr), thisValue)
```

**4\. 参数说明**

![在这里插入图片描述](https://img-blog.csdnimg.cn/c87f25899c064d4fbeaf03ea4eddec51.png)

### 5\. slice() 选取数组的的一部分，并返回一个新数组

**1\. 实例**

在数组中读取元素：

```javascript
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(1,3);
```

citrus 结果输出:

```javascript
Orange,Lemon
```

**2\. 定义和用法**

slice() 方法可从已有的数组中返回选定的元素

slice()方法可提取字符串的某个部分，并以新的字符串返回被提取的部分

注意： **slice() 方法不会改变原始数组**

**3\. 语法**

```javascript
array.slice(start, end)
```

**4\. 参数值**

![在这里插入图片描述](https://img-blog.csdnimg.cn/b025c925d9da45bfaf608c4f0319e936.png)

**5\. 返回值**

> Array 返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。

### 6\. splice() 从数组中添加或删除元素

**1\. 实例**

数组中添加新元素：

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2,0,"Lemon","Kiwi");
```

fruits 输出结果：

```javascript
Banana,Orange,Lemon,Kiwi,Apple,Mango
```

**2\. 定义和用法**

splice() 方法用于插入、删除或替换数组的元素

注意：这种方法**会改变原始数组**！

**3\. 语法**

```javascript
array.splice(index,howmany,item1,.....,itemX)
```

**4\. 参数值**

![在这里插入图片描述](https://img-blog.csdnimg.cn/19a714b9dfc2488e94a1c6bb252f4f89.png)

**5\. 返回值**

> Array 如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

### 7\. shift() 删除数组的第一个元素

**1\. 实例**

从数组中移除元素:

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.shift()
```

fruits结果输出:

```javascript
Orange,Apple,Mango
```

**2\. 定义和用法**

shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值

注意： 此方法改变数组的长度

提示: 移除数组末尾的元素可以使用 pop() 方法

**3\. 语法**

```javascript
array.shift()
```

**4\. 返回值**

> 任何类型（\*） 数组原来的第一个元素的值（移除的元素）

> \*：数组元素可以是一个字符串，数字，数组，布尔，或者其他对象类型

### 8\. unshift() 向数组的开头添加一个或更多元素，并返回新的长度

**1\. 实例**

将新项添加到数组起始位置:

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.unshift("Lemon","Pineapple");
```

fruits 将输出：

```javascript
Lemon,Pineapple,Banana,Orange,Apple,Mango
```

**2\. 定义和用法**

unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。

注意： 该方法将改变数组的数目。

提示: 将新项添加到数组末尾，请使用 push() 方法。

**3\. 语法**

```javascript
array.unshift(item1,item2, ..., itemX)
```

**4\. 参数值**

![在这里插入图片描述](https://img-blog.csdnimg.cn/fbd6a5a13fdd44049d1dbe8a57cbb4a6.png)

### 9\. pop() 删除数组的最后一个元素并返回删除的元素

**1\. 实例**

移除最后一个数组元素

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.pop();
```

fruits 结果输出：

```javascript
Banana,Orange,Apple
```

**2\. 定义和用法**

pop() 方法用于删除数组的最后一个元素并返回删除的元素

注意：此方法改变数组的长度

提示： 移除数组第一个元素，请使用 shift() 方法

**3\. 语法**

```javascript
array.pop()
```

**4\. 返回值**

> 所有类型\* The removed array item

> \*数组元素可以是一个字符串，数字，数组，布尔，或者其他对象类型

### 10\. push() 向数组的末尾添加一个或更多元素，并返回新的长度

**1\. 实例**

数组中添加新元素：

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi")
```

fruits 结果输出：

```javascript
Banana,Orange,Apple,Mango,Kiwi
```

**2\. 定义和用法**

push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度

注意： 新元素将添加在数组的末尾

注意： 此方法改变数组的长度

提示： 在数组起始位置添加元素请使用 unshift() 方法

**3\. 语法**

```javascript
array.push(item1, item2, ..., itemX)
```

**4\. 参数值**

![在这里插入图片描述](https://img-blog.csdnimg.cn/155ec9feeb7144a49f9dce917c694d32.png)

**5\. 返回值**

> Number 数组新长度

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  
