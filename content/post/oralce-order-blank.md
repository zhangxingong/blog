+++
title = "Oracle空值排序"
date = 2023-06-21T13:13:00+08:00
tags = ["sql", "Data"]
categories = ["oracle"]
draft = false
weight = 2003
author = "zhangxingong"
+++

Oralce 空值排在前，或排在后边：

{{< highlight sql >}}
-- oracle 空值排序,排在最前面或者最后面
-- 1:
order by name nulls first;
-- 2:
order by name nulls last;
{{< /highlight >}}
