+++
title = "Oralce查看根路径"
date = 2023-06-21T13:14:00+08:00
tags = ["sql", "Data"]
categories = ["oracle"]
draft = false
weight = 2005
author = "zhangxingong"
+++

Oracle查看树形数据路径:

{{< highlight sql >}}
select CONNECT_BY_ROOT title, --(根数据),
-- (路径)
sys_connect_by_path(title, '-->' ),level, --(层次)
start with condition
connect by parent_id = prior id
{{< /highlight >}}
