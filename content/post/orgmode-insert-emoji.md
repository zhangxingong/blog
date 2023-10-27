+++
title = "如何在orgmode中插入并显示Emoji"
date = 2023-10-27T15:53:00+08:00
tags = ["org", "github"]
categories = ["subject"]
draft = false
weight = 2005
author = "zhangxingong"
+++

## 场景 {#场景}

在写博客时想插入emoji，但是系统自带的只能显示64进制，于是乎查找了一遍。找到了一个很好的插件emojify


## 步骤 {#步骤}

1.  安装
2.  下载表情图片
3.  使用Meta + x input emojify-insert-emoji RET
{{< highlight emacs-lisp >}}
(use-package emojify
:commands (org-mode)
:init
(setq mojify-emoji-styles "image")
:hook (org-mode . global-emojify-mode)
:ensure nil)
{{< /highlight >}}


## 问题 {#问题}

在下载表情时用的地址是被墙的
raw.githubusercontent.com:443


## 解决 {#解决}

1.  查找最快的dns [查这里](https://ping.chinaz.com/raw.githubusercontent.com)
2.  修改本机hosts文件
{{< highlight shell >}}
199.232.28.133 raw.githubusercontent.com
{{< /highlight >}}
3.  刷新本机DNS
{{< highlight shell >}}
$ipconfig /flushdns
{{< /highlight >}}


## 结果 {#结果}

![](/img/15-49-09_5_screenshot.png)


## 参考 {#参考}

[issue](https://github.com/nvm-sh/nvm/issues/2392)

[emoji markup](https://gist.github.com/rxaviers/7360908)

[emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md#face-smiling)
