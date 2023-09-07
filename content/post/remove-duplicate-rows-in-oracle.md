+++
title = "删除重复行 | Oracle"
date = 2023-09-07T11:27:00+08:00
tags = ["笔记", "编程", "sql", "规则", "学习"]
categories = ["oracle"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 问题描述 {#问题描述}

最近搜索关键词，去除重复


## 解决方案 {#解决方案}

{{< highlight sql >}}
-- 使用rowid标识解决重复问题
DELETE FROM your_table
WHERE rowid not in
(SELECT MIN(rowid)
FROM your_table
GROUP BY column1, column2, column3);

-- method1
DELETE from table_name where rowid not in (select min(rowid) FROM table_name group by column_name);

-- method2
DELETE from table_name a where rowid > (select min(rowid) FROM table_name b where a.column=b.column);
{{< /highlight >}}


## 参考链接 {#参考链接}

[Removing duplicate rows from table in Oracle](https://stackoverflow.com/questions/529098/removing-duplicate-rows-from-table-in-oracle)
