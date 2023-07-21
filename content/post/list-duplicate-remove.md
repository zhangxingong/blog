+++
title = "Java列表去重 | Java基础"
date = 2023-07-21T15:34:00+08:00
tags = ["笔记", "编程", "学习", "基础"]
categories = ["subject"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 使用HashSet实现List去重(无序) {#使用hashset实现list去重--无序}

```java
/**使用HashSet实现List去重(无序)
 *
 * @param list
 * */
public static List removeDuplicationByHashSet(List<Integer> list) {
    HashSet set = new HashSet(list);
    //把List集合所有元素清空
    list.clear();
    //把HashSet对象添加至List集合
    list.addAll(set);
    return list;
```


## 使用TreeSet实现List去重(有序) {#使用treeset实现list去重--有序}

```java
/**使用TreeSet实现List去重(有序)
 *
 * @param list
 * */
public static List removeDuplicationByTreeSet(List<Integer> list) {
    TreeSet set = new TreeSet(list);
    //把List集合所有元素清空
    list.clear();
    //把HashSet对象添加至List集合
    list.addAll(set);
    return list;
```

作者：程序员白楠楠
链接：<https://juejin.cn/post/6894606364711059470>
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
