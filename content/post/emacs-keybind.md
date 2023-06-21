+++
title = "emacs快捷键"
date = 2023-06-21T13:14:00+08:00
tags = ["快捷键"]
categories = ["emacs"]
draft = false
weight = 2013
author = "zhangxingong"
+++

emacs

C-x r r 复制一个矩形区域到寄存器

C-x r k 剪切一个矩形块

C-x r y 粘贴一个矩形块
C-x r o 插入一个矩形块
C-x r c 清除一个矩形块(使其变成空白)
C-x r t 在选定区域的所有列前插入样的字符
move char forward
replace-rectangle
universal-argement rectangle-line-number

C-u SPC 或者M-,

C-d (delete-char)，删除光标处的字符。

Backspace (delete-backward-char)，删除光标前字符。

M-\\ (delete-horizontal-space)，删除光标处的所有空格和Tab字符。

M-SPC (just-one-space)，删除光标处的所有空格和Tab字符，但留下一个。

C-x C-o (delete-blank-lines)，删除光标周围的空白行，保留当前行。

M-^ (delete-indentation)，将两行合为一行，删除之间的空白和缩进。参见下面两图。

Paragraph

M-{
Move back to previous paragraph beginning (backward-paragraph).

M-}
Move forward to next paragraph end (forward-paragraph).

M-h
Put point and mark around this or next paragraph (mark-paragraph).

Pages
M-x
what-page Display the page number of point, and the line number within that page.

C-x [
Move point to previous page boundary (backward-page).

C-x ]
Move point to next page boundary (forward-page).

C-x C-p
Put point and mark around this page (or another page) (mark-page).

C-x l
Count the lines in this page (count-lines-page).
