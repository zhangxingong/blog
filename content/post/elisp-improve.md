+++
title = "Emacs Lisp 基础"
date = "2024-02-06T13:42:09+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++


## Emacs Lisp 基础

## eval 代码

```lisp
(+ 3 4)
```

方法有:

1.  将光标移到闭括号外, 然后调用 `eval-last-sexp` (C-x C-e) , 然后 emacs 就会计算与该右括号匹配的左括号及之间的表达式了.
    
2.  你也可以选择某一段代码, 然后 `eval-region` (按 Alt+x 然后输入该命令.)
    
3.  `Alt+x ielm` , 它会开启一个交互式的 elisp 命令行窗口.
    

查看函数的文档: `Alt+x describe-function` (C-h f)

## 打印

```lisp
(message "hi")

(message "hi, %s" "emacs")
```

它将输出到一个名为 `*Messages*` 的 buffer 中. 你可以通过 `Alt+x view-echo-area-messages` (C-h e) 来切换到该 buffer.

## 算术运算

```lisp
(+ 4 5 1)
(% 7 4)
...
```

注意, `2.` 表示的是整数, `2.0` 才是浮点数.

断言函数. 有些函数名是以 `p` 结尾的, 常常表示它会返回 `true` 或者 `false` . `t` 表示是 `true`, `nil` 表示是 `false`

如

```lisp
(integerp 3.) ; t
(floatp 3.0) ; t
```

## string 与 number 的转换

```lisp
(string-to-number "3")
(number-to-string 3)
```

## true, false

在 elisp 中, `nil` 表示是 `false` , 其他所有的都会被视为 `true` . 注意, `nil` 是等同于空表 `()` ,所以 `()` 也表示 `false`

为了方便, `t` 是用作 `true` .

## 布尔函数

### and 和 or

```lisp
(and t nil)

(or t nil)
```

### 比较数字

```lisp
(< 3 4)

(> 3 4)

(/= 3 4) ; t  /= 是不等于符号.
```

(= 3 3)

### 字符串比较

```lisp
(equal "abc" "abc") ;t

(string-equal "abc" "abc") ;t

(string-equal "abc" 'abc) ;t
```

`equal` 是通用的检测, 如果两个操作数是相同的类型并且是相同的值, 才为 `true` , 否则为 `false` .

## 变量

### 全局变量

```lisp
(setq x 1)

(setq a 3 b 3 c 7); a=3, b=3, c=7
```

### 局部变量

```lisp
(let (var1 var2 ..) body)
(let (a b)
	(setq a 3)
    (setq b 4)
    (+ a b)
); returns 7

或

(let ((var varValue) (var2 var2Value)...) body)

(let ((a 3) (b 4))
	(+ a b)
); returns 7
```

## if then else

```lisp
(if test body)

(if test true_body false_body)

例如

(if  (< 3 2) 7 8)
```

## 表达式块

```lisp
(progn (message "a") (message "b"))
//等同于

(message "a") (message "b")
```

即 `(progn ...)` 是类似于 C 风格的 `{...}`

`progn` 的返回值是最后一个表达式的值.

## 循环

```lisp
(while test body)

例如

(setq x 0)
(while (< x 4)
	(print (format "number is %d" x))
    (setq x (1+ x))
)
```

## 定义一个函数(function)

```lisp
(defun function_name (p1 p2 ...) "doc_string" body)
```

## 定义一个命令(command)

> command 表示的是用户可以通过 `execute-extended-command` 即 (Alt+x) 来调用的.

当一个函数也是一条命令时, 我们称该函数是一个可交互式使用的.

为了使函数可以交互式使用, 可以添加 `(interactive)` 到 `doc_string` 之后的右边即可. 例如:

```lisp
(defun yay ()
  "Insert “Yay!” at cursor position."
  (interactive)
  (insert "Yay!"))
```

以下是一个定义的模板

```lisp
(defun myCommand ()
  "One sentence summary of what this command do.

More detailed documentation here."
  (interactive)
  (let (localVar1 localVar2 …)
    ; do something here …
    ; …
    ; last expression is returned
  )
)
```

## Emacs Lisp 的文本处理

## 光标位置

```lisp
(point) ; 返回当前光标的位置

(region-beginning) ;
(region-end) ;

(line-beginning-position)
(line-end-position)


(point-min)
(point-max)
```

## 移动光标以及搜索

```lisp
(goto-char 39)

(forward-char 4)
(backward-char 4)

; 文本搜索
(search-forward "some")
(search-backward "some")

; 正则搜索
(re-search-forward "[0-9]")
(re-search-backward "[0-9]")

(skip-chars-forward "a-z")
(skip-chars-backward "a-z")
```

## 删除/插入/修改

```lisp
(delete-char 9)
(delete-region 3 10)

(insert "hello")

;获取从光标位置 71~300 之间的字符串
(setq x (buffer-substring 71 300))


; 将位置  71~3000 之间的字符串转换为大写
(capitalize-region 71 300)
```

## Strings

```lisp
(length "abc")

(substring "abcdefg" 3 4)

(replace-regexp-in-string "[0-9]" "X" "abc123");; returns abcXXX
```

## Buffers

```lisp
(buffer-name)

(buffer-file-name)

;切换到名为 xyz 的 buffer
(set-buffer "xyz")

(save-buffer)

(kill-buffer "xyz")

; 临时设置一个 buffer 为当前 buffer 来工作.
(with-current-buffer "xyz"
	;; do something
)
```

## 文件 files

```lisp
; 打开一个文件
(find-file "~/")

; 等同 save as
(write-file path)

; 将文件的内容插入到当前位置
(insert-file-contents path)

; 追加一个文本块到文件
(append-to-file start-pos end-pos path)

(rename-file file-name new-name)

(copy-file old-name new-name)

(delete-file file-name)

; dir path
(file-name-directory full-path)

; filename part
(file-name-nondirectory full-path)

(file-name-extension file-name)

(file-name-sans-extension file-name)
```

以下是一个插入`p` 标签的例子

```lisp
(defun insert-p-tag ()
  "Insert <p></p> at cursor point."
  (interactive)
  (insert "<p></p>")
  (backward-char 4))
```

## 基本函数

```lisp
; 返回当前光标所在的单词内容
(thing-at-point 'word)

; 返回当前光标所在的单词带有连字符或下划线的内容
(thing-at-point 'symbol)

; 返回当前光标所在的行内容
(thing-at-point 'line)

; 返回当前光标所在单词的开始和结束位置
(bounds-of-thing-at-point 'word)
```

## shell 中执行 script

```bash
emacs --script process_log.el
```

## 获取命令行的参数

命令行参数会保存在一个内部 elisp 变量 `argv` 中.它是一个 list, 每一项都是命令行中的item.

```bash
(message "argv 0: %s" (elt argv 0)) ; %s is for string
(message "argv 1: %s" (elt argv 1))
(message "argv 2: %s" (elt argv 2))
(message "argv 3: %s" (elt argv 3))
```

```bash
emacs --script test.el uni 2 -tri

argv 0: "uni"
argv 1: "2"
argv 2: "-tri"
argv 3: nil
```

## Elisp 数据结构

elips 中最重要的类似 list 的数据类型:

sequence (并不是一个实际的数据类型) ,又为为 List 和 Array (并不是实际的数据类型)

List 又分为 (Associate List 和 Property List)

Array 又分为(Vector 和 String)

## vector

> 类似 Java 的数组

1.  读写元素是常量时间
2.  元素可以是任意类型
3.  元素不能被添加或删除. 即 vector 的长度是固定的.
4.  元素的值可以被修改

### 创建 vector

```lisp
(setq v (vector 3 4 5))

(setq x 7)
(setq v (vector 3 x 5))

v ; [3 7 5]
```

如果你不想这些元素被 eval , 则可以写成:

```lisp
(setq x 7)

;; create a vector of elements 3 x 5
;; each element is NOT be evaluated
(setq v [3 x 5])

v ; [3 x 5] . the x remains a symbol, not 7
```

### 访问

```lisp
(aref array n) ;返回 array 数组在索引为 n 的元素

(elt sequence n) ;返回 sequence 在索引为 n 的元素.
```

emacs 文档中的 `sequence` , 你可以认为是 `list` 或 `vector`

例如

```lisp
(aref ["a" "b" "c"] 0) ; ⇒ "a"

(elt ["a" "b" "c"] 0) ; ⇒ "a"
```

`elt` 是更通用的用法, 它可以同时用于 vector 和 list.

### 修改

`(aset ARRAY IDX NEWELT)` , 返回值是 `NEWELT`

```lisp
(setq v [3 4 5])
(aset v 0 "b")
v  ; ⇒ ["b" 4 5]
```

### 嵌套 vector

```lisp
[[1 2] [3 4]]
```

### join vector, 转换 list 为 vector

```lisp
(vconcat [3 4] ["a" "b"]) ; ⇒ [3 4 "a" "b"]

(vconcat [3 4] '("a" "b")) ; ⇒ [3 4 "a" "b"]

(vconcat [3 4] "ab") ; ⇒ [3 4 97 98]
```

### 转换 vector 为 list

`(append sequence1 sequence2 …)`

```lisp
(append [1 2 3] [4 5] nil)
;; (1 2 3 4 5)
;; proper list
```

## list

### 创建 list

`(list a b …)`

```lisp
(setq mylist (list 1 "b" 3))

(message "%S" mylist)
```

如果你不想元素被进行 eval , 可以这样子写

`'(a b …)` 它等同于 `(quote (list a b …))`

```lisp
; assign a list to a var
(setq mylist '(a b c))

; prints a list
(message "%S" mylist)
```

### 数字的 list

```lisp
(number-sequence n m step)

(number-sequence n m) 

(number-sequence n)
```

### 长度

```lisp
(length list)
```

### 获取 list 的元素

```lisp
(car list)	;first element

(nth n list)	;nth element

(car (last list))	;last element

(cdr list)	;2nd to last elements.

(nthcdr n list)	;nth to last elements.

(butlast list n)	;without the last n elements.
```

### 向前追加 list

```lisp
(cons x list)	;Return a new list, with x added to front. (prepend)
```

### 向后追加 list

```lisp
(append list1 list2)	;Return a new list, join two lists
```

### 修改 list 变量

```lisp
(push list) ;Add a element to the front variable. Returns the new list.
(pop list)	;Remove first element from the variable. Returns the removed element.
(nbutlast list n)	;Remove last n elements from the variable. Returns the new value of the variable.
(setcar list x)	;replaces the first element in list with x. Returns x.
(setcdr list x)	;replaces the rest of elements in list with x. Returns x.
```

```lisp
(setq mylist '("a" "b" "c"))
(pop mylist)   ; "a"
(print mylist) ; ("b" "c")
```

### list 转换为 string

```lisp
(mapconcat 'identity '("ab" "cd" "ef") ",")
;; "ab,cd,ef"

(format "%s" '(1 "two" 3))
;; "(1 two 3)"

(substring (format "%s" '(1 "two" 3)) 1 -1)
;; "1 two 3"
```

## Associate List

> 这是一个 cons 对, 类似 (cons key value) . alist

`(cons a b)` 也可以写为 `(a . b)`

key, value 都可以是任意类型.

可以有重复的 key , 因为它是按顺序来维护的.

## 创建

```lisp
(setq x
      '(("mary" . 23)
        ("john" . 24)
        ("smith" . 33)))
```

## 通过 key 获取键值对

`(assoc key alist)`

```lisp
(setq x
      '(("mary" . 23)
        ("john" . 24)
        ("smith" . 33)))

;; get the pair with key "john"
(assoc "john" x)
; returns ("john" . 24)
```

获取了 cons pair 后, 就可以使用 `car` 来获取第一个元素 (key) , `cdr` 来获取最后一个元素 (value) 了.

```lisp
(setq x
      '(("mary" . 23)
        ("john" . 24)
        ("smith" . 33)))

;; get the value with key "john"
(cdr (assoc "john" x))
; returns 24
```

## 通过 value 来获取键值对

`(rassq value alist)`

```lisp
(setq x
      '(("mary" . 23)
        ("john" . 24)
        ("smith" . 33)))

;; get the pair with value 24
(rassoc 24 x)
; returns ("john" . 24)
```

## Property List

`'(key1 val1 key2 val2 …)`

它通常用于小于50个元素的键值对.它与 alist 的函数一样. 如果超过100个元素, 则建议使用 alist.

## 访问

```lisp
(plist-get '(x 1 y 2) 'y) ; 2

;; non existent key returns nil
(plist-get '(x 1 y 2) 'b) ; nil
```

## 设置

```lisp
(setq xx '(a 1 b 2))

;; set value to a existing key
(setq xx
      (plist-put xx 'b 3))
;; must use setq, because plist-put works by return value

(plist-get xx 'b) ; 3

;; set value to new key
(setq xx
      (plist-put xx 'd 3))

(plist-get xx 'd) ; 3
```

## 检测是否存在

```lisp
(setq xx '(a 1 b 2))

;; check if a key exist
(plist-member xx 'b)
```

## Symbol Property List

## 设置

```lisp
(put 'ff 'xx 5)

(setplist 'ff '(a 1 b 2))
```

## 访问

```lisp
(get 'ff 'xx) ; nil

(symbol-plist 'ff )
```

## Map

## mapcar

`(mapcar FUNCTION SEQUENCE)`

它会将函数 `FUNCTION` 应用到 `SEQUENCE` 中的每一个元素, 然后返回一个 list 的结果.

```lisp
(mapcar '1+ [3 4 5] ) ; (4 5 6)

(mapcar '1+ '(3 4 5)) ; (4 5 6)
```

函数为 lambda

```lisp
(mapcar
 (lambda (x) (elt x 0))
 [[1 2] [3 4]] ) ; ⇒ (1 3)
```

## mapc

类似 mapcar ,但返回值是 nil

## loop list

## dolist

`(dolist (VAR LIST) BODY)`

循环处理 LISP , VAR 表示 LISP 的元素, 在 BODY 里应用处理. 返回值是 nil

```lisp
(let (
      (xlist (number-sequence 97 122)) ;; list 97 to 122
      )
  (dolist (n xlist) (insert n)))
```

## dotimes

`(dotimes (VAR COUNT) BODY …)`

返回值是 nil . VAR 表示的是从 0 到 count 之间的步进数.(包括0, 但<count)

```lisp
(dotimes (i 4)
  (insert (number-to-string i)))
;; inserts "0123", returns nil
```

`(dotimes (VAR COUNT RESULT) BODY …)`

通过计算 RESULT 来获得获取值

```lisp
(let ((v [3 4 5]))
  (dotimes (i (length v))
    (insert
     (number-to-string
      (elt v i))))) ; inserts 345
```

## while

```lisp
(let ((mylist '(a b c)))
  (while mylist
    (message "%s" (pop mylist))
    (sleep-for 1)))
```

## 过滤 list

[更多过滤函数](http://ergoemacs.org/emacs_manual/elisp/Sequence-Functions.html)

> 在 25.1 及之后版本

依赖: `(require 'seq)`

```lisp
(require 'seq)

(setq xx '(1 "a" 2))

;; remove items that's not a number
(seq-filter 'numberp xx)
;; (1 2)

;; old remain unchanged
xx
;; '(1 "a" 2)
```

## Hash Table

## 创建

`(make-hash-table :test 'equal)` 它会返回一个新的 hashtable

```lisp
(setq myHash (make-hash-table :test 'equal))
```

## 添加

```lisp
(puthash "joe" "19" myHash)
```

## 删除

```lisp
(remhash "liz" myHash)
```

## 获取 key 的值

```lisp
(gethash "jane" myHash)
```

## 计算长度

```lisp
(hash-table-count myHash)
```

## 删除所有元素

```lisp
(clrhash myHash)
```

## 检测元素是否存在

```lisp
(gethash myKey myHash)
```

如果存在, 则返回值, 否则返回 nil.

## Lisp Symbol

Symbol 的概念类似于其他编程语言的标识符, 除了:

+   lisp symbol 可以持有未eval过的, 只是表示自身的, 一个内部名字. 在这种意义下, 它类似于 string.
+   lisp symbol 可以存储超过一个的值.

## symbol 的 cell

每一个 lisp symbol 都拥有以下的 cell 来存储东西

+   “print name” cell : 一个字符串, 与 symbol 字面值一样. 它是自动设置的, 不能被更改.
+   “value” cell: 存储 symbol 的值, 当该 cell 不为空时, 该 symbol 被视为一个变量.
+   “function” cell: 存储函数定义的对象, Lisp 宏 macros, 或其他可以像 function 那样执行的对象.
+   “property list” cell: 持有一个 name/value 对的list. 用于存储 symbol 的元数据, 例如: 函数的状态, 字体规则(用于语法高亮), 是否废弃等.

`function cell` 或 `value cell` 可能为空, 这时就被称为 `void` . 当你获取一个 `cell` 的 `value` 是 `void` 时, 会产生一个 lisp 错误. (一个空emtpy cell, 不同于有一个 value 为 nil 的 cell).

```lisp
;; get symbol's name cell value
(symbol-name 'sin) ; "sin"

;; get symbol's value cell value
(symbol-value 'sin) ; void-variable error
;; because the value cell of the symbol sin is void
;; or, we just say that sin isn't a variable

;; get symbol's function cell value
(symbol-function 'sin) ;#<subr sin>
;; the value is a primitive function (written in C), and has print form of #<subr sin>

;; get symbol's property list cell value
(symbol-plist 'sin) ; (side-effect-free t)
```

## quoting symbol

一个 symbol , 典型情况下是用于计算来获取它的 value 的. 但你可以通过 quoting symbol 来停止这样子. 例如 `(quote x)` . 你可以想象 `quote` 是`拥有 evaluation` (仅仅持有它, 而不要去计算它).

## 什么时候需要 quote symbol

一些函数, 它会自动为你进行 quote 参数. 但这并没有语法上的方式来告诉你, 一个函数是否需要它的参数是 quote 的. 最好就是查看函数的文档 (Alt+x describe-function) 来查看一个参数是否需要 quote .

函数 `set` 与 `setq` 几乎是一样的, 最主要的不同是 `set` 并不会自动将第一个参数进行 quote, 而 `setq` 会.

例如

```lisp
(setq f '1+)
(setq f 'cos)
(setq f 'sqrt)
```

我们用 `f` 来包装, 因为我们不确定到底使用哪个函数, 直到运行时才能知道.

然后

```lisp
;; here's our data
(setq mylist '(1 2 3))

;; normally, when using mapcar, we want first arg quoted
(mapcar '1+ mylist) ; (2 3 4)

;; here, we don't want first arg quoted
(mapcar f mylist) ; (1.0 1.4142135623730951 1.7320508075688772)
```

## 检测个值是否是 symbol

```lisp
(setq x1 123 )

(symbolp x1) ; nil
;; nil, because x1 is evaluated, and that value is 123, not a symbol

(symbolp 'x1) ; t
```

## 获取 symbol 的四个 cell 值

```lisp
;; get symbol's name cell value
(symbol-name 'sin) ; "sin"

;; get symbol's value cell value
(symbol-value 'sin) ; void-variable error
;; because the value cell of the symbol sin is void
;; or, we just say that sin isn't a variable

;; get symbol's function cell value
(symbol-function 'sin) ;#<subr sin>
;; the value is a primitive function (written in C), and has print form of #<subr sin>

;; get symbol's property list cell value
(symbol-plist 'sin) ; (side-effect-free t)
```

## 设置 symbol 的四个 cell 值

> 名字是不能修改的.

### 设置 value cell

```lisp
;; set a symbol's value cell
(setq y "yes yes")

;; get it
(symbol-value 'y) ; "yes yes"
```

检测 value cell 是否为空

```lisp
(boundp 'h) ; nil

(setq h 4)

(boundp 'h) ; t
```

### 设置 function cell

```lisp
;; a function that returns 4
(defun z () 4)
;; Note: return value of defun is not defined

;; get a symbol's function cell value
(symbol-function 'z) ; (lambda nil 4)(boundp 'h) ; nil
```

检测是否是 function

```lisp
(fboundp 'f) ; nil

;; define a function that return 3
(defun f () 3)

;; now the fuction cell is filled
(fboundp 'f) ; t
```

### 设置 property cell

参见上面的 Property List

### 综合例子

```lisp
(setq x "hello world")

(defun x (a b)
  "a + b"
  (+ a b)
  )

(x 3 4);7
(message x);"hello world"

(symbol-name 'x);"x"
(symbol-value 'x);"hello world"
(symbol-function 'x); (lambda (a b) "a + b" (+ a b))
(symbol-plist 'x); (group-documentation "The X Window system.")
```

## 参考

[http://ergoemacs.org/emacs/elisp\_basics.html](http://ergoemacs.org/emacs/elisp_basics.html)
