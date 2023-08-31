+++
title = "字符串匹配算法 | JAVA"
date = 2023-08-31T09:59:00+08:00
tags = ["笔记","学习","基础","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

>在计算机科学中，字符串匹配算法主要用于在一段文本（也称为"主串"）中查找特定的子串。以下是三种常用的字符串匹配算法：

1. **暴力匹配（Naive String Matching）：**

>这是最简单的字符串匹配算法。它从主串的第一个字符开始，与目标子串的第一个字符进行比较。
>如果这两个字符匹配，那么它会继续比较主串的下一个字符和目标子串的下一个字符，直到找到一个不匹配的字符或者匹配到了目标子串的末尾。
>然后，它会在主串中移动一位，重新从目标子串的第一个字符开始比较，重复这个过程，直到找到匹配或者遍历完整个主串。

>这种算法的时间复杂度是O(mn)，其中m是主串的长度，n是目标子串的长度。

2. **KMP算法（Knuth-Morris-Pratt）：**

>KMP算法是一种改进的字符串匹配算法，它通过预处理来减少比较的次数。
>KMP算法的核心是当主串中的某个字符与目标子串中的某个字符不匹配时，它能知道在目标子串中有一个位置可以提前跳过。
>这是通过一个"部分匹配表"实现的，该表记录了每个位置前的部分匹配值。

>KMP算法的时间复杂度是O(m+n)，其中m是主串的长度，n是目标子串的长度。

3. **Boyer-Moore算法：**

>Boyer-Moore算法是一种更快的字符串匹配算法。它分为两个步骤：坏字符规则和好后缀规则。
>坏字符规则是指在主串中与目标子串中的某个字符不匹配时，可以直接跳过目标子串中与该字符在字典序上相邻的位置。
>好后缀规则是指在主串中与目标子串中的某个字符不匹配时，可以跳过目标子串中与该字符在后缀上相邻的位置。

>Boyer-Moore算法的时间复杂度通常是O(m+n)，其中m是主串的长度，n是目标子串的长度。在最坏的情况下，它的时间复杂度是O(mn)。

>以上就是三种常用的字符串匹配算法。在实践中，Boyer-Moore算法通常是最快的，但KMP算法在某些情况下可能更快一些。
>而暴力匹配虽然最简单，但在处理大文本时效率低下。

1. **暴力匹配**（Brute Force）:
>这是最简单的字符串匹配算法。它从主字符串的第一个字符开始，尝试与子字符串进行匹配。
>如果匹配失败，它会向右移动一位，然后继续尝试。这个过程会一直重复，直到找到匹配的子字符串，或者检查完整个主字符串。


```java
public int search(String text, String pattern) {
    int i = 0;
    int j = 0;
    while (i < text.length() && j < pattern.length()) {
        if (text.charAt(i) == pattern.charAt(j)) {
            i++;
            j++;
        } else {
            i++;
            j = 0;
        }
    }
    if (j == pattern.length()) {
        return i - j;
    } else {
        return -1;
    }
}
```
2. **KMP算法**（Knuth-Morris-Pratt）:
KMP算法是一种改进的暴力匹配算法，它在子字符串与主字符串不匹配时，通过使用部分匹配表（也称为next数组），避免了不必要的字符比较。  
这个算法的主要思想是利用已经部分匹配的信息，避免重新开始匹配。


```java
public int search(String text, String pattern) {
    int[] next = computeNext(pattern);
    int i = 0; // index for text
    int j = 0; // index for pattern
    while (i < text.length()) {
        if (pattern.charAt(j) == text.charAt(i)) {
            i++;
            j++;
        } else if (j != 0) {
            j = next[j - 1];
        } else {
            i++;
        }
        if (j == pattern.length()) {
            return i - j;
        }
    }
    return -1;
}
private int[] computeNext(String pattern) {
    int[] next = new int[pattern.length()];
    next[0] = -1; // Pre-compute the next array from the previous one.
    int i = 0, j = -1; // i is the current index we're computing for, and j is the previous index.
    while (i < pattern.length() - 1) {
        if (j != -1 && pattern.charAt(i) == pattern.charAt(j)) {
            next[i] = j + 1; // update next value.
            i++; // move to next character.
            j++; // move to next character.
        } else { // if there is no match found, find the rightmost position that has been checked before, and set j to that value. Then, i will be matched with the next character after that.
            j = next[j]; // set the next index for next round of comparison with current index i.
        }
    }
    return next;
}
```
3. **Boyer-Moore算法**：
Boyer-Moore算法是另一种改进的暴力匹配算法，它在子字符串与主字符串不匹配时，  
通过使用坏字符规则和好后缀规则，尽可能向右移动子字符串的位置，以减少比较的次数。  
这个算法在处理大型文本时具有较高的效率。

```java
public class BoyerMoore {
    private final char[] pattern;
    private final int[] right;

    public BoyerMoore(String pattern) {
        this.pattern = pattern.toCharArray();
        this.right = new int[128]; // ASCII字符集大小

        for (int i = 0; i < this.pattern.length(); i++) {
            right[this.pattern[i]] = i; // 预处理，记录每个字符在模式串中最右出现的位置
        }
    }

    public int search(String text) {
        int M = this.pattern.length;
        int N = text.length();

        for (int i = 0; i <= N - M; i++) { // 从文本串的第一个字符开始匹配
            boolean matched = true;

            for (int j = 0; j < M; j++) { // 对于每个位置，检查是否匹配
                if (text.charAt(i + j) != this.pattern[j]) { // 不匹配，记录坏字符规则移动的位数，并跳出循环
                    matched = false;
                    int shift = Math.max(right[text.charAt(i + j)], 1);
                    i += Math.min(M - j - 1, shift);
                    break;
                }
            }

            if (matched) { // 如果全部匹配，返回匹配的开始位置
                return i;
            }
        }
        return N; // 没找到，返回文本串的长度
    }
}
```
你可以通过创建BoyerMoore的实例并调用`search`方法来使用这个算法。例如：

```java
BoyerMoore bm = new BoyerMoore("hello");
int position = bm.search("world, hello"); // 这将返回6，因为"hello"在"world, hello"中从位置6开始。
```
