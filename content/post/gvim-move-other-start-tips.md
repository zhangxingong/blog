+++
title = "gvim无法加载已注册的类型库 | VIM"
date = 2023-09-20T14:44:00+08:00
tags = ["工具", "想法", "妙招"]
categories = ["subject"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## gvim无法正常启动 {#gvim无法正常启动}

由于上班更换了新的电脑，把旧电脑的gvim完整复制过来的时候

启动一直提示如下弹窗

![](/img/14-36-01_3_20230920141759.png)


## 解决办法 {#解决办法}

之前知道到的是跟OLE有关，但不知道是什么原因

后来发现了一篇论坛，知道了方向。之前以为的注册表问题，方向错误

[主题:OLE版gvim怎么禁掉启动时的注册提示](https://m.mysmth.net/article/VIM/75940?au=anhnmncb)

<!--list-separator-->

-  知道vim启动文件，用管理员身份登录

执行一次注册，这个问题就消失了

还发现了有两个启动文件，一个就是不带OLE的

    ![](/img/14-43-18_3_screenshot.png)
    .
