+++
title = "两数之和 | Leetcode"
date = 2023-07-18T13:27:00+08:00
tags = ["编程", "基础"]
categories = ["subject"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## 題目描述： {#題目描述}

![](/img/13-16-57_2_screenshot.png)


## 题解 {#题解}

1.  暴力枚举

**思路及算法**

最容易想到的方法是枚举数组中的每一个数 x，寻找数组中是否存在 target - x。

当我们使用遍历整个数组的方式寻找 target - x 时，需要注意到每一个位于 x 之前的元素都已经和 x 匹配过，因此不需要再进行匹配。而每一个元素不能被使用两次，所以我们只需要在 x 后面的元素中寻找 target - x。

代码如下：

{{< highlight java >}}
class Solution {
public int[] twoSum(int[] nums, int target) {
int n = nums.length;
for (int i = 0; i < n; ++i) {
for (int j = i + 1; j < n; ++j) {
if (nums[i] + nums[j] == target) {
return new int[]{i, j};
}
}
}
return new int[0];
}
{{< /highlight >}}

{{< highlight go >}}
func twoSum(nums []int, target int) []int {
for i, x := range nums {
for j := i + 1; j < len(nums); j++ {
if x+nums[j] == target {
return []int{i, j}
}
}
}
return nil
{{< /highlight >}}

1.  方法二：哈希表

**思路及算法**

注意到方法一的时间复杂度较高的原因是寻找 target - x 的时间复杂度过高。因此，我们需要一种更优秀的方法，能够快速寻找数组中是否存在目标元素。如果存在，我们需要找出它的索引。

使用哈希表，可以将寻找 target - x 的时间复杂度降低到从
O(N) 降低到 O(1)。

这样我们创建一个哈希表，对于每一个 x，我们首先查询哈希表中是否存在 target - x，然后将 x 插入到哈希表中，即可保证不会让 x 和自己匹配。

**代码**

{{< highlight java >}}
class Solution {
public int[] twoSum(int[] nums, int target) {
Map<Integer, Integer> hashtable = new HashMap<Integer, Integer>();
for (int i = 0; i < nums.length; ++i) {
if (hashtable.containsKey(target - nums[i])) {
return new int[]{hashtable.get(target - nums[i]), i};
}
hashtable.put(nums[i], i);
}
return new int[0];
}
{{< /highlight >}}

{{< highlight go >}}
func twoSum(nums []int, target int) []int {
hashTable := map[int]int{}
for i, x := range nums {
if p, ok := hashTable[target-x]; ok {
return []int{p, i}
}
hashTable[x] = i
}
return nil
{{< /highlight >}}

作者：LeetCode-Solution
链接：<https://leetcode.cn/problems/two-sum/solution/liang-shu-zhi-he-by-leetcode-solution/>
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
