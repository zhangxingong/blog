+++
title = "Nginx概述、命令、配置文件和具体应用"
date = "2023-12-20T14:32:42+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## Nginx概述、命令、配置文件和具体应用

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[东离与糖宝](https://dongliyutangbao.blog.csdn.net/ "东离与糖宝") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newUpTime2.png) 已于 2023-12-08 10:18:24 修改

于 2023-08-08 12:32:44 首次发布

版权声明：本文为博主原创文章，遵循 [CC 4.0 BY-SA](http://creativecommons.org/licenses/by-sa/4.0/) 版权协议，转载请附上原文出处链接和本声明。

#### 文章目录

+   [前言](#_4)
+   [发现宝藏](#_11)
+   [一、Nginx概述](#Nginx_14)
+   +   [1\. Nginx介绍](#1_Nginx_16)
    +   [2\. Nginx下载和安装](#2_Nginx_20)
    +   [3. Nginx目录结构](#3_Nginx_52)
+   [二、Nginx命令](#Nginx_63)
+   +   [1. 查看版本](#1__65)
    +   [2. 检查配置文件正确性](#2__71)
    +   [3. 启动和停止](#3__78)
    +   [4. 重新加载配置文件](#4__92)
+   [三、Nginx配置文件结构](#Nginx_98)
+   [四、Nginx具体应用](#Nginx_123)
+   +   [1. 部署静态资源](#1__125)
    +   [2. 反向代理](#2__137)
    +   [3. 负载均衡](#3__162)
+   [总结](#_191)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 一、Nginx概述

### 1. Nginx介绍

> 1.  Nginx是一款轻量级的web 服务器/反向代理服务器及电子邮件(IMAP/POP3)代理服务器。其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx的网站有: 百度、京东新浪、网易、腾讯、淘宝等。
> 2.  Nginx是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler,ru站点(俄文: Pam6nep)开发的，第一个公开版本.1.0发布于2004年10月4日。
> 3.  官网: https://nginx.org/

### 2. Nginx下载和安装

> 1.  安装依赖包 yum -y install gcc pcre-devel zlib-devel openssl openssl-devel

![在这里插入图片描述](https://img-blog.csdnimg.cn/35ee4d5f0a51464faf94aee3ad870955.png)

> 2.  下载Nginx安装包wget https://nginx.org/download/nginx-1.16.1.tar.gz

![在这里插入图片描述](https://img-blog.csdnimg.cn/33adfad9dd014c8585924816378bf72b.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8c423d856b6b4f2c9ec01ae8c86094b9.png)

> 3.  解压 tar -zxvf nginx-1.16.1.tar.gz

![在这里插入图片描述](https://img-blog.csdnimg.cn/5ba61e53ac094589ba04e098e207907c.png)

> 4.  cd nginx-1.16.1

![在这里插入图片描述](https://img-blog.csdnimg.cn/0cbe51d1386044c8bd00e96a13664211.png)

> 5.  ./configure --prefix=/usr/local/nginx

![在这里插入图片描述](https://img-blog.csdnimg.cn/b17259397df542beae06e6f7e8a9f865.png)

> 6.  make && make install

![在这里插入图片描述](https://img-blog.csdnimg.cn/be97353c08634003a54fc06fe844748d.png)

### 3. Nginx目录结构

1.  安装完Nginx后，我们先来熟悉一下Nginx的目录结构，重点目录/文件如下：

> 1.  conf/nginx.conf ---- nginx配置文件
> 2.  html ---- 存放静态文件 (html、CSS、Js等)
> 3.  logs ---- 日志目录，存放日志文件
> 4.  sbin/nginx ---- 二进制文件，用于启动、停止Nginx服务

![在这里插入图片描述](https://img-blog.csdnimg.cn/8fa4cf261a2d4a7f8ad66d9a783cea95.png)

## 二、Nginx命令

### 1. 查看版本

1.  查看Nginx版本可以使用命令

> ./nginx -V

![在这里插入图片描述](https://img-blog.csdnimg.cn/1a439814daf14e6ea6155664d257b1a3.png)

### 2. 检查配置文件正确性

> ./nginx -t ---- 在启动Nqinx服务之前，可以先检查一下conf/nginx.conf文件配置的是否有错误，命令如下:

![在这里插入图片描述](https://img-blog.csdnimg.cn/ea9c1ad622fe41b68d8c0733d893921c.png)

### 3. 启动和停止

**1. 启动Nginx服务使用如下命令**

> ./nginx

**2. 停止Nginx服务使用如下命令**

> ./nginx -s stop

**3. 启动完成后可以查看Nginx进程**

> ps -ef | grep nginx

![在这里插入图片描述](https://img-blog.csdnimg.cn/e570b9c3de70401da80ff1148a5e714b.png)

### 4. 重新加载配置文件

> ./nginx -s reload

![在这里插入图片描述](https://img-blog.csdnimg.cn/9e691c072f9e4993a340fef4f9118d02.png)

## 三、Nginx配置文件结构

Nginx配置文件(conf/nginx.conf)整体分为三部分

> 1.  全局块 ---- 和网络连接相关的配置
> 2.  events块 ---- 和网络连接相关的配置
> 3.  http块 ---- 代理、缓存、日志记录、虚拟主机配置  
>     . http全局块  
>     . Server块  
>     \---- Server全局块  
>     \---- location块
> 4.  注意: http块中可以配置多个Server块，每个Server块中可以配置多个location块。

![在这里插入图片描述](https://img-blog.csdnimg.cn/443b94beb9514abcbe52dae96c0fcc8f.png)

## 四、Nginx具体应用

### 1. 部署静态资源

**1. Nginx如何部署静态资源**

> 1.  Nginx可以作为静态web服务器来部署静态资源。静态资源指在服务端真实存在并且能够直接展示的一些文件，比如常见的htm\[页面、css文件、js文件、图片、视频等资源。
> 2.  相对于Tomcat，Nginx处理静态资源的能力更加高效，所以在生产环境下，一般都会将静态资源部署到Nginx中。将静态资源部署到Nginx非常简单，只需要将文件复制到Nginx安装目录下的html目录中即可。

**2. 示例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/a9a61e567c134869827454719a25363d.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/a8d85fc8fe5d417892051a8a4b9f92b1.png)

### 2. 反向代理

**1. 正向代理**

> 1.  是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。
> 2.  正向代理的典型用途是为在防火墙内的局域网客户端提供访问Internet的途径。
> 3.  正向代理一般是在客户端设置代理服务器，通过代理服务器转发请求，最终访问到目标服务器

**2. 反向代理**

> 1.  反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直按访问反向代理服务器就可以获得目标服务器的资源，反向代理服务器负责将请求转发给目标服务器。
> 2.  用户不需要知道目标服务器的地址，也无须在用户端作任何设定。

![在这里插入图片描述](https://img-blog.csdnimg.cn/ea86234e152a4b61be75f961f2d78474.png)

**3. 配置反向代理示例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/d7dc76ea0c4247bea46885de306e6e13.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/911d19384c324f91bae876482f14b426.png)

### 3. 负载均衡

**1. 什么是负载均衡**

> 1.  早期的网站流量和业务功能都比较简单，单台服务器就可以满足基本需求，但是随着互联网的发展，业务流量越来越大并且业务逻辑也越来越复杂，单台服务器的性能及单点故障问题就凸显出来了，因此需要多台服务器组成应用集群进行性能的水平扩展以及避免单点故障出现。
> 2.  应用集群:将同一应用部署到多台机器上，组成应用集群，接收负载均衡器分发的请求，进行业务处理并返回响应数据
> 3.  负载均衡器:将用户请求根据对应的负载均衡算法分发到应用集群中的一台服务器进行处理

![在这里插入图片描述](https://img-blog.csdnimg.cn/c55182f5e34d419ca3834a720a053179.png)

**2. 负载均衡配置示例**

![在这里插入图片描述](https://img-blog.csdnimg.cn/3fedee228d7d4ebf81f26dd9674a84d1.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/dbb78409b9ae4a4e8ed5dcef2cb46981.png)

**3. 负载均衡的策略**

| 名称 | 说明 |
| --- | --- |
| 轮询 | 默认方式 |
| weight | 权重方式 |
| ip\_hash | 依据ip分配方式 |
| least conn | 依据最少连接方式 |
| url hash | 依据url分配方式 |
| fair | 依据响应时间方式 |

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


