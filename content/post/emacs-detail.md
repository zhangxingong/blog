+++
title = "Emacs详细教程"
date = "2023-11-23T13:22:01+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 转自：[http://www.cnblogs.com/holbrook/archive/2012/02/15/2357335.html](http://www.cnblogs.com/holbrook/archive/2012/02/15/2357335.html)

内容提要

> 1.Emacs是什么
> 
> 2\. Emacs能做什么
> 
> 3\. Emacs的界面
> 
> 4.基本概念--命令
> 
> 5\. 基本概念--快捷键
> 
> 6\. 基本概念--模式

### Emacs学习笔记2: 初识Emacs

#### 1.Emacs是什么

其实很难给Emacs下一个定义。正统的说法也许是"[Emacs即Editor MACroS（宏编辑器），是一种文本编辑器](http://zh.wikipedia.org/zh-cn/Emacs)"。

最初人们认为Emacs是一个编辑器(Editor)，与Vim一起并称为两大神器，据说Vim是编辑器之神而Emacs是神之编辑器，又据说世界上的程序员分三种，一种使用Emacs，一种使用vim，剩余的是其它。

也有人认为Emacs是一个架构在编辑器上的集成环境，除了最基本的编辑功能，还可以完成文件管理、终端模拟、浏览网页、收发邮件、编译程序等工作，以及煮咖啡。

更有人说Emacs是伪装成编辑器的操作系统，甚至说[Emacs是一种信仰](http://www.pconline.com.cn/pcedu/soft/gj/photo/0609/865628.html)。

Emacs最初由RichardStallman在1975年开发，之后产生了众多的衍生版本，而目前使用得最多的两个版本是RichardStallman在1984年开发的GNUEmacs和1991年由JamieZawinski写成的XEmacs。Emacs可谓历史悠久，目前的GNU Emacs的版本是23.4。[一部Emacs的历史,等于一部计算机史,一部世界黑客史](http://wiki.woodpecker.org.cn/moin/EmacsHackerHistory?highlight=%28Emacs%29)。本文不想将[编辑器大战](http://en.wikipedia.org/wiki/Editor_war)的战火烧到这里，所以还是就此打住，来看看Emacs能做什么。

#### 2\. Emacs能做什么

[王垠](http://baike.baidu.com/view/1928287.htm)师兄[如是说](http://docs.huihoo.com/homepage/shredderyin/emacs_power.html):

据我所知，Emacs 的能力包括:  
1.    编辑文本  
2.    编辑程序  
3.    作为其它程序的界面  
4.    作为操作系统  
5.    煮咖啡

  
Emacs是一个具有超强扩展性,超强定制性的操作平台，它能做什么取决于你对它的定制和扩展。Emacs之所以强大，就来源于其近乎无限的可定制性和可扩展性。

#### 3\. Emacs的界面

未定制的Emacs如下图所示:

![0 1329317327v33B](/img/editor-emacs-initial.jpg)

整个窗口在Emacs中叫做frame，图形界面下的Emacs可以打开多个frame。每个frame从上到下分成3部分，分别是缓冲区,状态栏和回显区。

缓冲区是编辑的主区域，但是在这里操作的还不是真正的文件，而是文件的一个缓存(buffer)。只有执行写入操作时，才会将buffer的内容写入到文件。缓冲区可以分成多个区域，缓冲不同的内容。这些区域在Emacs中成为"窗口"。

缓冲区之下是状态栏，显示当前的一些状态信息，比如图中从左至右依次为:  
U: 当前的文件编码是UTF-8, 如果是GBK会显示c  
\*\*: 文件状态，\*\*表示未保存，--表示可写，%%表示只读  
Emacs1: 是当前编辑的文件的名称  
All: 表示当前缓冲区已经显示文件的所有内容，否则会显示比如Bot,表示处于文件的末尾处  
L23: 当前光标所在的行数  
fundamental: 当前的模式  
等等，不同发行版的Emacs显示的状态栏内容可能会有所不同。

最下面是回显区，提示当前正在进行的操作。比如"文件已保存"之类的信息。如果一个命令没有输入完，这里还会显示已经输入的指令，提示用户。

#### 4.基本概念--命令

对Emacs所有的操作都是通过调用命令实现的。对于一些常用的命令，会定义快捷键以便快速使用。  
不管是否有快捷键，都可以通过M-x command 的方式执行命令。（M-x即Alt+x，是一种快捷键，后面会有介绍）比如输入回车，相当于:  
M-x newline  
通过M-x执行命令时，可以使用 TAB 补全，使用 M-p 上翻， M-n 下翻。  
Emacs中的取消通常是连按三下ESC：  
ESC ESC ESC (M-x keyboard-escape-quit)  
但是在命令执行过程中，有可能该命令无法使用（比如有些命令是交互式的，需要输入一些参数），所以中止一条命令的执行最好使用C-g (M-x keyboard-quit)。

#### 5\. 基本概念--快捷键

本质上，快捷键只是一种发送命令的方法！  
Emacs的快捷键通常以组合键的方式定义。如M-x 表示Alt+x。前面的字母M代表修饰符，Emacs定义的修饰符如下：  
C-：Control  
M-: Alt（应该是Meta，在 PC 上，Meta键 通常对应 Alt 键）  
C-M-： 同时按住 Ctrl 和 Alt   
S-：Shift  
RET：Return  
TAB：Tab  
ESC：Esc，等价于M-。比如，C-M-r ,等价于ESC C-r  
SPC：空格键  
DEL：退格键  
Delete：删除键

上面提到了ESC C-r。这是一种组合方式，表示先按ESC，再按C-r。Emacs中的很多快捷键定义成组合的方式。如 C-x C-c（M-x save-buffers-kill-emacs）  
此外还有些命令可以传递参数，在Emacs的表示法中用 (#) 代表。如:  
C-u (#) C-f 代表重复#次C-f

#### 6.基本概念--模式

Emacs是一种“有模式”的编辑器。如果用过Vim就很容易理解。不过Emacs中的模式分成主要模式（major mode）和次要模式（minor mode）两种。  
主要模式由文件类型决定，每个buffer打开文件时会根据文件类型决定其主要模式。常见的主要模式有：

fundamental-mode：缺省的 Emacs 模式，拥有最少设置和绑定  
text-mode：编辑文本的基本模式  
c-mode：用于编辑 C 程序源代码  
lisp-interaction-mode:用于编辑和编译 Lisp 代码  
ptex-mode：用于编辑 TeX 文档

次要模式可以组合到主要模式中，常见的次要模式比如：

abbrev-mode：用于生成和使用缩写  
auto-fill-mode：用于自动文字回绕、填充较长的行和段落  
line-number-mode：显示当前行号  
overwrite-mode：覆盖模式，代替默认的插入模式

可以通过命令来指定模式：M-x  mode\_name  
对于一个buffer来说，当前的主要模式只能有一种，当指定主要模式时，原来的主要模式会被替换；而当前的次要模式可以有多种。  
如果输入的模式包含在当前模式中，对于主要模式，会清空所有的次要模式；对于次要模式，会关闭这个次要模式。  
模式的变化在状态栏中可以看到。

## [Emacs学习笔记（3）：帮助系统](http://www.cnblogs.com/holbrook/archive/2012/02/16/2357334.html)

GNU的软件大多有丰富的帮助系统，学习GNU的软件时，首先学习如何使用其帮助系统，往往事半功倍。Emacs的帮助文档很多，并大部分都在C-h开头的组合键中。

首先是C-h ？，关于帮助系统的“帮助”。改命令会打开一个新的Frame，如下图：

![0 1329368000o9y4](/img/editor-emacs-helps.jpg)

从该文档中摘录常用的帮助功能如下：

| 快捷键 | 命令 | 说明 |
| --- | --- | --- |
| C-h ? |   | 关于帮助系统的帮助，可以通过SPC和DEL键滚动，通过ESC退出 |
| C-h t | M-x help-with-tutorial | 进入 《Emacs 快速指南》 |
| C-h r | M-x info-emacs-manual | Emacs使用手册 |
| C-h i | M-x info | 《Emacs说明》 |
| C-h a | M-x apropos-command | 搜索命令》 |
| C-h v | M-x describe-variable | 查看变量说明》 |
| C-h f | M-x describe-function | 查看函数说明》 |
| C-h m | M-x describe-mode | 查看当前mode的相关文档，包含mode中的命令、快捷键等》 |
| C-h k KEYS | M-x describe-key KEYS | 查看快捷键对应的命令及其简要说明，比如C-h k C-x C-c，会告诉你C-x C-c是做什么的》 |
| C-h c KEYS | M-x describe-key-briefly | 查看键绑定说明》 |
| C-h w | M-x where-is | 查看某个命令对应的快捷键》 |
| C-h b | M-x describe-bindings | 查看当前buffer所有的快捷键列表》 |
| KEYS C-h |   | 查看当前buffer中以某个快捷键序列开头的快捷键列表，比如C-c C-h》 |
|   | M-x apropos | 查看匹配某个关键词的任何东西，如函数，变量，命令，模式等》 |

  
1\. C-h t 《Emacs快速指南》是迅速上手最好的文档。

2\. 使用帮助时，可能会分割出其它Frame，可以通过 C-x 1 关闭。

## [Emacs学习笔记（4）：基本的编辑功能](http://www.cnblogs.com/holbrook/archive/2012/02/18/2357332.html)

掌握了[Emacs的帮助系统](http://www.cnblogs.com/holbrook/archive/2012/02/16/2357334.html)，就可以自己随时学习了。但是还是应该有一个主线。尽管[Emacs能做的事情很多](http://www.cnblogs.com/holbrook/archive/2012/02/15/2357335.html)，但首先Emacs是一个编辑器。所以还是应该从文本编辑的功能开始。完成本节的内容后，可以应付日常的大部分编辑工作。

内容提要

+   文件操作
+   光标定位
+   输入删除
+   复制粘贴
+   撤销重做

#### 1.文件操作

文件操作的快捷键都集中在C-x"菜单"中:

快捷键(C-x)     命令(M-x)                                          说明  
C-x C-f              find-file                                              打开文件或录  
C-x C-c             save-buffers-kill-emacs                 保存退出  
C-x C-z             iconify-or-deiconify-frame             挂起（最小化）  
C-x C-f              find-file                                              打开文件、目录  
C-x C-r             find-file-read-only                            以只读模式打开  
C-x i                  insert-file                                           插入文件  
C-x C-s             save-buffer                                       保存  
C-x s                 save-some-buffers                          保存所有未保存的缓冲区  
C-x C-w            write-file                                            另存为文件  
C-x RET r         revert-buffer-with-coding-system  以指定编码读取文件  
C-x RET f         set-buffer-file-coding-system         以指定编码保存文件  
revert-buffer                                      恢复到原始状态  
C-x d                dired                                                   进入目录列表模式  
C-x C-d            list-directory                                      获取文件列表（简洁）

#### 2\. 光标定位

向前    向后    向下    向上          
翻页                           C-v    M-v  
字符        C-f       C-b     C-n    C-p  
单词        M-f       M-b  
句           M-a      M-e  
行           C-a       C-e  
段落       M-{        M-}  
缓冲区   M-<      M->

其它：  
M-g M-g     (goto-line)                      跳转到某行  
M-x              (goto-char)                    跳转到字符位置:       
C-M-l          (reposition-window)    将当前行卷至页面中部  
C-l               (recenter)                       刷新页面，将将当前行卷至页面中部 （使用数字参数指定行）  
M-r M-x      (move-to-window-line) 移动光标至页面中间的行 （使用数字参数指定行）

#### 3.输入删除

输入很简单，在缓冲区直接敲键盘就OK了（这个不像Vim）

删除：

向前        向后  
字符     C-d         DEL  
单词     M-d        M-DEL   
行         C-k（删除至行尾）  
整行                   C-S-backspace  
按表达式删除    C-M-k  
区块     C-w  
删除连续空格     M-x delete-horizontal-space

注1：在PC中,用Backspace代替DEL  
注2：单词、行、区块的删除是kill，相当于剪切，会被放入kill-ring，字符及空格的删除是delete

#### 4.复制粘贴

复制前要先选择:C-@开始区块选择，然后移动光标，选中的区域会高亮  
剪切:前面"删除"的部分包括了一些剪切操作，对区块的剪切用C-w  
复制:区块复制用M-w，至于复制1行，复制1个单词之类的功能，自己想办法吧:(  
粘贴: C-y:粘贴kill-ring堆栈的最后一次的内容  
C-y 之后可以继续M-y, 对Kill-ring中的内容依次召回

#### 5.撤销重做

撤销: C-/  (每插入20个字符，视为一个 undo 的单位)  
重做: C-/ 后，依次输入C-g C-/ 就可以redo

## [Emacs学习笔记（5）：更有效率的编辑](http://www.cnblogs.com/holbrook/archive/2012/02/18/2357660.html)

前面学习了[Emacs的基本编辑功能](http://www.cnblogs.com/holbrook/archive/2012/02/18/2357332.html)。为了让编辑更有效率，还需要了解：

+   窗口管理
+   缓冲区管理
+   搜索和替换
+   批量处理

#### 窗口管理

C-x 2           split-window-vertically           水平分割  
C-x 3           split-window-horizontally       竖直分割  
C-x 1           delete-other-window             只保留当前窗格  
C-x 0           delete-window                      关闭当前窗格  
C-x o           other-window                        切换窗格  
C-M-v           scroll-other-window             滚动下一个窗格

#### 缓冲区管理

Emacs中，打开新的buffer，不会关闭原有buffer，而是需要手工操作:  
C-x C-b          list-buffers               查看缓冲区列表  
C-x b              switch-to-buffer       切换缓冲区  
C-x k               kill-buffer                关闭缓冲区  
其他:可以参考ibuffer.el扩展

#### 搜索和替换

Emacs中的搜索包括增量搜索和一般搜索。增加搜索是每次在前一次搜索的结果基础上继续搜索。在增量搜索时，如果上一次搜索之后进行了其他操作，则需要连续按两次快捷键才能召回关键词。  
可以选中区块后在区块内进行搜索  
 

增量搜索

C-s M-x         isearch-forward                向前增量搜索   
C-r M-x          isearch-backward            向后增量搜索   
C-M-s M-x     isearch-forward-regexp    正则表达式向前增量搜索   
C-M-r M-x     isearch-backward-regexp 正则表达式向后增量搜索

一般搜索

M-x               search-forward                 向前搜索     
M-x               search-backward              向后搜索    
M-x               search-forward-regexp     正则表达式向前搜索    
M-x               search-backward-regexp 正则表达式向后搜索

替换

M-x                replace-string                  替换     
M-x                replace-regexp                正则表达式替换

询问替换

M-% M-x       query-replace              询问替换   
C-M-% M-x   query-replace-regexp 正则表达式询问替换

取消搜索

C-g 取消搜索，光标返回搜索前的位置  
RET结束搜索，光标停留在当前位置。  
 

#### 批量处理

批量处理的命令应该有很多，这里列出2个：  
选中区域， M-x untabify：将 TAB 字符转换为空格  
选中区域， M-x indent-region：对齐文本块

## [Emacs学习笔记(6)：常用命令备忘（打印版）](http://www.cnblogs.com/holbrook/archive/2012/02/28/2371205.html)

[博客搬家](http://www.cnblogs.com/holbrook/archive/2012/02/21/2361255.html)，加上换办公区，[Emacs的学习计划](http://www.cnblogs.com/holbrook/archive/2012/02/15/2357336.html)就耽搁了。

可能是因为年纪大了，记性大不如以前，新学的很多Emacs快捷键/命令都记不住。所以要整理一个常用命令清单（与[当初学习Vim一样](http://www.cnblogs.com/holbrook/archive/2009/05/13/2357377.html))，并且打印出来贴在电脑边。

刚开始不可贪多，所以只整理了：  
Key Mapping, Important, Help, File, Cursor,  Cut/Del/Copy/Paste, Buffer, Window, Undo/Redo, Search/Replace几个部分，控制在2页A4纸之内。

附图如下：

![](/img/img_convert/560d670f5f9a8d353c4b79cc58c9b80e.png)

不知道谁能告诉我，博客园可以上传附件吗？

## [macs学习笔记(7)：简单的配置](http://www.cnblogs.com/holbrook/archive/2012/03/06/2381636.html)

继续[Emacs学习计划](http://www.cnblogs.com/holbrook/archive/2012/02/15/2357336.html)。这是“初学者”阶段的最后一篇。完成本节的内容，就可以向“中级计划”进军了 : )

经过一段时间的使用，已经大体适应了Emacs的快捷键，不过还是要参考[命令备忘表](http://www.cnblogs.com/holbrook/archive/2012/02/28/2371205.html)。

Emacser通常要对Emacs进行定制，使用起来才会爽。据说Vimer嘲笑Emacser的一个理由就是：

> Emacser如果丢了配置文件就什么都干不了。

好吧好吧，这些争论和我没什么关系，我只是恰好原来用Vim现在喜欢上了Emacs。还是回到Emacs的简单定制吧。

1\. 配置文件

Emacs的配置文件在~/.emacs。现在就用Emacs打开这个文件吧，如果没有就创建一个。首先改一下颜色配置，让Emacs看起来更酷一些:

> (set-background-color "black") ;; 使用黑色背景  
> (set-foreground-color "white") ;; 使用白色前景  
> (set-face-foreground 'region "green")  ;; 区域前景颜色设为绿色  
> (set-face-background 'region "blue") ;; 区域背景色设为蓝色

  
尽管可以重启Emacs使配置生效，但更快捷的方式是在打开~/.emacs的时候执行命令M-x eval-buffer，就可以使配置文件立即生效。

2\. 安装插件

Emacs和Vim都有大量的插件，一些经久不衰、广泛使用的插件组合起来，就体现出一种"集体智慧"。

Emacs的插件一般都是一个以el为后缀名的文件。首先要指定一个插件目录，比如~/.emacs.d/lisps然后在~/.emacs中指定插件目录和要使用的插件:

> (add-to-list 'load-path "~/.emacs.d/lisp/")  
> (require 'pluginname')

还是玩一下颜色设置。前面的方法只是进行了一些简单的颜色设置，但是有热心人写了插件，配置好了很多方案，不仅仅是前景背景色，还包括语法高亮等。从[这里](http://download.savannah.gnu.org/releases/color-theme/)下载，解压后将color-theme.el文件和themes文件夹复制到插件目录，然后修改配置文件:

> (add-to-list 'load-path "~/.emacs.d/lisp/")
> 
> (require 'color-theme)
> 
> (color-theme-initialize)  
>  

M-x eval-buffer使配置生效后，可以执行插件提供的命令:M-x color-theme-select RET进入配色方案选择界面。我选择的是Classic

![Screenshot](/img/0a8c25d54b7ecfd2135a1156e9c580db.png)

  
选好之后，你可能希望将配色方案设成默认，还是修改配置文件。在配色方案选择界面中选择主题后按d，会出现该配置的提示信息，比如：

> color-theme-classic is an interactive Lisp function in  
> \`color-theme-library.el'.
> 
> (color-theme-classic)
> 
> Color theme by Frederic Giroud, created 2001-01-18.  
> AntiqueWhite on darkslategrey scheme.  Based on Gnome 2, with my favorit  
> color foreground-color and fontlock color.

将类似(color-theme-classic)的内容添加到.emacs中，就可以每次启动Emacs时自动选择配色方案了。

3\. 进阶

不要迷信自己，不要一开始就尝试自己定制Emacs。一定要参考甚至抄袭大牛们的设置。比如[Steve Purcell](https://github.com/purcell/emacs.d)。学习他们的配置，不仅能让你直接学会“最佳实践”，更能加深你对Emacs的理解。

最后再回顾一下《Emacs初学者的学习计划》：

1. [要学习必须有一个计划](http://www.cnblogs.com/holbrook/archive/2012/02/15/2357336.html)

2. [认识Emacs，Emacs不仅仅是一个编辑器](http://www.cnblogs.com/holbrook/archive/2012/02/15/2357335.html)

3. [使用Emacs的帮助系统，随用随学](http://www.cnblogs.com/holbrook/archive/2012/02/16/2357334.html)

4. [掌握了基本的功能，就可以开始用，而且要多用](http://www.cnblogs.com/holbrook/archive/2012/02/18/2357332.html)

5. [其实你可以更快地编辑](http://www.cnblogs.com/holbrook/archive/2012/02/18/2357660.html)

6. [命令太多记不住，可以打印出来随时查阅](http://www.cnblogs.com/holbrook/archive/2012/02/28/2371205.html)

7. [了解如何定制Emacs，并参考大师的配置](http://www.cnblogs.com/holbrook/archive/2012/03/06/2381636.html)

完成这些内容，可以说是对Emacs入门了，接下来可以学习如何用Emacs写代码，GTD，发邮件，浏览网页等等，在实现这些目标的同时提高自己的Emacs水平，最终将Emacs上升到一种信仰。
