+++
title = "字符串默认包含空串 | Java基础"
date = 2023-07-13T11:39:00+08:00
tags = ["笔记", "编程", "基础"]
categories = ["subject"]
draft = false
weight = 2001
author = "zhangxingong"
+++

昨天开发过程中遇到一个字符串问题：

如果字符串包含了空串返回了true导致判断出错

解决办法消除边界，两个字符串都有值再判断

以下是测试用例：

![](/img/10-42-31_4_screenshot.png)
