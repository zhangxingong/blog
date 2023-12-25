+++
title = "一文带你了解如何在Java中操作Redis"
date = "2023-12-20T14:37:29+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#_4)
+   [发现宝藏](#_10)
+   [一、 Redis客户端简介](#_Redis_13)
+   +   [1. Redis客户端分类](#1_Redis_15)
    +   [2. Spring 整合 Redis 的两种方式](#2_Spring__Redis__22)
+   [二、 使用 Jedis 操作 Redis](#__Jedis__Redis_27)
+   +   [1. Jedis的maven坐标](#1_Jedismaven_29)
    +   [2. 使用Jedis操作Redis的步骤](#2_JedisRedis_39)
    +   [3. Jedis 操作 Redis 示例](#3_Jedis__Redis__45)
+   [三、 使用 Spring Data Redis 操作 Redis](#__Spring_Data_Redis__Redis_113)
+   +   [1. Spring Data Redis 的 maven 坐标](#1_Spring_Data_Redis__maven__115)
    +   [2. spring Data Redis 中 operation 接口的分类](#2_spring_Data_Redis__operation__125)
    +   [3. Spring Data Redis 操作 Redis String 类型示例（ValueOperations ---- 简单K-V操作）](#3_Spring_Data_Redis__Redis_String_ValueOperations__KV_134)
    +   [4. Spring Data Redis 操作 Redis hash 类型示例（HashOperations ---- 针对map类型的数据操作）](#4_Spring_Data_Redis__Redis_hash_HashOperations__map_277)
    +   [5. Spring Data Redis 操作 Redis list 类型示例（ListOperations ---- 针对list类型的数据操作）](#5_Spring_Data_Redis__Redis_list_ListOperations__list_326)
    +   [6. Spring Data Redis 操作 Redis set 类型示例（ SetOperations ---- set类型数据操作）](#6_Spring_Data_Redis__Redis_set__SetOperations__set_372)
    +   [7. Spring Data Redis 操作 Redis Zset 类型示例（ZSetOperations ---- zset类型数据操作）](#7_Spring_Data_Redis__Redis_Zset_ZSetOperations__zset_420)
    +   [8. Spring Data Redis 操作 Redis 通用操作](#8_Spring_Data_Redis__Redis__475)
+   [总结](#_517)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。  
（博客的参考源码可以在我主页的资源里找到，如果在学习的过程中有什么疑问欢迎大家在评论区向我提出）

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 一、 Redis客户端简介

### 1. Redis客户端分类

> Redis的Java 客户端很多，官方推荐的有三种
> 
> 1.  Jedis
> 2.  Lettuce
> 3.  Redisson

### 2. Spring 整合 Redis 的两种方式

> Spring 对 Redis 客户端进行了整合，提供了 Spring Data Redis，在spring Boot项目中还提供了对应的Starter，即spring-boot-starter-data-redis

## 二、 使用 Jedis 操作 Redis

### 1. Jedis的maven坐标

```java
<dependency>
<groupld>redis.clients</groupld>
<artifactld>jedis</artifactld>
<version>2.8.0</version>
</dependency>
```

### 2. 使用Jedis操作Redis的步骤

> 1.  获取连接
> 2.  执行操作
> 3.  关闭连接

### 3. Jedis 操作 Redis 示例

**1. 新建maven工程，导入相关坐标**

```java
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
        </dependency>

        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>2.8.0</version>
        </dependency>
```

**2. 编写测试方法**

```java
/**
 * 使用Jedis操作Redis
 */
public class JedisTest {

    @Test
    public void testRedis(){
        //1 获取连接
        Jedis jedis = new Jedis("localhost",6379);
        
        //2 执行具体的操作
        jedis.set("username","xiaoming");
        
        //输出打印
        String value = jedis.get("username");
        System.out.println(value);
        
        //删除操作
        //jedis.del("username");

        //哈希存储
        jedis.hset("myhash","addr","bj");
        //输出打印
        String hValue = jedis.hget("myhash", "addr");
        System.out.println(hValue);

        //keys * 输出打印
        Set<String> keys = jedis.keys("*");
        for (String key : keys) {
            System.out.println(key);
        }

        //3 关闭连接
        jedis.close();
    }
}
```

**3. 启动redis服务（windows），连接客户端，测试获取 key username**

![在这里插入图片描述](/img/0bca4bc506cc4f988df683964a3da7c6.png)

**4. 启动测试类，通过后再次获取key username**

![在这里插入图片描述](/img/955453012ffb4a86b75c470c82196fd4.png)

## 三、 使用 Spring Data Redis 操作 Redis

### 1. Spring Data Redis 的 maven 坐标

```java
<dependency>
<groupld>org.springframework.boot</groupld>
<artifactld>spring-boot-starter-data-redis</artifactld>
</dependency>
```

### 2. spring Data Redis 中 operation 接口的分类

> spring Data Redis中提供了一个高度封装的类RedisTemplate，针对iedis客户端中大量api进行了归类封装,将同一类型操作封装为operation接口，具体分类如下
> 
> 1.  ValueOperations ---- 简单K-V操作
> 2.  SetOperations ---- set类型数据操作
> 3.  ZSetOperations ---- zset类型数据操作
> 4.  HashOperations ---- 针对map类型的数据操作
> 5.  ListOperations ---- 针对list类型的数据操作

### 3. Spring Data Redis 操作 Redis String 类型示例（ValueOperations ---- 简单K-V操作）

**1. 新建 SpringBoot 工程，导入相关坐标**

```java
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
```

**2. yml 配置文件**

```java
spring:
  application:
    name: springdataredis_demo
  #Redis相关配置
  redis:
    host: localhost
    port: 6379
    #password: 123456
    database: 0 #默认操作的是0号数据库
    jedis:
      #Redis连接池配置
      pool:
        max-active: 8 #最大连接数
        max-wait: 1ms #连接池最大阻塞等待时间
        max-idle: 4 #连接池中的最大空闲连接
        min-idle: 0 #连接池中的最小空闲连接
```

**3. 了解如何修改默认数据库数量（16）配置**

![在这里插入图片描述](/img/4ab10e3938f148279006ec1d9986b1a6.png)

**4. 编写测试方法**

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringDataRedisTest {

    //yml中配置支持RedisTemplate对象自动装配
    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 操作String类型数据
     */
    @Test
    public void testString(){
        //ValueOperations valueOperations = redisTemplate.opsForValue();
        redisTemplate.opsForValue().set("city","beijing");
    }
}
```

**5. 运行并访问设置的 key 值**

![在这里插入图片描述](/img/9ca9f12a44aa4c76bc3cd41180294f25.png)

**6. 设置配置类配置Redis序列化方式**

```java
/**
 * Redis配置类
 */

@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory) {

        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();

        //默认的Key序列化器为：JdkSerializationRedisSerializer
        //String类型序列化器
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        //hash类型序列化器
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        redisTemplate.setConnectionFactory(connectionFactory);

        return redisTemplate;
    }

}
```

**7. 修改添加的 key 为 city123，再次运行测试类并访问新设置的 key**

![在这里插入图片描述](/img/4ff8d23c77d248839bfc88ca5d634d83.png)

**8. 其他测试**

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringDataRedisTest {

    //yml中配置支持RedisTemplate对象自动装配
    @Autowired
    private RedisTemplate redisTemplate;

    /**
     * 操作String类型数据
     */
    @Test
    public void testString(){
        //ValueOperations valueOperations = redisTemplate.opsForValue();
        redisTemplate.opsForValue().set("city123","beijing");

        //打印输出
        String value = (String) redisTemplate.opsForValue().get("city123");
        System.out.println(value);

        //设置超时时间
        redisTemplate.opsForValue().set("key1","value1",10l, TimeUnit.SECONDS);

        //当key不存在才设置value
        Boolean aBoolean = redisTemplate.opsForValue().setIfAbsent("city1234", "nanjing");
        System.out.println(aBoolean);
        
    }
}
```

### 4. Spring Data Redis 操作 Redis hash 类型示例（HashOperations ---- 针对map类型的数据操作）

**1. 编写相关测试方法**

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringDataRedisTest {

    @Autowired
    private RedisTemplate redisTemplate;
    
    /**
     * 操作Hash类型数据
     */
    @Test
    public void testHash(){
        HashOperations hashOperations = redisTemplate.opsForHash();

        //存值
        hashOperations.put("002","name","xiaoming");
        hashOperations.put("002","age","20");
        hashOperations.put("002","address","bj");

        //取值
        String age = (String) hashOperations.get("002", "age");
        System.out.println(age);

        //获得hash结构中的所有字段
        Set keys = hashOperations.keys("002");
        for (Object key : keys) {
            System.out.println(key);
        }

        //获得hash结构中的所有值
        List values = hashOperations.values("002");
        for (Object value : values) {
            System.out.println(value);
        }
    }
}
```

**2. 运行测试类，观察结果**

![在这里插入图片描述](/img/260db94d7a7a47e897d061217cdd0467.png)

### 5. Spring Data Redis 操作 Redis list 类型示例（ListOperations ---- 针对list类型的数据操作）

**1. 编写测试相关测试方法**

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringDataRedisTest {

    @Autowired
    private RedisTemplate redisTemplate;
       /**
     * 操作List类型的数据
     */
    @Test
    public void testList(){
        ListOperations listOperations = redisTemplate.opsForList();

        //存1个值
        listOperations.leftPush("mylist","a");
        //存多个值
        listOperations.leftPushAll("mylist","b","c","d");

        //取值
        List<String> mylist = listOperations.range("mylist", 0, -1);
        for (String value : mylist) {
            System.out.println(value);
        }

        //获得列表长度 llen
        Long size = listOperations.size("mylist");
        int lSize = size.intValue();
        for (int i = 0; i < lSize; i++) {
            //出队列
            String element = (String) listOperations.rightPop("mylist");
            System.out.println(element);
        }
    }
}
```

**2. 运行测试方法，观察结果**

![在这里插入图片描述](/img/6bea4af8568746868f0b7585c6e9f16d.png)

### 6. Spring Data Redis 操作 Redis set 类型示例（ SetOperations ---- set类型数据操作）

**1. 编写相关测试方法**

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringDataRedisTest {

    @Autowired
    private RedisTemplate redisTemplate;
    /**
     * 操作Set类型的数据
     */
    @Test
    public void testSet(){
        SetOperations setOperations = redisTemplate.opsForSet();

        //存值
        setOperations.add("myset","a","b","c","a");

        //取值
        Set<String> myset = setOperations.members("myset");
        for (String o : myset) {
            System.out.println(o);
        }

        //删除成员
        setOperations.remove("myset","a","b");

        //取值
        myset = setOperations.members("myset");
        for (String o : myset) {
           ![在这里插入图片描述](/img/498ec17ed8744d25a0cd5ee96fc20b73.png)
 System.out.println(o);
        }

    }
}
```

**2. 运行测试方法，观察结果**

![在这里插入图片描述](/img/b20d9a0bcb934529bbe6cbf66d82798a.png)

### 7. Spring Data Redis 操作 Redis Zset 类型示例（ZSetOperations ---- zset类型数据操作）

**1. 编写相关测试方法**

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringDataRedisTest {

    @Autowired
    private RedisTemplate redisTemplate;
     /**
     * 操作ZSet类型的数据
     */
    @Test
    public void testZset(){
        ZSetOperations zSetOperations = redisTemplate.opsForZSet();

        //存值
        zSetOperations.add("myZset","a",10.0);
        zSetOperations.add("myZset","b",11.0);
        zSetOperations.add("myZset","c",12.0);
        zSetOperations.add("myZset","a",13.0);

        //取值
        Set<String> myZset = zSetOperations.range("myZset", 0, -1);
        for (String s : myZset) {
            System.out.println(s);
        }

        //修改分数
        zSetOperations.incrementScore("myZset","b",20.0);

        //取值
        myZset = zSetOperations.range("myZset", 0, -1);
        for (String s : myZset) {
            System.out.println(s);
        }

        //删除成员
        zSetOperations.remove("myZset","a","b");

        //取值
        myZset = zSetOperations.range("myZset", 0, -1);
        for (String s : myZset) {
            System.out.println(s);
        }
    }
}
```

**2. 运行测试方法，观察结果**

![在这里插入图片描述](/img/9a36e80ea5174efe9bb4f52d88521d31.png)

### 8. Spring Data Redis 操作 Redis 通用操作

**1. 编写相关测试方法**

```java
@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringDataRedisTest {

    @Autowired
    private RedisTemplate redisTemplate;
    /**
     * 通用操作，针对不同的数据类型都可以操作
     */
    @Test
    public void testCommon(){
        //获取Redis中所有的key
        Set<String> keys = redisTemplate.keys("*");
        for (String key : keys) {
            System.out.println(key);
        }

        //判断某个key是否存在
        Boolean itcast = redisTemplate.hasKey("dongli");
        System.out.println(itcast);

        //删除指定key
        redisTemplate.delete("myZset");

        //获取指定key对应的value的数据类型
        DataType dataType = redisTemplate.type("myset");
        System.out.println(dataType.name());

    }
}
```

**2. 运行测试方法，观察结果**

![在这里插入图片描述](/img/340db4f87f3743bbb9ab1d8b7ecd7cf1.png)

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注，点赞，收藏支持一下。  


