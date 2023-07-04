+++
title = "按照正则表达式删除行"
date = 2023-07-04T13:34:00+08:00
tags = ["省心", "妙招"]
categories = ["emacs"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 需求描述 {#需求描述}

昨天解决org图片格式在导出markdown文件时，生成的

图片格式是figure元素

找了好久方案

发现在\`[\`[imagepath]\`]\`

后加入特殊符合能正常转为 \![]()格式

于是加入了一个英文的点号

后期想办法删除以点号开头的行


## 解决方法 flush-lines {#解决方法-flush-lines}

这个函数能按照正则删除行

匹配一个点号开头的行的正则 ^\\.

点号是特殊元字符，需要用反斜杠转义


## 效果如下： {#效果如下}

![](/img/13-22-21_screenshot.png)
.

![](/img/13-24-14_screenshot.png)
.
