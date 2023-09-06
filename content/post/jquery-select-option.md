+++
title = "获取设置select标签的选中值 | 前端"
date = 2023-09-06T17:01:00+08:00
tags = ["笔记", "规则", "学习"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 问题描述 {#问题描述}

1.  如何获取select下拉框选中的值

2.  如何设置select下拉框默认选项


## 解决方法 {#解决方法}

1.如何获取

{{< highlight js >}}
//select下拉框
$('select_tags').on('change', function() {
alert( $(this).find(":selected").val() );
});

//radio选项
$('radio_tags').on('change', function() {
alert( $(this).find(":checked").val() );
});
{{< /highlight >}}

2.如何设置

{{< highlight js >}}
//下拉框
$('div.id_100  option[value="val2"]').prop("selected", true);
//选项
$('div.id_100  option[value="val2"]').prop("checked", true);

//可选方案
$('.id_100 option').each(function() {
if($(this).val() == 'val2') {
$(this).prop("selected", true);
}
});
{{< /highlight >}}


## 参考链接 {#参考链接}

[jQuery get value of select onChange](https://stackoverflow.com/questions/11179406/jquery-get-value-of-select-onchange)

[Set select option 'selected', by value](https://stackoverflow.com/questions/13343566/set-select-option-selected-by-value)
