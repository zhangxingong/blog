+++
title = "Elisp语法：构建强大的Emacs 🚀🚀🚀"
date = "2023-12-06T14:04:27+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#前言)
+   [开始](#开始)
+   [S 表达式](#开始)
+   [变量、字符串、函数](#变量、字符串、函数)
+   [创建缓存区，书写代码片](#创建缓存区，书写代码片)
+   [列表](#列表)
+   [改进版 greeting](#更多功能)
+   [更多功能](#更多功能)
+   [如有错误，欢迎评论指出，感谢！](#如有错误，欢迎评论指出，感谢！)

* * *

## 前言

学习Elisp基础语法，[Learn X in Y minutes, Where X=elisp](https://learnxinyminutes.com/docs/elisp/)  
Emacs Lisp 为一个函数式的语言，所以它全部 功能都是由函数来实现的。

> 15分钟学会Emacs Lisp (v0.2a)[中文版](https://learnxinyminutes.com/docs/zh-cn/elisp-cn/)  
> 作者：bzg，[https://github.com/bzg](https://github.com/bzg)  
> 译者：lichenbo，[http://douban.com/people/lichenbo](http://douban.com/people/lichenbo)

* * *

## 开始

打开emacs  
按’q’消除欢迎界面

```auto
现在请注意窗口底部的那一个灰色长条，scratch 是你现在编辑界面的名字。
这个编辑界面叫做一个buffer。
```

每当你打开Emacs时，都会默认打开这个**scratch buffer**，此时你并没有在编辑任何文件，  
而是在编辑一个buffer,之后你可以将这个buffer保存到一个文件中。

+   之后的**Lisp interaction** 则是表明我们可以用的某组命令

Emacs在每个buffer中都有一组内置的命令,而当你激活某种特定的模式时，就可以使用相应的命令

+   这里我们使用**lisp-interaction-mode**，这样我们就可以使用内置的Emacs Lisp命令了。

* * *

## S 表达式

`;`分号是注释开始的标志  
Elisp 是由符号表达式构成的 (即"s-表达式"或"s式"):

```auto
(+ 2 2)
```

+   这个s式的意思是 “对2进行加2操作”.

s式周围有括号，而且也可以嵌套:

```auto
(+ 2 (+ 1 1))
```

+   一个s式可以包含原子符号或者其他s式
+   在上面的例子中，1和2是原子符号
+   (+ 2 (+ 1 1)) 和 (+ 1 1) 是s式.

在 **lisp-interaction-mode** 中你可以计算s式.  
把光标移到闭括号后，之后按下`ctrl+j`（以后简写为`C-j`）

```auto
(+ 3 (+ 1 2))
             ^ 光标放到这里
按下`C-j' 就会输出 6
```

`C-j` 会在buffer中插入当前运算的结果

而`C-x C-e` 则会在emacs最底部显示结果，也就是被称作**minibuffer**的区域

```auto
为了避免把我们的buffer填满无用的结果，我们以后会一直用C-x  C-e
```

* * *

## 变量、字符串、函数

`setq`可以将一个值赋给一个变量

```auto
(setq my-name "Bastien")
```

+   `C-x C-e` **输出 “Bastien”** (在 mini-buffer 中显示)

`insert` 会在光标处插入字符串:

```auto
(insert "Hello!")
```

+   `C-x C-e` 输出 “Hello!”

在这里我们只传给了insert一个参数"Hello!", 但是我们也可以传给它更多的参数，比如2个：

```auto
(insert "Hello" " world!")
```

+   `C-x C-e` 输出 “Hello world!”

你也可以用变量名来代替字符串

```auto
(insert "Hello, I am " my-name)
```

+   `C-x C-e`输出 “Hello, I am Bastien”

你可以把s式嵌入函数中

```auto
(defun hello () (insert "Hello, I am " my-name))
```

+   `C-x C-e` 输出 hello

现在执行这个函数

```auto
(hello)
```

+   `C-x C-e` 输出 Hello, I am Bastien

函数中空括号的意思是我们不需要接受任何参数，但是我们不能一直总是用my-name这个变量  
所以我们现在使我们的函数接受一个叫做"name"的参数

```auto
(defun hello (name) (insert "Hello " name))
```

+   `C-x C-e` 输出 hello

现在我们调用这个函数，并且将"you"作为参数传递

```auto
(hello "you")
```

+   `C-x C-e` 输出 “Hello you”

成功！

* * *

## 创建缓存区，书写代码片

下面我们在新的窗口中新建一个名为 “*test*” 的buffer:

```auto
(switch-to-buffer-other-window "*test*")
```

+   `C-x C-e` 这时屏幕上会显示两个窗口，而光标此时位于*test* buffer内

用鼠标单击上面的buffer就会使光标移回。或者你可以使用 `C-x o` 使得光标跳到另一个窗口中

你可以用 `progn`命令将s式结合起来:

```auto
(progn
  (switch-to-buffer-other-window "*test*")
  (hello "you"))
```

+   `C-x C-e` 此时屏幕分为两个窗口，并且在*test* buffer中显示"Hello you"

现在为了简洁，我们需要在每个s式后面都使用`C-x C-e`来执行，后面就不再说明了

记得可以用过鼠标或者`C-x o`回到*scratch*这个buffer。

清除当前buffer也是常用操作之一：

```auto
(progn
  (switch-to-buffer-other-window "*test*")
  (erase-buffer)
  (hello "there"))
```

也可以回到其他的窗口中

```auto
(progn
  (switch-to-buffer-other-window "*test*")
  (erase-buffer)
  (hello "you")
  (other-window 1))
```

你可以用 `let`将一个值和一个局部变量绑定:

```auto
(let ((local-name "you"))
  (switch-to-buffer-other-window "*test*")
  (erase-buffer)
  (hello local-name)
  (other-window 1))
```

这里我们就不需要使用 `progn`了， 因为 `let` 也可以将很多s式组合起来。

格式化字符串的方法：

```auto
(format "Hello %s!\n" "visitor")
```

%s 是字符串占位符，这里被"visitor"替代。 \\n 是换行符。

现在我们用格式化的方法再重写一下我们的函数:

```auto
(defun hello (name)
  (insert (format "Hello %s!\n" name)))

(hello "you")
```

我们再用`let`新建另一个函数:

```auto
(defun greeting (name)
  (let ((your-name "Bastien"))
    (insert (format "Hello %s!\n\nI am %s."
                    name       ; the argument of the function
                    your-name  ; the let-bound variable "Bastien"
                    ))))
```

之后执行:

```auto
(greeting "you")
```

有些函数可以和用户交互:

```auto
(read-from-minibuffer "Enter your name: ")
```

这个函数会返回在执行时用户输入的信息  
现在我们让\`greeting’函数显示你的名字:

```auto
(defun greeting (from-name)
  (let ((your-name (read-from-minibuffer "Enter your name: ")))
    (insert (format "Hello!\n\nI am %s and you are %s."
                    from-name ; the argument of the function
                    your-name ; the let-bound var, entered at prompt
                    ))))

(greeting "Bastien")
```

我们让结果在另一个窗口中显示:

```auto
(defun greeting (from-name)
  (let ((your-name (read-from-minibuffer "Enter your name: ")))
    (switch-to-buffer-other-window "*test*")
    (erase-buffer)
    (insert (format "Hello %s!\n\nI am %s." your-name from-name))
    (other-window 1)))
```

测试一下：

```auto
(greeting "Bastien")
```

* * *

## 列表

我们将一些名字存到列表中：

```auto
(setq list-of-names '("Sarah" "Chloe" "Mathilde"))
```

> 所有的记号都会依据Scheme的求值规则求值：所有记号都会从最内层的括号依次向外层括号求值，且最外层括号返回的值将作为S-表达式的值。**一个被称为引用（quote）的形式可以用来阻止记号被求值**。

```auto
注意：表是Cons单元通过用cdr部分连接到下一个Cons单元的开头实现的。
表中包含的’()被称作空表。
就算数据仅由一个Cons单元组成，只要它的cdr单元是’()，
那它就是一个表，表(1 2 3)的内存结构。
```

![表(1 2 3)的内存结构](https://img-blog.csdnimg.cn/20190725130143271.png)

用 `car`来取得第一个名字：

```auto
(car list-of-names)
```

用 `cdr`取得剩下的名字:

```auto
(cdr list-of-names)
```

用 `push`把名字添加到列表的开头:

```auto
(push "Stephanie" list-of-names)
```

```auto
注意: `car' 和 `cdr' 并不修改列表本身, 但是 `push' 却会对列表本身进行操作.
```

这个区别是很重要的: 有些函数没有任何副作用比如car，但还有一些却是有的 (比如 push’).

## 改进版 greeting

我们来对\`list-of-names’列表中的每一个元素都使用hello函数:

```auto
(mapcar 'hello list-of-names)
```

将 greeting改进，使的我们能够对**list-of-names**中的所有名字执行:

```auto
(defun greeting ()
    (switch-to-buffer-other-window "*test*")
    (erase-buffer)
    (mapcar 'hello list-of-names)
    (other-window 1))

(greeting)
```

记得我们之前定义的 hello函数吗？ 这个函数接受一个参数，名字。

```auto
mapcar 调用 `hello', 并将`list-of-names'作为参数先后传给`hello'
```

现在我们对显示的buffer中的内容进行一些更改：

```auto
(defun replace-hello-by-bonjour ()
    (switch-to-buffer-other-window "*test*")
    (goto-char (point-min))
    (while (search-forward "Hello")
      (replace-match "Bonjour"))
    (other-window 1))
```

(goto-char (point-min)) 将光标移到buffer的开始  
(search-forward “Hello”) 查找字符串"Hello"  
(while x y) 当x返回某个值时执行y这个s式  
当x返回\`nil’ (空), 退出循环

```auto
(replace-hello-by-bonjour)
```

你会看到所有在*test* buffer中出现的"Hello"字样都被换成了"Bonjour"

你也会得到以下错误提示: “Search failed: Hello”.  
如果要避免这个错误, 你需要告诉 \`search-forward’ 这个命令是否在  
buffer的某个地方停止查找, 并且在什么都没找到时是否应该不给出错误提示  
(search-forward “Hello” nil t) 可以达到这个要求:

```auto
nil参数的意思是 : 查找并不限于某个范围内
t 参数的意思是:   当什么都没找到时，不给出错误提示
```

在下面的函数中，我们用到了s式，并且不给出任何错误提示:

```auto
(defun hello-to-bonjour ()
    (switch-to-buffer-other-window "*test*")
    (erase-buffer)
```

为\`list-of-names’中的每个名字调用hello

```auto
(mapcar 'hello list-of-names)
    (goto-char (point-min))
```

将"Hello" 替换为"Bonjour"

```auto
  (while (search-forward "Hello" nil t)
    (replace-match "Bonjour"))
  (other-window 1))
(hello-to-bonjour)
```

给这些名字加粗:

```auto
(defun boldify-names ()
    (switch-to-buffer-other-window "*test*")
    (goto-char (point-min))
    (while (re-search-forward "Bonjour \\(.+\\)!" nil t)
      (add-text-properties (match-beginning 1)
                           (match-end 1)
                           (list 'face 'bold)))
    (other-window 1))
```

这个函数使用了 \`re-search-forward’:  
和查找一个字符串不同，你用这个命令可以查找一个模式，即正则表达式

正则表达式 “Bonjour \\(.+\\)!” 的意思是:

+   字符串 "Bonjour ", 之后跟着一组 | \\( … \\) 结构
+   任意字符 | . 的含义
+   有可能重复的 | + 的含义，之后跟着 “!” 这个字符串

准备好了？试试看。

```auto
(boldify-names)
```

`add-text-properties` 可以添加文字属性, 比如文字样式

好的，我们成功了！

* * *

## 更多功能

如果你想对一个变量或者函数有更多的了解：  
`C-h v` 变量 回车，`C-h f` 函数 回车  
阅读Emacs Lisp官方文档:`C-h i m elisp` 回车

### 如有错误，欢迎评论指出，感谢！


## 参考

[步步为营，零秒精通 Emacs](https://github.com/AbstProcDo/Master-Emacs-From-Scratch-with-Solid-Procedures/blob/master/readme-cn.org "步步为营，零秒精通 Emacs")

[org-mode: 最好的文档编辑利器，没有之一](https://blog.csdn.net/yo746862873/article/details/52586339?spm=1001.2014.3001.5502 "org-mode: 最好的文档编辑利器，没有之一")

[灬鬼谷灬](https://blog.csdn.net/yo746862873?type=blog "灬鬼谷灬")

[elisp](https://so.csdn.net/so/search?spm=1000.2115.3001.4498&q=elisp&t=&u= "elisp")
