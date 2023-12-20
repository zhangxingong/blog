+++
title = "Redis数据类型与常用命令"
date = "2023-12-20T14:35:25+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## Redis数据类型与常用命令

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[东离与糖宝](https://dongliyutangbao.blog.csdn.net/ "东离与糖宝") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newUpTime2.png) 已于 2023-12-08 10:20:01 修改

于 2023-07-18 16:13:57 首次发布

版权声明：本文为博主原创文章，遵循 [CC 4.0 BY-SA](http://creativecommons.org/licenses/by-sa/4.0/) 版权协议，转载请附上原文出处链接和本声明。

#### 文章目录

+   [前言](#_4)
+   [发现宝藏](#_10)
+   [一、Redis数据类型](#Redis_15)
+   +   [1. Redis数据类型简介](#1_Redis_17)
    +   [2. Redis数据类型特点](#2_Redis_28)
+   [二、Redis常用命令](#Redis_33)
+   +   [1. 字符串string 操作命令](#1_string__35)
    +   [2. 哈希hash 操作命令](#2_hash__61)
    +   [3. 列表list 操作命令](#3_list__84)
    +   [4. 集合set操作命令](#4_set_104)
    +   [5. 有序集合 sorted set 操作命令](#5__sorted_set__127)
    +   [6. 通用命令](#6__143)
+   [总结](#_160)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 一、Redis数据类型

### 1. Redis数据类型简介

+   Redis存储的是key-value结构的数据，其中key是字符串类型，value有5种常用的数据类型

> 1.  字符串 string
> 2.  哈希 hash
> 3.  列表 list
> 4.  集合 set
> 5.  有序集合 sorted set

### 2. Redis数据类型特点

![在这里插入图片描述](https://img-blog.csdnimg.cn/ffb715858030425aa89c465af16a4d9a.png)

## 二、Redis常用命令

### 1. 字符串string 操作命令

**1. Redis 中字符串类型常用命令如下**

| 命令 | 作用 |
| --- | --- |
| **SET** key value | 设置指定 key 的值 |
| **GET** key | 获取指定 key 的值 |
| **SETEX** key seconds value | 设置指定 key 的值，并将 key 的过期时间设为 seconds 秒（典型应用 ：验证码） |
| **SETNX** key value | 只有在 key 不存在时设置 key 的值（典型应用 ：分布式锁） |

**2. 示例**

+   启动 windows 客户端 redis 服务  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/b0a281bafcac4bb29f1446dbbad47494.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/70495605077e4a919d4393a31f82c3a8.png)

`更多命令可以参考Redis中文网: https://www.redis.net.cn`

### 2. 哈希hash 操作命令

**1. Redis hash 是一个string类型的 field和 value 的映射表，hash特别适合用于存储对象，常用命令如下**

| 命令行 | 作用 |
| --- | --- |
| **HSET** key field value | 将哈希表 key 中的字段 field 的值设为 value |
| **HGET** key field | 获取存储在哈希表中指定字段的值 |
| **HDEL** key field | 删除存储在哈希表中的指定字段 |
| **HKEYS** key | 获取哈希表中所有字段 |
| **HVALS** key | 获取哈希表中所有值 |
| **HGETALL** key | 获取在哈希表中指定 key 的所有字段和值 |

![在这里插入图片描述](https://img-blog.csdnimg.cn/7b3239e95a3440ec963b1b12e971d1d2.png)

**2. 示例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/d8decbb76b92463fb68a0ddf8a081b1b.png)

### 3. 列表list 操作命令

1.  Redis 列表是简单的字符串列表，按照插入顺序排序，常用命令如下

| 命令行 | 作用 |
| --- | --- |
| **LPUSH** key value1 \[value2\] | 将一个或多个值插入到列表头部 |
| **LRANGE** key start stop | 获取列表指定范围内的元素 |
| **RPOP** key | 移除并获取列表最后一个元素 |
| **LLEN** key | 获取列表长度 |
| **BRPoP** key1 \[key2\] timeout | 移出并获取列表的最后一个元素，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止 |

![在这里插入图片描述](https://img-blog.csdnimg.cn/d4b8b1fad9c649c1ab1bea8551246cf8.png)

**2. 示例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/0c5084e3b2544077bddd97647368b055.png)

### 4. 集合set操作命令

**1. Redis set 是string类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据，常用命令如下**

| 命令行 | 作用 |
| --- | --- |
| **SADD** key member1\[member2\] | 向集合添加一个或多个成员 |
| **SMEMBERS** | key 返回集合中的所有成员 |
| **SCARD** key | 获取集合的成员数 |
| **SINTER** key1 \[key2\] | 返回给定所有集合的交集 |
| **SUNIoN** key1 \[key2\] | 返回所有给定集合的并集 |
| **SDIFF** key1 \[key2\] | 返回给定所有集合的差集 |
| **SREM** key member1 \[member2\] | 移除集合中一个或多个成员 |

![在这里插入图片描述](https://img-blog.csdnimg.cn/b709710719104f1e81995417b06e0dd2.png)

**2. 示例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/cde28bb841184026979ce905d49fe28d.png)

### 5. 有序集合 sorted set 操作命令

1.  Redis sorted set 有序集合是 string 类型元素的集合，且不允许重复的成员。每个元素都会关联一个double类型的分数(score)。redis 正是通过分数来为集合中的成员进行从小到大排序。有序集合的成员是唯一的，但分数却可以重复。常用命令如下

| 命令行 | 作用 |
| --- | --- |
| **ZADD** key score1 member1 \[score2 member2\] | 向有序集合添加一个或多个成员，或者更新已存在成员的分数 |
| **ZRANGE** key start stop \[WITHSCORES\] | 通过索引区间返回有序集合中指定区间内的成员 |
| **ZINCRBY** key increment member | 有序集合中对指定成员的分数加上增量 increment |
| **ZREM** key member\[member …\] | 移除有序集合中的一个或多个成员 |

**2. 举例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/6fb2689c994d47e98863835f5e754aa6.png)

### 6. 通用命令

**1. 常用通用命令行如下**

| 命令行 | 作用 |
| --- | --- |
| **KEYS** pattern | 查找所有符合给定模式(pattern)的 key |
| **EXISTS** key | 检查给定 key 是否存在 |
| **TYPE** key | 返回 key 所储存的值的类型 |
| **TTL** key | 返回给定 key 的剩余生存时间(TTL,time to live)，以秒为单位 |
| **DEL** key | 该命令用于在 key 存在是删除 key |

**2. 举例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/2c46930f781e44539a63cf7df4c8579e.png)

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


