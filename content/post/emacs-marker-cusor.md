+++
title = "emacs记住光标位置"
date = 2023-06-28T17:02:00+08:00
tags = ["place"]
categories = ["emacs"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## saveplace-mode {#saveplace-mode}

emacs自带功能

1.  saveplace
2.  bookmark
3.  org-make-ring-push
4.  point-to-register


## 快捷键 {#快捷键}  

C-c %  
C-c &  
C r m  
C r b  
C r l  


## 自定义插件 {#自定义插件}  

{{< highlight emacs-lisp >}}
(defun remember-init ()  
  "记住当前位置." 
  (interactive)
  (point-to-register 8)
  (message "Have remember one position"))

(defun remember-jump ()
  "跳转到最后一次的位置."
  (interactive)
  (let ((tmp (point-marker)))
    (jump-to-register 8)
    (set-register 8 tmp))
  (message "Have back to remember position"))
{{< /highlight >}}
