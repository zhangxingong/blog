+++
title = "Oracle恢复数据"
date = 2023-06-21T13:13:00+08:00
tags = ["sql", "Data"]
categories = ["oracle"]
draft = false
weight = 2004
author = "zhangxingong"
+++

Oracle 恢复数据如下：

{{< highlight sql >}}
-- 15分钟之前
select * from tablename as of timestamp sysdate-15/1440
{{< /highlight >}}
