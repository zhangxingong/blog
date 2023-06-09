+++
title = "Org写博客自动发布实现"
date = 2023-06-15
tags = ["Org写博客自动发布实现", "java", "自动化", "批处理", "省心", "多语言"]
categories = ["emacs"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 利用Emacs + hugo + github构建写作环境 {#利用emacs-plus-hugo-plus-github构建写作环境}

题外话，世界运行的底层逻辑

物质世界有无机物和有机物组成

有机物与无机物的区别：

有机物是碳化合物，无机物由水和无机离子组成

有机物熔点低，不溶于水

无机物是良好的溶剂，反应快

有机物不溶于水，反应慢

回到问题，有机物通过复制延续

无机物通过转化延续

复制，与转化具有普遍性所以说是底层逻辑

复制的特点是简单、速度快、稳定

转化的特点复杂、不稳定

为何牵扯出了这些概念，以下就是博客发布

经历的几次转化

转化就代表了能量消耗

之所以有机物选择了复制，本质目的是减少能量的损耗


## 基本思路 {#基本思路}

博客文件格式的几次转化

.org &gt; .md &gt; restApi &gt; githubApi &gt; workflow &gt; .html

自动化发布在保存⑩添加了钩子，通过调用接口方式自动上传md文件到github

github设置了hugo发布钩子，监听发布动作，自动生产静态html页面

第一次转化 Org 文件转化为MarkDown文件 使用到emacs插件ox-hugo

第二次转化 使用的是github workflow

自己实现的部分是扩展ox-hugo，监听生成md文件后获取两个值

1.  todo状态是否已经完成

2.  md文件路径 用于后续自动上传

获取两个变量后，用elisp判断todo状态为完成

调用外部程序新起进程处理上传任务

上传实现可以参考我的java版本 [post-blog项目](http:https://github.com/zhangxingong/post-blog)
