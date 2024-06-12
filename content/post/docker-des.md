+++
title = "Docker入门学习（一）"
date = "2024-03-08T09:35:35+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

### 1，Docker概述

​ Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的操作系统的机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口

Docker是基于Go语言开发的，开源项目。

官网： [www.docker.com](https://www.docker.com/ "https://www.docker.com")

文档地址： [docs.docker.com](https://docs.docker.com/ "https://docs.docker.com")

仓库地址： [hub.docker.com](https://hub.docker.com/ "https://hub.docker.com")

### 2，虚拟化技术

> 虚拟化技术特点：

1， 资源占用十分多

2，冗余步骤多

3，启动很慢

> 容器化技术

容器化技术不是模拟一个完整的操作系统

+   传统的虚拟机，虚拟出一个硬件，运行一个完整的操作系统，然后在这个系统上安装和运行软件
+   容器内的应用直接运行在宿主机的内容，容器是没有自己的内核的，也没有虚拟我们的硬件，所以就很轻便，每个容器间是相互隔离的，每个容器内都有一个属于自己的文件系统

**1, 使应用更快速的交付和部署**

​ Docker打包镜像发布测试，一键运行，

**2，更便捷的升级和扩缩容器**

​ 使用Docker之后，我们的部署应用就像搭积木一样，项目打包一个镜像，随时扩容

**3，更简单的系统运维**

​ 在容器化之后，我们的开发，测试都是高度一致的

**4，高效的计算资源利用**

​ Docker使内核级别的虚拟化，可以在一个物理机上运行很多的容器实例，服务器的性能可以被压榨到极致。

### 3，Docker简介

![src=http___www.lxs678.com_whzpxx_images_20180918152341903721.png&refer=http___www.lxs678 (1).jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fef4d199e4304ed3ab260a91fb17b5e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

**镜像：（image)**

docker镜像就好比是一个模板，可以通过这个模板来创建容器服务，通过镜像可以创建多个容器，项目最终运行在容器中。

**容器：（container)**

Docker利用容器技术，独立运行一个或者一组应用，通过镜像来创建的，

启动，停止，删除，基本命令

目前就可以把这个容器理解为一个简易的linux系统

**仓库：（repository)**

仓库就是存放镜像的地方。

仓库分为：公有仓库和私用的仓库。

DockerHub(默认是国外的)

### 4，Docker安装

> 环境准备

1， Linux基础

2，CentOS7

3，Xshell远程连接服务器

> 环境查看

```shell
# 系统内核是3.10
[root@VM-0-7-centos /]# uname -r
3.10.0-1127.19.1.el7.x86_64
```

```shell
# 系统版本
[root@VM-0-7-centos /]# cat /etc/os-release
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"
```

> 安装

1, 卸载

```shell
# 卸载旧版本docker
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

2, 需要的安装包

```shell
yum install -y yum-utils
```

3, 设置镜像仓库

```shell
# 设置仓库地址
yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

# 建议大家国内阿里云的
# 使用阿里国内源安装docker
yum-config-manager \
   --add-repo \
   http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

注意：小插曲

更新一下自己的yum软件包索引

```auto
yum makecache fast
```

4， 安装docker相关的引擎， `docker-er`是社区版， `docker-ee`是企业版

```shell
yum install docker-ce docker-ce-cli containerd.io
```

5， 安装成功之后，启动docker

```sql
systemctl start docker
```

6, 查看docker是否安装成功

```shell
docker version

Client: Docker Engine - Community
 Version:           20.10.10
 API version:       1.41
 Go version:        go1.16.9
 Git commit:        b485636
 Built:             Mon Oct 25 07:44:50 2021
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.10
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.16.9
  Git commit:       e2f740d
  Built:            Mon Oct 25 07:43:13 2021
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.4.11
  GitCommit:        5b46e404f6b9f661a205e28d59c982d3634148f8
 runc:
  Version:          1.0.2
  GitCommit:        v1.0.2-0-g52b36a2
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0

```

7， 测试docker是否安装成功？

```shell
docker run hello-world
```

![1636565661521.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cff384a203d24d1fa549839c241b24d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

+   通过命令可以看出，首先是没有找到hello-world镜像
+   然后从仓库上拉pull 最新的
+   下载完之后，生成一个签名，然后主动运行docker

8， 查看hello-world镜像

```shell
# 查看docker镜像
docker images
```

![1636565908383.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e11abf25468b4da8a84b26391bb553fb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

9, 最后了解一下：如果不想使用docker了，可以下载

```shell
# 卸载docker只需要两步
# 1 卸载依赖
yum remove docker-ce docker-ce-cli containerd.io

# 2， 删除资源
rm -rf /varlib/docker   // 默认工作路径

rm -rf /var/lib/containerd   // 默认容器路径

```

### 5，Docker run 原理

Docker run 开始之后，Docker会在本机寻找镜像。

1， 如果有镜像，直接运行

2， 如果没有镜像，去DockerHub上去下载，如果有这个镜像，下载到本地，否则返回错误，找不到镜像。

### 参考

[Docker入门学习（一）](https://juejin.cn/post/7029310697460727839 "Docker入门学习（一）")
[Docker常用命令](https://juejin.cn/post/6996126578048499743 "Docker常用命令")
[Docker系列（1）--Docker原理及安装｜ 8月更文挑战](https://juejin.cn/post/6991623142770753566 "Docker系列（1）--Docker原理及安装｜ 8月更文挑战")
[Docker 开发的环境配置（Linux/MacOS/Window）](https://juejin.cn/post/7028530944235536414 "Docker 开发的环境配置（Linux/MacOS/Window）")
[5 分钟用 Docker 部署一个机器人解决你的“信息焦虑”](https://juejin.cn/post/7029498211832348702 "5 分钟用 Docker 部署一个机器人解决你的“信息焦虑”")
