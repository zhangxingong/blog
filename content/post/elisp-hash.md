+++
title = "elisp数据结构hash | elisp类型"
date = 2023-08-25T13:49:00+08:00
tags = ["笔记", "工具", "编程", "学习", "基础"]
categories = ["emacs"]
draft = false
weight = 2002
author = "zhangxingong"
+++

hash在高级语言中有普遍的实现，elisp也不例外。

1.  hash创建
2.  hash读取
3.  hash写入
4.  hash遍历

<!--listend-->

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
;; 创建
(setq xx(make-hash-table :test 'equal))
(let (xx (make-hash-table :test 'equal)) body)
;; 字面量创建
(setq xx #s(hash-table test equal size 10 data("a" 1 "b" 2 "c" 3)))

;;写入
(puthash "aa" 2 xx)
;;读取
(gethash "aa" xx)
;;遍历
（maphash (lambda(k,v)body) xx）
;;hash总数
(hash-table-count xx)
;;清空
(clrhash xx)
;;获取key
(has-table-keys xx)
;;获取vale
(has-table-values xx)
;;删除
(remhash xx)
{{< /highlight >}}
