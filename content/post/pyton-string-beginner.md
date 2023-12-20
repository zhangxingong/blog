+++
title = "Python 超高频常见字符操作【建议收藏】"
date = "2023-12-20T14:16:10+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#_5)
+   [发现宝藏](#_10)
+   +   [1\. 字符串截取](#1__14)
    +   [2\. 字符串拼接](#2__47)
    +   [3\. 字符串搜索](#3__118)
    +   [4\. 字符串格式化](#4__150)
    +   [5\. 字符串替换](#5__294)
    +   [6\. 字符串去除空格](#6__332)
    +   [7\. 字符串截取](#7__385)
    +   [8\. 字符串反转](#8__436)
+   [总结](#_472)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

### 1\. 字符串截取

> 在 Python 中，可以使用**切片**（slicing）来截取字符串。切片的**语法是 string\[start:end\]**，其中 **start 是截取的起始位置（包含）**，而 **end 是截取的结束位置（不包含）**。以下是一些示例：

```python
string = "Hello, World!"

# 截取字符串的前五个字符
substring = string[0:5]
print(substring)  # 输出: Hello

# 截取字符串的第六个字符到倒数第二个字符
substring = string[5:-1]
print(substring)  # 输出: , World

# 截取字符串的最后五个字符
substring = string[-5:]
print(substring)  # 输出: World!

# 截取字符串的所有字符，步长为2
substring = string[::2]
print(substring)  # 输出: Hlo Wrd

# 倒序截取字符串的所有字符
substring = string[::-1]
print(substring)  # 输出: !dlroW ,olleH
```

+   请注意，切片操作并不会修改原始字符串，而是返回一个新的截取后的字符串。如果不指定起始位置或结束位置，切片操作将**默认使用字符串的开头和结尾作为起始位置和结束位置**。
+   此外，**还可以使用函数来截取字符串**，**例如 string.split() 可以将字符串拆分为多个子字符串，并返回一个列表**。**还可以使用正则表达式来匹配和提取所需部分的字符串**。这里提供的是一种常见的基本方式，而根据具体的需求，可能还有其他更适用的方法。

### 2\. 字符串拼接

> 在 Python 中，可以使用多种方式进行字符串的连接。下面是一些常用的方法：

+   使用 **\+ 操作符**：可以使用 + 操作符将两个字符串连接在一起。

```python
str1 = 'Hello'
str2 = 'World'
result = str1 + ', ' + str2
print(result)  # 输出: Hello, World
```

+   使用 **+= 操作符**：可以使用 += 操作符将一个字符串连接到另一个字符串上，相当于在原始字符串的末尾追加另一个字符串。

```python
str1 = 'Hello'
str1 += ', World'
print(str1)  # 输出: Hello, World
```

+   使用 **str.join() 方法**：是一个字符串方法，用于将多个字符串连接起来，通过指定一个可迭代对象作为参数。语法格式如下：

```python
str.join(iterable)
```

`str 是要用作分隔符的字符串，iterable 是一个可迭代对象，可以是列表、元组、字符串等。`

```python
str_list = ['Hello', 'World']
result = ', '.join(str_list)
print(result)  # 输出: Hello, World
```

+   使用 **str.format() 方法**：可以使用 str.format() 方法将一个或多个字符串插入到另一个字符串的特定位置。语法格式如下：

```python
str.format(*args, **kwargs)
```

`其中，str 是要进行格式化的字符串，args 是位置参数（可选），kwargs 是关键字参数（可选）`

```python
str1 = 'Hello'
str2 = 'World'
result = '{}, {}'.format(str1, str2)
print(result)  # 输出: Hello, World
```

+   使用 **f-strings**（格式化字符串字面值）：f-strings（格式化字符串字面值）是 Python 3.6 引入的一种字符串格式化方法，它提供了一种简洁、直观和易于阅读的方式来将变量、表达式等嵌入到字符串中。f-strings 的语法格式如下：

```python
f"string {expression}"
```

`在这里，string 是普通字符串，而 {expression} 是一个表达式，它会被计算并插入到字符串中。`

```python
str1 = 'Hello'
str2 = 'World'
result = f'{str1}, {str2}'
print(result)  # 输出: Hello, World
```

+   这些方法中，使用 f-strings 通常是最简洁和推荐的方法。但根据具体的需求和 Python 的版本，选择合适的方法进行字符串连接即可。

### 3\. 字符串搜索

要判断一个字符串是否包含另一个字符串，你可以使用 Python 中的 in 关键字或者字符串的 find() 方法。下面是两种判断字符串包含的方法示例：

+   方法一：使用 in 关键字进行判断

```python
string = "Hello, World!"

# 使用 `in` 关键字判断是否包含某字符串
if "World" in string:
    print("包含")
else:
    print("不包含")
```

在上述示例中，我们使用 in 关键字判断字符串 “World” 是否存在于变量 string 中。如果存在，则输出 “包含”；否则，输出 “不包含”。

+   方法二：使用 find() 方法进行判断

```python
string = "Hello, World!"

# 使用 `find()` 方法判断是否包含某字符串
if string.find("World") != -1:
    print("包含")
else:
    print("不包含")
```

在上述示例中，我们使用字符串的 find() 方法查找子字符串 “World” 在变量 string 中的位置。如果返回的索引不为 -1，则说明存在子字符串，输出 “包含”；否则，输出 “不包含”。  
两种方法的选择取决于你具体的需求，in 关键字更简洁直观，而 find() 方法可以获取匹配的位置信息。

### 4\. 字符串格式化

字符串格式化是一种将变量或数据插入到字符串中的方法，以创建具有特定格式的文本。在Python中，字符串格式化可以通过多种方式实现。

**1\. 百分号（%）操作符**  
一种常用的字符串格式化方式是使用**百分号（%）操作符**。这种方法使用占位符来表示要插入的变量，并在%操作符后面提供相应的值。例如：

```sql
name = "Alice"
age = 25
message = "My name is %s and I am %d years old." % (name, age)
print(message)
```

输出结果将是：

```sql
My name is Alice and I am 25 years old.
```

在上面的例子中，%s是字符串占位符，%d是整数占位符。%操作符后的括号中依次提供了要插入的变量（name和age）。

**2\. python字符串格式化符号:**

| 符 号 | 描述 |
| --- | --- |
| %c | 格式化字符及其ASCII码 |
| %s | 格式化字符串 |
| %d | 格式化整数 |
| %u | 格式化无符号整型 |
| %o | 格式化无符号八进制数 |
| %x | 格式化无符号十六进制数 |
| %X | 格式化无符号十六进制数（大写） |
| %f | 格式化浮点数字，可指定小数点后的精度 |
| %e | 用科学计数法格式化浮点数 |
| %E | 作用同%e，用科学计数法格式化浮点数 |
| %g | %f和%e的简写 |
| %G | %f 和 %E 的简写 |
| %p | 用十六进制数格式化变量的地址 |

**3\. 格式化操作符辅助指令:**

| 符号 | 功能 |
| --- | --- |
| \* | 定义宽度或者小数点精度 |
| \- | 用做左对齐 |
| + | 在正数前面显示加号( + ) |
| < sp > | 在正数前面显示空格 |
| # | 在八进制数前面显示零(‘0’)，在十六进制前面显示’0x’或者’0X’(取决于用的是’x’还是’X’) |
| 0 | 显示的数字前面填充’0’而不是默认的空格 |
| % | ‘%%‘输出一个单一的’%’ |
| (var) | 映射变量(字典参数) |
| m.n. | m 是显示的最小总宽度,n 是小数点后的位数(如果可用的话) |

**4\. format方法**

另一种字符串格式化的方式是使用 **format()** 方法。这种方法使用 {} 和 : 来代替以前的 % 。  
format 函数可以接受不限个参数，位置可以不按顺序。并使用format()方法提供要插入的值。例如：

```sql
name = "Bob"
age = 30
message = "My name is {} and I am {} years old.".format(name, age)
print(message)
```

输出结果将是：

```sql
My name is Bob and I am 30 years old.
```

在这个例子中，大括号{}表示占位符，format()方法中依次提供了要插入的变量。

**5\. 数字格式化**

下表展示了 str.format() 格式化数字的多种方法：

```sql
>>> print("{:.2f}".format(3.1415926))
3.14
```

| 数字 | 格式 | 输出 | 描述 |
| --- | --- | --- | --- |
| 3.1415926 | {:.2f} | 3.14 | 保留小数点后两位 |
| 3.1415926 | {:+.2f} | +3.14 | 带符号保留小数点后两位 |
| \-1 | {:-.2f} | \-1.00 | 带符号保留小数点后两位 |
| 2.71828 | {:.0f} | 3 | 不带小数 |
| 5 | {:0>2d} | 05 | 数字补零 (填充左边, 宽度为2) |
| 5 | {:x<4d} | 5xxx | 数字补x (填充右边, 宽度为4) |
| 10 | {:x<4d} | 10xx | 数字补x (填充右边, 宽度为4) |
| 1000000 | {:,} | 1,000,000 | 以逗号分隔的数字格式 |
| 0.25 | {:.2%} | 25.00% | 百分比格式 |
| 1000000000 | {:.2e} | 1.00e+09 | 指数记法 |
| 13 | {:>10d} | 13 | 右对齐 (默认, 宽度为10) |
| 13 | {:<10d} | 13 | 左对齐 (宽度为10) |
| 13 | {:^10d} | 13 | 中间对齐 (宽度为10) |
| 11 | ‘{:b}’.format(11)‘{:d}’.format(11)‘{😮}’.format(11)‘{:x}’.format(11)‘{:#x}’.format(11)‘{:#X}’.format(11) | 1011 11 13 b 0xb 0XB | 进制 |

+   ^, <, > 分别是居中、左对齐、右对齐，后面带宽度， : 号后面带填充的字符，只能是一个字符，不指定则默认是用空格填充。
    
+   \+ 表示在正数前显示 +，负数前显示 -； （空格）表示在正数前加空格
    
+   b、d、o、x 分别是二进制、十进制、八进制、十六进制。
    
+   此外我们可以使用大括号 {} 来转义大括号，如下实例：  
    实例
    

```sql
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
print ("{} 对应的位置是 {{0}}".format("runoob"))
```

输出结果为：

```sql
runoob 对应的位置是 {0}
```

**6\. f-string方法**

还有一种更简洁的字符串格式化方式是使用 **f-string**（格式化字符串字面值）。这种方法使用在字符串前加上字母"f"，并在大括号中直接引用变量。例如：

```sql
name = "Charlie"
age = 35
message = f"My name is {name} and I am {age} years old."
print(message)
```

输出结果将是：

```sql
My name is Charlie and I am 35 years old.
```

f-string直接在大括号{}中引用了变量name和age，无需使用额外的格式化方法。  
以上是Python中常用的字符串格式化方法。根据具体的需求，可以选择使用其中一种或多种方式来实现字符串格式化。

### 5\. 字符串替换

在 Python 中，有几种常见的方法用于字符串替换。下面是其中几种常用的方法：

**1.replace() 方法：**

该方法用于替换字符串中的指定子字符串为新的字符串。

```python
   text = "Hello, World!"
   new_text = text.replace("World", "Python")
   print(new_text)  # 输出：Hello, Python!
```

**2.re.sub() 方法：**

该方法使用正则表达式进行字符串替换。

```python
   import re

   text = "Hello, World!"
   new_text = re.sub(r"World", "Python", text)
   print(new_text)  # 输出：Hello, Python!
```

**3.str.translate() 方法：**

该方法使用转换表进行字符替换。可以使用 str.maketrans() 函数创建转换表。

```python
   table = str.maketrans("W", "P")
   text = "Hello, World!"
   new_text = text.translate(table)
   print(new_text)  # 输出：Hello, Porld!
```

### 6\. 字符串去除空格

在 Python 中，有几种方法可以去除字符串中的空格。以下是几种常见的方法：

**1.strip() 方法：**

该方法用于去除字符串开头和结尾的空格。

```python
   text = "   Hello, World!   "
   stripped_text = text.strip()
   print(stripped_text)  # 输出：Hello, World!
```

**2.lstrip() 和 rstrip() 方法：**

lstrip() 方法用于去除字符串开头的空格，rstrip() 方法用于去除字符串结尾的空格。

```python
   text = "   Hello, World!   "
   left_stripped_text = text.lstrip()
   right_stripped_text = text.rstrip()
   print(left_stripped_text)  # 输出：Hello, World!   
   print(right_stripped_text)  # 输出：   Hello, World!
```

**3.replace() 方法：**

该方法可以用来替换空格字符为空字符串。

```python
   text = "   Hello, World!   "
   replaced_text = text.replace(" ", "")
   print(replaced_text)  # 输出：Hello,World!
```

**4.split() 和 join() 方法组合使用：**

将字符串拆分成单词列表，再使用空字符串连接单词来移除空格。

```python
   text = "   Hello, World!   "
   words = text.split()
   joined_text = "".join(words)
   print(joined_text)  # 输出：Hello,World!
```

`这些方法可以根据你的需求选择合适的方式去除字符串中的空格。请注意，以上方法都返回新的字符串，原始字符串不会被修改。`

### 7\. 字符串截取

在 Python 中，有几种方法可以对字符串进行分割（拆分）操作。以下是几种常见的方法：

**1.split() 方法：**

该方法根据指定的分隔符将字符串拆分成子字符串，并返回一个列表。

```python
   text = "Hello, World!"
   words = text.split(",")  # 使用逗号作为分隔符
   print(words)  # 输出：['Hello', ' World!']
```

**2.rsplit() 方法：**

该方法与 split() 方法类似，但从字符串的末尾开始进行拆分。

```python
   text = "Hello, World!"
   words = text.rsplit(",", 1)  # 从右侧使用逗号作为分隔符拆分一次
   print(words)  # 输出：['Hello', ' World!']
```

**3.splitlines() 方法：**

该方法按照换行符 \\n 分割字符串，并返回一个包含各行内容的列表。

```python
   text = "Hello\nWorld\nPython"
   lines = text.splitlines()
   print(lines)  # 输出：['Hello', 'World', 'Python']
```

**4.正则表达式分割：**

使用 re.split() 函数可以根据正则表达式进行字符串分割。

```python
   import re

   text = "Hello, World! Python"
   words = re.split(r"\W+", text)  # 使用非字母数字字符作为分隔符
   print(words)  # 输出：['Hello', 'World', 'Python']
```

`这些方法可以根据具体需求选择合适的方式来对字符串进行分割操作。请注意，以上方法返回的是包含拆分后子字符串的列表。`

### 8\. 字符串反转

在 Python 中，可以使用几种方法来反转字符串。以下是其中几种常见的方法：

**1.使用切片操作：**

```python
  text = "Hello, World!"
   reversed_text = text[::-1]
   print(reversed_text)  # 输出：!dlroW ,olleH
```

**2.使用 reversed() 函数与 join() 方法：**

```python
   text = "Hello, World!"
   reversed_text = "".join(reversed(text))
   print(reversed_text)  # 输出：!dlroW ,olleH
```

**3.使用循环遍历法：**

```python
   text = "Hello, World!"
   reversed_text = ""
   for char in text:
       reversed_text = char + reversed_text
   print(reversed_text)  # 输出：!dlroW ,olleH
```

这些方法都可以用来反转字符串，你可以根据自己的喜好和需求选择其中一种。需要注意的是，以上方法返回的是一个新的反转后的字符串，原始字符串本身并没有被修改。

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


