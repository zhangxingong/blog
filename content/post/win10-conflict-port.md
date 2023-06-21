+++
title = "win10端口占用"
date = 2023-06-21T10:31:00+08:00
tags = ["端口", "占用", "win10", "工具", "cmd"]
categories = ["shell"]
draft = false
weight = 2001
author = "zhangxingong"
+++

解决wind10端口占用

{{< highlight emacs-lisp >}}
::查看所有端口
$netstat -ano  rem

#result:
Active Connections

Proto  Local Address          Foreign Address        State           PID
TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       1088
::过滤指定端口64939获取PID
$netstat -ano | findstr "64939"
::使用pid强制关闭进程
$taskkill /f /pid 3940
#results:
SUCCESS: The process with PID 3940 has been terminated.
{{< /highlight >}}
