+++
title = "org-mode有没有类似于markdown里面的分割线的语法？"
date = 2023-09-27T17:05:00+08:00
tags = ["笔记", "工具", "规则", "妙招", "动态"]
categories = ["subject"]
draft = false
weight = 2003
author = "zhangxingong"
+++

1.  markdown 三个连续的星号、减号、加号

2.  org 六个连续的减号

3.  自定义宏
{{< highlight emacs-lisp >}}
#+macro: pagebreak @@html:<hr />@@
{{{pagebreak}}}
{{< /highlight >}}

[org-mode有没有类似于markdown里面的分割线的语法？](https://emacs-china.org/t/org-mode-markdown/8628)
