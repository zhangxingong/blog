+++
title = "字符串包含特殊符号 | JAVA"
date = "2023-12-15T10:07:41+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 引子

> 今天改一个问题时，发现如果一个标题或者字段里存了英文的引号就会注入程序引起安全问题。程序里的引号会被程序当作代码执行，相当于代码注入，对程序来说是种不安全的代码。如何解决这个问题，就是在入库时校验输入中是否包含英文的引号。

## 问题描述

现象如下：

![](/img/10-14-43_5_screenshot.png)

## 解决方案

在入库时增强校验，判断如下

```java
    //判断是否包含特殊字符
	public static boolean hasSpecialChar(String input, String regex)
			throws PatternSyntaxException  {
		Pattern pattern = Pattern.compile(regex);
		Matcher m = pattern.matcher(input);
		return m.find();
	}


```

使用示例如下：

```java
if(StringUtils.hasSpecialChar(tempName,"[\'\"\\`]")){
    ActionMessages errors = new ActionMessages();
    errors.add("wrongcourse", new ActionMessage(
    "coboHDMS.template.name.dangerous_code"));
    saveErrors(request,errors);
    return errors(mapping,form,request,response);
}
```

去除中英文标题符号

```java

 String title = " ` 这是一个标点符号, 我是结尾。 ";
 String text = title.replaceAll("\\p{P}", "");
        
```
