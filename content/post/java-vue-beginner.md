+++
title = "Redis简介与安装"
date = "2023-12-20T14:57:15+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## Redis简介与安装


#### 文章目录

+   [前言](#_4)
+   [发现宝藏](#_9)
+   [一、Redis简介](#Redis_17)
+   +   [1. Redis是什么](#1_Redis_20)
    +   [2. Redis的特点](#2_Redis_27)
    +   [3. 数据库类型](#3__34)
    +   [4. Redis 应用场景](#4_Redis__48)
+   [二、Redis下载与安装](#Redis_54)
+   +   [1. Redis安装包下载地址](#1__Redis_57)
    +   [2. 在 windows系统安装 Redis](#2__windows_Redis_63)
    +   [3. 在Linux系统安装Redis](#3_LinuxRedis_78)
+   [总结](#_161)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 一、Redis简介

### 1. Redis是什么

> 1.  Redis是一个开源的内存中的数据结构存储系统，它可以用作 ：数据库、缓存和消息中间件
> 2.  Redis是用C语言开发的一个开源的高性能键值对(key-value)数据库，官方提供的数据是可以达到100000+的QPS(每秒内查询次数)。它存储的value类型比较丰富，也被称为结构化的NoSql数据库
> 3.  NoSql(Not nly SOL)，不仅仅是SQL，泛指非关系型数据库。NoSql数据库并不是要取代关系型数据库，而是关系型数据库的补充
> 4.  Redis官网: https://redis.io

### 2. Redis的特点

> 1.  基于内存存储，读写性能高
> 2.  适合存储热点数据(热点商品、资讯、新闻)
> 3.  企业应用广泛

### 3. 数据库类型

+   关系型数据库(RDBMS)

> 1.  Mysql
> 2.  Oracle
> 3.  DB2
> 4.  SQLServer

+   非关系型数据库(NoSql)

> 1.  Redis
> 2.  Mongo db
> 3.  MemCached

### 4. Redis 应用场景

> 1.  缓存
> 2.  任务队列
> 3.  消息队列
> 4.  分布式锁

## 二、Redis下载与安装

### 1. Redis安装包下载地址

> 1.  Windows版下载地址: https://github.com/microsoftarchive/redis/releases
> 2.  Linux版下载地址: https://download.redis.io/releases/

### 2. 在 windows系统安装 Redis

**1. 解压安装包**

> Redis的windows版属于绿色软件，直接解压即可使用，解压后目录结构如下

![在这里插入图片描述](https://img-blog.csdnimg.cn/c484e296108d466482fa7365733bb120.png)

**2. 双击 redis-server.exe，启动redis**

![在这里插入图片描述](https://img-blog.csdnimg.cn/161b6cda24df40da8cb16abe8edc8a50.png)

### 3. 在Linux系统安装Redis

**1. 将 Redis 安装包上传到 Linux**

![在这里插入图片描述](https://img-blog.csdnimg.cn/769caa7ae105419f975449ba84af2e4c.png)

**2. 解压安装包，命令:tar -zxvf redis-4.0.0.tar.gz -C /usr/local**

![在这里插入图片描述](https://img-blog.csdnimg.cn/115067c7c84a47d69ad27d7cb60bd82d.png)

**3. 安装Redis的依赖环境gcc，命令: yum install gcc-c++**

![在这里插入图片描述](https://img-blog.csdnimg.cn/58fdffe0c194499dbe3faf5272bd4550.png)

**4. 进入 /usr/local/redis-4.0.0，进行编译，命令: make**

![在这里插入图片描述](https://img-blog.csdnimg.cn/44f1db69169a44c886c1647c59632862.png)

**5. 进入 redis 的 src 目录，进行安装，命令：make install**

![在这里插入图片描述](https://img-blog.csdnimg.cn/110c051efbeb48f0be9471f44fce8c97.png)

**6. 启动 Redis 服务**

![在这里插入图片描述](https://img-blog.csdnimg.cn/a674289fe0e64f7b97f66a2a1c3b3085.png)

**7. 连接Redis服务**

![在这里插入图片描述](https://img-blog.csdnimg.cn/3955c843b5b34ff2a127b059ec4b0789.png)

**8. Redis服务优化**

+   ctrl + c 关闭服务
+   修改 Redis 的配置文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/3d4a3b6a0b1c4912a49ff26520a2a12a.png)

**9. 重启Redis服务**

![在这里插入图片描述](https://img-blog.csdnimg.cn/5d8bc6b0a89549e28c677a37b1188fd2.png)

**10. 开启 redis 密码校验并在 redis.conf 配置文件中修改默认密码**

![在这里插入图片描述](https://img-blog.csdnimg.cn/17bdf71641b943d7a8eabaa4087c0b64.png)

**11. 关闭 redis 进程，再次重启 redis 服务，使用密码登录**

![在这里插入图片描述](https://img-blog.csdnimg.cn/5a7952c71a124782848bafcbdcbad482.png)

**12. 安装好 windows 端的 redis 后，在 windows 远程连接 linux 端的redis 服务**

![在这里插入图片描述](https://img-blog.csdnimg.cn/62338fe497664e29875ad920c1c74494.png)

**13. 修改 redis 的配置文件 redis.conf**

![在这里插入图片描述](https://img-blog.csdnimg.cn/8529255a2b0f47249a06bc505a94b65f.png)

**14. 重启 redis 服务**

![在这里插入图片描述](https://img-blog.csdnimg.cn/cc74841dffd24c539447c39c60809808.png)

**15. 再次尝试windows 远程连接 linux 端的redis 服务**

![在这里插入图片描述](https://img-blog.csdnimg.cn/58fd535c49b449598c1a50e3d5d46720.png)

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


