+++
title = "8个你必须知道的Java8新特性，让你的代码变得优雅！ | JAVA"
date = 2023-10-31T16:54:29+08:00
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### Java 8 是一次重大的发行版更新，引入了大量新特性和改进，以下是 Java 8 的主要特性：

##### 1.Lambda 表达式

Lambda 允许在代码中直接定义匿名函数，简化了对函数式编程的支持。

```scss
// Lambda 表达式示例
List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
nums.stream()
    .filter(num -> num % 2 == 0) // 过滤偶数
    .map(num -> num * 2) // 将每个元素乘以 2
    .forEach(System.out::println); // 打印结果
```

##### 2.Stream API

通过 Stream API 可以轻松处理集合和数组等数据结构，提高了代码的可读性和可维护性。以下是Stream API中常用的方法：

+   `filter(Predicate predicate)`：过滤出所有符合条件的元素。
    
+   `map(Function function)`：将元素转换为另一种类型。
    
+   `flatMap(Function function)`：将嵌套的多个流扁平化成一个流。
    
+   `distinct()`：去除重复元素。
    
+   `sorted()`：排序。
    
+   `boxed`：将基本数据类型转换为对应的包装类类型。
    
+   `peek(Consumer action)`：对每个元素执行指定的操作。
    
+   `limit(long maxSize)`：限制元素数量。
    
+   `skip(long n)`：跳过前 n 个元素。
    
+   `forEach(Consumer action)`：对每个元素执行指定的操作。
    
+   `count()`：计数。
    
+   `reduce(BinaryOperator accumulator)`：将所有元素归约成一个结果。
    
+   `collect(Collector collector)`：收集结果到一个集合中。
    
+   `allMatch(Predicate predicate)`：判断是否所有元素都符合给定条件。
    
+   `anyMatch(Predicate predicate)`：判断是否任何一个元素符合给定条件。
    
+   `noneMatch(Predicate predicate)`：判断是否没有任何元素符合给定条件。
    
+   `findFirst()`：返回第一个元素。
    
+   `findAny()`：返回任意一个元素。
    
+   这些操作可以通过链式调用的方式进行组合，形成一个完整的流处理链。如下是一个简单的例子：
    
    ```rust
    List<String> list = Arrays.asList("apple", "banana", "orange", "peach");
    ​
    long count = list.stream()  // 将 List 转换为 Stream
                     .filter(str -> str.startsWith("a"))  // 过滤出以 a 开头的字符串
                     .map(String::toUpperCase)  // 转换为大写
                     .count();  // 统计数量
    ​
    System.out.println(count);  // 输出结果：1
    ```
    

##### 3.Date/Time API

在 Java 8 中引入了全新的日期时间处理类库，使得处理日期时间变得更加方便和易于理解。以下是 `java.time` 包中最重要的一些类：

+   `LocalDate`：表示日期，如 2022 年 5 月 15 日。
    
+   `LocalTime`：表示时间，如 13:45:30。
    
+   `LocalDateTime`：代表日期和时间，比如 2022 年 5 月 15 日 13:45:30。
    
+   `ZonedDateTime`：代表带有时区的日期时间，在上述所有日期时间类型的基础上，还提供了时区信息。
    
+   `Duration`：在两个时间点之间表示时间量。
    
+   `Period`：在两个日期之间表示天、周、月或年的数量。
    
+   `DateTimeFormatter`：可以将日期时间对象按照指定的格式进行格式化或者解析。
    
+   以下是使用 Java 8 新的日期时间 API 的一些示例代码：
    
    ```ini
    // 创建 LocalDate 对象,表示当前日期
    LocalDate localDate = LocalDate.now();
    ​
    // 创建 LocalTime 对象,表示下午 2:30 这个时间点
    LocalTime localTime = LocalTime.of(14, 30, 0);
    ​
    // 创建 LocalDateTime 对象,表示 2022 年 6 月 1 日上午 12:30 这个日期时间。
    LocalDateTime localDateTime = LocalDateTime.of(2022, Month.JUNE, 1, 12, 30);
    ​
    // 在当前日期时间上加上一小时
    localDateTime = localDateTime.plusHours(1L);
    ​
    // 创建 Duration 对象，并计算两个时间点之间的时间量
    Duration duration = Duration.between(localTime, LocalTime.now());
    ​
    // 使用 DateTimeFormatter 对象对日期时间进行格式化
    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime = localDateTime.format(dateTimeFormatter);
    ```
    

##### 4.接口中的默认方法：

允许在接口中添加默认方法的实现，大大提高了接口的灵活性和扩展性。需要注意的是，这些接口默认方法并不是强制实现的，也可以被继承类或实现类所覆盖和重写。但在没有其他需求时，通过使用默认方法，可以大幅简化代码，并保证 API 的向后兼容性。如下Collection 接口中新增的 stream()、parallelStream() 和 removeIf() 等默认方法

```typescript
public interface Collection<E> extends Iterable<E> {
    default Stream<E> stream() {
        return StreamSupport.stream(spliterator(), false);
    }
    default Stream<E> parallelStream() {
        return StreamSupport.stream(spliterator(), true);
    }
    default boolean removeIf(Predicate<? super E> filter) {
        Objects.requireNonNull(filter);
        boolean removed = false;
        final Iterator<E> each = iterator();
        while (each.hasNext()) {
            if (filter.test(each.next())) {
                each.remove();
                removed = true;
            }
        }
        return removed;
    }
}
```

##### 5.函数式接口

函数式接口非常适合用于Lambda表达式和方法引用，因为它们可以将这些功能作为参数传递给方法或返回值，从而使代码更简洁、更具可读性。许多Java内置的函数式接口都在`java.util.function`包中定义，其中几个常用的接口如下：

+   `Function<T, R>`:接受一个参数并产生结果的函数。
    
    ```rust
    // 接收一个字符串类型参数并返回对应整数长度值
    Function<String, Integer> stringToLength = str -> str.length();
    System.out.println(stringToLength.apply("Hello World!"));
    // 输出结果：12
    ```
    
+   `Predicate<T>`: 接受一个参数并返回一个布尔值，表示断言函数。
    
    ```ini
    // 判断一个数字是否是奇数
    Predicate<Integer> isOdd = number -> number % 2 != 0;
    System.out.println(isOdd.test(5));
    // 输出结果：true
    ```
    
+   `Consumer<T>`:接受一个参数不返回结果，表示消费者函数。
    
    ```rust
    // 输出一个字符串的大写形式
    Consumer<String> printStringInUpperCase = str -> System.out.println(str.toUpperCase());
    printStringInUpperCase.accept("hello world!");
    // 输出结果：HELLO WORLD!
    ```
    
+   `Supplier<T>`:提供一个无参构造函数，返回任意类型结果。
    
    ```scss
    // 产生随机数
    Supplier<Integer> randomIntegerSupplier = () -> (int) (Math.random() * 100);
    System.out.println(randomIntegerSupplier.get());
    // 输出结果：一个0~99之间的随机整数
    ```
    

##### 6.方法引用(::)

Java 8中的方法引用是一种简化Lambda表达式的方式，它允许我们直接引用已存在的 Java 类或对象的方法，而不需要通过 Lambda 表达式再去定义一个新的函数式接口实现。可以用两个冒号（::）来表示方法引用，其中左边是对象或类名，右边是方法名，语法如下：

+   静态方法引用
    
    `ClassName::staticMethodName`
    
+   实例方法引用
    
    `objectReference::instanceMethodName`
    
+   对象超类方法引用
    
    `SuperClassName::instanceMethodName`
    
+   构造函数引用
    
    `ClassName::new`
    

##### 7.Optional 容器类型

Optional 类型是一种容器类型，表示一个值可能为空的情况，可以帮助我们避免 NullPointerException 异常,同时也可以让代码更加简洁明了。Optional 接口定义了一组方法，用于检测是否有值，获取值，处理值等操作。以下是一些常用方法：

+   `of()` 方法：创建一个包含指定非空值的 Optional 对象。
    
    ```vbnet
    Optional<String> optional = Optional.of("Hello");
    ```
    
+   ofNullable() 方法：创建一个可能包含 null 值的 Optional 对象。
    
    ```vbnet
    Optional<String> optional = Optional.ofNullable(null);
    ```
    
+   isPresent() 方法：判断 Optional 中是否存在值。返回ture表示存在值 返回false表示为null
    
    ```vbnet
    Optional<String> optional = Optional.ofNullable("Hello");
    if (optional.isPresent()) {
        System.out.println("Value is " + optional.get());
    }
    ```
    
+   get() 方法：如果 Optional 的值存在则返回该值，否则抛出 NoSuchElementException 异常。
    
    ```vbnet
    Optional<String> optional = Optional.ofNullable("Hello");
    String value = optional.get();
    ```
    
+   orElse() 方法：如果值存在则返回该值，否则返回参数中指定的默认值。
    
    ```ini
    String defaultValue = "World";
    Optional<String> optional = Optional.empty();
    String value = optional.orElse(defaultValue); // value = "World"
    ```
    
+   orElseGet() 方法：如果值存在则返回该值，否则运行参数中的 Supplier 函数，并返回该函数的结果。
    
    ```ini
    Supplier<String> supplier = () -> "World";
    Optional<String> optional = Optional.empty();
    String value = optional.orElseGet(supplier); // value = "World"
    ```
    
+   map() 方法：如果值存在则使用该值执行提供的 Function 函数，并返回包含其返回值的 Optional 对象；否则返回一个空的 Optional 对象。
    
    ```vbnet
    Function<String, String> function = (s) -> s + " World!";
    Optional<String> optional = Optional.of("Hello");
    Optional<String> result = optional.map(function); // result = Optional[Hello World!]
    ```
    
+   filter() 方法：如果值存在并且满足指定的 Predicate 条件，则返回包含该值的 Optional 对象；否则返回一个空的 Optional 对象。
    
    ```ini
    Predicate<String> predicate = (s) -> s.contains("l");
    Optional<String> optional = Optional.of("Hello");
    Optional<String> result = optional.filter(predicate); // result = Optional[Hello]
    ```
    

##### 8.Parallel Streams

Java 8 中引入了并行流（Parallel Streams）的功能，能够有效地利用多核处理器处理大量数据集合。

并行流与普通流 API 几乎相同，但它会将操作分解成几个小块，在不同的 CPU 上进行处理，并最后将结果合并起来。因此，并行流可以显著提高大型数据集合的处理速度。下面是一个简单的例子。

假设我们需要对一个包含 1000 万个随机数的数组进行排序，然后筛选出其中所有能被 3 整除的元素。这个任务很复杂，因此可以考虑采用并行流来优化代码性能：

```ini
//创建一个包含1000万个随机数的数组
int[] arr = new int[10000000];
Random random = new Random();
for (int i = 0; i < arr.length; i++) {
    arr[i] = random.nextInt(100);
}
​
// 串行方式
long start1 = System.currentTimeMillis();
List<Integer> list1 = Arrays.stream(arr).sorted().filter(n -> n % 3 == 0).boxed().collect(Collectors.toList());
long end1 = System.currentTimeMillis();
System.out.println("Serial time: " + (end1 - start1) + "ms");
​
// 并行方式
long start2 = System.currentTimeMillis();
List<Integer> list2 = Arrays.stream(arr).parallel().sorted().filter(n -> n % 3 == 0).boxed().collect(Collectors.toList());
long end2 = System.currentTimeMillis();
System.out.println("Parallel time: " + (end2 - start2) + "ms");
```

以上代码通过随机数生成器创建了一个包含 1000 万个随机数的数组，并参照条件对数组进行了排序和筛选过滤。

其中通过串行流（Stream）和并行流（Parallel Stream）两种方式，分别实现了对数据的操作，并在控制台输出操作所消耗的时间。

可以看出，在数据规模比较大时，使用并行流会更能发挥多核 CPU 的优势，减少整个操作过程的耗时。

