+++
title = "Emacs，最强编辑器，没有之一"
date = "2023-11-23T11:35:10+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

> 小编知道，此标题一出，肯定会遭受广大群众“诟病”，说不好还会被其他编辑器的粉丝暗地里“干掉”。

> 比如，Vim，Sublime，Nano编辑器的粉丝可能就会来“踢馆”，VS或Eclipse的粉丝也兴许会“群起而攻”，但是小编只是表达一下自己的感受，为了效果也只能夸大一下了。  
> 所以请拍砖的时候轻一点，鸡蛋少扔几个。如果扔的鸡蛋多也请多扔几个番茄过来，再来几根葱，这样我可以做番茄炒蛋，谢谢。

> 有种张无忌在光明顶被6大门派“围剿”的架势...

对于很多人来说，使用Vim和Emacs，不仅是提升“逼格”的方式，更是上升到“信仰”的层面，夸张吧。当然这和宗教信仰不一样，只是一种可爱的“偏执”而已。

请参看我的 [第五部分第一课：Vim岂是池中物，宝剑锋从磨砺出](https://www.jianshu.com/p/2f9ab65776d4)。

不过，Emacs实在能做很多事，不要认为它只是一个文本编辑器，它可以说是一个整合环境，或可称它为“集成开发环境”，它还可以做以下事情：

+   上网，浏览网页
+   看视频
+   收发邮件
+   调试程序，结合GDB，EDebug等。支持C/C++，Perl，Python，Lisp等等
+   玩游戏
+   计算器
+   记日记
+   管理日程，Task，ToDo，约会等
+   个人信息管理
+   目录管理
+   文件比较
+   阅读info和man文档
+   等等

> 当然了，这里主要将Emacs作为文本编辑器来介绍。  
> 如果你要做特定开发，那还是用业界知名的IDE（集成开发环境）更加有效率。  
> 例如开发Android应用，那必须得上Android Studio（你不要跟我说你还在用Google已经不发布支持更新的Eclipse）；开发iOS应用，必须得上Xcode。  
> 如果你用Emacs来开发这些应用，那效率太低了。

小编以前在Linux下编写代码是使用Vim编辑器的，也极为强大。但是自从2014年接触到Emacs之后，就爱上了Emacs（fall in love with Emacs），Vim虽然有时还会用到（目前的公司的开发组大家基本都是用Vim，我也没办法只好用Vim，以方便和大家交流、演示），但其实我还是比较喜欢Emacs。

一开始我不知道为什么Emacs如此优美又强大，直到后来阅读了《[黑客与画家](https://link.jianshu.com/?t=https://book.douban.com/subject/6021440/)》这部经典著作（硅谷创业教父 Paul Graham 保罗•格雷厄姆所写，其实也就是他的一些日志汇编而成），里面讲述了[Lisp语言](https://link.jianshu.com/?t=http://www.ruanyifeng.com/blog/2010/10/why_lisp_is_superior.html)的强大和优美，而Emacs就是用Lisp语言编写的，怪不得。

闲扯一下为什么Lisp语言如此强大，虽然这门语言很老了（1958年被发明），在2015年6月的TIOBE编程语言排行榜也只有第31位，但是：

**摘录自 [阮一峰](https://link.jianshu.com/?t=http://www.ruanyifeng.com/) 翻译的《黑客与画家》一书，推荐大家一读**：

* * *

如果我们把流行的编程语言，以这样的顺序排列：Java、Perl、Python、Ruby。你会发现，排在越后面的语言，越像Lisp。

Python模仿Lisp，甚至把许多Lisp黑客认为属于设计错误的功能，也一起模仿了。至于Ruby，如果回到1975年，你声称它是一种Lisp方言，没有人会反对。

编程语言现在的发展，不过刚刚赶上1958年Lisp语言的水平。

1958年，John McCarthy设计了Lisp语言。我认为，当前最新潮的编程语言，只是实现了他在1958年的设想而已。

这怎么可能呢？计算机技术的发展，不是日新月异吗？

1958年的技术，怎么可能超过今天的水平呢？ 让我告诉你原因。 这是因为John McCarthy本来没打算把Lisp设计成编程语言，至少不是我们现在意义上的编程语言。他的原意只是想做一种理论演算，用更简洁的方式定义图灵机。

所以，为什么上个世纪50年代的编程语言，到现在还没有过时？简单说，因为这种语言本质上不是一种技术，而是数学。数学是不会过时的。

你不应该把Lisp语言与50年代的硬件联系在一起，而是应该把它与快速排序（Quicksort）算法进行类比。这种算法是1960年提出的，至今仍然是最快的通用排序方法。

直到今天，最高级的主流语言，也只是刚刚接近Lisp的水平。虽然已经很接近了，但还是没有Lisp那样强大。

Lisp语言诞生的时候，就包含了9种新思想。其中一些我们今天已经习以为常，另一些则刚刚在其他高级语言中出现，至今还有2种是Lisp独有的。

按照被大众接受的程度，这9种思想依次是：

1.  **条件结构（即"if-then-else"结构）**。现在大家都觉得这是理所当然的，但是Fortran I就没有这个结构，它只有基于底层机器指令的goto结构。
    
2.  **函数也是一种数据类型**。在Lisp语言中，函数与整数或字符串一样，也属于数据类型的一种。它有自己的字面表示形式（literal representation），能够储存在变量中，也能当作参数传递。一种数据类型应该有的功能，它都有。
    
3.  **递归**。Lisp是第一种支持递归函数的高级语言。
    
4.  **变量的动态类型**。在Lisp语言中，所有变量实际上都是指针，所指向的值有类型之分，而变量本身没有。复制变量就相当于复制指针，而不是复制它们指向的数据。
    
5.  **垃圾回收机制**。
    
6.  **程序由表达式（expression）组成**。Lisp程序是一些表达式区块的集合，每个表达式都返回一个值。这与Fortran和大多数后来的语言都截然不同，它们的程序由表达式和语句（statement）组成。
    
7.  **符号（symbol）类型**。符号实际上是一种指针，指向储存在哈希表中的字符串。所以，比较两个符号是否相等，只要看它们的指针是否一样就行了，不用逐个字符地比较。
    
8.  **代码使用符号和常量组成的树形表示法（notation）**。
    
9.  **无论什么时候，整个语言都是可用的**。Lisp并不真正区分读取期、编译期和运行期。你可以在读取期编译或运行代码；也可以在编译期读取或运行代码；还可以在运行期读取或者编译代码。
    

* * *

怎么样，是不是很有兴趣了解一下如此强大的Lisp语言开发出来的Emacs是如何优美呢？

当然此文不可能带大家领略所有Emacs的优美之处。说实话，Emacs肯定存在不足之处： 小编还是很“识相”的，不敢“冒天下之大不韪”。

更多Emacs的好处只有大家使用了才能慢慢领略。

### Emacs简介

* * *

Emacs是一种强大的文本编辑器，在程序员和其他以技术工作为主的计算机用户中广受欢迎。

EMACS，即Editor MACroS（编辑器宏）的缩写，最初由Richard Stallman(理查德·斯托曼)于1975年在MIT（麻省理工学院）协同Guy Steele共同完成。

Richard Stallman可是开源运动之父啊，我的[Linux探索之旅 | 开宗明义+第一部分第一课：什么是Linux？](https://www.jianshu.com/p/7c3a4f56f671)这一课专门介绍过他。

这位可爱的长胡子大叔抵制Apple，抵制Facebook，抵制Amazon，抵制不少公司和机构。他也是自由软件基金会（Free Software Foundation，简称FSF）的主席，而自由软件基金会主导了包括GNU在内的很多开源工程。

GNU工程使得世界各地的程序员可以为Linux操作系统开发周边软件等，才有了Linux的今天。不然Linus Tovarlds（Linux之父）基本上光是写了一个Linux内核，哪够啊。所以今天的Linux最正确的称谓应该是GNU/Linux 。

自诞生以来，Emacs演化出了众多分支，其中使用最广泛的两种分别是：1984年由Richard Stallman发起并由他维护至今的GNU Emacs，以及1991年发起的XEmacs。XEmacs是GNU Emacs的分支，至今仍保持着相当的兼容性。它们都使用了Emacs Lisp这种有着极强扩展性的编程语言，从而实现了包括编程、编译乃至网络浏览等等功能的扩展。

你可以使用Lisp语言改写Emacs的功能组件，而且可以更改配置，完全自定义Emacs，所以Emacs是充满无限可能的编辑器。

国际化

* * *

Emacs支持对多种文字的文本编辑，包括UTF-8在内的诸多编码系统，加上对多种字符集、文稿、书写系统，以及不同文化的书写习惯都提供了支持，使得世界上大多数语言的使用者都能通过Emacs进行文本处理。

Emacs还能通过调用诸如ispell这样的外部程序，实现多种语言的拼写检查。

跨平台性

* * *

Emacs是目前世界上最具可移植性的重要软件之一，能够在当前大多数操作系统上运行，包括类Unix系统（GNU/Linux、各种BSD、Solaris、AIX、IRIX、Mac OS X等等）、MS-DOS、Microsoft Windows以及OpenVMS等，还有移动Android平台以及iOS。

缓冲区的概念

* * *

初学Emacs需要理解什么是 **缓冲区**：

Emacs里的一切操作都发生在编辑缓冲区（buffer）里，它通常是某个文件的工作副本。如果你正在编辑的编辑缓冲区里包含着某个文件的一个副本，那么当你保存自己所做的改动时，Emacs把编辑缓冲区的内容复制到文件中。

除了工作在文件副本上的缓冲区外，还有一些做临时工作的缓冲区，它就像一张草稿纸，当然也可以随时使用write-file命令（"C-x C-w"）或save-buffer命令（“C-x C-s”）保存这类临时工作缓冲区的内容。

小编一开始也是对缓冲区的概念一知半解，不要怕，用着用着马上就理解了。

可以参考一些高手的Emacs教程和“练级”系列

* * *

[http://www.cnblogs.com/robertzml/archive/2009/09/10/1564108.html](https://link.jianshu.com/?t=http://www.cnblogs.com/robertzml/archive/2009/09/10/1564108.html)  
[http://blog.csdn.net/redguardtoo/article/details/7222501/](https://link.jianshu.com/?t=http://blog.csdn.net/redguardtoo/article/details/7222501/)  
[http://blog.sina.com.cn/s/blog\_6df127760101ll7a.html](https://link.jianshu.com/?t=http://blog.sina.com.cn/s/blog_6df127760101ll7a.html)  
[http://arch.pconline.com.cn//pcedu/soft/gj/photo/0609/865628\_1.html](https://link.jianshu.com/?t=http://arch.pconline.com.cn//pcedu/soft/gj/photo/0609/865628_1.html)

Emacs的官网和Wiki

* * *

[http://www.gnu.org/software/emacs/](https://link.jianshu.com/?t=http://www.gnu.org/software/emacs/)

目前最新版是Emacs 25.1

**Emacs的中文WiKi**：  
[http://www.emacswiki.org/emacs?interface=zh-cn](https://link.jianshu.com/?t=http://www.emacswiki.org/emacs?interface=zh-cn)

轻松一下，关于Emacs的一则玩笑

* * *

《Emacs 的日子是这个样子的》：

1.  听说有 Emacs 这个东西。试了一下，感觉就像记事本一样。没什么学习曲线。就是……咋也找不到退出的办法……
2.  开始会一些 Emacs 了，开始学习各种 mode，按键绑定，配置方法，开始熟悉 Emacs……
3.  比较熟悉 Emacs了，基本使用 Emacs干活，每天“活在” Emacs 里面……
4.  非常熟悉自己“常用”的 Emacs，可以教别人 Emacs，大量泡 Emacs社区，大量下载、使用和跟踪别人的扩展，已经离不了 Emacs……
5.  渐渐不满 Emacs，渐渐熟悉 Lisp 语言，开始改写“自己”的Emacs，在这期间，又开始四处碰壁，工作效率总是被一个失败的修改所影响……
6.  经常修改 Emacs，自己手中的 Emacs基本上每周都和上一周有那么一点不太一样…… 就是，改的太多了，经常在某天整理代码的时候突然发现……原来还有这么个易用的功能…… 忘记好久了……
7.  …… ……

### Emacs三个平台的安装与配置

* * *

1\. Windows下安装Emacs

请到以下链接下载Windows版的Emacs：

[https://ftp.gnu.org/gnu/emacs/windows/](https://link.jianshu.com/?t=https://ftp.gnu.org/gnu/emacs/windows/)

请大家下载列表中最新版本的zip文件，比如目前最新版的是2016年9月18日发布的25.1版：

emacs-25.1-x86\_64-w64-mingw32.zip

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNzgzMjE0LTU0YTJiMjU1YjZkNzlmZGYuSlBHP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy81MzkvZm9ybWF0L3dlYnA?x-oss-process=image/format,png)

下载后，用Winrar或7-zip等解压，会出来一个文件夹 emacs-25.1-x86\_64-w64-mingw32

内含四个子文件夹：

+   bin
+   libexec
+   share
+   var

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNzgzMjE0LTYwNTM2OGY5OWM3M2QwOWMuSlBHP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy82MjYvZm9ybWF0L3dlYnA?x-oss-process=image/format,png)

打开bin文件夹，运行其中的 emacs.exe 文件即可开启Emacs，不需要安装：

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNzgzMjE0LWIzNDg5YjM4MDNhNTJlMjQuSlBHP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy8xMDAwL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

> 你可以把emacs.exe这个文件锁定到**任务栏**，就很方便了，按一下图标就启动了。

2\. Linux下安装Emacs

* * *

Debian一族（包括Ubuntu）下安装Emacs：

```auto
sudo apt-get install emacs
```

Redhat一族（包括Fedora）下安装Emacs：

```auto
sudo yum install emacs
```

其他的可以搜索如何安装，或者下载Emacs的源代码来编译安装。

下面演示Linux如何下载Emacs的代码来编译安装（“逼格”最高的方式）：

+   首先去

[ftp://ftp.gnu.org/pub/gnu/emacs](https://link.jianshu.com/?t=ftp://ftp.gnu.org/pub/gnu/emacs)

+   上面有Emacs的几乎所有版本的源代码包，下载最新版的（用老版的也可以），如： emacs-25.1.tar.gz
    
+   解压 emacs-25.1.tar.gz 并编译，安装，在终端（Terminal）中依次运行以下命令（如果是其他版本，则将如下命令中的25.1替换为相应版本即可）：
    

```auto
tar -zxvf emacs-25.1.tar.gz   #（解压文件）
cd emacs-25.1                 #（进入目录）
./configure                   #（配置）
make                          #（编译）
sudo make install             #（安装，会提示输入你的用户密码）
```

+   安装完之后要启动Emacs很简单，开一个终端（Terminal），输入emacs，回车，就可以了。

不过小编嫌这样太麻烦，可以用更简单的方式来打开Emacs，我这里用一个键就可以了（演示环境是Fedora，不过其他系统如Ubuntu类似）：

+   打开Fedora的“设置” （肯定知道设置在哪里吧）
    
+   选择“键盘”
    
+   选择列表中的“自定义快捷方式”，然后点击加号“+”，用于添加新的快捷方式
    
+   选择快捷方式的按键，小编这里选的是F2这个键，然后填写命令，就是“emacs”，再填写快捷方式的名称，这个随便填，我填的是“Emacs”，确定。
    

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNzgzMjE0LWZhMmI0YmIyNWFkYjBkNTEuSlBHP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy82MzMvZm9ybWF0L3dlYnA?x-oss-process=image/format,png)

按F2键试试，是不是就启动Emacs啦？这酸爽，不言而喻！

3\. Mac OS下安装Emacs

* * *

Mac下安装Emacs，网上有不少文章，有用Git克隆下来Emacs的源码然后编译安装的； 也有用一些包管理软件来安装的，但是小编推荐一个更方便的方式，和Mac下安装QQ，迅雷那样方便：

[http://emacsformacosx.com/](https://link.jianshu.com/?t=http://emacsformacosx.com/)

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNzgzMjE0LWEzNWQ2MmZkNjMwMThlNDEuSlBHP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy82MDAvZm9ybWF0L3dlYnA?x-oss-process=image/format,png)

上这个网，然后下载那个dmg包，Mac用户肯定懂的，就是Mac下安装软件的最常用方式。然后就没有然后了... 如果这样你都不会装Emacs，那真心没必要用Emacs了。

### 自动补全插件

* * *

安装完Emacs之后，还需要安装一个自动补全（可以自动补全关键字，文本等）的扩展，非常强大，名叫company-mode，官网：

[http://company-mode.github.io/](https://link.jianshu.com/?t=http://company-mode.github.io/)

幸好，这个扩展并不需要我们按照传统的方式从官网下载、安装到Emacs里面，因为Emacs里有个安装扩展的列表，有点类似 Debian系列的 apt-get 和 Redhat系列的yum 这样的包管理工具，所以我们只需要按步骤安装：

+   按下 M-x 来调出命令输入 （在Windows下就是Alt + x 键）
    
+   输入 list-packages，回车
    

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNzgzMjE0LWNkOGQ4YjdjNzRjYzFhNTkuSlBHP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy8xNzIvZm9ybWF0L3dlYnA?x-oss-process=image/format,png)

+   在出现的列表里，点击 company
    
+   在右边出现的新缓冲区里点击 Install（英语“安装”的意思）
    

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNzgzMjE0LTU2ZTJlZWFhYmJjN2FiYWIuSlBHP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy8xMDAwL2Zvcm1hdC93ZWJw?x-oss-process=image/format,png)

+   点击 Yes/是

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xNzgzMjE0LWVmZGYyMWZkYWVkMmIzMzEuSlBHP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy8zMjQvZm9ybWF0L3dlYnA?x-oss-process=image/format,png)

开始感受自动补全的乐趣吧！

> 用此方法（list-packages命令）也可以安装很多其他的Emacs的插件（扩展），大家也看到列表里有很多插件了吧，所以说Emacs都有点像一个小型的操作系统。

### 小编的Emacs配置文件

* * *

大家可以从网上下载一些大牛的Emacs配置文件，看一下他们的Emacs快捷键（除了基本的一些通用快捷键以外，用户可以自定义很多快捷键，可以定义在 .emacs 文件中）。

如果你“不幸”选择使用小编的Emacs配置文件，那么承蒙看得起（当然，你可以把我的配置文件作为参考，取其精华，去其糟粕（不过估计精华有点少，糟粕比较多...），“调配”出属于你自己的Emacs配置）：

下面讲的是在Linux或Mac OS下的配置操作：

请用小编的 .emacs 文件替换你的家目录的.emacs文件 （安装完Emacs，你的家目录，也就是 ~ 下就会有一个 .emacs 文件（默认是隐藏文件））。

把压缩文件里的其他三个模块文件放置到 .emacs.d 这个文件夹下的modules文件夹 （.emacs.d 文件夹是安装完Emacs就会有的，也在家目录里，不过modules文件夹需要你自己创建）：

```auto
cd ~/.emacs.d/
mkdir modules
cp php-mode.el psvn.el saved-places modules/   #（或者手动直接把三个模块文件复制到modules文件夹里）
```

我的Emacs配置和说明在Github上

* * *

[https://github.com/frogoscar/emacs](https://link.jianshu.com/?t=https://github.com/frogoscar/emacs)

其中配置文件的内容是：

[https://github.com/frogoscar/emacs/blob/master/.emacs](https://link.jianshu.com/?t=https://github.com/frogoscar/emacs/blob/master/.emacs)

三个模块：

[https://github.com/frogoscar/emacs/tree/master/modules](https://link.jianshu.com/?t=https://github.com/frogoscar/emacs/tree/master/modules)

### 常用快捷方式

* * *

Emacs的快捷键都是绑定于Ctrl和Alt(或称Meta， 在Mac下就是Cmd键)上的，例如C-x就是Ctrl+x，M-x就是Alt+x （在Mac下就是Cmd键）。当然所有的按键都可以自定义。

所以下面我在讲述快捷键的组合表示方式时：

+   C 代表Ctrl键
    
+   M 代表Alt键（在苹果的Mac OS系统下是Cmd键）
    
+   C-x C-c 代表着“先按C-x，再按C-c”
    
+   C-x k 代表着“先按C-x，松开手，再按k”
    

小编平时最常用的是这些快捷键组合

* * *

```auto
M-s ： 新建一个buffer（缓冲区）

C-x O ： 注意是大写的O，不是零，所以需要按住shift键再按o键。用于在缓冲区之间切换

C-g ： 取消当前操作

C-x u ： 回到上一步，相当于Undo

C-x 3 ： 把缓冲区（buffer）分为左右两个，新的一个缓冲区是复制当前的缓冲区 （可以执行多次，来分割出很多小窗口）

C-x 2 ： 把缓冲区（buffer）分为上下两个，新的一个缓冲区是复制当前的缓冲区 （可以执行多次，来分割出很多小窗口）

M-w ： 选中文字的情况是复制文字，而如果没有选中文字则是复制当前的一行

C-w ： 选中文字的情况是剪切文字，而如果没有选中文字则是剪切当前的一行

M-x ： 调出命令输入，可以在后面接命令，比如man，svn-status，等

C-y ： 黏贴

C-x C-s ： 保存文本

C-x C-f ： 打开文件，如果文件不存在，则新建文件

C-x C-v ： 打开一个文件，取代当前缓冲区

C-x k ： 关闭当前缓冲区（buffer）

C-s ： 向前搜索

C-r ： 向后搜索

C-x h ： 全选

C-v ： 向下翻页

M-v ： 向上翻页

C-f ： 前进一个字符

C-b ： 后退一个字符

M-f ： 前进一个单词

M-b ： 后退一个单词

C-@ ： 标记开始区域

C-a ： 移到行首

C-e ： 移到行尾

M-a ： 移到句首

M-e ： 移到句尾

M-< ： 缓冲区头部

M-> ： 缓冲区尾部

M-g M-g，再输入数字 ： 跳转到文本的第几行

C-x 0 ： 关闭当前缓冲区

C-x C-c ： 退出Emacs
```

暂时只能记起来这么多啦，还有很多快捷键就要你自己去发掘啦！小编平时也不会所有的快捷键都用上，上述的快捷键组合是最常用的。

> 注意： 千万不要死记这些快捷键组合，随着你使用Emacs，很快就能记住的，相信我！

Emacs还有一个很大的好处就是几乎所有的快捷键按键都在键盘的左下角，用左手就能单独完成大部分操作，而右手则可以玩游戏（哦，不对，是操作鼠标），提高效率。

或者说，你用好了Emacs的快捷键组合，编辑代码时甚至不需要鼠标，两个手在键盘上就够了！

还有一个平时常用的功能就是查询函数，可以方便查询已定义的函数：

+   按下 M-x 来调出命令输入
    
+   输入 man ，也就是Linux或Unix系统的man命令，是manuall的缩写，也就是"手册"的意思
    
+   然后输入你要查询的函数名，回车
    

> 尝试一下Emacs吧，真的是“神器”！  
> 谁用谁知道，用过都说好~

> 原文：[https://www.jianshu.com/p/732157b02ecc](https://www.jianshu.com/p/732157b02ecc)
