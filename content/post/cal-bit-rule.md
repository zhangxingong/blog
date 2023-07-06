+++
title = "加法器的底层实现"
date = 2023-07-06T16:24:00+08:00
tags = ["术语", "学习", "基础"]
categories = ["subject"]
draft = false
weight = 2001
author = "zhangxingong"
+++

计算机位运算：

| 运算符   | 作用 | 示列                                                   |
|-------|----|------------------------------------------------------|
| &amp;    | 按位与 | 两个操作数同时为1结果为1，只要有一个为0，结果为0       |
| &vert;   | 按位或 | 两个操作数只要有一个为1，结果就为1                     |
| ~        | 按位非 | 操作数为1，结果为0；操作数为0，结果为1                 |
| ^        | 按位异或 | 两个操作数相同，结果为0；不相同结果为1                 |
| &lt;&lt; | 左移 | 右侧空位补0，左侧溢出舍弃                              |
| &gt;&gt; | 右移 | 右端溢出舍弃，对于无符号数，高位补0。对于有符号数，某些机器将对左边空出的部分用符号位填补（即“算术移位”） |
|          |      |                                                        |

[org-mode 表格](http://www.langdebuqing.com/emacs%20notebook/org-mode%20%E8%A1%A8%E6%A0%BC.html)

[位运算实现加、减、乘、除运算](https://www.jianshu.com/p/7bba031b11e7)

[c++位运算符 | &amp; ^ ~ &amp;&amp; ||,补码，反码](https://blog.csdn.net/wuguai4/article/details/7311953)

![](/img/16-20-20_screenshot.png)

![](/img/16-22-34_screenshot.png)
