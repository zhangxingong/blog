+++
title = "emacs设置中英文语言"
date = 2023-06-21T10:45:00+08:00
tags = ["字体", "font", "face", "language"]
categories = ["emacs"]
draft = false
weight = 2002
author = "zhangxingong"
+++

2.（同时解决emacs使用卡顿现象）

{{< highlight emacs-lisp >}}
;; 更改显示字体大小 16pt
;; http://stackoverflow.com/questions/294664/how-to-set-the-font-size-in-emacs
(set-face-attribute 'default nil :family "Fira Code Retina")
(set-frame-font "Fira Code Retina:pixelsize=20")
;;中文字体的设置，同时解决中英文字体宽度不一致的问题
;;                 （org-mode的表格可以中英文对齐）。
;;KKEE而且解决了中文字体导致emacs卡的现象。
;;Noto Sans SC Regular ; WenQuanYi Micro Hei Mono ; Fira Code Retina
(dolist (charset '(kana han symbol cjk-misc bopomofo))
  (set-fontset-font (frame-parameter nil 'font) charset
                    (font-spec :family "Noto Sans SC" :size 24)))
;; tune rescale so that Chinese character width = 2 * English character width
;;(setq face-font-rescale-alist '(("Fira Code Retina" . 1.0)
;;                                ("Microsoft Yahei" . 1.0)))
{{< /highlight >}}
