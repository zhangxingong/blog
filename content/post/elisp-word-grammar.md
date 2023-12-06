+++
title = "掌握Elisp：开启Emacs的强大之门"
date = "2023-12-06T11:43:28+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++



## Table of Contents

1.  [执行elisp代码](#执行elisp代码)
2.  [注释](#注释)
3.  [基本数值运算](#基本数值运算)
    1.  [加减乘除、取余、指数](#加减乘除、取余、指数)
    2.  [测试](#测试)
    3.  [浮点整数转换](#浮点整数转换)
    4.  [字符串数值转换](#字符串数值转换)
4.  [基本逻辑、关系运算](#基本逻辑、关系运算)
    1.  [TRUE/FALSE](#TRUE/FALSE)
    2.  [逻辑运算](#逻辑运算)
    3.  [数值关系运算](#数值关系运算)
    4.  [字符串比较运算](#字符串比较运算)
    5.  [等价测试euqal](#等价测试euqal)
5.  [变量](#变量)  
    1\. [全局变量](#全局变量)  
    2\. [局部变量](#局部变量)
6.  [打印消息](#打印消息)  
    1\. [message](#message)  
    2\. [insert](#insert)  
    3\. [print](#print)  
    4\. [prin1](#prin1)  
    5\. [princ](#princ)
7.  [缓冲和文件操作](#缓冲和文件操作)
    1.  [创建buffer](#创建buffer)
    2.  [获取buffer名字](#获取buffer名字)
    3.  [切换buffer](#切换buffer)
    4.  [关闭buffer](#关闭buffer)
    5.  [文件操作](#文件操作)
8.  [条件](#条件)
    1.  [if-then-else](#if-then-else)
    2.  [when](#when)
    3.  [unless](#unless)
    4.  [cond](#cond)
9.  [progn](#progn)
10.  [循环](#循环)
    1.  [while](#while)
    2.  [mapcar](#mapcar)
    3.  [mapc(foreach)](#mapc(foreach))
    4.  [dolist](#dolist)
    5.  [dotimes](#dotimes)
11.  [catch-throw error-user-error](#dotimes)
    1.  [错误退出](#错误退出)
12.  [Sequence,list,Vector](#Sequence,list,Vector)
    1.  [Sequence](#Sequence)
    2.  [Vector](#Vector)
    3.  [list](#list)
13.  [函数定义](#函数定义)
14.  [指令定义](#指令定义)
15.  [参考](#参考)

**以下内容均在emacs \*scratch\*中测试**

## 执行elisp代码

1.  方法一：把光标（点位）置于表达式闭括号右侧，执行"M-x eval-last-sexp"（或"C-x C-e"）
2.  方法二：选择待执行的代码块，执行"M-x eval-region"
3.  方法三：键入"M-x eval-defun"，执行光标所在函数（只可执行由defvar和defcustom实现的代码）
4.  方法四：键入"M-x eval-expression"，在minibuffer中编辑执行代码
5.  方法五：键入"M-x eval-buffer"，执行整个buffer
6.  方法六：键入"M-x load-file"，加载执行整个文件
7.  方法七：键入"M-x ielm"，启用elisp Shell编辑执行代码

## 注释

格式为西文分号加空格，即";; "，可在任意一行的任何位置开始注释。

```auto
;; test code
(+ 3 4)  ;; test code
```

## 基本数值运算

### 加减乘除、取余、指数

```auto
(+ 4 5 1)  ;; 10
(- 9 2 3)  ;; 4
(* 2 3 3)  ;; 18
(/ 7 2)    ;; 3，取整
(/ 7 2.0)  ;; 3.5，除法
(% 7 4)    ;; 3，取余
(expt 2 3) ;; 8
```

### 测试

```auto
(integerp 3.) ;; t，3.表示整数，3.0表示小数
(floatp 3.)   ;; nil
(floatp 3.0)  ;; t
```

**注** ：函数名字以p结尾表示测试，返回对（t）或错（nil）

### 浮点整数转换

```auto
(float 3)      ;; 3.0
(truncate 3.3) ;; 3，舍弃小数部分
(floor 3.3)    ;; 3，向下取整
(ceiling 3.3)  ;; 4，向上取整
(round 3.4)    ;; 3，四舍五入
```

### 字符串数值转换

```auto
(string-to-number "3")
(number-to-string 3)
```

## 基本逻辑、关系运算

### TRUE/FALSE

elisp中 **没有布尔类型**  
只有 **nil** 和 **空列表 ()** 表示 **FALSE** 外  
其它所有都为 **TRUE** ，即 **t** 。

### 逻辑运算

与或非

```auto
(and t nil)  ;; nil 与运算
(or  t nil)  ;; t 或运算
(not t)      ;; nil 非运算
```

### 数值关系运算

```auto
(< 3 4)  ;; 小于
(> 3 4)
(<= 3 4)
(>= 3 4)

(= 3 3)  ;; t，比较两数是否相等
(= 3 3.000000000000000000001) ;; t，可见elisp将超过精度小数部分舍弃

(/= 3 4) ;; t, 比较两数是否不相等
```

### 字符串比较运算

```auto
(equal "abc" "abc")         ;; t

;; string-equal比较字符串专用函数
(string-equal "abc" "abc")  ;; t
(string-equal "abc" "Abc")  ;; nil，大小写问题
(string-equal "abc" 'abc)   ;; t，可用于比较字符串和符号
```

### 等价测试euqal

通常使用equal进行等价测试，它比较两个测试对象是否具有相同类型和值。

```auto
(equal "abc" 'abc) ;; nil
```

不等价测试，运算"/="只针对数值，对于字符串和其它数据类型无效，可使用not来否定equal达到目标。

```auto
not (equal "abc" 'abc) ;; t
```

## 变量

#### 全局变量

setq用于设置全局变量，且变量无需声明。

```auto
(setq x 1)           ;; x = 1
(setq a 3 b 2 c 7)   ;; a = 3, b = 2, c = 7，批量赋值
```

#### 局部变量

let用于设置局部变量。

+   形式一
    
    ```auto
    (let (var1 var2 ...) body)
    ```
    
    body由elisp表达式组成，且其最后一条表达式的返回值作为let的返回值。
    
    ```auto
    (let (a b)
      (setq a 3)
      (setq b 4)
      (+ a b)) ;; 7
    ```
    
+   形式二
    
    ```auto
    (let ((var1 val1) (var2 val2) ...) body)
    ```
    
    此方法无需在body中使用setq为变量赋值，更方便。
    
    ```auto
    (let ((a 3) (b 4))
      (+ a b)) ;; 7
    ```
    

## 打印消息

#### message

```auto
(message FORMAT-STRING &rest ARGS)
```

打印格式化字符串到 **Message** ，可通过"M-x view-echo-area-message" 或 "C-h e" 查看

```auto
(message "age is: %d " 16)
```

FORMAT-STRING字符串格式化:

| format | explanation |
| --- | --- |
| %s | 表示字符串，类似princ（后面介绍） |
| %d | 十进制数值（%o 八进制， %x 十六进制） |
| %X | 大写的十六进制 |
| %e | 指数表示的数值 |
| %f | 小数点表示的数值 |
| %g | 使用指数或小数点表示数值，以字符较少为准 |
| %c | 以字符方式打印数值 |
| %S | 打印任何对象的S-表达式，类似prin1（后面介绍） |

#### insert

```auto
(insert &rest ARGS)
```

在当前buffer的光标位置插入字符串。

```auto
(insert "xyz")
```

#### print

```auto
(print OBJECT &optional PRINTCHARFUN)
```

打印lisp OBJECT（整数、浮点、字符、字符串、列表、符号等），输出可以被read函数读回，  
Optional参数可以是一个buffer或函数。

```auto
setq xbuff (generate-new-buffer "*my output*"))

(print "something" xbuff)

(switch-to-buffer xbuff )
```

**with-output-to-temp-buffer**

```auto
(with-output-to-temp-buffer BUFNAME &rest BODY)
```

将标准输出绑定到缓冲区BUFNAME，执行BODY,则首先会清空BUFNAME，然后在BUFNAME中显示结果，  
不会将结果显示在当前缓冲区。

```auto
(setq xbuff (generate-new-buffer "*my output*"))

(with-output-to-temp-buffer xbuff
  ;; this is inserted in current buffer
  (insert "xyz")

  ;; this is printed in buffer xbuff
  (print "abc"))

(switch-to-buffer xbuff )
```

#### prin1

```auto
(prin1 OBJECT &optional PRINTCHARFUN)
```

类似print，但是不会换行。

```auto
(prin1 '("x" "y")) ;; ("x" "y")
```

#### princ

```auto
(princ OBJECT &optional PRINTCHARFUN)
```

既不换行也不打印字符串中的分隔符。

```auto
(princ '("x" "y")) ;; (x y)，未打印”引号“分割符
```

## 缓冲和文件操作

### 创建buffer

1.  with-temp-buffer
    
    ```auto
    (with-temp-buffer &rest BODY)
    ```
    
    创建临时buffer并像progn（后面介绍）执行BODY。
    
    ```auto
    (setq myStr "big text")
    
    (with-temp-buffer
        (insert myStr)
        ;; manipulate the string here
        ;; print whole buffer content
        (message "%s" (buffer-string)))
    ```
    
    **注** ：大多数时候应该使用该函数创建新buffer，可以节省创建buffer的代码、切换到它做些事，  
    或关闭它，然后恢复当前缓冲区。
2.  generate-new-buffer  
    创建新buffer并返回。
    
    ```auto
    ;; 设置新buffer名字，如果名字以空格开始，则撤销会被禁止
    (setq newBufName " xyz")
    
    ;; 创建一个新buffer并保存在一个变量中，以便后续切换或关闭
    (setq newBuf (generate-new-buffer newBufName))
    
    ;; 把新buffer设置为当前buffer且不可见，所有的插入等操作都适用于它
    (set-buffer newBuf)
    ```
    
3.  get-buffer-create
    
    ```auto
    (get-buffer-create BUFFER-OR-NAME)
    ```
    
    +   返回新buffer但是不会切换到它，需使用set-buffer（后面介绍）切换
    +   BUFFER-OR-NAME可以是字符串或buffer
    +   如果BUFFER-OR-NAME存在，则仅仅返回；若不存在则新建
    +   如果字符串以空格开头，则撤销操作被禁止
        
        ```auto
        ;; 确保字符串是唯一的且以空格开头
        (setq newBuf (get-buffer-create " xyz"))
        (set-buffer newBuf)
        ```
        

### 获取buffer名字

1.  buffer-name
    
    ```auto
    ;; 获取当前buffer名字
    (buffer-name)
    ```
    
2.  buffer-file-name
    
    ```auto
    ;; 获取buffer文件的完整路径，若无文件返回nil
    (buffer-file-name)
    ```
    

### 切换buffer

1.  with-current-buffer  
    创建临时buffer，在函数执行完后会自动返回原buffer。
    
    ```auto
    (witch-curent-buffer myBuf
       ;; insert or delete text here
    )
    ```
    
2.  set-buffer  
    切换到指定buffer，但缓冲区不可见。
    
    ```auto
    (save-current-buffer
      ;; switch to myBuf
      (set-buffer myBuf)
      ;; do stuff, such as insert/delete text
    )
    ```
    
3.  switch-to-buffer  
    切换到指定buffer，但不用在Lisp代码中，一般用于切换到可见缓冲区。
    

### 关闭buffer

```auto
kill-buffer

;; 关闭指定buffer
(kill-buffer myBuffer)
```

### 文件操作

1.  find-file
    
    ```auto
    ;; 打开文件，返回一个buffer
    (find-file "~/test.txt")
    ```
    
2.  save-buffer
    
    ```auto
    ;; 保存当前buffer，保存buffer关联文件
    (save-buffer)
    ```
    
3.  write-file
    
    ```auto
    ;; 相当于“另存为”
    (write-file "~/new.txt")
    ```
    
4.  append-to-file
    
    ```auto
    ;; 在指定位置追加文本
    (append-to-file 100 200 "~/test.txt")   ;; 在位置100~200追加内容
    ```
    

## 条件

### if-then-else

```auto
(if test body)
或
(if test true_body false_body)

(if (< 3 2) 7 8) ;; 8

;; 若没有false_body则返回nil
(if (< 3 2) (message "yes")) ;; nil
```

### when

如果if语句中不需要else部分，则可使用when语句，形如：

```auto
(when condition expr1 expr2 ...)
;;等价于
(if condition (progn expr1 expr2 ...) nil)
```

### unless

如果if语句中不需要then部分，则可使用unless语句，形如

```auto
(unless condition expr1 expr2 ...)
;;等价于
(if condition nil expr1 expr2 ...)
```

### cond

类似于C语言中的switch语句。

+   cond每个clause必须是list，且list的car值是condition，剩余部分是body-forms
    
    ```auto
    (condition body-forms...)
    ```
    
+   若condition非nil，则执行相应的body-forms，并将该clause最后一条body-form的返回值作为  
    cond的返回值，退出cond条件语句，忽略剩余clasues。
+   若所有的condition为nil，则表示所有的clause fail，cond返回nil。
    
    ```auto
    (cond
         ((numberp x) x)
         ((stringp x) x)
    
         ((bufferp x)
             (setq temporary-hack x)         ;; multiple body-forms
             (buffer-name x))                ;; in one clause
    
         ((symbolp x) (symbol-value x)))
    ```
    
+   可能cond语句的所有条件都测试为nil，但我们不希望cond返回nil，可以用t作为cond最后一个  
    clasue，如(t "default")。
    
    ```auto
    (setq a 5)
    
    (cond
        ((eq a 'hack) 'foo)
        (t "default"))
    ```
    
    **注** ：任何条件结构都可以由if或cond表示，区别在于风格，例
    
    ```auto
    (if a b c)
     ≡
    (cond (a b) (t c))
    ```
    

## progn

有时候我们需要将多个表达式放在一个块中作为一个表达式，类似C中的块\`{…}\`，在elisp中由函数progn实现。

```auto
(progn body...)
```

一般在if语句中使用

```auto
(if something
    (progn  ;; true
    ...
    )
    (progn  ;; else
    ...
    )
)
```

progn返回其body最后一个表达式的返回值。

```auto
(progn 3 4) ;; 4
```

## 循环

### while

```auto
(while test body)
```

body由至少一个lisp表达式组成。

```auto
(setq x 0)

(while (< x 4)
   (message (format "number is %d" x))
   (setq x (1+ x)))         ;; number is 3

(let ((mylist '(a b c)))
     (while mylist
       (message "%s" (pop mylist)
       (sleep-for 1)))          ;; pop用于减少list
```

### mapcar

```auto
(mapcar FUNCTION SEQUENCE)
```

应用 FUNCTION，遍历 SEQUENCE 元素，返回一个list。输入 SEQUENCE 可能是一个list、vector、  
bool-vector或字符串，但输出为 list，且该 list 长度和 SEQUENCE 一样。

```auto
(mapcar '1+ [3 4 5])   ;; (4 5 6)，将1加在每个vector元素并返回一个list
(mapcar '1+ '(3 4 5))  ;; (4 5 6)，将1加在每个list元素并返回一个list
```

1+ 是一个lisp函数，它将参数加一并返回，如\`(1+ 2)\`返回3  
在mapcar函数中使用，必须在函数名前加引用  
1+ 是一个函数，所以需要加引用，即 \`'1+\` 或 \`(quote 1+)\`

```auto
(mapcar 'car '((1 2) (3 4) (5 6))) ;; (1 3 5)，取出每个元素list的第一个元素
```

mapcar 通常结合 lambda 使用，例如

```auto
(mapcar
    (lambda (x) (elt x 0))
    [[1 2] [3 4]])          ;; (1 3)，获取每个元素vector的第一个元素
```

lambda 定义一个“匿名函数“，可以使你在代码中定义一个函数，形如

```auto
(lambda (args) body)
(lambda (x y) (+ x y)) ;; 取两个参数相加，返回他们的和

(mapcar
  (lambda (x) (+ x 1))
  (list 1 2 3 4))      ;; (2 3 4 5)，每个list元素加一
```

### mapc(foreach)

mapc类似mapcar，但是返回nil。

```auto
(mapc 'my-update-html-footer
 (list
  "~/file1.html"
  "~/file2.html"
  "~/file3.html"
  )) ;; 使用函数遍历list中每个文件
```

### dolist

```auto
(dolist (VAR LIST) BODY)        ;; 遍历list返回nil
(dolist (VAR LIST RESULT) BODY) ;; 返回 RESULT

(let (
     (xlist (number-sequence 97 122)) ;; list 97 to 122
     )
  (dolist (n xlist) (insert n)))
```

dolist和mapc主要区别

+   dolist使用表达式，mapc使用函数
+   dolist只作用于list，mapc作用于list和vector

### dotimes

```auto
(dotimes (VAR COUNT) BODY ...)        ;; 循环指定次数，从0开始计数，不包括COUNT，返回nil
(dotimes (VAR COUNT RESULT) BODY ...) ;; 返回 RESULT
```

dotimes在使用升序计数的循环遍历中非常有用

```auto
(dotimes (i 4)
  (insert (number-to-string i)))
```

## catch/throw error/user-error

退出函数：map,loop.

```auto
(catch 'tagname body)
```

catch执行body，返回body最后一个表达式的返回值。若body中包含(throw …)，且被调用，则返回throw传递的值。

```auto
(throw 'tagname value)
```

退出函数或跳出相应tagname的map或loop

```auto
(defun test-exit-f ()
  "example. using catch/throw to exit function"
  (interactive)
  (catch 'aaa
    (if (y-or-n-p "exit?")
       (progn
         (message "existing")
         (throw 'aaa 3)        ;; 如果yes,立刻退出，并返回3
         )
       (progn
         (message "went on")
         4 ;; return 4
         )))))
```

### 错误退出

可调用error或user-error

```auto
(defun test-exit-f
  "example"
  (interactive)
  (if (y-or-n-p "invoke user-error to exit?")
     (user-error "Error, because: %s" "you said so!")
        (progn
         (message "went on")
         )))
```

## Sequence,list,Vector

### Sequence

sequence和Array实际上不是elisp数据类型

+   函数文档中的sequence类型，表示它可能是list、vector或string
+   函数文档中的array类型，表示它可能是vector或string
+   list和vector都是有序值序列，每个元素可以是任何类型

list和vector区别

+   vector：所有元素访问时间相同
+   vector的长度不能改变
    
+   List：元素访问时间和位置成比例，类似C中链表
+   list的长度可以改变，通过增删list第一个元素实现
    

### Vector

类似Java中的数组对象

+   Vector是有序值序列
+   每个元素可以是任何类型
+   元素值可修改
+   元素个数不能改变
+   读写元素随机访问时间相同
    
+   创建Vector
    +   **make-vector**
        
        ```auto
        (make-vector 5 0)  ;; [0 0 0 0 0]，创建一个长度为5个元素的向量，且每个元素初始化为0
        ```
        
    +   **vector**
        
        ```auto
        (vector a b ...)  ;; 创建一个包含元素a,b,...的向量
        ```
        
    +   **\[a b …\]**  
        以该方式创建的向量元素不会在创建时被执行
+   填充Vector
    
    ```auto
    (fillarray array val) ;; 使array中的所有值为val，类似重新赋值
    
    (setq aa [3 4 5])
    (fillarray aa nil)    ;; [nil nil nil]
    ```
    
+   获取Vector长度
    
    ```auto
    (length (Vector 7 4 5)) ;; 3
    ```
    
+   获取元素
    
    ```auto
    (aref array n)   ;; 返回array索引为n的元素
    (elt sequence n) ;; 返回sequence索引为n的元素
    ```
    
    **强调** ：emacs文档提及“array"，你可以认为是"vector"或"string"  
    提及"sequence"，你可以认为是"list"或"array"  
    若已知是vector，则使用aref更好更快
+   修改元素
    
    ```auto
    ;; 将 ARRAY索引为IDX的元素值替换为NEWELT，返回NEWELT
    (aset ARRAY IDX NEWELT)
    ```
    
+   嵌套Vector
    
    ```auto
    ;; Vector可以以任何方式嵌套
    [[1 2] [3 4]]     ;; 2 by 2 matrix
    ```
    
+   连接Vectors，转换list为Vector
    
    ```auto
    ;; 连接任何sequence类型，返回一个vector
    (vconcat sequence1 sequence2 ...)
    
    (vconcat [3 4] '("a" "b")) ;; [3 4 "a" "b"]
    ```
    
+   转换Vector为list
    
    ```auto
    ;; 连接任何sequence类型，返回一个list
    (append sequence1 sequence2 ...)
    ```
    
    **注** ：若想返回一个proper list，最后一个元素必须是list或nil.
    
    ```auto
    (append [1 2 3] [4 5])     ;; (1 2 3 . [4 5])，improper list
    (append [1 2 3] [4 5] nil) ;; (1 2 3 4 5)，proper list
    ```
    

### list

1.  创建list
    
    ```auto
    (list a b ...)
    ```
    
    若不想元素被执行，可写作
    
    ```auto
    '(a b ...)
    ;;等价于
    (quote (list a b ...))
    
    (setq mylist '(a b c))
    (message "%S" mylist)
    
    (make-list LENGTH INIT) ;;创建长度为LENGTH的list，所有元素初始化为INIT
    ```
    
2.  空list  
    在elisp中，空list等价于nil
    
    ```auto
    '()
    ≡
    (list)
    ≡
    nil
    ```
    
3.  list of number
    
    ```auto
    (number-sequence n m step) ;; 返回从n到m，步长为step的list
    (number-sequence n m)      ;; 默认step为1
    (number-sequence n)        ;; 返回只有一个元素n的list
    
    (number-sequence 0 9 3)    ;; (0 3 6 9)
    ```
    
4.  length
    
    ```auto
    (length list)
    ```
    
5.  获取一个元素
    
    ```auto
    (car list)        ;; 获取第一个元素
    (nth n list)      ;; 获取第n个元素
    (car (last list)) ;; 获取最后一个元素
    ;;list索引（下标）从0开始
    ```
    
6.  获取子list
    
    ```auto
    (cdr list)       ;; 获取第二个元素到最后一个元素
    (nthcdr n list)  ;; 获取第n个元素到最后一个元素
    (butlast list n) ;; 获取除最后n个元素的元素
    ```
    
7.  前置连接list(prepend to list)
    
    ```auto
    (cons x list)     ;; 将x加到list前面，返回一个新list
    
    (cons "a" (list "c" "d")) ;; ("a" "c" "d")
    ```
    
8.  连接list
    
    ```auto
    (append sequence1 sequence2 ...) ;; 连接任何类型sequence，返回list
    ```
    
9.  修改元素
    
    ```auto
    (push list)       ;; 在变量前加一个元素，返回新list
    (pop list)        ;; 移除变量第一个元素，返回移除元素
    (nbutlast list n) ;; 移除变量最后n个元素，返回变量新值
    (setcar list x)   ;; 用x替换list的第一个元素，返回x
    (setcdr list x)   ;; 用x替换list除第一个元素外剩余元素，返回x
    ```
    
10.  list转换为string
    
    ```auto
    (mapconcat 'number-to-string '(1 2 3) ",") ;; "1,2,3"
    
    (format "%s" '(1 "two" 3)) ;; "(1 two 3)
    
    (substring (format "%s" '(1 "two" 3)) 1 -1) ;; "1 two 3"
    ```
    

## 函数定义

```auto
(defun function_name (param1 param2 ...) "doc_string" body)
```

函数返回值为 body 中最后一个表达式的返回值.

```auto
(defun myFunction ()
   "testing"
   (message "Yay!"))
```

1.  可选参数(&optional)  
    如果你的函数需要可选择的参数，只需在参数列表中加&optional选项，在该选项后的剩余参数均是可选的.
    
    ```auto
    ;; 定义一个有两个可选参数的函数，可选参数为cc和dd
    (defun myfun (aa bb &optional cc dd)
        "test optional arguments"
        (insert aa bb cc dd))
    
    (myfun "1" "2" "3" "4")             ;; 当optional parameter 没有给出，则它的值为nil
    
    (myfun "myaa" "mybb" nil "mydd")    ;; 若你不关心某个可选参数，可将其置为nil
    ```
    
2.  不定量参数（&rest）  
    要指定未指定数量的参数，可在最后一个参数添加&rest name；name的值可以是一个list，若没有给出，则是nil
    
    ```auto
    (defun ff (aa bb &rest cc)
      "test rest arguments"
      (message "%s" cc))      ;; cc is a list
    
    (ff "1" "2" "3" "4")      ;; ("3" "4")
    ```
    

## 指令定义

+   指令就是一个函数，用户可以通过调用execute-extended-command(即M-x)执行
+   若一个函数是一个指令，我们说这个函数可用于交互（interactive）
+   若使一个函数可交互，在函数的doc string后面增加代码(interactive)
    
    ```auto
    (defun yay ()
      "Insert “Yay!” at cursor position."
      (interactive)
      (insert "yay!"))
    ```
    
    执行以上代码，然后可以使用"M-x yay"调用该函数.
    

## 参考

1.  [https://learnxinyminutes.com/docs/elisp/](https://learnxinyminutes.com/docs/elisp/)
2.  [http://ergoemacs.org/emacs/elisp\_basics.html](http://ergoemacs.org/emacs/elisp_basics.html)
