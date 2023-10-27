+++
title = "使用hugo写博客时如何在md里加入html代码"
date = 2023-10-27T11:30:00+08:00
tags = ["org", "go"]
categories = ["建站"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 问题描述 {#问题描述}

今天在更新博客页面关于我时，在编辑markdown时，临时加入了html代码发现无法渲染到页面。
就查找具体原因和解决办法。


## 解决办法 {#解决办法}

由于hugo的markdown渲染器设置的是goldmark，会自动过滤html。所以解决办法有两种：

1.  更换渲染引擎
2.  更改渲染设置


### 更改渲染引擎 {#更改渲染引擎}

第一个选项，设置blackfriday为默认的Markdown引擎。打开 config.toml并添加以下设置：

{{< highlight latex >}}
[markup]
defaultMarkdownHandler = "blackfriday"
{{< /highlight >}}


### 更改渲染设置 {#更改渲染设置}

第二个选择，使用goldmark和设置unsafe的选项 markup.goldmark.renderer来true：

{{< highlight latex >}}
[markup]
defaultMarkdownHandler = "goldmark"
[markup.goldmark]
[markup.goldmark.renderer]
unsafe = true
{{< /highlight >}}


## 参考资料 {#参考资料}

[hugo支持内联html](http://www.9ong.com/052020/hugo%E6%94%AF%E6%8C%81%E5%86%85%E8%81%94html.html)

[在 Hugo 的 Markdown 里直接使用 HTML](https://lvv.me/posts/2019/12/06_raw_html_with_hugo/)
