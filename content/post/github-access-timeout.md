+++
title = "github访问超时"
date = 2023-10-20T14:53:00+08:00
tags = ["笔记", "工具", "脚本", "省心", "github", "规则", "学习", "自动化"]
categories = ["shell"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 问题描述 {#问题描述}

国内如果没有翻墙，github访问超时是很常见的事情


## 解决办法 {#解决办法}

绕过dns解析


### 步骤 {#步骤}

1.  查询访问github最快的服务器ip

使用工具： [站长之家ping检测](https://ping.chinaz.com/gist.github.com)

![](/img/14-45-56_5_screenshot.png)

<!--listend-->

1.  修改hotst

前提有修改权限

![](/img/14-46-54_5_screenshot.png)

2.  刷新DNS生效
{{< highlight shell >}}
$ipconfig /flushdns
{{< /highlight >}}


### 检测效果 {#检测效果}

![](/img/14-50-32_5_screenshot.png)
