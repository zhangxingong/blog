+++
title = "Oralce自定义顺序"
date = 2023-06-21T11:24:00+08:00
tags = ["sql", "Data"]
categories = ["oracle"]
draft = false
weight = 2002
author = "zhangxingong"
+++

Oracle 按照特定值排序：

{{< highlight sql >}}
order by decode(field, num1, num2, num...)
{{< /highlight >}}
