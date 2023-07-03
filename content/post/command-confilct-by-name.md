+++
title = "命令名称相同引起的冲突"
date = 2023-07-03T18:24:00+08:00
tags = ["cmd", "工具", "脚本", "想法", "省心", "编程", "规则", "妙招", "批处理", "自动化"]
categories = ["emacs"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 问题描述 {#问题描述}

在安装生成图片命令行convert时，无意间发现 system32目录下有相同的命令（磁盘工具）

解决过程如下：

1.  把imageMagic软件路径添加到window环境变量 （当前用户环境变量）
2.  把imagemagic软件路径添加到window系统环境变量
3.  把imagemagic软件路径添加到emacs的exec-path变量列表
4.  把imagemagic软件路径添加到emacs的env-path

代码如下

{{< highlight emacs-lisp >}}

(setq exec-path (cons "D:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI" exec-path))

(setenv "PATH" (concat "D:\\Program Files\\ImageMagick-7.1.1-Q16-HDRI;" (getenv "PATH")))
{{< /highlight >}}

事实证明 方法3,4有效


## 问题描述 {#问题描述}

在从剪贴板自动获取图片后

要调用进程上传图片到github

由于上传过程比较耗时

导致插入org图片代码失败


### 分析原因 {#分析原因}

函数没有立即返回，导致插入失败


### 解决办法 {#解决办法}

在调用上传前使用定时任务 run-with-idle-timer


## 问题描述 {#问题描述}

在使用定时任务时误传局部变量，从参数里传入了图片路径


### 解决办法 {#解决办法}

改为临时变量赋值给全局变量

用全局变量执行timer


## 最终结果实现从剪贴板插入图片时自动上传到github {#最终结果实现从剪贴板插入图片时自动上传到github}


### 效果如下： {#效果如下}

[18-19-29_screenshot](/img/18-19-29_screenshot.png)

[18-20-28_screenshot](/img/18-20-28_screenshot.png)

[18-21-14_screenshot](/img/18-21-14_screenshot.png)

[18-22-02_screenshot](/img/18-22-02_screenshot.png)

[[/img/18-58-24_screenshot.png][]]
