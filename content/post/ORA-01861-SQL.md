+++
title = "SQL Error: ORA-01861 | SQL"
date = 2023-09-06T15:44:00+08:00
tags = ["笔记", "规则", "学习"]
categories = ["oracle"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 问题描述 {#问题描述}

在作列表查询时，后台报一个SQL错误。

打印日志如下：

{{< highlight sql >}}
Caused by: oracle.jdbc.OracleDatabaseException: ORA-01861: literal does not match format string
{{< /highlight >}}

![](/img/15-30-28_3_screenshot.png)


## 错误原因如下 {#错误原因如下}

使用日期字符串与date字符比较，前后类型不一致

{{< highlight sql >}}
-- 错误写法
where creation>= '2023-09-06 10:00:00' and creation <= '2023-09-30 12:00:00'

-- 正确写法
where creation>= to_date('2023-09-06 10:00:00','YYYY-MM-DD HH24:MI:SS')
and creation <= to_date('2023-09-30 10:00:00','YYYY-MM-DD HH24:MI:SS');
{{< /highlight >}}


## 参考地址 {#参考地址}

[ORA-01861 @stack overflow](https://stackoverflow.com/questions/22542882/sql-error-ora-01861-literal-does-not-match-format-string-01861)
