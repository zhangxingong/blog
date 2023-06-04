+++
title = "使用hugo本地建站"
draft = true
author = "zhangxingong"
+++

## 使用命令创建站点 {#使用命令创建站点}

{{< highlight bash >}}
hugo new site hugoblog
{{< /highlight >}}

会显示以下结构
![](https://www.sulvblog.cn/posts/blog/build_hugo/1.png)


## 下载主题 {#下载主题}

{{< highlight bash >}}
git submodule add git@github.com:flysnow-org/maupassant-hugo.git themes/maupassant
{{< /highlight >}}


## 启动本地博客服务 {#启动本地博客服务}

{{< highlight bash >}}
hugo server -D -t maupassant
{{< /highlight >}}

-D代表草稿可以发布 -t 代表主题名称
执行完后显示如下
<https://img.vinua.cn/image/Otu9E>
打印构建过程，然后显示本地访问地址<http://localhost:1313/>
