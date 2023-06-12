+++
title = "emacs掉用外部命令的几种方式"
date = 2023-06-12
tags = ["笔记"]
categories = ["emacs"]
draft = false
weight = 2003
author = "zhangxingong"
+++

## 同步调用 {#同步调用}

M + ! command (shell-command)


## 异步调用 {#异步调用}

M + &amp; command (async-shell-command)


## 区域调用 {#区域调用}

M + | command (shell-command-on-region)


## elisp调用 {#elisp调用}

(call-process-shell-command COMMAND &amp;optional INFILE BUFFER DISPLAY)
help-mode C-h f  call-process-shell-command
