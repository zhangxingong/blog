+++
title = "记 Elisp 大坑：分离命名的函数与变量"
date = 2023-06-29T16:11:00+08:00
tags = ["笔记", "elisp"]
categories = ["emacs"]
draft = false
weight = 2001
author = "zhangxingong"
+++


大概是一年多以前，为了用 Emacs，我学了 Elisp。虽然我现在 Emacs 用的还挺舒服，但是 Elisp 用起来却一直有种奇奇怪怪的感觉。

今天，我终于弄明白了 Elisp 奇怪的地方。同时，感觉这似乎是一个所有初学者都要面对的大坑。所以，把它记下来。

* * *

问题可以用题图的这些语句来说明。我们先来看第一句：

    (mapc - '(1 2 3))

`mapc` 函数接收一个函数参数与一个列表参数，把这个函数应用在列表的每一个元素上。同时，Elisp 里面 `+`,`-`,`*`,`/` 都是函数名。所以初学 Elisp 的我直接就想到了这样的用法。

但是很遗憾，这个表达式是不能运行的。如果运行的话，Emacs 会给你这样一个错误：

    Symbol’s value as variable is void: -

意思是 `-` 并不是一个变量。

这就很奇怪了。**函数不是变量的一种吗？**

这个问题先放在一边，如果你只是想把这个功能跑起来，许多教程会教你这么写：

    (mapc '- '(1 2 3))

给 `-`加一个引号，就可以跑起来了。

但是这其实只会增加你的困惑：**`mapc` 需要的是一个函数，我为什么要给它一个 symbol 才能跑起来？为什么直接给函数他反而跑不起来？**

然后当你对 Elisp 更熟悉的时候，你会发现其实这个语句真正的写法是

     (mapc #'- '(1 2 3))

前面多了一个 `#`， 等价于

    (mapc (function -) '(1 2 3))

知道了这里 `'-` 与 `(function -)` 的等价性之后，你可能会有一个模糊的概念。

但是这个用法还是很奇怪：**`-` 与 `(function -)`的区别是什么？** 应该都是函数才对啊？为什么一个不能当参数而一个可以？

这个问题就比较困扰人。而我今天终于知道了这个问题的答案。这个问题可以用下面这两个表达式来说明：

    (setq neg (function -))
    (mapc neg '(1 2 3))

在 Emacs 里面跑这两个表达式，你会发现它可以跑出正确的结果，不再报错。

这首先可以说明一个问题，**函数也是变量的一种**这个概念在 Elisp 里面也是成立的。我们可以把 `(function -)`的结果，一个函数，赋值给一个变量，然后这个变量就成为了这个函数的引用，可以直接作为 `mapc` 的参数。

但是为什么直接用函数原本的名字不行，一定要套一个 `function` 函数才能用呢？

这个问题可以用一个更疯狂的例子来说明：

    (setq - (function -))
    (mapc - '(1 2 3))

这个表达式也是可以正常运行，并跑出正确结果的。

这个看起来有点奇怪的例子说明了一个事实：Elisp 里面的函数，比如 `+`，`-`，`*`，`/`，虽然可以成为变量，但是**它们自己的名字并不在变量名表中**。

也就是说，Elisp 里面的函数与变量分为两个命名表，一个命名表用来记录函数的名字，一个命名表用来记录变量的名字。两个表之间不会产生命名冲突，也就是说，我可以同时有一个函数叫 `-`，以及一个变量叫 `-`。

而当我第一次运行 `(mapc - '(1 2 3))` 时，我只有名称为 `-` 的函数，而无名称为 `-` 的变量，所以会报一个变量未定义的错误。

而同样的，反过来说，一个变量被定义为指向一个函数的时候， 它并不在函数命名表中，也就不能直接被调用。比如说下面这个例子：

    (setq f (function '-))
    (f 1)

是会报错的。因为我们只有一个名为 `f`的变量，而没有名为 `f` 的函数。所以这里 Emacs 会提示你

    Symbol’s function definition is void: f 

也就是说名称为 `f` 的函数不存在。

所以在 Elisp 里面，有一个叫 `funcall` 的奇怪函数，用来从变量名调用其指向的函数。上面那个`(f 1)` 的调用，可以写成下面这个样子：

    (funcall f 1) 

就可以运行了。

* * *

最后，小结一下：

像大部分高级语言一样，Elisp 中的函数也可以被变量指向。但是与很多高级语言不同的是，Elisp 的函数命名表与变量命名表是分离的，函数在定义后，它的名字不能当作变量使用。但是，你可以用 `setq` 把这个函数赋值给一个同名变量。

要获取一个指向某特定函数的变量，你需要用 `function` 函数，这个函数可以简写成 `#'` 或者 `'`。

要调用一个变量指向的函数，你需要使用 `funcall` 函数。

* * *

但是，其实我现在还是没有弄明白如此设计的初衷为何。绝大多数的高级语言并不区分函数与变量的命名空间，`funcall` 也似乎没有什么必要。如果所有的名字被自动当作变量，而不做函数与变量的区分，似乎不会导致什么问题——其他语言中的函数变量在语法上都是可以直接调用的，而这也是 Racket 的做法。 Elisp 变量与函数的分离的做法并没有让它的语法更清晰，反而是为此引入了 `function` 与 `funcall` 这一对奇怪的函数，让新手产生了更多的误解。

因此，我目前没有看到这一设计有什么必要的理由，所以希望可以得到大佬们的解答。如果你对此有什么见解的话， 请一定要在评论区留下你的看法，提前感谢！
