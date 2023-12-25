+++
title = "【Mysql】万字长文带你快速掌握数据库基础概念及SQL基本操作"
date = "2023-12-20T14:40:15+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#_4)
+   [发现宝藏](#_11)
+   [一、数据库相关概念](#_17)
+   +   [1. 什么是数据库](#1__19)
    +   [2. 数据库的种类](#2__24)
    +   [3. Mysql 简介](#3_Mysql__34)
    +   [4. SQL简介](#4_SQL_53)
    +   [5. 数据库中常见的数据类型](#5__58)
+   [二、SQL基础](#SQL_76)
+   +   [1. SQL通用语法](#1_SQL_80)
    +   [2. SQL的主要分类](#2_SQL_91)
    +   [3. DDL（数据库，表，索引，视图）](#3_DDL_103)
    +   [4. DML（数据的插入，更新，删除）](#4_DML_243)
    +   [5. DQL（数据查询）](#5_DQL_315)
    +   [6. DCL（数据访问权限控制）](#6_DCL_517)
+   [三、SQL入门案例](#SQL_657)
+   +   [1. DDL入门案例](#1_DDL_660)
    +   [2. DML入门案例](#2_DML_704)
    +   [3. DQL入门案例](#3_DQL_745)
    +   [4. DCL入门案例](#4_DCL_792)
+   [总结](#_858)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

* * *

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 一、数据库相关概念

* * *

### 1. 什么是数据库

数据库是指一组相互关联的数据集合，它们以一定的方式组织、存储和管理，以方便数据的查找、访问和管理。**在计算机科学中，数据库是一种用于存储和管理数据的软件系统，它支持数据的创建、读取、更新和删除操作**

* * *

### 2. 数据库的种类

+   **常见的数据库种类包括关系型数据库和非关系型数据库**
+   关系型数据库是指使用关系模型来组织和管理数据的数据库。关系模型是一种基于表的数据模型，其中每个表代表一种实体类型，而每个行代表一个实体实例。**关系型数据库使用结构化查询语言（SQL）来管理和操作数据**。**常见的关系型数据库包括MySQL、Oracle 和 SQL Server 等**
+   非关系型数据库是指不使用关系模型来组织和管理数据的数据库。它们使用不同的数据模型和查询语言来管理和操作数据。非关系型数据库通常用于处理大量非结构化数据，例如文本、图像和音频等。**常见的非关系型数据库包括MongoDB、Redis和Cassandra等**

* * *

### 3. Mysql 简介

**1. 认识Mysql**

**MySQL是一种开源的关系型数据库管理系统（RDBMS），它是目前最流行和广泛使用的数据库之一。** MySQL以其高性能、可靠性和易用性而闻名，并被广泛应用于各种规模的应用程序和网站

**2. MySQL的特点和功能**

+   **开源性**：MySQL是开源软件，可以免费获得并进行修改和定制。这使得它非常适合个人开发者和小型企业
+   **跨平台**：MySQL可在多个操作系统上运行，包括Windows、Linux、macOS等，提供了广泛的平台支持
+   **高性能**：MySQL通过优化的查询处理、索引机制和缓存策略等技术，提供了出色的性能和响应速度。它能够处理大规模数据集和高并发访问
+   **可扩展性**：MySQL支持水平和垂直扩展，可以根据需求轻松地扩展数据库的容量和性能
+   **完整的功能集**：MySQL支持标准的SQL查询语言，具有丰富的特性和功能，包括事务支持、触发器、存储过程、复制和高可用性选项等
+   **数据安全**：MySQL提供了强大的安全机制，包括用户认证、权限管理、数据加密和安全连接等，以保护数据的机密性和完整性
+   **大型社区支持**：MySQL拥有庞大的开源社区，提供了丰富的文档、教程和支持资源。开发者可以从社区中获取帮助、分享经验和解决问题

**总体而言，MySQL是一种可靠、高性能且易于使用的关系型数据库管理系统**。无论是用于小型网站、企业应用还是大规模数据处理，MySQL都提供了强大的功能和灵活的解决方案。它是许多开发人员和组织构建可靠数据库应用程序的首选工具之一

* * *

### 4. SQL简介

**SQL（Structured Query Language，结构化查询语言）是一种用于管理关系型数据库的标准化查询语言。** SQL由美国国家标准学会（ANSI）和国际标准化组织（ISO）制定并标准化，它定义了一组操作关系型数据库的语法和语义规则。SQL被广泛应用于各种类型的应用程序和网站，并成为了处理和管理数据的标准方式

* * *

### 5. 数据库中常见的数据类型

+   在DDL（数据定义语言）中，您可以使用不同的数据类型来定义表中的列。不同的数据库管理系统（DBMS）支持的数据类型可能会有所不同，以下是一些常见的DDL表操作数据类型示例：

| 数据类型 | 示例 |
| --- | --- |
| **整数类型** | INT（整数）、BIGINT（大整数）、SMALLINT（小整数）、TINYINT（微小整数） |
| **浮点数类型** | FLOAT（浮点数）、DOUBLE（双精度浮点数）、DECIMAL（固定精度的十进制数） |
| **字符串类型** | CHAR(n)（固定长度的字符）、VARCHAR(n)（可变长度的字符）、TEXT（长文本） |
| **日期和时间类型** | DATE（日期）、TIME（时间）、DATETIME（日期和时间）、TIMESTAMP（时间戳） |
| **布尔类型** | BOOLEAN（布尔值） |
| 二进制类型 | BLOB（二进制大对象）、BINARY（二进制数据）、VARBINARY（可变长度的二进制数据） |
| 其他特殊类型 | ENUM（枚举类型，限定为预定义的值列表）、SET（集合类型，限定为预定义的值集合） |

这些是一些常见的数据类型示例，实际上不同的DBMS可能还支持其他的数据类型或拥有特定的数据类型命名约定。**在创建表时，您可以根据需要选择适当的数据类型来定义表中的列。确保根据数据的特性和需求选择正确的数据类型，以确保数据的准确性和一致性。**

* * *

## 二、SQL基础

* * *

### 1. SQL通用语法

> 1.  SQL语句可以单行或多行书写，以分号结尾
> 2.  SQL语句可以使用空格/缩进来增强语句的可读性
> 3.  MySQL数据库的SQL语句不区分大小写，关键字建议使用大写
> 4.  注释  
>     \---- 单行注释 ： - - 注释内容 或 # 注释内容(MySQL特有）  
>     \---- 多行注释 ： /*注释内容*/

* * *

### 2. SQL的主要分类

| 分类 | 全称 | 说明 |
| --- | --- | --- |
|  |  |  |
| DDL | Data Definition Language | 数据定义语言用来定义数据库对象(数据库，表，字段) |
| DML | Data Manipulation Language | 数据操作语言，用来对数据库表中的数据进行增删改 |
| DOL | Data Querv Language | 数据查询语言，用来查询数据库中表的记录 |
| DCL | Data ControlLanguage | 数据控制语言，用来创建数据库用户、控制数据库的访问权限 |

* * *

### 3. DDL（数据库，表，索引，视图）

在关系型数据库中，DDL（数据定义语言）扮演着至关重要的角色。**DDL是一组用于定义数据库结构和模式的SQL命令，它使我们能够创建、修改和删除数据库对象，如表、视图和索引**

**1. DDL – 数据库操作**

+   **创建数据库**（**CRFATE DATABASE \[ IF NOT EXISTS \] 数据库名 \[DEFAULT CHARSET 字符集\] \[COLLATE 排序规则\]**）：例如，示例命令语句创建了一个名为"my\_database"的数据库。

```sql
CREATE DATABASE my_database;
```

+   **删除数据库**（**DROP DATABASE**），例如，示例命令语句删除了名为"my\_database"的数据库。

```sql
DROP DATABASE my_database;
```

+   **查询所有数据库**（**SHOW DATABASES**）
    
+   **查询当前数据库** （**SELECT DATABASE**)
    
+   **使用数据库** （**USE 数据库名**）
    

**2. DDL – 表操作**

+   **创建表**（**CREATE TABLE**）：创建表是数据库设计的第一步。使用CREATE TABLE语句可以定义表的名称、列名和数据类型。例如，下面的语句创建了一个名为"users"的表，包含id、name和age三个列：

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT
);
```

+   **查询表**

> 1.  查询当前数据库所有表

```sql
SHOW TABLES
```

> 2.  查询表结构

```sql
DESC 表名
```

> 3.  查询指定表的建袭语句

```sql
SHOW CREATE TABLE 表名
```

+   **修改表结构**（**ALTER TABLE**）：在数据库使用过程中，可能需要修改表的结构，例如添加新列、更改列的数据类型或删除列。ALTER TABLE语句用于这些操作。下面是一些示例

> 1.  添加新列：

```sql
ALTER TABLE users
ADD email VARCHAR(100);
```

> 2.  修改列的数据类型

```sql
ALTER TABLE Customers
ADD COLUMN phone_number VARCHAR(20);
```

> 3.  删除列

```sql
ALTER TABLE users
DROP COLUMN email;
```

+   **删除表**（**DROP TABLE**）：如果不再需要某个表，可以使用DROP TABLE语句将其从数据库中删除。请谨慎使用该命令，因为删除表将同时删除表中的所有数据。示例如下

```sql
DROP TABLE users;
```

**3. 创建索引（CREATE INDEX）**

**索引可以提高对表中数据的检索效率。** 使用 **CREATE INDEX** 语句可以在表的列上创建索引。例如，以下命令在"users"表的"name"列上创建了一个索引

```sql
CREATE INDEX idx_users_name ON users (name);
```

**4. 创建视图（CREATE VIEW）**

**视图是基于表的虚拟表，它是通过SELECT语句定义的。** 使用 **CREATE VIEW** 语句可以创建视图。例如，以下命令创建了一个名为"active\_users"的视图，该视图包含所有"users"表中状态为"active"的行

```sql
CREATE VIEW active_users AS
SELECT * FROM users WHERE status = 'active';
```

* * *

### 4. DML（数据的插入，更新，删除）

**1. 认识DML**

在关系型数据库中，**DML（数据操纵语言）是一组用于操作数据库中数据的SQL命令。DML允许我们对表中的数据进行插入、更新、删除和查询操作**，是SQL中最常用的部分之一

**2. 插入数据（INSERT）**

**插入数据是向表中添加新行的操作。使用INSERT语句可以将数据插入到表中的特定列。** 例如，下面的语句将一条新记录插入到名为"users"的表中

```sql
INSERT INTO users (name, age, email) VALUES ('John Doe', 25, 'johndoe@example.com');
```

+   给指定字段添加数据

> 1.  语法格式 ：INSERT INTO 表名(字段名1, 字段名2,…) VALUES (值1,值2,…);

+   给全部字段添加数据

> 语法格式：INSERT INTO 表名 VALUES (值1, 值2, …);

+   批量添加数据

> 语法格式：
> 
> 1.  INSERTINTO 表名(字段名1, 字段名2, …) VALUES(值1,值2,…), (值1,值2,…),(值1, 值2,…);
> 2.  INSERTINTO 表名 VALUES (值1, 值2,…),(值1, 值2, …),(值1,值2,…) ;

+   注意事项

> 1.  插入数据时，指定的字段顺序需要与值的顺序是一一对应的
> 2.  字符串和日期型数据应该包含在引号中
> 3.  插入的数据大小，应该在字段的规定范围内

**3. 更新数据（UPDATE）**

**更新数据是修改表中现有行的操作。使用UPDATE语句可以更改表中的数据。** 例如，下面的语句将名为"John Doe"的用户年龄更新为30

```sql
UPDATE users SET age = 30 WHERE name = 'John Doe';
```

+   一般格式

> 1.  语法格式：UPDATE 表名 SET 字段名1 = 值1,字段名2= 值2,…\[ WHERE 条件\];

+   注意事项

> 修改语句的条件可以有，也可以没有，如果没有条件，则会修改整张表的所有数据

**4. 删除数据（DELETE）**

**删除数据是从表中删除行的操作。使用DELETE语句可以删除满足特定条件的行。** 例如，下面的语句将删除名为"John Doe"的用户

```sql
DELETE FROM users WHERE name = 'John Doe';
```

+   一般格式

> 1.  语法格式：DELETE FROM 表名\[WHERE 条件\]

+   注意事项

> 1.  DELETE 语句的条件可以有，也可以没有，如果没有条件，则会删除整张表的所有数据
> 2.  DELETE 语句不能删除某一个字段的值(可以使用UPDATE)。

* * *

### 5. DQL（数据查询）

**1. 认识DQL**

在关系型数据库中，**DQL（数据查询语言）是一组用于从数据库中检索数据的SQL命令。DQL允许我们以各种条件和方式查询表中的数据，获取所需的结果**

**2. 基本查询（SELECT）**

+   查询多个字段

> 语法格式
> 
> 1.  SELECT 字段1,字段2, 字段3 … FROM 表名)
> 2.  SELECT\*FROM 表名:

```sql
SELECT * FROM users;
```

**基本查询是最常见的DQL操作，用于从表中检索数据。** 使用SELECT语句可以选择列和行，从而获取所需的数据。例如，上面的语句将检索名为"users"的所有行和列

+   设置别名

> 语法格式：SELECT 字段1 \[AS 别名1\],字段2 \[AS 别名2\] … FROM 表名

+   去除重复记录

> 语法格式：SELECT DISTINCT 字段列表 FROM 表名

**3. 条件查询（WHERE）**

**条件查询允许我们根据指定的条件检索符合条件的数据。** 使用WHERE子句可以过滤查询结果。例如，下面的语句将检索名为"John Doe"的用户信息

```sql
SELECT * FROM users WHERE name = 'John Doe';
```

+   一般格式

> 语法格式：SELECT 字段列表 FROM 表名 WHERE 条件列表

+   条件列表

| 比较运算符 | 功能 |
| --- | --- |
| \> | 大于 |
| \>= | 大于等于 |
| < | 小于 |
| <= | 小于等于 |
| \= | 等于 |
| <> 或 != | 不等于 |
| BETWEEN … AND … | 在某个范围之内（含最小、最大值） |
| IN(…) | 在in之后的列表中的值，多选一 |
| LIKE 占位符 | 模糊匹配(\_匹配单个字符,%匹配任意个字符) |
| IS NULL | 是NULL |

| 逻辑运算符 | 功能 |
| --- | --- |
| AND 或&& | 并且(多个条件同时成立) |
| OR或 | 或者(多个条件任意一个成立) |
| NOT 或! | 非，不是 |

**4. 排序查询（ORDER BY）**

**排序查询允许我们按照指定的列对查询结果进行排序。使用ORDER BY子句可以按升序（ASC）或降序（DESC）对查询结果进行排序。** 例如，下面的语句将按年龄对用户进行降序排序

```sql
SELECT * FROM users ORDER BY age DESC;
```

+   一般格式

> 1.  语法格式：SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1,字段2 排序方式2

+   排序方式

> 1.  ASC:升序 (默认值)
> 2.  DESC:降序

**5. 聚合查询（GROUP BY)**

**聚合查询允许我们根据指定的列对数据进行分组，并对每个组应用聚合函数（如SUM、COUNT、AVG等），使用GROUP BY子句可以执行聚合查询。** 例如，下面的语句将计算每个城市的用户数量

```sql
SELECT city, COUNT(*) FROM users GROUP BY city;
```

+   一般格式

> 1.  语法格式：SELECT 聚合函数(字段列表) FROM 表名

+   常见聚合函数

| 函数 | 功能 |
| --- | --- |
| count | 统计数量 |
| max | 最大值 |
| min | 最小值 |
| avg | 平均值 |
| sum | 求和 |

+   注意

> null值不参与所有聚合函数运算

**6. 分组查询**

**数据库分组查询是一种对数据库表进行聚合计算和分组的查询方式。** 它可以根据指定的字段进行分组，并对每个分组进行聚合计算，**例如求和、平均值、最大值、最小值等** 。**常见的分组查询语句是SQL语句中的GROUP BY子句。** 下面是一个示例，它查询一个订单表中每个客户的总订单金额：

```sql
SELECT customer_id, SUM(total_amount)
FROM orders
GROUP BY customer_id;
```

在上面的查询中，GROUP BY子句指定了按照customer\_id字段进行分组，SUM函数对每个分组内的total\_amount字段进行求和计算。查询结果将返回每个客户的customer\_id和对应的总订单金额

+   一般格式

> 1.  语法格式：SELECT 字段列表 FROM 表名\[WHERE 条件\] GROUP BY 分组字段名\[HAVING 分组后过滤条件\];

+   where与having区别

> 1.  执行时机不同: where是分组之前进行过滤，不满足where条件，不参与分组，而having是分组之后对结果进行过滤。
> 2.  判断条件不同: where不能对聚合函数进行判断，而having可以

**7. 分页查询**

**分页查询是一种对数据库中的数据进行分段查询的方式，通常用于显示大量数据的情况下，将数据分页显示，提高浏览效率。分页查询可以通过LIMIT和OFFSET关键字来实现。**

+   一般格式

> 1.  语法格式：SELECT 字段列表 FROM 表名 LIMIT 起始索引查询记录数;

假设我们有一个员工表，其中包含员工的姓名和工资信息，我们想要查询前10个工资最高的员工，并按照工资从高到低排序，可以使用以下SQL语句：

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC
LIMIT 10;
```

在上面的查询中，我们使用ORDER BY子句按照工资从高到低进行排序，并使用LIMIT关键字限制返回的记录数为10条。这将返回工资最高的前10个员工的姓名和工资信息。

如果我们想要从第11个记录开始查询下一页数据，可以使用OFFSET关键字，例如：

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC
LIMIT 10 OFFSET 10;
```

这个查询将返回第11到第20个工资最高的员工的姓名和工资信息

+   注意

> 1.  起始索引从0开始，起始索引= (查询页码 -1) \* 每页显示记录数
> 2.  分页查询是数据库的方言，不同的数据库有不同的实现，MysQL中是LIMIT
> 3.  如果查询的是第一页数据，起始索引可以省略，直接简写为 limit 10
> 4.  在使用OFFSET时应当考虑到数据的变化，因为如果在两次分页查询之间有新的数据被添加或删除，可能会导致分页结果出现重叠或遗漏的情况

**8. 连接查询（JOIN）**

**连接查询允许我们从多个表中检索相关数据。使用JOIN子句可以根据指定的条件将多个表连接起来。** 例如，下面的语句将从"users"表和"orders"表中检索有关用户和订单的信息

```sql
SELECT users.name, orders.order_id FROM users JOIN orders ON users.id = orders.user_id;
```

**9. DQL执行顺序**

![在这里插入图片描述](/img/6051a2b6e79b40e4b7a58ffd8e91e4cd.png)

* * *

### 6. DCL（数据访问权限控制）

**1. 认识DCL**

在关系型数据库中，**DCL（数据控制语言）是一组用于管理和控制数据库中的数据访问权限的SQL命令。** 通过使用DCL命令，我们可以定义用户权限、授予或撤销权限，并管理数据库对象的安全性

**2. 用户权限管理**

+   基础命令

**用户权限管理是DCL的重要部分，它涉及定义和管理用户对数据库的访问权限。**  
以下是一些常用的DCL命令用于用户权限管理

| 命令 | 说明 |
| --- | --- |
| CREATE USER | 创建新用户，并分配用户名和密码 |
| ALTER USER | 修改用户的属性，例如修改密码或锁定用户账户 |
| DROP USER | 删除用户，同时撤销其对数据库的访问权限 |
| GRANT | 授予用户特定的权限，例如SELECT、INSERT、UPDATE等 |
| REVOKE | 撤销用户的权限，限制其对数据库对象的访问 |

+   示例

> 查询用户

```sql
USE mysql;
SELECT * FROM user;
```

> 创建用户

```sql
CREATE USER  '用户名'@'主机名' IDENTIFIED BY '密码'
```

> 修改用户密码

```sql
ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码';
```

> 删除用户

```sql
DROP USER '用户名'@'主机名';
```

+   注意

> 1.  主机名可以使用 % 通配
> 2.  这类SQL开发人员操作的比较少，主要是DBA ( Database Administrator 数据库管理员) 使用

**3. 对象权限管理**

+   基础权限

**对象权限管理涉及定义和管理用户对数据库对象（如表、视图、存储过程等）的访问权限。** 以下是一些常用的DCL命令用于对象权限管理

| 权限 | 说明 |
| --- | --- |
| GRANT | 授予用户对特定对象的权限，例如SELECT、INSERT、UPDATE等 |
| REVOKE | 撤销用户对特定对象的权限，限制其对对象的访问 |
| WITH GRANT OPTION | 允许被授权的用户将其权限授予其他用户 |
| ALL，ALL PRIVILEGES | 所有权限 |
| SELECT | 查询数据 |
| INSERT | 插入数据 |
| UPDATE | 修改数据 |
| DELETE | 删除数据 |
| ALTER | 修改表 |
| DROP | 删除数据库/表/视图 |
| CREATE | 创建数据库/表 |

+   示例

> 1.  查权限

```sql
SHOW GRANTS FOR '用户名'@'主机名';
```

> 2.  授予权限

```sql
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名'
```

> 3.  撤销权限

```sql
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

+   注意

> 1.  多个权限之间，使用逗号分隔
> 2.  授权时，数据库名和表名可必使用 \* 进行通配，代表所有

**4. 事务管理**

**事务管理是DCL的一部分，它涉及控制和管理数据库中的事务。** 以下是一些常用的DCL命令用于事务管理

| 命令 | 说明 |
| --- | --- |
| COMMIT | 提交事务，将已执行的操作永久保存到数据库中 |
| ROLLBACK | 回滚事务，撤销已执行的操作，恢复到事务开始之前的状态 |
| SAVEPOINT | 设置保存点，允许在事务中创建一个标记，以便在需要时回滚到该标记所在的状态 |

**5. 数据库对象的安全性**

**DCL也涉及管理和维护数据库对象的安全性。** 以下是一些常用的DCL命令用于数据库对象的安全性管理

| 命令 | 说明 |
| --- | --- |
| CREATE SCHEMA | 创建模式，用于组织和管理数据库对象 |
| ALTER SCHEMA | 修改模式的属性，例如更改模式的所有者 |
| DROP SCHEMA | 删除模式，同时删除其中的所有对象 |

* * *

## 三、SQL入门案例

* * *

### 1. DDL入门案例

+   案例需求：设计一张员工信息表，要求如下:

> 1.  编号(纯数字)
> 2.  员工工号(字符串类型，长度不超过10位)
> 3.  员工姓名(字符串类型，长度不超过10位)
> 4.  性别(男/女，存储一个汉字)
> 5.  年龄(正常人年龄，不可能存储负数)
> 6.  身份证号(二代身份证号均为18位，身份证中有X这样的字符)
> 7.  入职时间 (取值年月日即可)

+   SQL语句

```sql
CREATE TABLE employee (
  id INT PRIMARY KEY COMMENT '编号',
  employee_number VARCHAR(10) COMMENT '员工工号',
  name VARCHAR(10) COMMENT '员工姓名',
  gender CHAR(1) COMMENT '男/女',
  age TINYINT COMMENT '正常人年龄，不可能存储负数',
  id_card CHAR(18) COMMENT '二代身份证号均为18位，身份证中有X这样的字符',
  hire_date DATE COMMENT '取值年月日即可'
) COMMENT '员工信息表';
```

+   效果及解析

在上面的表中，每个字段的含义如下：

> 1.  id: 员工信息的唯一编号，采用纯数字类型，使用INT类型，作为表的主键，中文别名为“编号”。
> 2.  employee\_number: 员工工号，采用字符串类型，长度不超过10位，使用VARCHAR(10)类型，中文别名为“员工工号”。
> 3.  name: 员工姓名，采用字符串类型，长度不超过10位，使用VARCHAR(10)类型，中文别名为“员工姓名”。
> 4.  gender: 员工性别，使用一个汉字表示，采用CHAR(1)类型，中文别名为“性别”。
> 5.  age: 员工年龄，采用TINYINT类型，适合存储正常人的年龄，不可能存储负数，中文别名为“年龄”。
> 6.  id\_card: 员工身份证号，采用CHAR(18)类型，适合存储18位身份证号码，包括可能出现的字符X，中文别名为“身份证号”。
> 7.  hire\_date: 员工入职时间，采用DATE类型，存储年月日即可，中文别名为“入职时间”。

* * *

### 2. DML入门案例

* * *

假设我们有一个学生表，其中包含学生的学号、姓名、年龄和班级信息。我们可以使用DML语句向该表中插入一条学生记录，例如：

```sql
INSERT INTO students (id, name, age, class)
VALUES ('1001', '张三', 18, '一班');
```

在上面的语句中，我们使用INSERT INTO关键字指定要插入数据的表名和列名，并使用VALUES关键字指定要插入的数据值。这个语句将向students表中插入一条学号为’1001’，姓名为’张三’，年龄为18，班级为’一班’的学生记录。

接下来，我们可以使用UPDATE语句来修改该学生的年龄信息，例如：

```sql
UPDATE students
SET age = 19
WHERE id = '1001';
```

在上面的语句中，我们使用UPDATE关键字指定要更新的表名和列名，并使用SET关键字指定要更新的数据值。这个语句将更新学号为’1001’的学生的年龄为19岁。

最后，我们可以使用DELETE语句来删除该学生的记录，例如：

```sql
DELETE FROM students
WHERE id = '1001';
```

在上面的语句中，我们使用DELETE FROM关键字指定要删除的表名，并使用WHERE关键字指定要删除的记录条件。这个语句将删除学号为’1001’的学生记录。

需要注意的是，DML语句会对数据库中的数据进行增删改操作，因此在使用时需要谨慎，避免误操作造成数据丢失或数据不一致的情况。

* * *

### 3. DQL入门案例

**1. 查询年龄为20,21,22,23岁的员工信息**

```sql
SELECT *
FROM employees
WHERE age IN (20, 21, 22, 23);
```

**2. 查询性别为 男，并且年龄在 20-40 岁(含)以内的姓名为三个字的员工**

```sql
SELECT name
FROM employees
WHERE gender = '男' AND age BETWEEN 20 AND 40 AND LENGTH(name) = 3;
```

**3. 统计员工表中年龄小于60岁的，男性员工和女性员工的人数**

```sql
SELECT gender, COUNT(*)
FROM employees
WHERE age < 60
GROUP BY gender;
```

**4. 查询所有年龄小于等于35岁员工的姓名和年龄，并对查询结果按年龄升序排序，如果年龄相同按入职时间降序排序**

```sql
SELECT name, age
FROM employees
WHERE age <= 35
ORDER BY age ASC, hire_date DESC;
```

**5. 查询性别为男，且年龄在20-40 岁(含)以内的前5个员工信息，对查询的结果按年龄升序排序，年龄相同按入职时间升序排序**

```sql
SELECT *
FROM employees
WHERE gender = '男' AND age BETWEEN 20 AND 40
ORDER BY age ASC, hire_date ASC
LIMIT 5;
```

* * *

### 4. DCL入门案例

+   案例背景：

假设我们有一个名为"OnlineStore"的关系型数据库，其中包含以下两个表：Customers（顾客）和Orders（订单）。我们希望通过DCL命令来管理和控制用户对这些表的访问权限

+   用户权限管理：

首先，我们需要创建一个新用户，并分配用户名和密码。假设我们要创建一个名为"manager"的用户。下面是创建用户的DCL命令

```sql
CREATE USER manager IDENTIFIED BY 'password';
```

接下来，我们可以使用GRANT命令授予用户相应的权限。例如，我们可以授予"manager"用户对Customers表的SELECT和INSERT权限。下面是授予权限的DCL命令

```sql
GRANT SELECT, INSERT ON Customers TO manager;
```

+   对象权限管理：

在上述案例中，我们已经授予了"manager"用户对Customers表的SELECT和INSERT权限。现在，假设我们想撤销该用户对Customers表的INSERT权限。下面是撤销权限的DCL命令

```sql
REVOKE INSERT ON Customers FROM manager;
```

此时，"manager"用户只能对Customers表执行SELECT操作，而无法执行INSERT操作

+   事务管理：

事务管理是DCL的一部分，它涉及控制和管理数据库中的事务。假设我们想在Orders表中插入一条新订单，并确保该操作是原子的（要么全部成功，要么全部回滚）。下面是使用事务管理的DCL命令

```sql
BEGIN TRANSACTION;
INSERT INTO Orders (order_id, customer_id, total_amount) VALUES (1, 1001, 50.00);
COMMIT;
```

如果在插入订单的过程中发生任何错误，可以使用ROLLBACK命令回滚事务，撤销已执行的操作，恢复到事务开始之前的状态

+   数据库对象的安全性：

DCL也涉及管理和维护数据库对象的安全性。假设我们想创建一个新的模式（Schema）来存储敏感数据，并将其保护起来，只允许特定的用户访问。下面是创建模式和设置权限的DCL命令

```sql
CREATE SCHEMA secure_schema;
GRANT ALL PRIVILEGES ON SCHEMA secure_schema TO manager;
```

通过以上命令，我们创建了一个名为"secure\_schema"的模式，并授予"manager"用户对该模式的所有权限

* * *

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


