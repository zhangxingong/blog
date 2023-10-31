+++
title = "java8新特性之--强大的Stream API详细讲解 | JAVA"
date = 2023-10-31T17:01:32+0800
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 强大的Stream API

## Stream API说明

Java8中有两大最为重要的改变。第一个是 Lambda 表达式；另外一个则 是 Stream API。Stream API ( java.util.stream) 把真正的函数式编程风格引入到Java中。

这是目前为止对Java类库最好的补充，因为Stream API可以极大提供Java程序员的生产力，让程序员写出高效率、干净、简洁的代码。

Stream 是 Java8 中处理集合的关键抽象概念，它可以指定你希望对集合进行的操作，可以执行非常复杂的查找、过滤和映射数据等操作。

使用 Stream API 对集合数据进行操作，就类似于使用 SQL 执行的数据库查询。也可以使用 Stream API 来并行执行操作。简言之，Stream API 提供了一种高效且易于使用的处理数据的方式。

## 为什么要使用Stream API

实际开发中，项目中多数数据源都来自于Mysql，Oracle等。但现在数 据源可以更多了，有MongDB，Radis等，而这些NoSQL的数据就需要 Java层面去处理。

Stream 和 Collection 集合的区别：Collection 是一种静态的内存数据 结构，而 Stream 是有关计算的。前者是主要面向内存，存储在内存中， 后者主要是面向 CPU，通过 CPU 实现计算。

## 什么是 Stream

Stream到底是什么呢？ 是数据渠道，用于操作数据源（集合、数组等）所生成的元素序列。 “集合讲的是数据，Stream讲的是计算！”

注意：

①Stream 自己不会存储元素。

②Stream 不会改变源对象。相反，他们会返回一个持有结果的新Stream。

③Stream 操作是延迟执行的。这意味着他们会等到需要结果的时候才执行。

## Stream 的操作三个步骤

1- 创建 Stream 一个数据源（如：集合、数组），获取一个流

2- 中间操作 一个中间操作链，对数据源的数据进行处理

3- 终止操作(终端操作) 一旦执行终止操作，就执行中间操作链，

并产生结果。之后，不会再被使用

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83182f0140c74cfd9df1460e57006d70~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=157&s=30841&e=png&b=fefefe)

### 创建 Stream方式一：通过集合

Java8 中的 Collection 接口被扩展，提供了两个获取流 的方法：

> default Stream stream() : 返回一个顺序流
> 
> default Stream parallelStream() : 返回一个并行流

### 创建 Stream方式二：通过数组

Java8 中的 Arrays 的静态方法 stream() 可以获取数组流：

> static Stream stream(T\[\] array): 返回一个流

重载形式，能够处理对应基本类型的数组：

> public static IntStream stream(int\[\] array)
> 
> public static LongStream stream(long\[\] array)
> 
> public static DoubleStream stream(double\[\] array)

### 创建 Stream方式三：通过Stream的of()

可以调用Stream类静态方法 of(), 通过显示值创建一个流。

它可以接收任意数量的参数。

> public static Stream of(T... values) : 返回一个流

### 创建 Stream方式四：创建无限流

可以使用静态方法 Stream.iterate() 和 Stream.generate(), 创建无限流。

> 迭代 public static Stream iterate(final T seed, final UnaryOperator f)
> 
> 生成 public static Stream generate(Supplier s)

```java
// 方式四：创建无限流
@Test
public void test4() {
// 迭代
// public static<T> Stream<T> iterate(final T seed, final
// UnaryOperator<T> f)
Stream<Integer> stream = Stream.iterate(0, x -> x + 2);
stream.limit(10).forEach(System.out::println);
// 生成
// public static<T> Stream<T> generate(Supplier<T> s)
Stream<Double> stream1 = Stream.generate(Math::random);
stream1.limit(10).forEach(System.out::println);
}
```

## Stream 的中间操作

多个中间操作可以连接起来形成一个流水线，除非流水线上触发终止 操作，

否则中间操作不会执行任何的处理！而在终止操作时一次性全 部处理，称为“惰性求值”。

### 1-筛选与切片

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22418ba5e54b41038c57ca86f41535d0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=251&s=117412&e=png&b=dde6f3)

### 2-映 射

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a365432b0115413aa87a21b03659af17~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=394&s=255144&e=png&b=dce6f3)

### 3-排序

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62809d9e0bb045caada7831b7634d99c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=699&h=204&s=57027&e=png&b=dee6f3)

### **代码示范**

```java
   //1-筛选与切片
    @Test
    public void test1(){
        List<Employee> list = EmployeeData.getEmployees();
//        filter(Predicate p)——接收 Lambda ， 从流中排除某些元素。
        Stream<Employee> stream = list.stream();
        //练习：查询员工表中薪资大于7000的员工信息
        stream.filter(e -> e.getSalary() > 7000).forEach(System.out::println);

        System.out.println();
//        limit(n)——截断流，使其元素不超过给定数量。
        list.stream().limit(3).forEach(System.out::println);
        System.out.println();

//        skip(n) —— 跳过元素，返回一个扔掉了前 n 个元素的流。若流中元素不足 n 个，则返回一个空流。与 limit(n) 互补
        list.stream().skip(3).forEach(System.out::println);

        System.out.println();
//        distinct()——筛选，通过流所生成元素的 hashCode() 和 equals() 去除重复元素

        list.add(new Employee(1010,"刘强东",40,8000));
        list.add(new Employee(1010,"刘强东",41,8000));
        list.add(new Employee(1010,"刘强东",40,8000));
        list.add(new Employee(1010,"刘强东",40,8000));
        list.add(new Employee(1010,"刘强东",40,8000));

//        System.out.println(list);

        list.stream().distinct().forEach(System.out::println);
    }

 //2-映射
    @Test
    public void test2(){
//        map(Function f)——接收一个函数作为参数，将元素转换成其他形式或提取信息，该函数会被应用到每个元素上，并将其映射成一个新的元素。
        List<String> list = Arrays.asList("aa", "bb", "cc", "dd");
        list.stream().map(str -> str.toUpperCase()).forEach(System.out::println);

//        练习1：获取员工姓名长度大于3的员工的姓名。
        List<Employee> employees = EmployeeData.getEmployees();
        Stream<String> namesStream = employees.stream().map(Employee::getName);
        namesStream.filter(name -> name.length() > 3).forEach(System.out::println);
        System.out.println();
        //练习2：
        Stream<Stream<Character>> streamStream = list.stream().map(StreamAPITest1::fromStringToStream);
        streamStream.forEach(s ->{
            s.forEach(System.out::println);
        });
        System.out.println();
//        flatMap(Function f)——接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流。
        Stream<Character> characterStream = list.stream().flatMap(StreamAPITest1::fromStringToStream);
        characterStream.forEach(System.out::println);

    }

    //将字符串中的多个字符构成的集合转换为对应的Stream的实例
    public static Stream<Character> fromStringToStream(String str){//aa
        ArrayList<Character> list = new ArrayList<>();
        for(Character c : str.toCharArray()){
            list.add(c);
        }
       return list.stream();

    }

    //3-排序
    @Test
    public void test4(){
//        sorted()——自然排序
        List<Integer> list = Arrays.asList(12, 43, 65, 34, 87, 0, -98, 7);
        list.stream().sorted().forEach(System.out::println);
        //抛异常，原因:Employee没有实现Comparable接口
//        List<Employee> employees = EmployeeData.getEmployees();
//        employees.stream().sorted().forEach(System.out::println);


//        sorted(Comparator com)——定制排序

        List<Employee> employees = EmployeeData.getEmployees();
        employees.stream().sorted( (e1,e2) -> {

           int ageValue = Integer.compare(e1.getAge(),e2.getAge());
           if(ageValue != 0){
               return ageValue;
           }else{
               return -Double.compare(e1.getSalary(),e2.getSalary());
           }

        }).forEach(System.out::println);
    }

}
```

## Stream 的终止操作

终端操作会从流的流水线生成结果。其结果可以是任何不是流的值，

例如：List、Integer，甚至是 void 。流进行了终止操作后，不能再次使用。

### 1-匹配与查找

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b5bd36e3b8c44c6ae5233b1f614923c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=272&s=129140&e=png&b=dae4f2)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/139db28ff6f54de5862f2ab75d5e56e0~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=303&s=139031&e=png&b=e1e9f4)

### 2-归约

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56ecbb2d4ee543bfb56c5e17f3a70e2f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=212&s=86435&e=png&b=dde6f3)

### 备注：

​ map 和 reduce 的连接通常称为 map-reduce 模式，因 Google 用它来进行网络搜索而出名。

### 3-收集

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/256b6b5feee54ffea874030434d59c31~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=137&s=59354&e=png&b=d4e0f0)

Collector 接口中方法的实现决定了如何对流执行收集的操作(如收集到 List、Set、 Map)。

### 另外

Collectors 实用类提供了很多静态方法，可以方便地创建常见收集器实例， 具体方法与实例

如下表：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92ad076e0752471ca58acf4af3709fec~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=454&s=237515&e=png&b=dbe9f6) ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0b08f7571344f7f9f730554314a1a73~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=865&h=480&s=354124&e=png&b=dceaf6)

代码示范 因为Collectors 实用类提供了很多静态方法太多的这里就列举了

### 代码演示

匹配--查找 -归约-收集

```java
//1-匹配与查找
 @Test
    public void test1(){
        List<Employee> employees = EmployeeData.getEmployees();

//        allMatch(Predicate p)——检查是否匹配所有元素。
//          练习：是否所有的员工的年龄都大于18
        boolean allMatch = employees.stream().allMatch(e -> e.getAge() > 18);
        System.out.println(allMatch);

//        anyMatch(Predicate p)——检查是否至少匹配一个元素。
//         练习：是否存在员工的工资大于 10000
        boolean anyMatch = employees.stream().anyMatch(e -> e.getSalary() > 10000);
        System.out.println(anyMatch);

//        noneMatch(Predicate p)——检查是否没有匹配的元素。
//          练习：是否存在员工姓“雷”
        boolean noneMatch = employees.stream().noneMatch(e -> e.getName().startsWith("雷"));
        System.out.println(noneMatch);
//        findFirst——返回第一个元素
        Optional<Employee> employee = employees.stream().findFirst();
        System.out.println(employee);
//        findAny——返回当前流中的任意元素
        Optional<Employee> employee1 = employees.parallelStream().findAny();
        System.out.println(employee1);

    }

    @Test
    public void test2(){
        List<Employee> employees = EmployeeData.getEmployees();
        // count——返回流中元素的总个数
        long count = employees.stream().filter(e -> e.getSalary() > 5000).count();
        System.out.println(count);
//        max(Comparator c)——返回流中最大值
//        练习：返回最高的工资：
        Stream<Double> salaryStream = employees.stream().map(e -> e.getSalary());
        Optional<Double> maxSalary = salaryStream.max(Double::compare);
        System.out.println(maxSalary);
//        min(Comparator c)——返回流中最小值
//        练习：返回最低工资的员工
        Optional<Employee> employee = employees.stream().min((e1, e2) -> Double.compare(e1.getSalary(), e2.getSalary()));
        System.out.println(employee);
        System.out.println();
//        forEach(Consumer c)——内部迭代
        employees.stream().forEach(System.out::println);

        //使用集合的遍历操作
        employees.forEach(System.out::println);
    }

    //2-归约
    @Test
    public void test3(){
//        reduce(T identity, BinaryOperator)——可以将流中元素反复结合起来，得到一个值。返回 T
//        练习1：计算1-10的自然数的和
        List<Integer> list = Arrays.asList(1,2,3,4,5,6,7,8,9,10);
        Integer sum = list.stream().reduce(0, Integer::sum);
        System.out.println(sum);


 //3-收集
    @Test
    public void test4(){
//        collect(Collector c)——将流转换为其他形式。接收一个 Collector接口的实现，用于给Stream中元素做汇总的方法
//        练习1：查找工资大于6000的员工，结果返回为一个List或Set

        List<Employee> employees = EmployeeData.getEmployees();
        List<Employee> employeeList = employees.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toList());

        employeeList.forEach(System.out::println);
        System.out.println();
        Set<Employee> employeeSet = employees.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toSet());

        employeeSet.forEach(System.out::println);
    }
```
