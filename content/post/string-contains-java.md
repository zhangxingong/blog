+++
title = "字符串包含 | Java基础"
date = 2023-07-17T17:14:00+08:00
tags = ["笔记", "编程", "学习"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 字符串之间用分号分割，如果比较时未引入分隔符会引起bug {#字符串之间用分号分割-如果比较时未引入分隔符会引起bug}

场景如下：

{{< highlight java >}}
boolean pcLoginByCode = false; //是否包含
String vcodeLoginDomain = xx; //读取数据库里的一个配置，如 aa;bb;cc;
if (StringUtils.isValid(vcodeLoginDomain)
&& StringUtils.isValid(domain.getName())
&& vcodeLoginDomain.contains(domain.getName())) {//比较时没有加入分隔符 如 aa;bb;cc 包含a 引入bug
pcLoginByCode = true;
}
{{< /highlight >}}


## 解决方法，改变算法，先切分再比较 {#解决方法-改变算法-先切分再比较}

代码如下：

{{< highlight java >}}
boolean pcLoginByCode = false; //是否包含
String vcodeLoginDomain = xx; //数据库里的设置 aa;bb;cc
List domainList = Arrays.asList(StringUtils.split(vcodeLoginDomain, ";")); //切分设置，分装成列表 ["aa", "bb", "cc"]
if (!CollectionUtils.isEmpty(domainList) //判断设置不为空
&& StringUtils.isValid(domain.getName()) //判断比较的值不为空
&& domainList.contains(domain.getName())) {//使用列表包含，更清晰
pcLoginByCode = true;
}
{{< /highlight >}}
