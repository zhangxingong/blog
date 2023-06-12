+++
title = "Emacs基础"
date = 2023-06-12T14:53:00+08:00
tags = ["基础", "文档", "笔记"]
categories = ["emacs"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 安装 {#安装}

-   linux系统安装 $sudo apt-get install emacs
-   window安装下载exe或msi安装包手动安装,将安装路径放入系统环境变量path中
    或使用包管理scoop | chocolatey install emacs


## 基础 {#基础}

-   入门学习15分钟tutorial
-   文件相关
    1.  C x s ;;保存
    2.  C x b ;;切换buffer
    3.  C x C c ;;退出
    4.  C z ;;最小化
    5.  C x i ;;插入其他文件
    6.  C x q ;;只读
    7.  C x v ;;打开另一个文件
-   编辑
    -   删除
        1.  C-d ;;删除字符
        2.  M-d ;;删除单词
        3.  C-k ;;删除到行尾
        4.  C-w ;;剪切
        5.  C-backspace ;;删除左边
        6.  C-delete  ;;删除右边
        7.  移动
            1.  C-p ;;向上一行
            2.  C-n ;;向下一行
            3.  C-v ;;向下一页
            4.  M-v ;;向上一页
            5.  C-f ;;向前一个字符
            6.  C-b ;;向后一个字符
            7.  M-f ;;向前一个单词
            8.  M-b ;;向后一个单词
            9.  M-a ;;向前一段
            10. M-e ;;向后一段
            11. C-a ;;行首
            12. C-e ;;行尾
            13. C-l ;;屏幕中间
            14. M-g-g ;;行号跳转
            15. 搜索
                1.  C-s
                2.  M-%
