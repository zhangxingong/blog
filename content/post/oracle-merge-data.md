+++
title = "oracle合并数据"
date = 2023-06-21T11:11:00+08:00
tags = ["oracle", "Data"]
categories = ["sql"]
draft = false
weight = 2001
author = "zhangxingong"
+++

Oracle提供了merge into语法，如果数据不存在

就创建，如果数据已经存在就更新数据。用法如下：

{{< highlight sql >}}
MERGE INTO tablea A

USING tableb B ON ( A.id = B.id )

WHEN MATCHED

THEN UPDATE

SET A.name=B.name,A.age=B.age,A.title=B.title

WHEN NOT MATCHED THEN

INSERT (id, age ,title) values ()
{{< /highlight >}}
