+++
title = "org转md尖括号问题"
date = 2023-10-27T13:29:00+08:00
tags = ["工具", "批处理"]
categories = ["emacs"]
draft = false
weight = 2003
author = "zhangxingong"
+++

## 问题描述 {#问题描述}

在写博客时从org mode转markdow如果org里写了html，输出时会把尖括号转义&amp;lt;


## 解决办法 {#解决办法}

加入内联标记：

{{< highlight emacs-lisp >}}
@@html:<b>@@bold text@@html:</b>@@
{{< /highlight >}}


## 参考资料 {#参考资料}

[ox-huo org转md如何禁止&lt;尖括号转义成&amp;lt;](https://emacs-china.org/t/ox-huo-org-md-lt/25832)

[orgmode手册](https://orgmode.org/manual/Quoting-HTML-tags.html)
