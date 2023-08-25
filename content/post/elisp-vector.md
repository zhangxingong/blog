+++
title = "elisp数据结构vector | elisp类型"
date = 2023-08-25T14:15:00+08:00
tags = ["笔记", "编程", "学习", "基础"]
categories = ["emacs"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## Emacs-lisp vector数据类型是一个有序的值序列，具有固定数量的元素。它实现了数组数据结构。 {#emacs-lisp-vector数据类型是一个有序的值序列-具有固定数量的元素-它实现了数组数据结构}

1.  vector是一个有序的值序列。
2.  任何元素都可以是任何类型、混合的。
3.  元素的值可以更改。
4.  元素数量不能更改。（即矢量的长度是固定的。）
5.  对任何位置的读/写都有恒定的访问时间。


## 语法，方法 {#语法-方法}


### 创建 {#创建}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
(make-vector length val)
Create a vector of given length and value for all elements.
(equal
(make-vector 5 0)
[0 0 0 0 0]
)
(vector a b etc)
Create a vector with elements, the elements are evaluated.
(let (xx)
(setq xx 3)
(equal
(vector 1 2 xx)
[1 2 3]
))
[a b etc]
Create a vector, do not evaluate elements.
(let (aa xx)
(setq aa 4)
(setq xx [3 aa 5])

(equal
xx
[3 aa 5]
))
;; the aa remains a symbol
{{< /highlight >}}


### Fill Vector {#fill-vector}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
(fillarray arrayVar val)
Make all elements of arrayVar to have value val, modify the arrayVar, return the variable's new value.
arrayVar can a variable of array, or just array. [see Emacs Lisp: Sequence Type]

(setq xx [3 4 5])

(eq
;; set all element to 1, modify the variable, return the var's new value
(fillarray xx 1)
xx
)

(equal xx [1 1 1] )
(equal
(fillarray [3 4 5] 1)
[1 1 1])
{{< /highlight >}}


### Length {#length}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
(equal
(length (vector 7 4 5))
3
)
{{< /highlight >}}


### Get Element {#get-element}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
(aref array n)
Return the element of array at index n.
;; get a element from vector
(equal
(aref ["a" "b" "c"] 0)
"a"
)
{{< /highlight >}}


### Change Element {#change-element}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
(aset arrayVar idx new)
Change element of arrayVar at index idx the value new.
Modifies arrayVar.
Return new.
(setq xx [3 4 5])
(equal (aset xx 0 "b") "b")
(equal xx ["b" 4 5])
{{< /highlight >}}


### Nested Vector {#nested-vector}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
Vector can be nested in any way, because the elements can be any type.

;; nested vector
[[1 2] [3 4]] ; 2 by 2 matrix
;; random nested vector
[8 [3 [2 9] c] 7 [4 "b"]]
{{< /highlight >}}


### Join or Convert List, Vector, String {#join-or-convert-list-vector-string}


### Join or Convert Sequence to Vector {#join-or-convert-sequence-to-vector}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
;vconcat sequence1 sequence2 etc)
;Join any Sequence Type and return a vector.

;; join vectors
(equal
(vconcat [3 4] ["a" "b"])
[3 4 "a" "b"])

;; join vector and list
(equal
(vconcat [3 4] '("a" "b"))
[3 4 "a" "b"]
)

;; join vector and string
(equal
(vconcat [3 4] "ab")
[3 4 97 98])

;; string elements are converted to char.
;; 97 is the codepoint for the char a
{{< /highlight >}}


### Sequence to List {#sequence-to-list}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
;(append sequence1 sequence2 etc)
;Join any Sequence Type and return a list.

;Warning: if you want result to be Proper List , the last element must be a list, or nil.

;join lists:

;; join lists
(equal
(list 1 2 3 4)
(append (list 1 2) (list 3 4)))
convert vector to list:

;; convert vector to list
(equal
(append [1 2 3] nil)
'(1 2 3))

;; this creates improper list
(equal
(append [1 2 3] [4 5])
'(1 2 3 . [4 5]))

;; proper list
(equal
(append [1 2 3] [4 5] nil)
'(1 2 3 4 5))

;; join vectors and lists to list
(equal
(append [1 2 3] [4 5] '(6))
'(1 2 3 4 5 6))
;; proper list
{{< /highlight >}}


### Sequence to String {#sequence-to-string}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
;To convert a list to string, use mapconcat or format. [see Emacs Lisp: Format String]

;mapconcat
;(mapconcat function sequence separator)
;Apply function to each element, and concat the results as strings, with separator between elements.

;; list to string
(string-equal
(mapconcat 'number-to-string '(1 2 3) ",")
"1,2,3")
;; list to string
(string-equal
(mapconcat 'identity '("a" "b" "c") ",")
"a,b,c")
;; vector to string
(string-equal
(mapconcat 'number-to-string [1 2 3] ",")
"1,2,3")
(format "%s" sequence)
Return a string.
;; convert list to string

(format "%s" '(1 "two" 3))
;; "(1 two 3)"

(substring (format "%s" '(1 "two" 3)) 1 -1)
;; "1 two 3"
{{< /highlight >}}
