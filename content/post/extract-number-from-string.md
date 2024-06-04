+++
title = "java regex 正则表达式 提取数字和去除数字,过滤数字,提取价格"
date = "2024-01-24T15:27:49+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
hiddenFromHomePage = false
+++

【总结】java regex 正则表达式 提取数字和去除数字,过滤数字,提取价格

```java
@Test
    public void test33() {
        String phoneString = "哈哈,13888889999";
        // 提取数字
        // 1
        Pattern pattern = Pattern.compile("[^0-9]");
        Matcher matcher = pattern.matcher(phoneString);
        String all = matcher.replaceAll("");
        System.out.println("phone:" + all);
        // 2
        Pattern.compile("[^0-9]").matcher(phoneString).replaceAll("");
    }

```

```java
@Test
    public void test() {
        // 提取张三 去除数字
        String r_name3 = "张三 13599998888 000000";
        Pattern pattern = Pattern.compile("[\\d]");
        Matcher matcher = pattern.matcher(r_name3);
        System.out.println(matcher.replaceAll("").trim());
    }

```

需求：过滤除点号外的所有非数字:

```text
        String abc = "价格：0.00元";
        Pattern compile = Pattern.compile("\\d+\\.\\d+");
        Matcher matcher = compile.matcher(abc);
        matcher.find();
        String string = matcher.group();//提取匹配到的结果
        System.out.println(string);//0.00       
```

需求：只要提取数字其它都不需要
```text
String abc = "手机：1319999999";    
System.out.println(abc.replaceAll("\\D", ""));//1319999999
```

需求：提取价格出来

```java
package com.infomorrow.parser_datasource;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;

public class test_money {
    @Test
    public void test(){
        //0
        //0.1
        //24.13
        String moneyString="1";
        Double extract_cost = extract_cost_dot(moneyString);
        System.out.println("extract_cost:"+extract_cost);
    }
    /**
     * 提取金额,规则为只提取数字和点号,必须有点号
     * 格式可以为0.0或者，11
     * @param cost
     * @return
     */
    public   Double extract_cost_dot(String cost) {
        Pattern compile = Pattern.compile("(\\d+\\.\\d+)|(\\d+)");
        Matcher matcher = compile.matcher(cost);
        matcher.find();
        return Double.valueOf(matcher.group());
    }
}
```

需求：从中提取成绩
```java
			if (EvaItemType.SCORE.equals(type)
					&& (s.startsWith("最小值")
					|| s.startsWith("中间值")
					|| s.startsWith("最大值"))) {
				Pattern pattern = Pattern.compile("[^\\d]");
				Matcher matcher = pattern.matcher(s);
				String val = matcher.replaceAll("").trim();
				q.setHandwrite(EvaQuestion.DEFAULT_NUMBER);
				if (s.startsWith("最小值")) {
					q.setMinItems(NumUtils.parseInt(val));
				} else if (s.startsWith("中间值")) {
					q.setMastery(NumUtils.parseInt(val));
				} else if (s.startsWith("最大值")) {
					q.setMaxItems(NumUtils.parseInt(val));
				}
				continue;
			}
```
