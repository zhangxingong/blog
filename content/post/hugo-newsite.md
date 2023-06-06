+++
title = "使用hugo本地建站"
tags = ["hugo","emacs","github","博客","建站","妙招","致中和","动态","平衡","认知","心态"]
categories = ["建站"]
toc = true
hiddenFromHomePage = false
date = 2023-06-04T19:08:00+08:00
draft = false
author = "zhangxingong"
+++

## 使用命令创建站点 {#使用命令创建站点}

{{< highlight python >}}
hugo new site hugoblog
{{< /highlight >}}

会显示以下结构
![](https://www.sulvblog.cn/posts/blog/build_hugo/1.png)


## 下载主题 {#下载主题}

{{< highlight nil >}}
git submodule add git@github.com:flysnow-org/maupassant-hugo.git themes/maupassant
{{< /highlight >}}


## 启动本地博客服务 {#启动本地博客服务}

{{< highlight python >}}
hugo server -D -t maupassant
{{< /highlight >}}

-D代表草稿可以发布 -t 代表主题名称
执行完后显示如下
<https://img.vinua.cn/image/Otu9E>
打印构建过程，然后显示本地访问地址<http://localhost:1313/>


## 写新博客 {#写新博客}

{{< highlight python >}}
hugo new post/hello-world.md
{{< /highlight >}}

[如何使用hugo new](https://www.5axxw.com/questions/simple/1860nw)
