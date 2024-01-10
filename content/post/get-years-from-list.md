+++
title = "你所不知道的Oracle排序用法大全 【建议收藏】"
date = "2024-01-10T10:31:29+0800"
tags = ["笔记","学习","编程", "sql"]
categories = ["oracle"]
draft = false
weight = 2002
author = "zhangxingong"
+++

# Oracle `ORDER BY` 用法详解

## 简介

>在 Oracle 数据库中，`ORDER BY` 子句用于对查询结果进行排序，是 SQL 查询中常用的关键字之一。通过 `ORDER BY`，我们可以按照指定的列对结果集进行升序（ASC）或降序（DESC）排列。

## 基础语法

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 [ASC | DESC], column2 [ASC | DESC], ...;
```

- `SELECT`: 指定要查询的列。
- `FROM`: 指定要查询的表。
- `ORDER BY`: 指定排序的列，可以是一个或多个列，用逗号分隔。
- `[ASC | DESC]`: 指定排序的顺序，可选，默认为升序（ASC）。

## 示例代码

### 单列排序

```sql
-- 按照员工的工资升序排列
SELECT employee_name, salary
FROM employees
ORDER BY salary ASC;
```

```sql
-- 按照产品价格降序排列
SELECT product_name, price
FROM products
ORDER BY price DESC;
```

### 多列排序

```sql
-- 按照部门升序排列，对于相同部门再按照工资降序排列
SELECT employee_name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;
```

### 对文本进行排序

```sql
-- 按照员工姓名升序排列（按字母表顺序）
SELECT employee_name, salary
FROM employees
ORDER BY employee_name ASC;
```

### NULL 值处理

```sql
-- 按照入职日期升序排列，NULL 值排在最后
SELECT employee_name, hire_date
FROM employees
ORDER BY hire_date ASC NULLS LAST;
```

```sql
-- 按照入职日期降序排列，NULL 值排在最前
SELECT employee_name, hire_date
FROM employees
ORDER BY hire_date DESC NULLS FIRST;
```

## 注意事项

1. `ORDER BY` 子句应该放在 `SELECT` 语句的最后。
2. 在排序列上应该建立索引，以提高排序性能。
3. 对于包含中文等特殊字符的排序，要注意字符集的设置。

## 特殊情况

1. `ORDER BY` 计算字段且使用distinct去重比如

获取一个列表中所有的唯一年份

```sql

select distinct to_char(creation, 'YYYY') YEAR  from employees order by to_char(creation, 'YYYY') DESC;

-- 简化写法如下

select distinct to_char(creation, 'YYYY') YEAR  from employees  order by YEAR DESC ;

```
## 插曲每日英语

`City Work`  
[`City Work`]  

名词

>网络流行语，意为“城市工作”，是City Walk（城市漫步）的变种。与慢慢地欣赏和享受城市生活的City Walk不同，City Work是指职场打工人在城市的各个角落都躲不开工作，walk（走）着walk（走）着，老板一个电话打过来，打工人就又要投入到工作当中。


## 结语

`ORDER BY` 是 SQL 查询中一个重要的子句，通过合理使用它，可以使查询结果更符合实际需求。在实际应用中，根据业务场景和性能要求选择合适的排序方式和列，以达到最佳效果。

希望本文能够对程序员和数据库管理员更好地理解 Oracle 中 `ORDER BY` 的基础用法提供帮助。如果有任何疑问或建议，请随时留言交流。
