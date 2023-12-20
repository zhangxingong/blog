+++
title = "Java 萌新入门 -- 一些常见的基础知识点"
date = "2023-12-20T14:08:39+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#_2)
+   [发现宝藏](#_7)
+   [第一章.java语言概述+java语言基础](#javajava_11)
+   +   [1.程序文档风格和注释](#1_13)
    +   [2.从键盘读取数据](#2_19)
    +   [3.变量与赋值](#3_27)
    +   [4.java标识符](#4java_35)
    +   [5.关于数据类型与逻辑运算符](#5_44)
    +   [6.限制输出 小数位数：（用第三种）](#6__58)
    +   [7.关于带标签的的循环控制语句](#7_63)
+   [第二章.类和对象与数组的定义](#_68)
+   +   [1.方法设计](#1_70)
    +   [2.面对对象-初步了解](#2_105)
    +   [2.类的定义](#2_116)
    +   [3.创建对象及其使用](#3_124)
    +   [4.堆和栈内存](#4_129)
    +   [5.使用对象作为方法的参数](#5_153)
    +   [6.成员变量和局部变量的区别](#6_160)
    +   [7.面对对象三大特征-封装性](#7_167)
    +   [8.this关键字的应用](#8this_177)
    +   [9.构造方法](#9_189)
    +   [10.定义一个标准的类](#10_194)
    +   [11.静态关键字static](#11static_199)
    +   [12.权限修饰符](#12_223)
+   [第三章.数组与字符操作](#_249)
+   +   [1.一维数组的定义：](#1_251)
    +   [2.增强的for循环](#2for_293)
    +   [3.数组参数与返回值](#3_305)
    +   [4.二维数组的定义](#4_312)
    +   [5.格式化输出](#5_356)
+   [第四章.继承](#_370)
+   +   [1.继承-初步了解](#1_372)
    +   [2.继承的格式](#2_378)
    +   [3.继承中成员变量访问的特点](#3_382)
    +   [4.区分子类方法中重名的三种变量](#4_392)
    +   [5.继承中成员方法的访问特点](#5_402)
    +   [6.方法的覆盖重写](#6_409)
    +   [7.构造方法在覆盖重写中的访问特点](#7_430)
    +   [8.super关键字与this的比较](#8superthis_435)
    +   [9.java继承中的特点](#9java_452)
    +   [10.抽象方法与抽象类](#10_461)
    +   [11.final修饰符](#11final_482)
+   [第五章.接口](#_494)
+   +   [1.接口-初步了解](#1_496)
    +   [2.接口的基本定义格式](#2_501)
    +   [3.接口的抽象方法定义](#3_506)
    +   [4.接口中抽象方法的实现（接口的实现）](#4_511)
    +   [5.接口中的默认方法](#5_516)
+   [总结](#_538)

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 第一章.java语言概述+java语言基础

### 1.程序文档风格和注释

+   一致的缩进和空白：二元操作符的两边应该各加一个空格；
+   块的风格：代码块大致分为两种风格，一种是行模式，另一种是次行式;
+   在eclipse中使用 **CTRL+SHIFT+F** 快捷键可以对源代码格式化; 使用 **ALT+SHIFT+R** 一键选中同名词条;

### 2.从键盘读取数据

要从键盘读取数据可以使用 **Scanner** 类的 **nextInt** 方法或 **nextDouble** 方法或 **next** 方法（字符型）：

> 1.  创建一个 Scanner 类的对象；
> 2.  以标准输入 System.in 作为参数；
> 3.  得到 Scanner 对象后，就可以调用它的有关方法获取数据。

![在这里插入图片描述](https://img-blog.csdnimg.cn/b140e7e7886645fd8153031432664c74.png)

### 3.变量与赋值

Java有两种类型的变量：**基本类型**的变量和**引用类型**的变量。

+   **基本类型**的变量包括数值型（整数型和浮点型）、布尔型和字符型；
+   **引用类型**的变量包括类、接口、枚举和数组等。

### 4.java标识符

+   在程序设计中，标识符用来为变量、方法和类命名，有两种命名方法：
+   在java程序中，类名和接口名一般使用 **PascalCase** 拼写法，且应该用单词命名；
+   变量名和方法名一般用 **camelCase** 拼写法。

> 1.  PacasalCase 称为帕斯卡拼写法，即将命名的所有单词首字母大写，然后直接连接起来，单词之间没有连接符，如NumberOfStudent;
> 2.  cameCase 称为骆驼拼写法，它与PacasalCase的拼写法的不同之处是将第一个单词的首字母小写，如fristName。

### 5.关于数据类型与逻辑运算符

+   若要表示 **long** 类型字面值，可以在后面加上 **l** 或 **L**；
+   浮点类型的科学计数法形式：如 256e3 表示 256\*10^3;
+   如果表示 **float** 型字面值数据，必须在后面加上 **F** 或 **f**;
+   ’\\n’ 表示换行;
+   布尔型：“bollean”；
+   **i++** 表示先使**用完该变量后再加 1**,**++i** 表示**先加 1 后再赋值给变量**；
+   “&&” 和 “||” 为短路运算符，而 “&” 和 “|” 为非短路运算符。它们的区别是：短路运算符，当使用 “&&” 进行“与”运算时，若第一个(左边)操作数的值为 false 时，就可以对整个表达式进行判定；而用短路运算符 “&” 则需要对表达式两边求解。同理。、
+   对于异或 “^” ，当两个操作数一 “true” 一 “false” 时表达式为真，否则表达式为假；
+   复合运算符是”整体”为单位，如 a+=5\*++a/5+2 等价于 a=a+(5\*++a/5+2);
+   运算符的优先级：自增自减>逻辑非>加减乘除运算>比较运算符>逻辑与逻辑或>赋值运算符>复合运算符；
+   强制数据类型转换：其语法是在括号中给出要转换的目标数据类型，随后是待转换的数据类型。

### 6.限制输出 小数位数：（用第三种）

![在这里插入图片描述](https://img-blog.csdnimg.cn/54a8fb9c34824457ab3892aee0cb9f84.png)

### 7.关于带标签的的循环控制语句

+   带标签的 break 可用于循环结构和带标签的语句块，而带标签的continue 只能用于循环结构；
+   带标签的 break 和 continue 语句不能跳转到不相关的语句块。

## 第二章.类和对象与数组的定义

### 1.方法设计

+   初步了解（第一印象）

![在这里插入图片描述](https://img-blog.csdnimg.cn/363dec452c7e46438756099056392e8d.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/7776ff77beed4eaea3930a5be4305bc1.png)

+   方法的标准定义格式

![在这里插入图片描述](https://img-blog.csdnimg.cn/34a9bb46d7ee4b2c8167dc22201ed122.png)

+   方法调用的三种格式

![在这里插入图片描述](https://img-blog.csdnimg.cn/d541cc7e762f480fae08e54e2c118b2e.png)

+   方法调用的流程图解

> 1\. 找到方法  
> 2\. 参数传递  
> 3\. 执行方法体  
> 4\. 将方法的返回值带回方法的调用处

![在这里插入图片描述](https://img-blog.csdnimg.cn/1e6296ccb4e54701a795cc90c34ea9d2.png)

+   对比方法有参数和无参数

![在这里插入图片描述](https://img-blog.csdnimg.cn/814f99a427a445d586922b71d3e1e79a.png)

+   方法的重载

![在这里插入图片描述](https://img-blog.csdnimg.cn/ff61ca4a9df742cc94bc698886c15b64.png)

### 2.面对对象-初步了解

+   面对对象与面对过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/7c8bd0f94f314f30b337b756bf5078b5.png)

+   类和对象  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/8bfadf94c4d94fe3867fd46646cc0694.png)

### 2.类的定义

![在这里插入图片描述](https://img-blog.csdnimg.cn/1e057b30cf124597a1703c10bf32dc2a.png)

`成员变量一般不赋值，在创建对象后再赋值`

### 3.创建对象及其使用

![在这里插入图片描述](https://img-blog.csdnimg.cn/d4c982ec5ae9480997e3542678e421c5.png)

### 4.堆和栈内存

+   一个对象的内存图

> 1.  在运行方法前，方法区要最先有数据,保存的是“.class”;
> 2.  main方法优先执行，进入栈空间称为进栈或压栈；  
>     方法执行完后称为出栈，遵循“先进后出”的原则;
> 3.  等号左边好比是一个局部变量，对象名称其实就是个变量名称;
> 4.  new的东西全在堆当中,new的东西的内容看方法区;
> 5.  对于一个对象来说，它的成员方法保存的是一个地址值，从堆中的地址指向方法区中的地址;
> 6.  创建对象涉及到地址的传递,根据地址就能找到对象，对象通过地址也能找到对应的内容;
> 7.  一旦main方法结束后，整个程序就会停下来，所有的内存就全都没有了;

![在这里插入图片描述](https://img-blog.csdnimg.cn/81241859ca354315b5b13f81c717f5a1.png)

+   两个对象使用同一个方法的内存图(○1的重复)

![在这里插入图片描述](https://img-blog.csdnimg.cn/be3babd4a42040ce9291ec701c9d32cd.png)

+   两个对象引用指向同一个对象的内存图(注意栈内存中phone one 指向 phone two的箭头)

![在这里插入图片描述](https://img-blog.csdnimg.cn/911486e5e5e54e11b479ab20c2c0f294.png)

### 5.使用对象作为方法的参数

![在这里插入图片描述](https://img-blog.csdnimg.cn/86643fcf71cc44f0bcabf6afb284c310.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/d0a71ee55002459a85899fa70b2b7758.png)

### 6.成员变量和局部变量的区别

![在这里插入图片描述](https://img-blog.csdnimg.cn/f47a1572f87e4cacb9455c65e0ac0667.png)

`注意：方法参数可以直接打印（使用），因为调用方法必然会对参数赋值。`

### 7.面对对象三大特征-封装性

+   方法的封装  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/3db1acde5b004c15bff741e3eb6b7c55.png)
    
+   private关键字的封装
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/26054af704844ce3834d8cce82b9c7e8.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/42a217fb655a443098048cc4750ff30a.png)

### 8.this关键字的应用

+   This关键字主要使用在以下三种情况；

> 1.  解决局部变量与成员变量同名的问题；
> 2.  解决方法参数与成员变量同名的问题；
> 3.  用来调用该类的另一个构造方法。

+   Java语言规定，**this** **只能**用在 **非 static** 方法(实例方法和构造方法)中，不能用在 static 方法中。实际上，在对象调用一个非 static 方法时，向方法传递了一个引用，**这个引用就是对象本身**，**在方法体中用 this 表示**；

### 9.构造方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/3ffe0a0044824c8ba2be50b23cf0359e.png)

### 10.定义一个标准的类

![在这里插入图片描述](https://img-blog.csdnimg.cn/91d2e4791ef4494d9baf0c598ec8a6c5.png)

### 11.静态关键字static

+   静态关键字static初步了解

![在这里插入图片描述](https://img-blog.csdnimg.cn/69854be1fdb1433889b44009ef7053df.png)

+   静态static关键字修饰成员变量

![在这里插入图片描述](https://img-blog.csdnimg.cn/02f4a6c5f7c14615a0fd7715753c3408.png)

+   静态static关键字修饰成员方法

![在这里插入图片描述](https://img-blog.csdnimg.cn/1bd0c4c66a1843bdb1607b0b7adf76e7.png)

+   静态static的内存图

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5eda6b9b2ed4a4fb009071c1e524bca.png)

+   静态代码块

![在这里插入图片描述](https://img-blog.csdnimg.cn/e16b2f2bf429407ab3e3cabfb082de26.png)

### 12.权限修饰符

+   类定义中的权限修饰符

> 1.  **Public**：若类用public修饰，则称该类为公共类，公共类可以被任何包中的类使用；
> 2.  若不加public修饰符，类只能被同一个包中的其他类使用；
> 3.  如果类用abstract修饰，则该类称为抽象类；
> 4.  若用final修饰符，则该类为最终类。

+   变量的访问权限修饰符

> 1.  Public：若成员变量用public修饰，则称该变量为公共变量，公共变量可以被任何方法使用；
> 2.  没有访问修饰符，该变量只能被同一个包中的类访问；
> 3.  用private修饰的变量称为私有变量，私有变量只能被同一个类中的方法访问；
> 4.  用protected修饰的变量称为保护变量，保护变量可以同一个包的类或子类访问；
> 5.  实例变量和静态变量:变量如果用static修饰，则该变量称为最终变量，也称为类变量。没有用static修饰的变量称为实例变量；
> 6.  用final修饰的变量叫做最终变量，也称为标识符常量。常量可以在声明时赋值，也可以在后面赋初值，一旦为其赋值，就不能再改变了；

+   方法访问权限修饰符

> 1.  public：用public修饰的方法可以在任何类中调用；
> 2.  private：private修饰的方法只能在同一个类中被调用；
> 3.  protected：protected修饰的方法可以在同一个类，同一个包中的类及其子类中被调用；
> 4.  如果一个方法缺省访问修饰符，则称该包可访问的，即可以被同一个类的方法访问和同一个同一个包中的类访问；
> 5.  没有用static修饰的方法称为实例方法，用static修饰的方法称为静态方法。  
>     6. final和abstract方法  
>     用final修饰的方法称为最终方法，最终方法不能被覆盖，方法的覆盖与继承有关。用abstract修饰的方法称为抽象方法；

+   汇总

![在这里插入图片描述](https://img-blog.csdnimg.cn/f8cadb64df4d40879468b60abde061ef.png)

## 第三章.数组与字符操作

### 1.一维数组的定义：

+   声明数组；

声明数组就是告诉编译器数组名和数组元素类型，有以下两种等价形式：

```java
   Elementype []arrayName
   Elementype arrayName[]
```

注意：数组声明不能指定数组元素个数，这一点与c/c++不同  
在java语言中，数组是引用数据类型，也就是说数组是一个对象，数组名就是对象名(或引用名)。数组声明实际上是声明一个引用变量。如果数组元素都是引用类型，则称该数组是对象数组。所有数组都继承Object类，因此，可以调用Object类的所有方法。

+   创建数组：

数组声明仅仅声明一个数组对象引用，而创建数组是为数组的每个元素分配存储空间。创建数组使用new语句，一般格式为：

```java
ArrayName = new elementType[arraysize]
```

数组的声明和创建可以写在一个语句中，如：

```java
Double []marks = new double[5]; 
```

+   数组元素的初始化：

声明数组同时可以使用初始化器对数组元素初始化看，在一对大括号中给出数组的每个元素值。这种方式适合数组元素较少的情况，这种初始化也称为静态初始化。

```java
Double[] marks = new double[]{1,2,3,};
```

这种方法创建的数组不能指定大小，系统根据元素个数确定数组大小。另外还可以在最后一个数组元素加上一个逗号，以方便补充。还可以写成更简单的形式；

```java
Double[] marks = {1,2,3,};
```

### 2.增强的for循环

如果程序只需顺序访问数组中每个元素，可以使用增强的for循环。增强的for循环可以使用迭代数组和独行集合的每个元素。它的一般格式为：

```java
For(type inedntifier: expression) 
```

(数组元素数据类型) (数组的每个元素) (数组或集合对象)

### 3.数组参数与返回值

数组可以作为方法参数的参数和返回值。可以将数组对象作为参数传递给方法。

![在这里插入图片描述](https://img-blog.csdnimg.cn/eedef05d788a4e60bc29ff455af80e48.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/fdd5b15937b344ddaaae02f8086d6996.png)

### 4.二维数组的定义

+   二维数组的声明

```java
Elementype[][] arrayName;
Elementype arrayName; [][]
Elementype[] arrayName[];
```

+   二维数组的创建  
    创建二维数组就是为二维数组的每个元素分配存储空间。系统先为高维分配引用空间，然后再顺次为低维分配空间。分配空间有两种分配方式：

> 直接为每一维度分配空间,如：

```java
int[][]matrix = new int[2][3];
```

> 分别按次给不同维度赋值,如：

```java
int[][] matrix = new int[2][1];//先为一维分配空间
Matrix[0]=new int[3];//再为二维分配空间
Matrix[1]=new int[3];
```

+   二维数组的初始化

对于二维数组也可以使用初始化器在声明数组的同时为数组元素初始化。例如：

```java
int[][] matrix={{15,26,20,89},{23,80,67,54},{60,12,23,45}};
```

+   不规则的二维数组

Java的数组是数组的数组，即数组元素也是一个数组。对二维数组声明时可以只指定第一维的大小，第二维的每个元素可以指定不同的大小。如：

```java
String [][]cities = new String[2][];
Cities[0] = new String[3];
Cities[1] = new String[2];  
```

### 5.格式化输出

可以用System.out.printf()方法在控制台上显示格式化输出，格式如下：

```java
Public printStream printf(String format,object…args) 
```

参数format是格式控制字符串，其中可以嵌入格式符指定参数如何输出：args为输出列表，参数可以是基本数据类型，也可以是引用数据类型。如：

```java
System.out.println(“%7.2d”,a);
```

## 第四章.继承

### 1.继承-初步了解

(1)继承初步了解

![在这里插入图片描述](https://img-blog.csdnimg.cn/8229d24291a3498b9c31ecbe1500510b.png)

### 2.继承的格式

![在这里插入图片描述](https://img-blog.csdnimg.cn/886f248bba4c4c50b762700cbf6e2522.png)

### 3.继承中成员变量访问的特点

![在这里插入图片描述](https://img-blog.csdnimg.cn/9a5d5ec7b7b742d7a9870b5ac64e7c70.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/a3cd3ca2c1de485d951941e235cdb317.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/d630144853764eabb98c26d245bb7cd1.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/be71d8a4220e489587d055efcdc65919.png)

### 4.区分子类方法中重名的三种变量

![在这里插入图片描述](https://img-blog.csdnimg.cn/346383a4170b435893ce6c191ae4035a.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/16bfb0e2385942919ce5a2058b269589.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/8593583dfdf040e791f63dc6dccbe496.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/6bdfca5ed63f4e44ae70fa89f847647c.png)

### 5.继承中成员方法的访问特点

![在这里插入图片描述](https://img-blog.csdnimg.cn/f5f09d62bc0b44879508aa286197d3d4.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/544bd89e6464491daa61352a6eca15c3.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/60c80ca7fd314eb6bd7d815defbb1488.png)

### 6.方法的覆盖重写

+   基础概念  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/28411fb7825e491e9100c4b0492fcfb0.png)
    
+   注意事项
    
    Private方法不能覆盖。只有非private的实例方法才可以覆盖，如果在子类中定义了一个方法在父类中是private的，则这两个方法无关；  
    父类中的static方法可以被继承，但不能被覆盖。如果子类中定义了与父类中的static方法完全一样的方法，那么父类中的方法被隐藏。父类中被隐藏的static方法仍然可以使用”类名.方法名()”形式调用。
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/686164a1b3044b0584ea16630c3d73af.png)  
Private方法不能覆盖。只有非private的实例方法才可以覆盖，如果在子类中定义了一个方法在父类中是private的，则这两个方法无关；

父类中的static方法可以被继承，但不能被覆盖。如果子类中定义了与父类中的static方法完全一样的方法，那么父类中的方法被隐藏。父类中被隐藏的static方法仍然可以使用”类名.方法名()”形式调用。

+   应用场景

![在这里插入图片描述](https://img-blog.csdnimg.cn/c9c044dc506d4174aad103b01957cd36.png)

### 7.构造方法在覆盖重写中的访问特点

![在这里插入图片描述](https://img-blog.csdnimg.cn/86a1c30f88d64bab88066de6ab0463a2.png)

### 8.super关键字与this的比较

+   super关键字的三种用法

![在这里插入图片描述](https://img-blog.csdnimg.cn/3c63859e7053466194b6a43a22c9e78d.png)

+   this关键字的用法

![在这里插入图片描述](https://img-blog.csdnimg.cn/32b2fb9101c84f829172217fda940069.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/bb169383564245e89b3d9674136d8159.png)

+   super关键字和this关键字的内存图

![在这里插入图片描述](https://img-blog.csdnimg.cn/ca1dc4bd72054c538978fa9e7b1b0733.png)

### 9.java继承中的特点

![在这里插入图片描述](https://img-blog.csdnimg.cn/1dbd38e2d3284d0a91135b4b3209bb7a.png)

子类继承父类中非private的成员变量和成员方法;

定义类时若缺省extends关键字，则所定义的类为java.lang.object类的直接子类。

### 10.抽象方法与抽象类

+   抽象的概念初步了解  
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/d6f9deda8b9e497e9f339b9631fe0e06.png)
    
+   抽象方法与抽象类的定义格式
    

![在这里插入图片描述](https://img-blog.csdnimg.cn/bdf888696abc4ca497494c12b1836ae6.png)

+   抽象方法的使用

![在这里插入图片描述](https://img-blog.csdnimg.cn/0357c0196aa74a369843bef2e1febea3.png)

+   抽象类与抽象方法的注意事项

![在这里插入图片描述](https://img-blog.csdnimg.cn/b339533cd6494b31980dbd1ef3c4407f.png)

### 11.final修饰符

+   finlal修饰类

如果一个类用final修饰，则该类就为最终类，最终类不能被继承；

+   final修饰方法

如果一个方法用final修饰，则该方法不能被子类覆盖；

+   final修饰变量

用final修饰的变量包括类的成员变量、方法的局部变量和方法的参数。一个变量如果用final修饰，则该变量为常值变量，一旦赋值便不能改变。

## 第五章.接口

### 1.接口-初步了解

![在这里插入图片描述](https://img-blog.csdnimg.cn/c599f6f9402c48178fdfed13143ded00.png)

### 2.接口的基本定义格式

![在这里插入图片描述](https://img-blog.csdnimg.cn/a4c0d31c726943d7ae06e91a26225c2c.png)

### 3.接口的抽象方法定义

![在这里插入图片描述](https://img-blog.csdnimg.cn/6434c63731ff4a53b8f683717a425100.png)

### 4.接口中抽象方法的实现（接口的实现）

![在这里插入图片描述](https://img-blog.csdnimg.cn/2f5029c10bcb462e891b4335216d6707.png)

### 5.接口中的默认方法

+   初步了解（接口升级，类AB报错）

![在这里插入图片描述](https://img-blog.csdnimg.cn/097b7ae25c364aaeb888af399ab1f1b0.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/c4a5eaf3afdc4d1ba2c2817decf29e6f.png)

+   接口中默认方法的实现(类AB不变，但可调用default方法)

![在这里插入图片描述](https://img-blog.csdnimg.cn/58e6ee14a0e94cafaa4552ea296c51b1.png)![在这里插入图片描述](https://img-blog.csdnimg.cn/08dcdbbd4d0a44a59dc84cd170de7f9d.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/ff438b98657045bf9c02118f81a6629b.png)  
![在这里插入图片描述](https://img-blog.csdnimg.cn/1c69590224474d81bddb27e3eb7308a4.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/dc497c74dca941149322044c8f965641.png)

（与覆盖抽象方法略有差异）

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


