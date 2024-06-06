+++
title = "REPL for Emacs Lisp"
date = 2024-02-012T14:45:00+08:00
draft = false
weight = 2001
author = "zhangxingong"
hiddenFromHomePage = true
+++

## 如何在emacs里测试elips语法？ {#如何在emacs里测试elips语法}

> The term "REPL" stands for "read-eval-print-loop" which originally comes from Lisp, which literally has functions named read, eval, and print. Emacs Lisp is no different, so you can do emacs --batch --eval '(while t (print (eval (read))))' to get what you want.

{{< highlight text >}}
`M + ielm`
{{< /highlight >}}


## 参考 {#参考}

[REPL for Emacs Lisp](https://stackoverflow.com/questions/6687721/repl-for-emacs-lisp)

[Evaluating Elisp in Emacs](https://www.masteringemacs.org/article/evaluating-elisp-emacs)
