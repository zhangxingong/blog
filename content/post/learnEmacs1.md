+++
title = "emacs掉用外部命令的几种方式"
date = 2023-06-12T17:04:00+08:00
tags = ["笔记"]
categories = ["emacs"]
draft = false
weight = 2003
author = "zhangxingong"
+++

## 同步调用 {#同步调用}

{{< highlight emacs-lisp >}}
M + ! command (shell-command)
{{< /highlight >}}


## 异步调用 {#异步调用}

{{< highlight emacs-lisp >}}
M + & command (async-shell-command)
{{< /highlight >}}


## 区域调用 {#区域调用}

{{< highlight emacs-lisp >}}
M + | command (shell-command-on-region)
{{< /highlight >}}


## elisp调用 {#elisp调用}

{{< highlight emacs-lisp >}}
(call-process-shell-command COMMAND &optional INFILE BUFFER DISPLAY)
help-mode C-h f  call-process-shell-command
{{< /highlight >}}
