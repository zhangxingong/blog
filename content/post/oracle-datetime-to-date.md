+++
title = "Oracle时间截断为日期"
date = 2023-07-20T15:27:00+08:00
tags = ["笔记", "脚本", "编程", "sql", "基础"]
categories = ["oracle"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 需求SQL日期对比，需要把sysdate转为日期（oracle） {#需求sql日期对比-需要把sysdate转为日期-oracle}

需要要到截取函数 \`TRUNC\`

代码如下：

{{< highlight sql >}}
select TRUNC(sysdate) from dual;
{{< /highlight >}}

结果如下：

![](/img/15-18-42_4_screenshot.png)


## Oracle 日期格式 {#oracle-日期格式}

日期格式化

代码如下：

{{< highlight sql >}}
select TRUNC(sysdate) field1, sysdate field2, to_char(sysdate , 'yyyy-mm-dd hh24:mi:ss') from dual; -- Oracle 大小写不敏感
{{< /highlight >}}


结果如下：

![](/img/15-21-37_4_screenshot.png)
