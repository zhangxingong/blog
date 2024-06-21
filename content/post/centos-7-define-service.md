+++
title = "CentOS自定义服务"
date = "2024-03-21T10:17:48+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
hiddenFromHomePage = true
+++

在CentOS系统中，创建一个自定义服务并设置为开机启动涉及到编写系统服务脚本以及使用系统服务管理工具（如`Systemd`或`SysVinit`，取决于你的CentOS版本）进行管理。这里以较新的CentOS 7及更高版本（使用Systemd）为例，介绍如何创建服务并设置开机启动。

**步骤 1: 创建服务脚本**
首先，你需要为你的服务创建一个`Systemd`服务单元文件。服务单元文件通常放置在 `/etc/systemd/system/` 目录下。假设你的服务名为 `my_service`，你可以创建一个名为 `my_service.service` 的文件：
```bash
sudo nano /etc/systemd/system/my_service.service
```

然后，在编辑器中输入以下内容作为示例模板，根据实际情况调整：
```init
[Unit]
Description=My Custom Service
After=network.target

[Service]
User=myuser
Group=mygroup
ExecStart=/path/to/your/script.sh
Restart=always
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```
* Description: 服务的简短描述。
* After: 指定服务启动应该在哪些服务之后。
* User 和 Group: 以哪个用户和用户组身份运行服务。
* ExecStart: 服务启动时执行的命令或脚本路径。
* Restart: 定义服务崩溃后是否重启。
* StandardOutput 和 StandardError: 日志输出位置。
* [Install] 部分定义了如何安装服务（即加入到哪个目标）。

**步骤 2: 重载Systemd配置并启动服务**
保存并关闭文件后，需要重载Systemd以加载新的服务单元文件，并启动服务：
```bash
sudo systemctl daemon-reload
sudo systemctl start my_service.service
```
**步骤 3: 设置服务开机启动**
要让服务在系统启动时自动启动，执行：
```bash
sudo systemctl enable my_service.service
```
现在，my_service 已经被设置为开机启动。你可以使用以下命令检查服务状态或日志：

```bash
sudo systemctl status my_service.service
journalctl -u my_service.service

```
**注意事项**

确保服务脚本中的路径、用户、组等信息正确无误。

如果你的CentOS版本较旧（如CentOS 6），可能需要使用SysVinit脚本和服务管理命令（如 chkconfig）来实现相同功能。

在进行任何系统级别的配置更改之前，建议先备份相关文件，并确保你熟悉回滚步骤，以防配置错误导致的问题。

在较老版本的CentOS（如CentOS 6及以前版本），系统使用SysVinit作为初始化系统，因此创建服务脚本并设置开机启动的过程涉及使用chkconfig命令。以下是创建服务脚本并设置开机启动的步骤：
步骤 1: 创建服务脚本
1. 服务脚本模板：首先，你需要创建一个服务脚本。服务脚本通常位于 /etc/init.d/ 目录下。假设服务名为 my_service，你可以通过以下命令创建一个基础脚本模板：

```bash
   sudo nano /etc/init.d/my_service
```

2. 编辑服务脚本：在打开的编辑器中，填入以下基本结构，并根据实际需求进行修改。这是一个简单的服务脚本示例：

```bash
   #!/bin/bash
   # chkconfig: 345 90 10
   # description: My Service Description

   # 启动函数
   start() {
       echo "Starting my_service..."
       /path/to/your/command_or_script &
   }

   # 停止函数
   stop() {
       echo "Stopping my_service..."
       killall your_process_name
   }

   # 重启函数
   restart() {
       stop
       start
   }

   # 状态查询函数
   status() {
       ps aux | grep your_process_name
   }

   case "$1" in
       start)
           start
           ;;
       stop)
           stop
           ;;
       restart)
           restart
           ;;
       status)
           status
           ;;
       `*)`
           echo "Usage: $0 {start|stop|restart|status}"
           exit 1
           ;;
   esac

   exit 0
   ```
替换 /path/to/your/command_or_script 为你的服务启动命令或脚本路径。
修改 your_process_name 为你的服务进程名，以便于停止服务时使用。
chkconfig: 345 90 10 这一行定义了服务在哪些运行级别（3、4、5）上启用，并设置了启动优先级和关闭优先级（启动优先级90，关闭优先级10）。
赋予执行权限：保存并关闭文件后，给脚本添加执行权限：

```bash
   sudo chmod +x /etc/init.d/my_service
```

步骤 2: 使用chkconfig管理服务
1. 添加服务到chkconfig管理：使用chkconfig --add命令将服务添加到系统服务列表中：

```bash
   sudo chkconfig --add my_service
```

2. 设置服务开机启动：使用chkconfig命令设置服务在指定运行级别自动启动：

```bash
   sudo chkconfig my_service on
```

验证与管理

* 启动服务：sudo service my_service start
* 查看服务状态：sudo service my_service status
* 设置开机不启动：sudo chkconfig my_service off

以上步骤完成后，`my_service` 服务就已经成功创建，并会在系统启动时自动启动。记得根据实际情况调整脚本中的命令和路径。
