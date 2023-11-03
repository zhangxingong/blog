+++
title = "深入理解 哈夫曼编码"
date = 2023-11-01T11:51:19+08:00
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++


## 深入理解 哈夫曼编码


## 哈夫曼编码(Huffman Coding)

### 笔试【编程题】 字符编码

　　最近，春招实习生开始了，相信大家都开始准备各种面试、笔试了。  
　　博主也不例外，走上了起早贪黑，看书、刷题的不归路。作为人生的**第一篇博客**（之前确实太懒），在这里给大家带来一篇 *哈夫曼编码* 相关知识的讲解与代码分享，同时也作为一个算法笔记，有兴趣的同学可以来看看，有写的不对的地方欢迎指出，祝大家都能拿到一个好的offer。

* * *

##### 首先是 *哈夫曼编码* 的一些理论基础

> 　　哈夫曼树又称最优二叉树，是一种带权路径长度最短的二叉树。所谓树的带权路径长度，就是树中所有的叶结点的权值乘上其到根结点的路径长度（若根结点为0层，叶结点到根结点的路径长度为叶结点的层数）。树的带权路径长度记为WPL=(W1\*L1+W2\*L2+W3\*L3+…+ Wn\*Ln)，N个权值Wi(i=1,2,…n)构成一棵有N个叶结点的二叉树，相应的叶结点的路径长度为Li(i=1,2,…n)。可以证明哈夫曼树的WPL是最小的。  
> *构造哈夫曼树的算法如下：*  
> 1）对给定的n个权值{W1,W2,W3,…,Wi,…,Wn}构成n棵二叉树的初始集合F={T1,T2,T3,…,Ti,…, Tn}，其中每棵二叉树Ti中只有一个权值为Wi的根结点，它的左右子树均为空。  
> 2）在F中选取两棵根结点权值最小的树作为新构造的二叉树的左右子树，新二叉树的根结点的权值为其左右子树的根结点的权值之和。  
> 3）从F中删除这两棵树，并把这棵新的二叉树同样以升序排列加入到集合F中。  
> 4）重复2）和3），直到集合F中只有一棵二叉树为止。

　　简而言之，就是要先知道一系列的权值信息（比如说要编码字符串的每个字符出现频率），然后把它们分别作为哈夫曼树中各个叶子节点的权值，接下来呢就需要由叶子节点来自下往上构造哈夫曼树了。  
　　构造的思路是这样的：所有的叶子节点构成了最初的森林（所有树的集合），我们可以使用priority\_queue对这些树进行管理，使得集合中的数据始终保持着递增的顺序。然后，每次就让前两个元素出队，再构造一个新的节点（树），其权值为出队的两个元素权值之和，左子树为前面第一个元素，右子树为前面第二个元素，这样集合中元素的个数－１。如此做，直至集合中只剩余一个节点（根节点）为止，此时仅有的这棵树便是哈夫曼树。

##### 以美团的这题为例

输入

> MT-TECH-TEAM

输出

> 33

* * *

##### 具体编码流程如下

![初始状态](https://img-blog.csdn.net/20170322154930426?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMTUwNzE3NQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![执行1次](https://img-blog.csdn.net/20170322155116740?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMTUwNzE3NQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![执行2次](https://img-blog.csdn.net/20170322155227362?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMTUwNzE3NQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)