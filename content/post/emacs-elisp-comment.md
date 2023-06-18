+++
title = "Emacs Lisp: Comment"
date = 2023-06-18T19:55:00+08:00
draft = false
weight = 2002
author = "zhangxingong"
+++

注释是被 emacs lisp 忽略的文本。

通常用于注释代码、文档或版权信息。

注释语法从一个分号开始到行尾。

没有其他语法。

{{< highlight emacs-lisp >}}
  ;; this is a comment

(+ 1 2) ; result is 3

;; by emacs convention, comment on a line by itself starts with 2 semicolons

;;; HEADER COMMENT
;; by emacs convention, comment starting with 3 semicolons is a header, e.g. section title
{{< /highlight >}}
