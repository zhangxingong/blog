+++
title = "判断有效的手机号 | JAVA"
date = 2023-09-27T16:58:00+08:00
tags = ["笔记", "工具", "学习"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

在从前端获取手机号后，首先需要校验手机号是否有效

如下：

{{< highlight java >}}
public static boolean isChinaMobile(String mobile) {
if (mobile == null)
return false;
String PATTERN = "^((13[0-9])|(14[0,1,4-9])|(15[0-3,5-9])|(16[2,5,6,7])|(17[0-8])|(18[0-9])|(19[0-3,5-9]))\\\\d{8}$";
// Set the email pattern string
Pattern p = Pattern.compile(PATTERN);

    // Match the given string with the pattern
    Matcher m = p.matcher(mobile);

    // check whether match is found
    return m.matches();

{{< /highlight >}}
