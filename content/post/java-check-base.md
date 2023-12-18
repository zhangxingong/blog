+++
title = "Java基础知识检测题目"
date = "2023-12-18T11:55:21+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++



# Java基础知识检测题目

## 1. 声明整数变量并赋值

👉 **问题：** 声明一个整数变量并将其赋值为 10。

```java
int num = 10;
```

---

## 2. 创建字符串变量并赋值

👉 **问题：** 创建一个字符串变量并赋值为 "Hello, Java!"。

```java
String str = "Hello, Java!";
```

---

## 3. 判断整数的正负和零

👉 **问题：** 编写一个条件语句，检查一个整数是否为正数、负数还是零。

```java
if (num > 0) {
    System.out.println("正数");
} else if (num == 0) {
    System.out.println("零");
} else {
    System.out.println("负数");
}
```

---

## 4. 使用 for 循环打印数字

👉 **问题：** 使用 `for` 循环打印出 1 到 5 的数字。

```java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
```

---

## 5. 创建整数数组并计算元素和

👉 **问题：** 创建一个整数数组，存储 5 个不同的数字。编写一个循环，计算数组中所有元素的和。

```java
int[] array = {1, 2, 3, 4, 5};

int sum = 0;
for (int i = 0; i < array.length; i++) {
    sum += array[i];
}
```

---

## 6. 创建 Person 类和构造函数

👉 **问题：** 创建一个名为 `Person` 的类，包含 `name` 和 `age` 两个属性。编写一个构造函数来初始化这些属性。

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

---

## 7. 异常处理和方法

👉 **问题：** 编写一个方法，接收两个整数作为参数，尝试将它们相除，如果发生除零异常，则捕获异常并打印错误信息。

```java
public int calculate(int a, int b) {
    try {
        int result = a / b;
        return result;
    } catch (ArithmeticException ex) {
        log.error("除零异常：" + ex.getMessage());
        return 0; // 或者抛出异常，具体情况而定
    }
}
```

---

## 8. 多线程打印奇偶数

👉 **问题：** 创建一个简单的多线程程序，一个线程打印奇数，另一个线程打印偶数。

```java
int num = 1;
Thread threadA = new Thread(new Runnable() {
    public void run() {
        for (int i = 1; i < 1000; i += 2) {
            System.out.println(i);
        }
    }
});

Thread threadB = new Thread(new Runnable() {
    public void run() {
        for (int i = 0; i < 1000; i += 2) {
            System.out.println(i);
        }
    }
});

threadA.start();
threadB.start();
```

---

## 9. 使用集合框架

👉 **问题：** 使用 `ArrayList` 创建一个字符串列表，添加几个元素并打印它们。

```java
List<String> list = new ArrayList<>();
list.add("hello");
list.add("world");
for (String item : list) {
    System.out.println(item);
}
```

👉 **问题：** 使用 `HashMap` 存储一些键值对，并通过迭代打印它们。

```java
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey());
    System.out.println(entry.getValue());
}
```

---

## 10. 文件操作

👉 **问题：** 创建一个文本文件，写入一些文本。

```java
File file = new File("c:\\aa.txt");
try (FileWriter writer = new FileWriter(file)) {
    writer.write("aaaa");


} catch (IOException e) {
    e.printStackTrace();
}
```

👉 **问题：** 使用 Java 读取文件内容并打印到控制台。

```java
try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

---

希望这篇 Markdown 文档符合你的要求！如果有其他需要或问题，请随时告诉我。
