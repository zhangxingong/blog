+++
title = "Java 超高频常见字符操作【建议收藏】"
date = "2023-12-20T14:13:51+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [发现宝藏](#_2)
+   [前言](#_5)
+   +   [1\. 字符串拼接](#1__10)
    +   [2\. 字符串查找](#2__82)
    +   [3\. 字符串截取](#3__158)
    +   [4\. 字符串替換](#4__216)
    +   [5\. 字符串分割](#5__291)
    +   [6\. 字符串比较](#6__394)
    +   [7\. 字符串格式化](#7__472)
    +   [8\. 字符串空格处理](#8__525)
+   [总结](#_626)

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

### 1\. 字符串拼接

**1\. 使用 + 操作符：**

```java
String str1 = "Hello";
String str2 = ", ";
String str3 = "World";

String result = str1 + str2 + str3;
```

这种方法是最简单的，通过使用 + 操作符可以将多个字符串连接在一起。Java会自动处理字符串拼接并创建一个新的字符串对象。

**2\. 使用 concat() 方法：**

```java
String str1 = "Hello";
String str2 = ", ";
String str3 = "World";

String result = str1.concat(str2).concat(str3);
```

**concat()** 方法用于将一个字符串连接到另一个字符串的末尾。可以连续调用 **concat()** 方法来连接多个字符串。

**3\. 使用 StringBuilder 类：**

**StringBuilder** 是一个可变的字符串类，适用于需要频繁修改字符串的情况，因为它不会创建多个中间字符串对象，从而提高了性能。

```java
StringBuilder stringBuilder = new StringBuilder();
stringBuilder.append("Hello");
stringBuilder.append(", ");
stringBuilder.append("World");

String result = stringBuilder.toString();
```

在这种情况下，我们首先创建一个 **StringBuilder** 对象，然后使用 **append()** 方法来添加需要拼接的字符串，最后通过 **toString()** 方法将 **StringBuilder** 转换为不可变的 **String**。

**4\. 使用 StringBuffer 类：**

**StringBuffer** 类与 **StringBuilder** 类 类似，但是是线程安全的，适用于多线程环境。

```java
StringBuffer stringBuffer = new StringBuffer();
stringBuffer.append("Hello");
stringBuffer.append(", ");
stringBuffer.append("World");

String result = stringBuffer.toString();
```

与 StringBuilder 一样，我们可以使用 append() 方法来构建最终的字符串，然后通过 toString() 方法获取不可变的 String。

**5\. 使用 String.join() 方法（Java 8+）：**

这种方法更加简洁，特别适用于将多个字符串与指定的分隔符连接起来的情况。

```java
String.join() 
String str1 = "Hello";
String str2 = ", ";
String str3 = "World";

String result = String.join(str2, str1, str3);
```

### 2\. 字符串查找

**1.使用 indexOf() 方法查找子字符串的位置：**

**indexOf()** 方法用于查找一个字符串是否包含另一个子字符串，并返回第一次出现的位置索引。如果未找到，它将返回 -1。

```java
String mainString = "Hello, World!";
String subString = "World";
int position = mainString.indexOf(subString);

if (position != -1) {
   System.out.println("子字符串在主字符串中的位置是：" + position);
} else {
    System.out.println("子字符串未找到！");
}
```

**2.使用 lastIndexOf() 方法查找最后一次出现的位置：**

**lastIndexOf()** 方法与 **indexOf()** 方法类似，但它返回最后一次出现的位置索引。

```java
String mainString = "Java is a powerful programming language. Java is also fun!";
String subString = "Java";
int position = mainString.lastIndexOf(subString);

if (position != -1) {
    System.out.println("最后一次出现的位置是：" + position);
} else {
    System.out.println("子字符串未找到！");
}
```

**3.使用 contains() 方法检查字符串是否包含子字符串：**

**contains()** 方法用于检查一个字符串是否包含另一个子字符串，它返回一个布尔值。

```java
String mainString = "This is a Java example.";
String subString = "Java";
boolean contains = mainString.contains(subString);

if (contains) {
    System.out.println("主字符串包含子字符串！");
} else {
    System.out.println("主字符串不包含子字符串！");
}
```

**4.使用正则表达式进行高级搜索：**

**Java** 也支持使用正则表达式来进行复杂的字符串搜索。你可以使用 **Pattern** 和 **Matcher** 类来实现这一点。这允许你执行更复杂的模式匹配操作。

```java
import java.util.regex.*;

String text = "The quick brown fox jumps over the lazy dog.";
String pattern = "fox";

Pattern compiledPattern = Pattern.compile(pattern);
Matcher matcher = compiledPattern.matcher(text);

while (matcher.find()) {
    System.out.println("找到匹配字符串: " + matcher.group());
}
```

### 3\. 字符串截取

**1.使用 substring() 方法：**

**substring()** 方法用于从一个字符串中截取子串，你可以指定截取的起始位置和结束位置。这个方法有两种形式：一种只传入起始位置，另一种传入起始位置和结束位置。

```java
String mainString = "Hello, World!";

// 截取从索引2到索引5之间的子串（包括索引2，但不包括索引5）
String subString1 = mainString.substring(2, 5);
System.out.println("截取子串1: " + subString1); // 输出 "llo"

// 从索引7开始截取到字符串末尾
String subString2 = mainString.substring(7);
System.out.println("截取子串2: " + subString2); // 输出 "World!"
```

**2.使用 split() 方法分割字符串：**

**split()** 方法允许你根据某个分隔符将字符串拆分为子串，然后选择需要的子串。

```java
String text = "apple,banana,grape";

// 使用逗号作为分隔符拆分字符串
String[] fruits = text.split(",");

for (String fruit : fruits) {
    System.out.println("水果: " + fruit);
}
```

**3.使用正则表达式进行高级截取：**

**Java** 的正则表达式库允许你根据复杂的模式来截取字符串。

```java
import java.util.regex.*;

String text = "The quick brown fox jumps over the lazy dog.";
String pattern = "\\b\\w+\\b"; // 匹配单词

Pattern compiledPattern = Pattern.compile(pattern);
Matcher matcher = compiledPattern.matcher(text);

while (matcher.find()) {
    System.out.println("匹配到的单词: " + matcher.group());
}
```

### 4\. 字符串替換

**1.使用 replace() 方法：**

**replace()** 方法用于将指定的字符或子字符串替换为新的字符或子字符串。

```java
String originalString = "Hello, World!";
String searchString = "World";
String replacementString = "Java";

String modifiedString = originalString.replace(searchString, replacementString);
System.out.println("替换后的字符串: " + modifiedString);
```

输出:

```java
替换后的字符串: Hello, Java!
```

**2.使用 replaceAll() 方法进行正则表达式替换：**

**replaceAll()** 方法允许你使用正则表达式进行更灵活的替换操作。

```java
String originalString = "The quick brown fox jumps over the lazy dog.";
String pattern = "fox";
String replacementString = "cat";

String modifiedString = originalString.replaceAll(pattern, replacementString);
System.out.println("替换后的字符串: " + modifiedString);
```

输出:

```java
  替换后的字符串: The quick brown cat jumps over the lazy dog.
```

**3.使用 StringBuilder 进行替换：**

如果需要进行多次替换或性能要求较高，可以使用 **StringBuilder** 类。

```java
StringBuilder stringBuilder = new StringBuilder("Java is easy. Java is fun.");
String searchString = "Java";
String replacementString = "Python";
int index = stringBuilder.indexOf(searchString);
while (index != -1) {
    stringBuilder.replace(index, index + searchString.length(), replacementString);
    index = stringBuilder.indexOf(searchString);
}

String modifiedString = stringBuilder.toString();
System.out.println("替换后的字符串: " + modifiedString);
```

输出:

```java
  替换后的字符串: Python is easy. Python is fun.
```

### 5\. 字符串分割

**1\. 使用 split() 方法：**

**split()** 方法是Java中最常用的字符串分割方法。它使用指定的正则表达式作为分隔符，将字符串分割成一个字符串数组。

```java
String inputString = "apple,orange,banana,grape";
String[] fruits = inputString.split(",");

System.out.println("分割后的水果：");
for (String fruit : fruits) {
     System.out.println(fruit);
}
```

输出：

```java
分割后的水果：
apple
orange
banana
grape
```

**2\. 使用 StringTokenizer 类：**

**StringTokenizer** 类是Java中另一种进行字符串分割的方式，它使用指定的分隔符将字符串分割成标记。

```java
String inputString = "Java is a powerful programming language";
StringTokenizer tokenizer = new StringTokenizer(inputString);

System.out.println("分割后的单词：");
while (tokenizer.hasMoreTokens()) {
     System.out.println(tokenizer.nextToken());
}
```

输出：

```java
分割后的单词：
Java
is
a
powerful
programming
language
```

**3\. 使用正则表达式：**

你也可以使用正则表达式作为分隔符，以实现更灵活的字符串分割。

```java
String inputString = "Java123is456a789powerful";
String[] parts = inputString.split("\\d+");
System.out.println("分割后的部分：");
for (String part : parts) {
     System.out.println(part);
}
```

输出：

```java
分割后的部分：
Java
is
a
powerful
```

**4\. 使用 Apache Commons Lang 库：**

**Apache Commons Lang** 库提供了 **StringUtils** 类，其中有一个方便的 **split()** 方法，可以更容易地处理字符串分割。

```java
import org.apache.commons.lang3.StringUtils;

String inputString = "Java;C;C++;Python";
String[] languages = StringUtils.split(inputString, ';');

System.out.println("分割后的编程语言：");
for (String language : languages) {
     System.out.println(language);
}
```

输出：

```java
分割后的编程语言：
Java
C
C++
Python
```

### 6\. 字符串比较

**1\. 使用 equals() 方法进行内容比较：**

**equals()** 方法用于比较两个字符串的内容是否相同。它比较字符串的每个字符，而不仅仅是比较引用是否相等。

```java
String str1 = "Hello";
String str2 = "World";
String str3 = "Hello";

boolean isEqual1 = str1.equals(str2); // 返回 false
boolean isEqual2 = str1.equals(str3); // 返回 true

System.out.println("str1 和 str2 是否相等：" + isEqual1);
System.out.println("str1 和 str3 是否相等：" + isEqual2);
```

**2\. 使用 equalsIgnoreCase() 方法进行忽略大小写的内容比较：**

**equalsIgnoreCase()** 方法与 equals() 方法类似，但它会忽略字符串的大小写。

```java
String str1 = "Hello";
String str2 = "hello";

boolean isEqualIgnoreCase = str1.equalsIgnoreCase(str2); // 返回 true

System.out.println("str1 和 str2 是否相等（忽略大小写）：" + isEqualIgnoreCase);
```

**3\. 使用 compareTo() 方法进行字典顺序比较：**

**compareTo()** 方法用于比较两个字符串的字典顺序。它返回一个整数，表示两个字符串之间的比较结果。

```java
String str1 = "apple";
String str2 = "banana";
String str3 = "cherry";

int result1 = str1.compareTo(str2); // 返回负数
int result2 = str2.compareTo(str1); // 返回正数
int result3 = str1.compareTo(str3); // 返回负数

System.out.println("str1 和 str2 的比较结果：" + result1);
System.out.println("str2 和 str1 的比较结果：" + result2);
System.out.println("str1 和 str3 的比较结果：" + result3);
```

**4\. 使用 startsWith() 和 endsWith() 方法检查前缀和后缀：**

**startsWith()** 方法用于检查字符串是否以指定的前缀开头，而 **endsWith()** 方法用于检查字符串是否以指定的后缀结尾。

```java
String str = "Hello, World";

boolean startsWithHello = str.startsWith("Hello"); // 返回 true
boolean endsWithWorld = str.endsWith("World");     // 返回 false

System.out.println("字符串是否以 Hello 开头：" + startsWithHello);
System.out.println("字符串是否以 World 结尾：" + endsWithWorld);
```

**5\. 使用 compareToIgnoreCase() 方法进行忽略大小写的字典顺序比较：**

**compareToIgnoreCase()** 方法与 **compareTo()** 方法类似，但它会忽略字符串的大小写。

```java
String str1 = "apple";
String str2 = "Banana";

int result = str1.compareToIgnoreCase(str2); // 返回正数

System.out.println("str1 和 str2 的比较结果（忽略大小写）：" + result);
```

### 7\. 字符串格式化

**1\. 使用 String.format()**

**String.format()** 方法允许您创建格式化的字符串，类似于C语言中的 **printf()** 函数。它使用占位符来指定要插入的数据以及它们的格式。占位符由百分号 **（%）** 后跟一个字符组成，该字符表示插入数据的类型。以下是一些常见的占位符及其用法：

+   **%s** ：字符串。
+   **%d** ：整数。
+   **%f** ：浮点数。
+   **%n** ：换行符。

**示例：**

```java
String name = "Alice";
int age = 30;
double salary = 50000.50;

String formattedString = String.format("Name: %s, Age: %d, Salary: %.2f", name, age, salary);
System.out.println(formattedString);
```

**输出：**

```java
Name: Alice, Age: 30, Salary: 50000.50
```

在上面的示例中，我们使用了 **%s** 、 **%d** 和 **%.2f** 占位符来插入字符串、整数和浮点数，并指定了浮点数保留两位小数。

**2\. 使用 printf()**

**printf()** 方法是 **System.out** 对象的一个方法，它用于将格式化的字符串输出到控制台。与 **String.format()** 类似，它使用相同的占位符来格式化输出。

**示例：**

```java
String name = "Bob";
int age = 25;
double height = 1.75;

System.out.printf("Name: %s, Age: %d, Height: %.2f%n", name, age, height);
```

**输出：**

```java
Name: Bob, Age: 25, Height: 1.75
```

### 8\. 字符串空格处理

**1\. 删除空格：**

+   .使用 **String** 类的 **trim()** 方法删除字符串前后的空格。
+   **trim()** 返回一个新的字符串，其中删除了前导和尾随的空格。

```java
String text = "  This is a text with spaces  ";
String trimmedText = text.trim();
System.out.println(trimmedText); // 输出: "This is a text with spaces"
```

**2\. 替换空格：**

+   使用 **String** 类的 **replace()** 方法替换字符串中的空格。
+   你可以将空格替换为其他字符或字符串。

```java
String text = "Hello, World!";
String replacedText = text.replace(" ", "_");
System.out.println(replacedText); // 输出: "Hello,_World!"
```

**3\. 分割字符串：**

+   使用 **split()** 方法将字符串拆分成字符串数组。
+   默认情况下，**split()** 使用空格作为分隔符，但你可以指定自定义分隔符。

```java
String sentence = "This is a sample sentence";
String[] words = sentence.split(" "); // 使用空格分割成单词数组
```

**4\. 检查空格**：

+   使用 **contains()** 方法检查字符串是否包含空格。

```java
String text = "This has spaces";
boolean hasSpaces = text.contains(" "); // 返回 true
```

**5\. 统计空格的数量：**

+   使用循环遍历字符串并计算空格的数量。

```java
String text = "Count the spaces in this text";
int spaceCount = 0;
for (char c : text.toCharArray()) {
    if (c == ' ') {
        spaceCount++;
    }
}
System.out.println("空格数量：" + spaceCount); // 输出: "空格数量：5"
```

**6\. 替换多个连续空格：**

+   使用正则表达式来替换连续的多个空格为单个空格。

```java
String text = "Replace  multiple   spaces  with one.";
String replacedText = text.replaceAll("\\s+", " ");
System.out.println(replacedText); // 输出: "Replace multiple spaces with one."
```

**7\. 处理制表符和换行符：**

+   空白字符不仅包括空格，还包括制表符 **（\\t）** 和换行符 **（\\n）** 等。
+   你可以使用 **replaceAll()** 来处理它们，就像处理空格一样。

```java
String textWithTabs = "This\tis\ta\ttab\tseparated\ttext";
String textWithNewlines = "This\nis\na\nnewline\nseparated\ntext";
```

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


