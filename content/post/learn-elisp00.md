+++
title = "GTD,ELisp教程"
tags = ["gtd","极客","语言","脚本","批处理","geek","过程","函数","重复","自动化"]
categories = ["建站"]
toc = true
hiddenFromHomePage = false
date = 2023-05-24T20:07:00+08:00
draft = false
author = "zhangxingong"
+++
### 阅读gtd

Entered on <span class="timestamp-wrapper"><span class="timestamp">[2023-05-22 Mon 09:42]</span></span>
-天气: 下雨



### 学习GTD 

define:
GETTING THINGS DONE® is a personal productivity methodology that redefines how you approach your life and work.

1.  step1:

STEP 1
CAPTURE
Collect what has your attention
Write, record, or gather any and everything that has your attention into a collection tool.

1.  step2:

STEP 2
CLARIFY
Process what it means
Is it actionable? If so, decide the next action and project (if more than one action is required). If not, decide if it is trash, reference, or something to put on hold.

1.  step:3

STEP 3
ORGANIZE
Put it where it belongs
Park reminders of your categorized content in appropriate places.

1.  step:4

    STEP 4

REFLECT
Review frequently
Update and review all pertinent system contents to regain control and focus.

1.  step：5

STEP 5
ENGAGE
Simply do
Use your trusted system to make action decisions with confidence and clarity.

purpose:
GETTING THINGS DONE 是一种个人生产力方法，它重新定义了您对待生活和工作的方式。


### Elisp 基础 

1.  S表达式 [S表达式](#s表达式)
2.  原子类型[ 变量作用域](#变量作用域)
3.  变量、函数、lambda
4.  特殊表达式[声明函数](#声明函数)
5.  列表  [列表](#列表)  [执行过程](#执行过程)
6.  执行方法
7.  执行过程 [执行过程](#执行过程)
8.  调试 [deug调试](#调试)
9.  画家与黑客 [黑客与画家 保罗：语言特性](#黑客与画家-保罗-语言特性)

10. [特殊表达式](#特殊表达式)
11. [lambda函数](#lambda函数)
12. [声明局部变量](#声明局部变量)
13. [变量类型](#变量类型)
14. [声明全局变量](#声明全局变量)
15. [原子](#原子)
16. [Elisp 基础](#elisp-基础)

<!--list-separator-->

-  S表达式

    前缀表示法，波兰式
	 {{< highlight scheme >}}
    （+ 2 2）
     (= 2 2)
    （expt 2 3）
    (/= 2 3)
    (and 1 0)
    (or t t)
    (not nil)
    (floor )
    (ceiling )
    (round )
    (truncate )
    (floatp )
    (integer p)
    (zerop 0)
    特殊符合 t nil
    (eq ) (equal )比较的是相同的类型， 等于号比较不同类型的number
    (string-to-number)
    {{< /highlight >}}
<!--list-separator-->

-  原子

    字符串，数字，符号

<!--list-separator-->

-  声明全局变量
 {{< highlight scheme >}}
    (setq name=value)
    (defvar name value "")
    (defconst name value "")
    {{< /highlight >}}
    <!--list-separator-->

    -  变量类型

        -   [ ] 全局变量
        -   [ ] let局部变量
        -   [ ] buffer-local
        -   [ ] 函数参数

        <!--list-separator-->

        -  变量作用域

            let变量
            infiniteScope 整个表达书有效
            词法作用域 在函数内，块里有效

<!--list-separator-->

-  声明函数

    (defun 函数名(函数列表) 函数体)
    （函数名 函数参数）
    函数列表 &amp;rest &amp;optional
    返回值最后一个S-表达式

<!--list-separator-->

-  声明局部变量
 {{< highlight scheme >}}
    (let (bind) (body))
    (let\* (bind)(body))
    {{< /highlight >}}
<!--list-separator-->

-  lambda函数
 {{< highlight scheme >}}
    (lambda (参数列表)(body))
    {{< /highlight >}}
<!--list-separator-->

-  特殊表达式
 {{< highlight scheme >}}
    (if (test) (true body) (false body))
    (when (test) a b c )
    (unless (test) a b c)
    (cond ((case 1) body) ((case 2) body) (t body) )
    (while test body)
    (mapcar 'fun body)
    (mapc 'fun body)
    (dolist (item result) body)
    (dotimes (i count) body)
    {{< /highlight >}}
<!--list-separator-->

-  列表

    创建向量
	 {{< highlight scheme >}}
    (make-vector size init)
    (make-list size init)
    (list a b c )
    {{< /highlight >}}
    <!--list-separator-->

    -  获取
 {{< highlight scheme >}}
        car
        cdr
        nth
        pop
    {{< /highlight >}}
    <!--list-separator-->

    -  截取
 {{< highlight scheme >}}
        nthcdr
        last
        butlast
    {{< /highlight >}}
    <!--list-separator-->

    -  拼接
 {{< highlight scheme >}}
        cons append
    {{< /highlight >}}
    <!--list-separator-->

    -  修改
 {{< highlight scheme >}}
        setcar
        setcdr
        nbutlast 删除
        pop
    {{< /highlight >}}
<!--list-separator-->

-  执行过程
 {{< highlight scheme >}}
    evalate-dispatch
    case is self-eval
    case is eval-vaiable
    case is special-form
         函数调用
         宏展开
         特殊规则
    {{< /highlight >}}
<!--list-separator-->

-  调试
 {{< highlight scheme >}}
    default-debug
    debugger-on-entry
    debugger-on-exist
    (debug)
    edebug
    {{< /highlight >}}
<!--list-separator-->

-  黑客与画家 保罗：语言特性

    条件
    函数
    递归
    变量动态性
    垃圾回收
    列表组成
    符号
    符合和常量组成表达树
    语言在编译期，读取期，运行期都可用


### Emacs 定制

-   键盘绑定
-   [ ] 定制主题，字体，modernLine
-   [ ] (defun name()interact 可以交互
-   [ ] 符号绑定功能
-   [ ] 默认值设定
-   [ ] 自动加载 autoload
-   [ ] 包管理 package-install package-remove package-install-file
-   [ ] org-mode 任务管理

Entered on <span class="timestamp-wrapper"><span class="timestamp">[2023-05-22 Mon 09:44]</span></span>
-天气: 阴天
-场地:办公
-心情:压抑
