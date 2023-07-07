+++
title = "最长的字母序连续子字符串的长度 | leetcode"
date = 2023-07-07T11:40:00+08:00
tags = ["笔记", "术语", "编程"]
categories = ["subject"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 思路 {#思路}

遍历字符串，判断**下一个字符**和当前字符是否连续，连续计数加1，不连续就重置计算为1.


## 解题方法 {#解题方法}

1.初始化变量。

{{< highlight java >}}

int max=1;//最大连续字符数量
char[] chars = s.toCharArray();
int num=1;//连续字符出现数量
{{< /highlight >}}

2.遍历字符串，判断**下一个字符**和当前字符是否连续，连续计数加1，不连续就重置计算为1.

{{< highlight java >}}

for (int i = 0; i < chars.length-1; i++) {
if (chars[i]+1!=chars[i+1]){// 不连续 重置数量
num=1;
}else { //字符连续 计数加1
num++;
//计算最大值
max=max>num?max:num;
}
{{< /highlight >}}


## 复杂度 {#复杂度}

-   时间复杂度: O(n)

-   空间复杂度: O(n)


## Code {#code}

{{< highlight java >}}

class Solution {
public   int longestContinuousSubstring(String s) {
int max=1;//最大连续字符数量
char[] chars = s.toCharArray();
int num=1;//连续字符出现数量
// 遍历到n-1个字符
for (int i = 0; i < chars.length-1; i++) {
if (chars[i]+1!=chars[i+1]){// 不连续 重置数量
num=1;
}else { //字符连续 计数加1
num++;
//计算最大值
max=max>num?max:num;
}
}
return max;
}
{{< /highlight >}}


## 执行效果 {#执行效果}

![](https://pic.leetcode.cn/1682040911-wtlNlA-image.png)

[org-key](https://orgmode.org/orgcard.txt)
