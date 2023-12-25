+++
title = "Spring依赖注入"
date = "2023-12-20T14:42:16+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#_4)
+   [发现宝藏](#_11)
+   +   [1.依赖注入简介](#1_15)
    +   [2. setter注入](#2_setter_47)
    +   [3. 构造器注入](#3__152)
    +   [4. 自动装配](#4__251)
+   [总结](#_425)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码以及可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

### 1.依赖注入简介

**1. 什么是依赖注入**

> 1.  在编程中，依赖注入是一种实现控制反转且用于解决依赖性问题的设计模式。
> 2.  一个依赖关系指的是可被利用的一种对象 。依赖注入是将所依赖的传递给将要使用的从属对象。该服务将会变成客户端状态的一部分并传递服务给客户端，而不允许客户端来建立或寻找服务。
> 3.  依赖注入使我们的编程代码变得松散耦合，易于管理

**2. 依赖注入的分类**

+   思考：P类中传递数据的方式有几种 ?

> 1.  普通方法 (set方法)
> 2.  构造方法

+   思考：依赖注入描述了在容器中建立bean与bean之间依赖关系的过程，如果bean运行需要的是数字或字符串呢

> 1.  引用类型
> 2.  简单类型(基本数据类型与String )

+   依赖注入的方式

> 1.  setter注入  
>     1）简单类型  
>     2）引用类型
> 2.  构造器注入  
>     1） 简单类型  
>     2）引用类型

**3. 依赖注入的优点**

> 1.  减少依赖性：依赖注入可以消除或者减少组件间不必要的依赖性。以降低组件改变时所带来的影响组件
> 2.  增强可重用性：减少组件依赖性可以增强组件的可重用性。如果在不同的上下文中需要某个接口的不同实现，或者只是同一实现的不同配置，则可以将该组件配置为使用该实现。无需更改代码。
> 3.  增加代码的可测试性：依赖注入也增加了组件的可测试性。当依赖项可以注入组件时，意味着可以注入这些依赖项的模拟实现。模拟对象用于测试作为实际实现的替代，并且可以配置模拟对象的行为
> 4.  增强代码的可读性：依赖注入可将依赖项移动到组件的接口。使得更容易看到组件中哪些具有依赖关系，从而使代码更具可读性。
> 5.  减少依赖性承载：依赖性承载会在代码中产生大量“噪音”，使其难以阅读和维护，并且使得组件更难测试。而依赖注入可以减少依赖性承载和静态单例的使用，可以将组件完美地连接在一起

### 2. setter注入

**1. 依赖注入 – **setter注入引用类型**的步骤方法（DI入门案例所用的就是setter注入引用类型）**

![在这里插入图片描述](/img/2dfd3012d2d34adfba31d9a10b0be55c.png#pic_center)`（代码见DI入门案例）`

**2. 探讨引用多个引用对象（在DI入门的代码基础上编码）**

+   在dao包下创建并编写UserDao接口

```java
package org.example.dao;

public interface UserDao {
    public void save();
}

```

+   在impl包下创建并编写UserDaoImpl实现类

```java
package org.example.dao.impl;

import org.example.dao.UserDao;

public class UserDaoImpl implements UserDao {
    public void save() {
        System.out.println("user dao save ...");
    }
}

```

+   在BookServiceImpl实现类中setter注入UserDao

```java
public class BookServiceImpl implements BookService{
    private BookDao bookDao;
    private UserDao userDao;
    //setter注入需要提供要注入对象的set方法
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    //setter注入需要提供要注入对象的set方法
    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
        userDao.save();
    }
}

```

+   在核心配置类applicationContext中配置userDAO的bean,并将其注入到BookService中

![在这里插入图片描述](/img/5c39bc3880b94874a80ded1873196834.png#pic_center)

+   执行模拟测试类App2

![在这里插入图片描述](/img/b5f922cd30da479db19b76ff16573334.png#pic_center)  
（从运行结果中可以看到多个引用类型是可以用setter注入的）

**3. 依赖注入 – **setter注入普通类型**的步骤方法**

![在这里插入图片描述](/img/3dac5107bd094ef8a99841d1567610fc.png#pic_center)

**4. 在BookDaoImpl中提供两个变量，并提供对应的setter方法（以BookDaoImpl为例）**

```java
public class BookDaoImpl implements BookDao {

    private String databaseName;
    private int connectionNum;
    //setter注入需要提供要注入对象的set方法
    public void setConnectionNum(int connectionNum) {
        this.connectionNum = connectionNum;
    }
    //setter注入需要提供要注入对象的set方法
    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public void save() {
        System.out.println("book dao save ..."+databaseName+","+connectionNum);
    }
}

```

+   在核心配置类applicationContext.xml文件中配置中注入普通变量

![在这里插入图片描述](/img/462fbe69818a4dfe801b661d31f8f604.png#pic_center)

+   模拟测试类App2类的运行结果

![在这里插入图片描述](/img/fec9e6d1def3454bb304ec7de0ad8ae2.png#pic_center)

### 3. 构造器注入

（在依赖注入–setter注入的基础上编码，将依赖注入相关的代码删掉，具体见个人主页上传的代码respr\_diconstouctor）

**1 . 依赖注入 – **构造器注入引用类型**的步骤方法**

![在这里插入图片描述](/img/1434d2d21666406192dbdb8f4c699fa5.png#pic_center)

**2. 在BookService类中提供构造方法**

```java
public class BookServiceImpl implements BookService {
    //5.删除业务层中使用new的方式创建的dao对象
    private BookDao bookDao;

    //提供构造方法
    public BookServiceImpl(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }

}

```

**3. 在核心配置类中注入BookDao相关的bean**

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookDao" class="org.example.dao.impl.BookDaoImpl"/>

    <bean id="bookService" class="org.example.service.impl.BookServiceImpl">
        <constructor-arg name="bookDao" ref="bookDao"/>
    </bean>

</beans>
```

**4. 模拟测试类App2运行结果（同理，构造器注入可以注入多个引用类型，此处省略相关代码）**

![在这里插入图片描述](/img/600965ba4c134040b7517850aea0924c.png#pic_center)

**5. 依赖注入 – **构造器注入普通类型**的步骤和方法**

![在这里插入图片描述](/img/b5b7fe8746cf4a89b667041cbc547610.png#pic_center)

**6. 在BookDao中定义两个变量，并编写对应的构造器方法**

```java
public class BookDaoImpl implements BookDao {
    private String databaseName;
    private int connectionNum;

    public BookDaoImpl(String databaseName, int connectionNum) {
        this.databaseName = databaseName;
        this.connectionNum = connectionNum;
    }

    public void save() {
        System.out.println("book dao save ..."+databaseName+","+connectionNum);
    }
}

```

**7. 在核心配置文件配置相关属性**

+   方式一：根据构造方法参数名称注入

![在这里插入图片描述](/img/dc6070f115854ecc8bd425eb8de3df94.png#pic_center)

+   方式二：根据构造方法参数类型注入

![在这里插入图片描述](/img/ede11775ee7d4c0298581f8610c74ee2.png#pic_center)

+   方式三：根据构造方法参数位置注入

![在这里插入图片描述](/img/ab051332a8c1406ea0c4b64b7b284f52.png#pic_center)

**8. 模拟测试类App2运行结果**

![在这里插入图片描述](/img/b1dec1219d7d452685fef530532108b3.png#pic_center)

8.  依赖注入的选择

![在这里插入图片描述](/img/fce7bd06aa8845d3a3c51181b682c83e.png#pic_center)

### 4. 自动装配

**1. 自动装配基础知识**

> 1.  我们已经学会如何使用元素来声明 bean 和通过使用 XML 配置文件中的和元素来注入
> 2.  Spring 容器可以在不使用和 元素的情况下自动装配相互协作的 bean 之间的关系，这有助于减少编写一个大的基于 Spring 的应用程序的 XML 配置的数量
> 3.  下列自动装配模式，它们可用于指示 Spring 容器为来使用自动装配进行依赖注入。你可以使用元素的 **autowire** 属性为一个 bean 定义指定自动装配模式

|  |  |
| --- | --- |
| 模式 | 描述 |
| no | 这是默认的设置，它意味着没有自动装配，你应该使用显式的bean引用来连线。你不用为了连线做特殊的事。在依赖注入章节你已经看到这个了。 |
| **byName（按名称）** | 由属性名自动装配。Spring 容器看到在 XML 配置文件中 bean 的自动装配的属性设置为 byName。然后尝试匹配，并且将它的属性与在配置文件中被定义为相同名称的 beans 的属性进行连接。 |
| **byType（按类型）** | 由属性数据类型自动装配。Spring 容器看到在 XML 配置文件中 bean 的自动装配的属性设置为 byType。然后如果它的类型匹配配置文件中的一个确切的 bean 名称，它将尝试匹配和连接属性的类型。如果存在不止一个这样的 bean，则一个致命的异常将会被抛出。 |
| constructor | 类似于 byType，但该类型适用于构造函数参数类型。如果在容器中没有一个构造函数参数类型的 bean，则一个致命错误将会发生。 |
| autodetect（3.0版本不支持） | Spring首先尝试通过 constructor 使用自动装配来连接，如果它不执行，Spring 尝试通过 byType 来自动装配。 |

`可以使用 byType 或者 constructor 自动装配模式来连接数组和其他类型的集合`

**2. 在入门案例的基础上编码（详情见个人主页spring代码资源respr\_autowire模块）**

![在这里插入图片描述](/img/081b759be96746a0be402923c5a8b5ce.png#pic_center)

**3. 自动装配**

+   手动配置

![在这里插入图片描述](/img/427a59716fee4b9499a9050ddfc1eef8.png#pic_center)

+   按类型自动装配（byType）

![在这里插入图片描述](/img/fac4b15e8c6e46b4b81de1215969afbf.png#pic_center)

`需要提供setter方法，ioc通过setter入口给bean`

![在这里插入图片描述](/img/36371e65c2f74ec890c61fdd35b58bab.png#pic_center)

+   按名称装配

`要确保BookDao装配bean的id与BookService中的其中一个属性名对应上`

![在这里插入图片描述](/img/15df24fefbd8448082b4092f2ee12c86.png#pic_center)

+   依赖自动装配特征

![在这里插入图片描述](/img/4d1b9cf7ecc84a8e84e507f815314260.png#pic_center)

+   集合注入（比较少用）（数组，List，Set，Map，properties）
    
+   新建BookDao2接口及其实现类
    

```java
package org.example.dao;

public interface BookDao2 {
    public void save();
}

```

```java
public class BookDaoImpl2 implements BookDao2 {

    //数组
    private int[] array;
    //列表
    private List<String> list;
    //集合
    private Set<String> set;
    //图
    private Map<String,String> map;
    //properties
    private Properties properties;
    //提供对应的setter方法作为ioc提供bean的入口
    public void setArray(int[] array) {
        this.array = array;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

    public void setSet(Set<String> set) {
        this.set = set;
    }

    public void setMap(Map<String, String> map) {
        this.map = map;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }
    //编写测试方法
    public void save() {
        System.out.println("book dao save ...");

        System.out.println("遍历数组:" + Arrays.toString(array));

        System.out.println("遍历List" + list);

        System.out.println("遍历Set" + set);

        System.out.println("遍历Map" + map);

        System.out.println("遍历Properties" + properties);
    }
}

```

+   核心配置类文件编写

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--    <bean id="bookDao" class="org.example.dao.impl.BookDaoImpl"/>-->

<!--    <bean id="bookService" class="org.example.service.impl.BookServiceImpl" autowire="byName"/>-->

    <bean id="bookDao2" class="org.example.dao.impl.BookDaoImpl2">

    <!--数组注入-->
    <property name="array">
        <array>
            <value>100</value>
            <value>200</value>
            <value>300</value>
        </array>
    </property>
    <!--list集合注入-->
    <property name="list">
        <list>
            <value>itcast</value>
            <value>itheima</value>
            <value>boxuegu</value>
            <value>chuanzhihui</value>
        </list>
    </property>
    <!--set集合注入-->
    <property name="set">
        <set>
            <value>itcast</value>
            <value>itheima</value>
            <value>boxuegu</value>
            <value>boxuegu</value>
        </set>
    </property>
    <!--map集合注入-->
    <property name="map">
        <map>
            <entry key="country" value="china"/>
            <entry key="province" value="henan"/>
            <entry key="city" value="kaifeng"/>
        </map>
    </property>
    <!--Properties注入-->
    <property name="properties">
        <props>
            <prop key="country">china</prop>
            <prop key="province">henan</prop>
            <prop key="city">kaifeng</prop>
        </props>
    </property>
    </bean>

</beans>
```

+   模拟测试类编写及运行结果

![在这里插入图片描述](/img/5f9cb9f824fa4d1498b50862583d5973.png#pic_center)

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注,点赞，收藏支持一下。  


