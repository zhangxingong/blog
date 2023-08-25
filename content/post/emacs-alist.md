+++
title = "elisp结构Association List | elisp类型"
date = 2023-08-25T14:37:00+08:00
tags = ["学习", "基础"]
categories = ["emacs"]
draft = false
weight = 2003
author = "zhangxingong"
+++

> Association List (aka alist) is a value type in Emacs Lisp.
> Association List is a List , where each element is a Cons Pair , like this
> (cons key val)
> In each cons pair, the key and value can be any value type.
> Items in Association List can have duplicate keys, and order is maintained.


## 创建 {#创建}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
Tip: dot notation for cons
when creating a association list, For example

(list
(cons k1 v1)
(cons k2 v2)
is often written as

'(
(k1 . v1)
(k2 . v2)
{{< /highlight >}}

> What is the Difference Between Association List and Hash Table?
> Association List is ordered. Hash Table items are not.
> Association List can have duplicate keys. Hash Table keys are unique.
> Association List access time is proportional to number of items.
> Hash Table is constant time to access any item regardless of number of items.
> Association List entries are hard to modify. As a list, it's designed to only add or drop first item of the list.
> Hash Table entries are designed to be modified, or added or deleted.

Using string as key:

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
;; example of association list
(setq
xx
(list
(cons "aa" 23)
(cons "bb" 24)
(cons "cc" 33)))

;; dot notation
(setq
xx
'(("aa" . 23)
("bb" . 24)
("cc" . 33)))
{{< /highlight >}}

Using Symbol as key:

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
;; example of association list
;; where keys are symbols, values are numbers

(setq
xx
(list
(cons 'aa 23)
(cons 'bb 24)
(cons 'cc 33)))

;; dot notation
(setq
xx
'((aa . 23)
(bb . 24)
(cc . 33)))
{{< /highlight >}}

> Symbol Key vs String Key
> Usually, Symbol is used for key. eq tests if 2 symbols are equal.
> You can also use String as key. To compare if 2 string is equal, equal works.
> Some functions for alist use eq to test existence of key, and others use equal.
> Some lets you specify a function for equality test.
> So, it is important to know:
> What datatype you are using as key in your alist
> Which equality test is used by a specific alist function.


## Get Value by Key {#get-value-by-key}

{{< highlight emacs-lisp >}}

alist-get
(alist-get key alist &optional default remove testfn)
Return the first value of the key. If no exist, return default or nil.
the remove should be nil. (it is used in advanced situation with setf.
you shouldn't use that for beginning lisp. See doc.)

key existence is checked by testfn (must be a symbol of function).
Default to eq. [see Emacs Lisp: Test Equality]

(setq xx
'(("aa" . 23)
("bb" . 24)
("cc" . 33)))

;; get the value with key "bb". if not found, return 999. use string-equal for comparison
(alist-get "bb" xx 999 nil 'string-equal)
;; 24

(alist-get "dd" xx 999 nil 'string-equal)
;; 999
(setq xx
'((aa . 23)
(bb . 24)
(cc . 33)))

;; get the value with symbol key bb. if not found, return 999
(alist-get 'bb xx 999)
;; 24

(alist-get 'dd xx 999)
;; 999
{{< /highlight >}}


## Get Pair by Key {#get-pair-by-key}

{{< highlight emacs-lisp >}}
assoc
(assoc key alist)
Return the first pair with the key. If no exist, return nil.
(key existence is checked by equal. [see Emacs Lisp: Test Equality] )
(setq xx
'(("aa" . 23)
("bb" . 24)
("cc" . 33)))

;; get the pair with key "bb"
(assoc "bb" xx)
; return ("bb" . 24)
assq
(assq key alist)
same as assoc except key is checked by eq. Use this if all keys are Symbols
(setq xx
'((aa . 23)
(bb . 24)
(cc . 33)))

(assq 'aa xx)
{{< /highlight >}}


## Check If a Key Exist {#check-if-a-key-exist}

Use assoc or assq.


## Get Pair by Value {#get-pair-by-value}

{{< highlight emacs-lisp >}}
You can search alist by value.

rassoc
(rassoc val alist)
Return the first pair that has specific value. Else return nil. Test is done by equal.
(setq xx
'(("aa" . 23)
("bb" . 24)
("cc" . 33)))

;; get the pair with value 24
(rassoc 24 xx)
; return ("bb" . 24)
rassq
(rassq value alist)
same as rassoc except value is compared using eq.

Add a Element
Add a Pair to Front
Add a element to the front. Use push

(setq xx
'(("aa" . 23)
("bb" . 24)
))

;; add a element
(push '("cc" . 33) xx)
Add a Pair If Key No Exist
(setq xx
'(("aa" . 23)
("bb" . 24)
))

(when (not (assoc "cc" xx))
(push '("cc" . 33) xx))
{{< /highlight >}}

{{< highlight emacs-lisp >}}
Add a Pair If Pair No Exist
(defun xah-add-asso-if-pair-no-exist (ConsPair Alist)
"Add ConsPair to Alist if the ConsPair not exist.
Both key and value of ConsPair are checked. With `equal'.
Return new Alist.
Version 2021-12-03"
(let* ((xkey (car ConsPair))
(xval (cdr ConsPair))
(xresult (assoc xkey Alist)))
(if (and xresult (equal xval (cdr xresult)))
nil
(push ConsPair Alist))
Alist
))

;; HHHH---------------------------------------------------

;; sample usage

(xah-add-asso-if-pair-no-exist
(cons "aa" 23)
(list (cons "aa" 23)
(cons "bb" 24)))
;; not added

(xah-add-asso-if-pair-no-exist
(cons "aa" 99)
(list (cons "aa" 23)
(cons "bb" 24)))
;; added

;; HHHH---------------------------------------------------
;; sample usage with dot notation

(xah-add-asso-if-pair-no-exist
'("aa" . 23)
'(("aa" . 23)
("bb" . 24)))
;; not added

(xah-add-asso-if-pair-no-exist
'("aa" . 99)
'(("aa" . 23)
("bb" . 24)))
;; added
{{< /highlight >}}


## Delete Pairs by Key {#delete-pairs-by-key}

{{< highlight emacs-lisp >}}
assoc-delete-all
(assoc-delete-all KEY ALIST &optional TEST)
Delete all elements that has key KEY. Keys are checkd by TEST. Defaults to equal.
Return the modified alist. Elements of ALIST that are not conses are ignored.
(setq xx
'(("aa" . 23)
("bb" . 24)
))

(setq xx (assoc-delete-all "bb" xx))
assq-delete-all
same as assoc-delete-all but uses eq for testing key.
{{< /highlight >}}


## Property List {#property-list}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}

What is Property List
Property List (aka plist) is a List , but to be interpreted as list of pairs, like this:

'(key1 val1 key2 val2 etc)

Property list is not supposed to have duplicate keys, and should always have even length.

Key should be lisp Symbols , value can be any lisp object.

Use of Property List
Property List is used as a simplest form of key/value pairs.

Property list is used extensively in emacs.

The 2 major use of property list are:

Symbol Property List. Each symbol, is associated with a property list.
Used primarily to store info related to the symbol, such as compiler info, but can be anything.
Text Properties. Any text in a buffer, can have a property list, used to store syntax color info,
special keyboard shortcut, etc.
Property list isn't a generic data structure. If you have more than ten items,
you probably should use Association List or Hash Table .

Get a Key's Value
plist-get
(plist-get PLIST PROP)
return the value of key PROP from property list PLIST. If key does not exist, return nil.
Existence of key is checked with eq. [see Emacs Lisp: Test Equality]
(plist-get '(x 1 y 2) 'y) ; 2
(plist-get '(x 1 y 2) 'b) ; nil
lax-plist-get
similar to plist-get, but compare key using equal.
Add/Modify item
plist-put
(plist-put PLIST PROP VAL)
add or change the value of key PROP in PLIST to VAL. The new plist is returned.
Old plist may or may not be changed. Always use setq on original variable.
Existence of key is checked with eq.
;; create a var xx with value of property list
(setq xx '(a 1 b 2))

;; set value to a existing key
(setq xx (plist-put xx 'b 3))

xx
;; (a 1 b 3)
lax-plist-put
similar to plist-put, but compare key using equal.
Check Key Existence
plist-member
(plist-member PLIST PROP)
Return true if PLIST has the property PROP. The PROP is a symbol.
Unlike plist-get, this allows you to distinguish between a missing property and a property with the value nil.
The return value is actual the tail of PLIST whose car is PROP.
(setq xx '(a 1 b 2))

;; check if a key exist
(plist-member xx 'b)
;; (b 2)
{{< /highlight >}}


## Symbol Property List {#symbol-property-list}

> Each lisp symbol is associated with a Property List .
> This property list is stored in the Symbol's property list cell.
> Symbol Property List is used extensively in emacs. It is also very useful if you want to write a function with state.
> You can store the state info with the symbol itself, instead of using a global variable.

{{< highlight emacs-lisp >}}
Set Whole Plist
setplist
(setplist SYMBOL NEWPLIST)
Set SYMBOL's property list to NEWPLIST, and return NEWPLIST.
(setplist 'ff '(a 1 b 2))
Get Whole Plist
symbol-plist
(symbol-plist SYMBOL)
Return SYMBOL's property list.
Add/Set a Key
put
(put SYMBOL PROPNAME VALUE)
Store SYMBOL's PROPNAME property with value VALUE.
;; set the value of key xx, of symbol ff's property list
(put 'ff 'xx 5)
Get a Key's Value
get
(get SYMBOL PROPNAME)
Return the value of SYMBOL's PROPNAME property.
;; get the value of key xx, of symbol ff's property list
(get 'ff 'xx)
{{< /highlight >}}


## list {#list}

{{< highlight emacs-lisp "linenos=true, linenostart=1" >}}
First, Rest
(car list)
first element
(equal
(car '("a" "b" "c"))
"a"
)
(cdr list)
rest elements
(equal
(cdr '(0 1 2 3 4))
'(1 2 3 4))
Nth, Nth Rest, Not N Rest
(nth n list)
nth element. (Index starts from 0.)
(equal
(nth 1 '(0 1 2 3 4))
1)
(nthcdr n list)
rest starting at n.
(equal
(nthcdr 2 '(0 1 2 3 4))
'(2 3 4))
(butlast list n)
without the last n elements.
(equal
(butlast '(0 1 2 3 4 5))
'(0 1 2 3 4))

(equal
(butlast '(0 1 2 3 4 5) 2)
'(0 1 2 3))
Last, Last N
(last list)
last as a list. i.e. return (cons lastElement nil).
To get the actual last item of a list, do (car (last list))

(equal
(car (last (list "a" "b" "c")))
"c"
)

(equal
(last (list "a" "b" "c"))
(cons "c" nil)
)
(last list &optional n)
last n items.
(equal
(last '(0 1 2 3 4 5 6) 2)
'(5 6)
)

Add Element
(push new listVar)
Add element to the front.
Modify the listVar.
Return the new value of listVar
(setq xx '(1))

;; after push, the var is modified, and the var's new value is returned
(eq (push 2 xx) xx)

(equal xx '(2 1))
The variable is modified even if the pushed list is inside a list.

;; a list of lists
(setq xx '((1 2) (3 4) (5 6)))

;; push b to one of the list
(equal
(push "b" (nth 1 xx))
'("b" 3 4))

;; the xx is modified
(equal
xx
'((1 2) ("b" 3 4) (5 6)))
also if the variable is a vector:

;; a vector of lists
(setq xx [(1 2) (3 4) (5 6)])

;; push b to one of the list
(equal
(push "b" (aref xx 1))
'("b" 3 4 ))

;; the xx is modified
(equal
xx
[(1 2) ("b" 3 4 ) (5 6)]
)
(add-to-list listVar ELEMENT &optional APPEND COMPARE-FN)
Add to list when not already in it.

(setq xx '(1 2 3))

;; add "a" to it. return the modified var
(eq
(add-to-list 'xx "a" )
xx)

;; check the new value
(equal
xx
'("a" 1 2 3))
(add-to-ordered-list listVar ELEMENT &optional ORDER)
Add to specific position in list, if it does not exist. The list is reordered.

Remove Element
(pop listVar)
Remove first element from the variable. Return the removed element.

(setq xx '(1 2 3 4))
(equal (pop xx) 1)
(equal xx '(2 3 4))
(nbutlast listVar n)
Remove last n elements from the variable. Return the new value of the variable.

(setq xx '(0 1 2 3))
(equal (nbutlast xx 1) '(0 1 2))
(equal xx '(0 1 2))
Replace Element
(setcar listVar new)
Replace the first element in listVar with new. Return new.

(setq xx '(1 2 3 4))
(equal (setcar xx "a") "a")
(equal xx '("a" 2 3 4))
(setcdr listVar newTail)
Replace the rest of elements in listVar with newTail. Return newTail.

Warning: if you want the result to be a Proper List, the newTail should be a proper list.

(setq xx '(1 2 3 4))

(equal
(setcdr xx (cons "a" nil))
(cons "a" nil))

(equal xx '(1 "a"))

(member x list)
Check if x is in list. If so, return a list starting with the first occurrence of object. Else return nil.
Comparison done using equal. [see Emacs Lisp: Test Equality]
(member "4" '("3" "4" "5")) ;; ("4" "5")
(member-ignore-case x list)
same as member, except that x should be a string, and comparison ignores letter-case.
(member-ignore-case "A" '("b" "a")) ; ("a")
(memq x list)
Same as member, but comparison done using eq. Use this if all items are Symbols.
(memql x list)
Same as member, but comparison done using eql.

remq
(remq x list)
Remove all x in list.
Returns a new list.
The original list is unchanged.
Comparison is done with eq.
(setq xx '(3 4 5))
(remq 4 xx) ; (3 5)
xx ; (3 4 5)
delq
(delq x list)
Remove all x in list.
The original list is destroyed.
Returns a new list.
Comparison is done with eq.
(setq xx '(3 4 5))

;; always set result to the same var
(setq xx (delq 4 xx)) ; (3 5)
Delete Duplicates
delete-dups
(delete-dups list)
This function destructively removes all duplicates from list, return a new list.
The first one is kept among duplicates. Comparison done using equal.

(setq xx '(3 4 5 3 2))
(setq xx (delete-dups xx)) ; (3 4 5 2)

Backquote Reader Macro is a lisp reader macro , which transforms syntax before lisp compiler runs the code.

Backquote Reader Macro is useful for:

Eval some of the list element only.
Change list into just its elements, inside a list.
Eval Some Elements Only
Syntax:

`(x1 x2 rest)

for each element you want to eval, put a comma in front of it. e.g. eval second elemnt

`(x1 ,x2 x3)

;; example of eval only some element of a list

(setq x1 1)
(setq x2 2)

;; eval just x1
(setq x3 `(0 ,x1 x2))

(equal
x3
'(0 1 x2))
;; true

(proper-list-p x3)
;; true
Change List into Its Elements
Syntax:

`(x1 x2 rest)

for each element that is a list you want to become elements,
put “comma at” ,@ in front of it. e.g. spill x2 as elements:

`(x1 ,@x2 x3)

;; example of turning a list into elements, inside a list

(setq x1 (list 1 2))
(setq x2 (list 3 4))

;; we want the elements of x1 and x2 inside a list, but not as sublist
(setq x3 `(0 ,@ x1 ,@ x2))

(equal
x3
'(0 1 2 3 4))
;; true

(proper-list-p x3)
;; true
;; Backquote Reader Macro can be used to feed a list into a function as args

;; our test function
(defun ff (x y z)
"return args as one string"
(format "%s %s %s"  x y z))

;; normal usage
(equal
(ff 2 3 4)
"2 3 4")

;; define a list
(setq xx '(2 3 4))

;; use backquote reader macro, to turn a list into elements, then use eval
(equal
(eval `(ff ,@ xx))
"2 3 4")
{{< /highlight >}}
