+++
title = "mybatis 中接口参数与xml参数对应关系"
date = "2025-01-17T14:45:47+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
hiddenFromHomePage = true
+++

### mybatis 中接口参数与xml参数对应关系

#### 摘要

在 MyBatis 中，接口方法的参数与 XML 映射文件中的参数之间存在多种对应关系
<!-- more -->

### 1. 单个参数
- **基本类型或简单对象作为参数**：
    - 如果接口方法只有一个参数，且该参数是基本类型（如 `int`、`String` 等）或简单对象（如 `java.util.Date`），在 XML 映射文件中可以直接使用 `#{}` 或 `${}` 占位符来引用该参数。

    **Java 接口：**
    ```java
    public interface UserMapper {
        User getUserById(int id);
    }
    ```

    **XML 映射文件：**
    ```xml
    <select id="getUserById" resultType="com.example.User">
        SELECT * FROM users WHERE id = #{id}
    </select>
    ```

    - 这里的 `#{id}` 会自动将接口方法中的 `id` 参数传递给 SQL 语句。


### 2. 多个参数
- **使用 `@Param` 注解**：
    - 当接口方法有多个参数时，可以使用 `@Param` 注解为参数指定名称，在 XML 中使用该名称来引用参数。

    **Java 接口：**
    ```java
    public interface UserMapper {
        User getUserByNameAndAge(@Param("name") String userName, @Param("age") int userAge);
    }
    ```

    **XML 映射文件：**
    ```xml
    <select id="getUserByNameAndAge" resultType="com.example.User">
        SELECT * FROM users WHERE name = #{name} AND age = #{age}
    </select>
    ```

    - `@Param("name")` 为 `userName` 参数指定了在 XML 中使用的名称为 `name`，`@Param("age")` 为 `userAge` 参数指定了在 XML 中使用的名称为 `age`。


- **不使用 `@Param` 注解**：
    - 如果不使用 `@Param` 注解，MyBatis 会根据参数的位置使用 `arg0`、`arg1` 等名称。

    **Java 接口：**
    ```java
    public interface UserMapper {
        User getUserByNameAndAge(String userName, int userAge);
    }
    ```

    **XML 映射文件：**
    ```xml
    <select id="getUserByNameAndAge" resultType="com.example.User">
        SELECT * FROM users WHERE name = #{arg0} AND age = #{arg1}
    </select>
    ```


### 3. Map 作为参数
- **使用 `Map` 传递多个参数**：
    - 可以将多个参数封装在 `Map` 中传递给接口方法，在 XML 中使用 `map` 的键来引用参数。

    **Java 接口：**
    ```java
    public interface UserMapper {
        User getUserByMap(Map<String, Object> params);
    }
    ```

    **XML 映射文件：**
    ```xml
    <select id="getUserByMap" resultType="com.example.User">
        SELECT * FROM users WHERE name = #{userName} AND age = #{userAge}
    </select>
    ```

    - 在调用接口方法时，将参数放入 `Map` 中：
    ```java
    Map<String, Object> params = new HashMap<>();
    params.put("userName", "John");
    params.put("userAge", 30);
    userMapper.getUserByMap(params);
    ```


### 4. POJO 作为参数
- **使用自定义对象作为参数**：
    - 可以使用自定义的 Java 对象（POJO）作为参数，MyBatis 会将对象的属性作为参数传递给 XML。

    **Java 接口：**
    ```java
    public interface UserMapper {
        User getUserByUser(User user);
    }
    ```

    **XML 映射文件：**
    ```xml
    <select id="getUserByUser" resultType="com.example.User">
        SELECT * FROM users WHERE name = #{name} AND age = #{age}
    </select>
    ```

    - 这里假设 `User` 对象有 `name` 和 `age` 属性，MyBatis 会自动将对象的属性传递给 XML。


### 5. 集合作为参数
- **使用 `List` 或 `Set` 作为参数**：
    - 可以将 `List` 或 `Set` 作为参数传递给接口方法，在 XML 中使用 `collection` 属性来处理集合。

    **Java 接口：**
    ```java
    public interface UserMapper {
        List<User> getUsersByIds(List<Integer> ids);
    }
    ```

    **XML 映射文件：**
    ```xml
    <select id="getUsersByIds" resultType="com.example.User">
        SELECT * FROM users WHERE id IN
        <foreach item="id" index="index" collection="list" open="(" separator="," close=")">
            #{id}
        </foreach>
    </select>
    ```

    - `foreach` 元素用于遍历集合，`collection="list"` 表示使用 `List` 作为参数，`item="id"` 表示迭代元素，`#{id}` 引用元素的值。


### 6. 数组作为参数
- **使用数组作为参数**：
    - 可以将数组作为参数传递给接口方法，在 XML 中使用 `array` 属性来处理数组。

    **Java 接口：**
    ```java
    public interface UserMapper {
        List<User> getUsersByIds(int[] ids);
    }
    ```

    **XML 映射文件：**
    ```xml
    <select id="getUsersByIds" resultType="com.example.User">
        SELECT * FROM users WHERE id IN
        <foreach item="id" index="index" collection="array" open="(" separator="," close=")">
            #{id}
        </foreach>
    </select>
    ```


### 总结：
- 对于单个参数，直接使用 `#{}` 或 `${}` 占位符。
- 对于多个参数，可以使用 `@Param` 注解或使用 `arg0`、`arg1` 等位置参数。
- 可以使用 `Map`、POJO、集合或数组作为参数，使用不同的方式在 XML 中引用参数。


通过上述方法，可以灵活处理 MyBatis 接口和 XML 映射文件中参数的对应关系，实现参数的传递和使用。
