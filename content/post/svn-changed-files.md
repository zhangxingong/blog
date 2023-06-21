+++
title = "如何获取svn一段时间内改动文件列表"
date = 2023-06-21T16:36:00+08:00
tags = ["svn","自动化","上线"]
categories = ["shell","工具"]
draft = false
weight = 2001
author = "zhangxingong"
+++

Web产品(例如网站, WebApp)在做新版本发布时, 一般我们需要提交一个待发布文件的列表, 增量更新到生产环境的服务器上, 没有做整体替换.

这个待发布文件列表其实就是一个所有改动文件的列表, 列出了新增, 修改, 删除了哪些文件, 主要是辅助发布的过程, 确保没有遗漏文件造成版本发布失败.

例如

5月6号发布版本, 从上次封版到这次发版中间到底改动了哪些文件呢?

这是个头痛的问题, 必须确保无一遗漏才能万无一失!

其实待发布文件列表就是 SVN 的操作记录, 可以通过 svn log 得到, 但这个日志没有排除重复, 会详细的列出每个文件的多次操作记录, 太累赘了,

还需要我们逐个进行整理. 我需要的是一个列表明确地告诉我在此次版本期间, 我们新增, 修改, 删除了哪些文件就好了.

在困惑了一段日子后, 终于有机会来寻找解决方法了, 其实通过 svn 命令行(TortoiseSVN不行, 需要先安装 svn 命令行工具)是可以获得这个列表的.
命令格式如下:
    svn diff -r REVNO:HEAD --summarize <http://svn-url>

例如
想检查从 724版本 开始到目前所有改动文件的列表
    svn diff -r 724:HEAD --summarize <https://192.168.198.2/svn >> changedfiles.txt
可以简写成这样
    svn diff -r 724 --summarize <https://192.168.198.2/svn >> changedfiles.txt

或者你只知道需要检查版本的日期, 这就相当于检查从 2015-05-06(上次封版日期) 开始到目前(此次发版日期)所有的文件改动
    svn diff -r {2015-05-06} --summarize <https://192.168.198.2/svn >> changedfiles.txt
或者日期区间
    svn diff -r {2015-05-04}:{2015-05-05} --summarize <https://192.168.198.2/svn >> changedfiles.txt

这样我们就能够实现自动化发布了...
————————————————
版权声明：本文为CSDN博主「GoverChan」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：<https://blog.csdn.net/qq_15766181/article/details/80116240>
