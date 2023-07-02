+++
title = "org-mode模式下从剪贴板插入图片"
date = 2023-07-01T22:21:00+08:00
tags = ["Org", "图片", "ATTACH"]
categories = ["emacs"]
draft = false
weight = 2001
author = "zhangxingong"
+++

问题描述：
在使用org写博客，插入图片逻辑是繁琐的，
在想有没插件能自动把图片插入到org文档里
减少重复工作，不打断思维
于是找了好多文章
功夫不负有心人
终于找到了一个github项目
abo-abo/org-download
刚好满足需求
window需要安装一个命令工具
imagemagick/convert
然后配置

{{< highlight emacs-lisp >}}
(require 'org-download)

;; Drag-and-drop to `dired`
(add-hook 'dired-mode-hook 'org-download-enable)

(setq-default org-download-image-dir "~/Pictures/")
{{< /highlight >}}

命令 \`org-download-clipboard\`即可插入剪贴板图片

[17-11-45_screenshot](/img/17-11-45_screenshot.png)
