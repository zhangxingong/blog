+++
title = "如何在scratch与当前buffer之间切换？ | Elisp"
date = 2023-10-27T11:52:00+08:00
tags = ["脚本"]
categories = ["emacs"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 使用场景 {#使用场景}

在使用org mode编辑文档时经常会把剪贴板里的内容放在一个临时的地方比如scratch，需要频繁切换这两个buffer


## 解决办法 {#解决办法}

可以定制一个命令如下：

{{< highlight emacs-lisp >}}
(defun switch-to-scratch-and-back ()
"Toggle between *scratch* buffer and the current buffer.
If the *scratch* buffer does not exist, create it."
(interactive)
(let ((scratch-buffer-name (get-buffer-create "*scratch*")))
(if (equal (current-buffer) scratch-buffer-name)
(switch-to-buffer (other-buffer))
(switch-to-buffer scratch-buffer-name (lisp-interaction-mode)))))
{{< /highlight >}}

使用时  <kbd>Meta</kbd> + <kbd>x</kbd> + <kdbd>Enter</kbd> + switch-to-scratch-and-back即可切换
