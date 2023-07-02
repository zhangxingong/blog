+++
title = "从剪贴板中自动插入图片"
tags = ["org","笔记","github"]
categories = ["emacs"]
toc = true
date = 2023-07-02T19:12:00+08:00
draft = false
author = "zhangxingong"
+++

# 思路  

1) 安装插件 `org-download`

2) 激活插件  初始化默认加载

3) 配置自定义格式 customize  
`org-download-link-format-function`

4) 自定义格式中获取到图片路径，判断当前

博客是否是草稿状态  

如果是非草稿状态  

调用github Api上传到仓库制定路径  

然后返回org图片格式  

 ` [[paht][description]]`

![](/img/paste-clipboard-sample.png)