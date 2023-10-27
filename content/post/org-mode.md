+++
title = "org-mode语法 | orgmode"
date = 2023-10-27T13:43:57+0800
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

* 大纲
Org-mode天然支持大纲视图，通过在文档中定义标题，可以方便的浏览每个小节，从而把握文档的总体内容。
** 标题
正文中的标题用*标记，位于行首,*之后要有一个空格，然后再输入标题文字，连续几个*就表示是第几级标题，最多支持10级。
#+BEGIN_HTML
<!-- more -->
#+END_HTML
** 大纲相关快捷键
*** 折叠
| S-TAB | 循环切换整个文档的大纲状态（三种状态：折叠，打开下一级，打开全部） |
|-------+--------------------------------------------------------------------|
| TAB   | 循环切换光标所在大纲的状态                                         |
*** 移动
| C-c C-n/p | 下/上一标题                 |
|-----------+-----------------------------|
| C-c C-f/b | 下/上一标题（仅限同级标题） |
| C-c C-u   | 跳到上一级标题              |
| C-c C-j   | 切换到大纲浏览状态          |
*** 编辑
| M-RET          | 插入一个同级标题                                   |   |   |
|----------------+----------------------------------------------------+---+---|
| M-S-RET        | 插入一个同级TODO 标题                              |   |   |
| M-LEFT/RIGHT   | 将当前标题升/降级                                  |   |   |
| M-S-LEFT/RIGHT | 将子树升/降级                                      |   |   |
| M-S-UP/DOWN    | 将子树上/下移,即交换子树顺序                       |   |   |
| C-c *          | 将本行设为标题/正文                                |   |   |
| C-c C-w        | 将子树或区域移动到另一标题处（跨缓冲区）           |   |   |
| C-x n s/w      | 只显示当前子树/返回                                |   |   |
| C-c C-x b      | 在新缓冲区显示当前分支（类似C-x n s)               |   |   |
| C-c /          | 只列出包含搜索结果的大纲，并高亮，支持多种搜索方式 |   |   |
| C-c C-c        | 取消高亮                                           |   |   |
更多的快捷键可以通过C-c C-x C-h查看。
*** 缩进
M-x org-indent-mode切换是否缩进。某个文件缩进模式打开，头部加 #+STARTUP: indent，所有org文件以缩进模式打开，init.el加
#+BEGIN_SRC elisp
(setq org-startup-indented t)
#+END_SRC
* 链接
1. 符合链接规则的内容，org-mode会自动将其视为链接
2. 文件链接，用::后面增加定位符的方式链接到文件的特定位置，定位符可以是行号或搜索选项，如：
    #+BEGIN_SRC sh
    file:~/code/main.c::255                     进入到 255 行
    file:~/xx.org::My Target                    找到目标‘<<My Target>>’
    file:~/xx.org/::#my-custom-id               查找自定义 id 的项
    #+END_SRC
3. 指定链接
    #+BEGIN_SRC sh
    [[link][description]]
    [[link]]
    #+END_SRC
* 标记语言
标记语言的对比，[[http://www.worldhello.net/gotgithub/appendix/markups.html][看这里]]
** 字体
#+BEGIN_SRC sh
*粗体*
/斜体/
+删除线+
_下划线_
下标： H_2 O (这里必须留一个空格要不然2和O都成为小标，目前还不知道怎么去掉空格)
上标： E=mc^2
等宽字：  =git= 或者 ~git~
#+END_SRC
*粗体* /斜体/ +删除线+ _下划线_ H_{2}O E=mc^{2} =git=
** 段落
对于单个回车换行的文本，认为其属于同一个段落。在导出的时候将会转化为不换行的同一段。如果要新起一个段落需要回车两次，还有一种方法就是在需要换行的地方输入\\。
两种显示结果是不同的。

org-mode编辑的时候默认没有自动换行，可以在init.el加下面的一句实现自动换行。
#+BEGIN_SRC elisp
(add-hook 'org-mode-hook (lambda () (setq truncate-lines nil)))
#+END_SRC
** 表格
org可以很方便的处理表格,任何以'|'为首个非空字符的行都会被认为是表格的一部分。'|'也是列分隔符。一个表格是下面的样子：
#+CAPTION： 标题
| Name  | Pone | Age |
|-------+------+-----|
| Peter |  123 |  18 |
| Anna  |  234 |  19 |
只需要输入表头“|Name|Pone|Age”之后，按C-c RET,就可以生成整个表格的结构。
*** 常用快捷键
**** 创建
| C-c 竖线 | 创建或转换表格(提示列x行) |
**** 移动
| TAB     | 移动到下一区域，必要时新建一行 |
| S-TAB   | 移动到上一区域                 |
| RET     | 移动到下一行，必要时新建一行   |
| C-c C-c | 自动调整表格                   |
**** 编辑
| M-LEFT/RIGHT   | 移动列                           |
| M-UP/DOWN      | 移动行                           |
| M-S-LEFT/RIGHT | 删除/插入列                      |
| M-S-UP/DOWN    | 删除/插入行                      |
| C-c -          | 添加水平分割线                   |
| C-c RET        | 添加水平分割线并跳到下一行       |
| C-c ^          | 根据当前列排序，可以选择排序方式 |

** 列表
1. 有序列表、无序列表和描述列表。
   + 无序列表以'-'、'+'或者'*'开头
   + 有序列表以'1.'或者'1)'开头
   + 描述列表用'::'
2. 注意事项
   + 列表符号后面都要有空格
   + 同级别的列表缩进要相同
   + 如果想要加入同级别的列表，可以 M-RET
   + 空两行之后列表结束


*** 列表快捷键
| TAB            | 折叠列表项                |   |
|----------------+---------------------------+---|
| M-RET          | 插入项                    |   |
| M-S-RET        | 插入带复选框的项          |   |
| M-S-UP/DOWN    | 移动列表项                |   |
| M-LEFT/RIGHT   | 升/降级列表项，不包括子项 |   |
| M-S-LEFT/RIGTH | 升/降级列表项，包括子项   |   |
| C-c C-c        | 改变复选框状态            |   |
| C-c -          | 更换列表标记（循环切换）  |   |
** 分隔线
五条短线或以上显示为分隔线。
#+BEGIN_SRC sh
-----
#+END_SRC
-----
** 语法块常用语言格式
参考[[http://www.gnu.org/software/emacs/manual/html_node/org/Structure-of-code-blocks.html][Structure of code blocks]]
| Language   | Identifier |
|------------+------------|
| Awk        | awk        |
| C          | C          |
| C++        | C++        |
| Clojure    | clojure    |
| CSS        | css        |
| ditaa      | ditaa      |
| Graphviz   | dot        |
| Emacs Lisp | emacs-lisp |
| Java       | java       |
| Javascript | js         |
| LaTex      | latex      |
| MATLAT     | matlab     |
| Org mode   | org        |
| Python     | python     |
| Scheme     | scheme     |
| shell      | sh         |
| SQL        | sql        |
| SQLite     | sqlite     |
* 参考
[[http://www.cnblogs.com/qlwy/archive/2012/06/15/2551034.html#sec-4-2][神器中的神器org-mode之入门篇]] \\
[[http://www.cnblogs.com/holbrook/archive/2012/04/12/2444992.html][Emacs学习笔记(9):org-mode，最好的文档编辑利器，没有之一]] \\
[[http://www.cnblogs.com/waterlin/archive/2011/10/09/2203996.html][转义问题]]
