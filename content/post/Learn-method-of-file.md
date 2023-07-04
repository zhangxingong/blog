+++
title = "新学的几个函数"
date = 2023-07-04T17:28:00+08:00
tags = ["省心", "github"]
categories = ["emacs"]
draft = false
weight = 2003
author = "zhangxingong"
+++

## 问题描述： {#问题描述}

为解决图片格式问题，接触了几个新的函数

1.  with-current-buffer buffer-name &amp;boday

在当前buffer打开buff-name，在buffer里处理form

一般是编辑，光标移动，保存等等

2.  save-excursion

body 保存光标所在buffer并执行form

3.  find-file file-path

用文件名打开一个新的buffer

4.  write-file

把buffer内容写入文件

5.  flush-lines regexp

使用正则表达式匹配行并删除


## 示例如下： {#示例如下}

![](/img/17-28-01_screenshot.png)

## 参考博客如下：

[如何用elisp处理一系列文件？](https://www.likecs.com/ask-7503439.html)

[写了个删除空行的函数](https://emacs-china.org/t/topic/1075)
