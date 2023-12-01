+++
title = "Elisp基础：小白入门指南"
date = "2023-12-01T16:46:23+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++


# Elisp基础：小白入门指南

>Elisp（Emacs Lisp）是一种用于编写Emacs配置和扩展的Lisp方言。虽然听起来有点高深，但别担心！我们将通过简单而有趣的方式介绍Elisp的基础语法和用法，让你能轻松入门。

## 1. 变量与数据类型

### 变量

在Elisp中，定义变量非常简单：

```emacs-lisp
(setq my-variable "Hello, Elisp!")
```

### 数据类型

Elisp支持常见的数据类型，如字符串、数字和列表：

```emacs-lisp
(setq my-string "Emacs is awesome!")
(setq my-number 42)
(setq my-list '(apple orange banana))
```

## 2. 函数与操作符

### 函数

定义一个简单的函数：

```emacs-lisp
(defun greet ()
  (message "Hello from Elisp!"))
```

### 操作符

使用操作符进行数学运算：

```emacs-lisp
(setq result (+ 10 5))
(message "Result: %d" result)
```

## 3. 条件判断

使用`if`语句进行条件判断：

```emacs-lisp
(setq age 20)

(if (< age 18)
    (message "You are a minor.")
  (message "You are an adult."))
```

## 4. 循环

Elisp支持`while`循环：

```emacs-lisp
(setq count 0)

(while (< count 5)
  (message "Count: %d" count)
  (setq count (1+ count)))
```

## 5. 函数参数与返回值

定义带参数的函数，并返回结果：

```emacs-lisp
(defun square (x)
  (* x x))

(message "Square of 5: %d" (square 5))
```

## 结语

希望通过这个简短的Elisp基础入门，你对Emacs Lisp有了更好的了解。在你的Emacs配置中，你会发现Elisp的强大之处。继续探索，并享受使用Emacs的乐趣吧！

Happy coding with Elisp! 🚀

## 参考
[Learn X in Y minutes](https://learnxinyminutes.com/docs/elisp/ "Learn X in Y minutes")

[elisp入门](https://xiaoguo.net/~books/Lisp/elisp/elisp%E5%85%A5%E9%97%A8.pdf "elisp入门")

[水木社区EMACS版](https://smacs.github.io/elisp/02-elisp-basic.html "水木社区EMACS版")
