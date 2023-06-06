+++
title = "elisp基础"
date = 2023-06-06T22:10:00+08:00
tags = ["Elisp"]
categories = ["emacs"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 前缀表达式 波兰式 S-表达式 {#前缀表达式-波兰式-s-表达式}
 {{< highlight scheme >}}
(+ 2 2 2 2)

(+ 2 (\* 3 4))

 {{< /highlight >}}
## 声明变量 变量赋值 打印变量 {#声明变量-变量赋值-打印变量}
 {{< highlight scheme >}}
(defvar name value)
(setq name "zilong")
(message name)

  {{< /highlight >}}
## 函数定义 函数调用 {#函数定义-函数调用}
 {{< highlight scheme >}}
(defun func()
(interactive)
(message "hello22, %s" name))

(setq name "shanren")
(func)

 {{< /highlight >}}
## 快捷键绑定 {#快捷键绑定}
 {{< highlight scheme >}}
(global-set-key (kbd "&lt;f1&gt;") 'func)

;;REPL read eval print loop

;;  Happy Hacking
 {{< /highlight >}}
