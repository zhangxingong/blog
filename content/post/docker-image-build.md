+++
title = "如何制作Docker镜像？"
date = "2024-03-12T09:21:17+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 如何制作Docker镜像？

自己制作Docker镜像，主要有两种方法：

+   制作快照方式获得镜像（偶尔制作的镜像）：在基础镜像上，比如Ubuntu，先登录镜像系统并安装Docker软件，然后整体制作快照。
+   Dockerfile方式构建镜像（经常更新的镜像）：将软件安装的流程写成DockerFile，使用Docker build构建成Docker镜像。

#### 方法一：制作快照方式获得镜像

如果后续镜像没有变化，可采用[方法一](#gcs_faq_0001__zh-cn_topic_0149024168_zh-cn_topic_0127388067_section1017412550210)制作镜像。

![](https://support.huaweicloud.com/gcs_faq/zh-cn_image_0165153802.png "点击放大")

具体操作如下：

1.  找一台主机，安装Docker软件。
2.  启动一个空白的基础容器，并进入容器。
    
    例如：启动一个CentOS的容器。
    
    **docker run -it centos**
    
3.  执行安装任务。
    
    **yum install XXX**
    
    **git clone https://github.com/lh3/bwa.git**
    
    **cd bwa;make**
    
    ![](https://support.huaweicloud.com/gcs_faq/public_sys-resources/note_3.0-zh-cn.png)
    
    请预先安装好Git，并检查本机是否有ssh key设置。
    
4.  输入**exit**退出容器。

5.  制作快照。
    
    **docker commit -m "xx" -a "tsj" container-id tsj/image:tag**
    
    +   -a : 提交的镜像作者。
    +   container-id : [操作步骤2](#gcs_faq_0001__zh-cn_topic_0149024168_zh-cn_topic_0127388067_li118181720511)中的容器id。可以使用 **docker ps -a** 查询得到容器id。
    +   -m : 提交时的说明文字。
    +   tsj/image:tag : 仓库名/镜像名:TAG名。
    

6.  执行**docker images**可以查看到制作完成的Docker镜像。

#### 方法二：使用Dockerfile方式构建

如果后续镜像经常变更（例如某个软件更新版本），则需要采用[方法二](#gcs_faq_0001__zh-cn_topic_0149024168_zh-cn_topic_0127388067_section1690134131216)制作镜像。若仍采用[方法一](#gcs_faq_0001__zh-cn_topic_0149024168_zh-cn_topic_0127388067_section1017412550210)制作镜像，则每次变更都需要重新执行[方法一](#gcs_faq_0001__zh-cn_topic_0149024168_zh-cn_topic_0127388067_section1017412550210)的命令，操作过程比较繁琐，所以建议使用自动化制作镜像的方法。

其实就是将[方法一](#gcs_faq_0001__zh-cn_topic_0149024168_zh-cn_topic_0127388067_section1017412550210)制作镜像的方法，用文件方式写出来（文件名为DockerFile）。然后执行：**docker build -t tsj/image:tag.**命令（命令中“.”表示DockerFile文件的路径），自动完成镜像制作。

![](https://support.huaweicloud.com/gcs_faq/zh-cn_image_0165153805.png "点击放大")

简单的DockerFile示例：

![](https://support.huaweicloud.com/gcs_faq/public_sys-resources/note_3.0-zh-cn.png)

如果依赖外部网络，请搭建网络环境，并保证网络可用。

#Version 1.0.1
FROM centos:latest
MAINTAINER ***u "***u@huaweicloud.com"

#设置root用户为后续命令的执行者
USER root

#执行操作
RUN yum update -y
RUN yum install -y java

#使用&&拼接命令
RUN touch test.txt && echo "abc" >>abc.txt

#对外暴露端口
EXPOSE 80 8080 1038

#添加网络文件
ADD https://www.baidu.com/img/bd_logo1.png /opt/

#设置环境变量
ENV WEBAPP_PORT=9090

#设置工作目录
WORKDIR /opt/

#设置启动命令
ENTRYPOINT ["ls"]

#设置启动参数
CMD ["-a", "-l"]

#设置卷
VOLUME ["/data", "/var/www"]

#设置子镜像的触发操作
ONBUILD ADD . /app/src
ONBUILD RUN echo "on build excuted" >> onbuild.txt

详细的操作步骤可以参考：《容器镜像服务 最佳实践》。

#### DockerFile基本语法

+   FROM：
    
    指定待扩展的父级镜像（基础镜像）。除注释之外，文件开头必须是一个FROM指令，后面的指令便在这个父级镜像的环境中运行，直到遇到下一个FROM指令。通过添加多个FROM命令，可以在同一个Dockerefile文件中创建多个镜像。
    
+   MAINTAINER：
    
    声明创建镜像的作者信息：用户名、邮箱，非必须参数。
    
+   RUN：
    
    修改镜像的命令，常用来安装库、安装程序以及配置程序。一条RUN指令执行完毕后，会在当前镜像上创建一个新的镜像层，接下来对的指令会在新的镜像上继续执行。RUN 语句有两种形式：
    
    +   **RUN yum update**：在**/bin/sh**路径中执行的指令命令。
    +   **RUN ["yum", "update"]**：直接使用系统调用**exec**来执行。
    +   **RUN yum update && yum install nginx**：使用&&符号将多条命令连接在同一条RUN语句中。
+   EXPOSE：
    
    指明容器内进程对外开放的端口，多个端口之间使用空格隔开。
    
    运行容器时，通过设置参数**-P**（大写）即可将EXPOSE里所指定的端口映射到主机上其他的随机端口，其他容器或主机可以通过映射后的端口与此容器通信。
    
    您也可以通过设置参数**-p**（小写）将Dockerfile中EXPOSE中没有列出的端口设置成公开。
    
+   ADD：
    
    向新镜像中添加文件，这个文件可以是一个主机文件，也可以是一个网络文件，也可以使一个文件夹。
    
    +   第一个参数：源文件（夹）。
        +   如果是相对路径，必须是相对于Dockerfile所在目录的相对路径。
        +   如果是URL，会将文件先下载下来，然后再添加到镜像里。
    +   第二个参数：目标路径。
        +   如果源文件是主机上的zip或者tar形式的压缩文件，Docker会先解压缩，然后将文件添加到镜像的指定位置。
        +   如果源文件是一个通过URL指定的网络压缩文件，则不会解压。
+   VOLUME：
    
    在镜像里创建一个指定路径(文件或文件夹)的挂载点，这个容器可以来自主机或者其它容器。多个容器可以通过同一个挂载点共享数据，即便其中一个容器已经停止，挂载点也仍可以访问。
    
+   WORKDIR：
    
    为接下来执行的指令指定一个新的工作目录，这个目录可以是绝对目录，也可以是相对目录。根据需要，WORKDIR可以被多次指定。当启动一个容器时，最后一条WORKDIR指令所指的目录将作为容器运行的当前工作目录。
    
+   ENV：
    
    设置容器运行的环境变量。在运行容器的时候，通过设置**-e**参数可以修改这个环境变量值，也可以添加新的环境变量。
    
    例如：
    
    **docker run -e WEBAPP_PORT=8000 -e WEBAPP_HOST=www.example.com ...**
    
+   CMD：
    
    用来设置启动容器时默认运行的命令。
    
+   ENTRYPOINT：
    
    用来指定容器启动时的默认运行的命令。区别在于：运行容器时添加在镜像之后的参数，对ENTRYPOINT是拼接，CMD是覆盖。
    
    +   若在DockerFile中指定了容器启动时的默认运行命令为**ls -l**，则运行容器时默认启动命令为 **ls -l**，例如：
        +   **ENTRYPOINT [ "ls", "-l"]**：指定容器启动时的程序及参数为 **ls -l** 。
        +   **docker run centos**：当运行centos容器时，默认执行的命令是**docker run centos ls -l**
        +   **docker run centos -a**：当运行centos容器时拼接了-a参数，则默认运行的命令是**docker run centos ls -l -a**
    +   若在DockerFile中指定了指定了容器启动时的默认运行命令为**--entrypoint**，则在运行容器时若需要替换默认运行命令，可以通过添加**--entrypoint**参数来替换Dockerfile中的指定。例如：
        
        **docker run gutianlangyu/test --entrypoint echo "hello world"**
        
+   USER：
    
    为容器的运行及RUN、CMD、ENTRYPOINT等指令的运行指定用户或UID。
    
+   ONBUILD：
    
    触发器指令。构建镜像时，Docker的镜像构建器会将所有的ONBUILD指令指定的命令保存到镜像的元数据中，这些命令在当前镜像的构建过程中并不会执行。只有新的镜像使用FROM指令指定父镜像为当前镜像时，才会触发执行。
    
    使用FROM以这个Dockerfile构建出的镜像为父镜像，构建子镜像时：
    
    **ONBUILD ADD . /app/src**：自动执行**ADD . /app/src**
    

### 意见反馈

### 文档内容是否对您有帮助？

