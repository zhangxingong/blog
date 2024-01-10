+++
title = "Oracle数据库中的排名排序函数：ROW_NUMBER、RANK、DENSE_RANK和NTILE的深入理解 【建议收藏】"
date = "2024-01-10T11:12:15+0800"
tags = ["笔记","学习","编程"]
categories = ["oracle"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## Oracle数据库中的排名排序函数：ROW_NUMBER、RANK、DENSE_RANK和NTILE的深入理解 【建议收藏】

`1.ROW_NUMBER()`

`定义`：ROW_NUMBER()函数作用就是将select查询到的数据进行排序，每一条数据加一个序号，他不能用做于学生成绩的排名，一般多用于分页查询，   
比如查询前10个 查询10-100个学生。

`实例`：

1.1对学生成绩排序

![这里写图片描述](/img/20150718145636879.png)   
这里number就是每个学生的序号 根据studentScore(分数)进行desc倒序

1.2获取第二个同学的成绩信息

![这里写图片描述](/img/20150718150152805.png)   
这里用到的思想就是 分页查询的思想 在原sql外再套一层select   
where t.number>=1 and t.number<=10 是不是就是获取前十个学生的成绩信息纳。

`2.RANK()`

`定义`：RANK()函数，顾名思义排名函数，可以对某一个字段进行排名，这里为什么和ROW_NUMBER()不一样那，ROW_NUMBER()是排序，当存在相同成绩的学生时，ROW_NUMBER()会依次进行排序，他们序号不相同，而Rank()则不一样出现相同的，他们的排名是一样的。下面看例子:

2.1对学生成绩进行排名

![这里写图片描述](/img/20150718151705353.png)

这里发现 ROW\_NUMBER()和RANK()怎么一样？因为学生成绩都不一样所以排名和排序一样，下面改一下就会发现区别。

![这里写图片描述](/img/20150718151959229.png)

当出现两个学生成绩相同是里面出现变化。RANK()是 1 2 2，而ROW_NUMBER()则还是1 2 3，这就是RANK()和ROW_NUMBER()的区别了

`3.DENSE_RANK()`

`定义`：DENSE_RANK()函数也是排名函数，和RANK()功能相似，也是对字段进行排名，那它和RANK()到底有什么不同那？看例子：

`实例`：

![这里写图片描述](/img/20150718153446182.png)

DENSE_RANK()密集的排名他和RANK()区别在于，排名的连续性，DENSE_RANK()排名是连续的，RANK()是跳跃的排名，所以一般情况下用的排名函数就是RANK()。

`4.NTILE()`

`定义`：NTILE()函数是将有序分区中的行分发到指定数目的组中，各个组有编号，编号从1开始，就像我们说的’分区’一样 ，分为几个区，一个区会有多少个。

`实例`：   
![这里写图片描述](/img/20150718154611387.png)

这里查询了3次,第一次分为1个’区’ ,所以查询结果number全是1，第二次分为2个区，查询结果为 1 1 2，意思就是 第一个 ‘区’ 为 1 1 两个编号的数据 ，第二个’区’只有2这个数据。

## 总结

以下是对Oracle数据库中排名排序函数的简介：

1. `ROW_NUMBER()`


	* 功能：为结果集的每一行分配一个唯一的数字。这些数字是根据指定的排序顺序连续分配的。
	* 特点：它为结果集中的每一行提供一个唯一的序号，不考虑是否有重复值。
	* 语法：`ROW_NUMBER() OVER ( [PARTITION BY partition_expression, ... ] ORDER BY sort_expression [ASC | DESC], ... )`
2. `RANK()`


	* 功能：为结果集的每一行分配一个排名值。如果存在并列排名，则它们将获得相同的排名值，并且下一个排名值将跳过相应的数量。
	* 特点：如果两行或多行具有相同的排序值，它们将获得相同的排名，下一个值将跳过相应的数量。
	* 语法：`RANK() OVER ( [PARTITION BY partition_expression, ... ] ORDER BY sort_expression [ASC | DESC], ... )`
3. `DENSE_RANK()`


	* 功能：与RANK()函数类似，但不会有跳过的排名值。如果有并列排名，下一个排名将连续编号。
	* 特点：即使存在并列排名，也不会跳过任何数字。
	* 语法：`DENSE_RANK() OVER ( [PARTITION BY partition_expression, ... ] ORDER BY sort_expression [ASC | DESC], ... )`
4. `NTILE(n)`


	* 功能：将结果集的每一行分配到一个桶中，其中n是桶的数量。如果结果集中的行数不能被n整除，则较小的桶将包含较少的行。
	* 特点：常用于将数据分成近似相等的部分，例如“前25%”、“中间50%”和“最后25%”。
	* 语法：`NTILE(n) OVER ( [PARTITION BY partition_expression, ... ] ORDER BY sort_expression [ASC | DESC], ... )`

以上就是Oracle数据库中常用的排名排序函数。这些函数通常用于为查询结果提供有意义的排序和排名，特别是在处理大量数据时。
