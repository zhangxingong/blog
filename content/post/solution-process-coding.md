+++
title = "解决process乱码"
date = 2023-06-25T11:53:00+08:00
tags = ["office", "乱码", "cmd"]
categories = ["emacs"]
draft = false
weight = 2001
author = "zhangxingong"
+++

最近在使用Emacs作为超级终端，查看图片，播放音频，视频，
查阅PDF，office文档，使用终端

用到的框加是EAF (Emac Application Framwork)

在查看office文档时遇到一个乱码问题

输入目录含有中文在发起进程时，接受端乱码

中间做了各种尝试

1.  修改cmd编码
2.  修改字符串编码
3.  路径加密base64, URL加密, 16进制中文

都以失败告终。

偶尔看到一篇文档

乱码的本质是编码没统一

Emacs查看到了罪魁祸首使用了gbk, 一直以为是utf-8没跳出来

emacs coding = gbk<br>
process coding = gbk<br>
cmd coding = utf-8<br><br>

最终解决。<br><br>

{{< highlight emacs-lisp >}}
(make-process
 :name "kkk"
 :buffer "*Messages*"
 :coding 'gbk
 :command (list "cmd" "/k" "chcp 65001" "&" "java" "-jar"
                (string-replace "xxx-xxx.jar" "xxx-xxx2.jar"
                                (my-post-blog-jar-path))
                "D:/xx/xx/2022年7月-XXX/XXXX接入文档.doc"))
{{< /highlight >}}
