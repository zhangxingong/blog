+++
title = "Java8 Optional用法和最佳实践 | JAVA"
date = 2023-10-31T15:52:12+08:00
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

根据Oracle文档，Optional是一个容器对象，可以包含也可以不包含非null值。Optional在Java 8中引入，目的是解决  NullPointerExceptions的问题。本质上，Optional是一个包装器类，其中包含对其他对象的引用。在这种情况下，对象只是指向内存位置的指针，并且也可以指向任何内容。从其它角度看，Optional提供一种类型级解决方案来表示可选值而不是空引用。

**在****Optional****之前**

在Java 8之前，程序员将返回null而不是Optional。这种方法有一些缺点。一种是没有明确的方法来表示null可能是一个特殊值。相比之下，在API中返回Optional是明确的声明，其中可能没有值。如果我们要确保不会出现空指针异常，则需要对每个引用进行显式的空检查，如下所示，我们都同意这是很多样板。

```auto
// Life before Optional
    private void getIsoCode( User user){
        if (user != null) {
            Address address = user.getAddress();
            if (address != null) {
                Country country = address.getCountry();
                if (country != null) {
                    String isocode = country.getIsocode();
                    if (isocode != null) {
                        isocode = isocode.toUpperCase();
                    }
                }
            }
        }
    }

```

为了简化此过程，让我们看一下如何使用Optional类，从创建和验证实例到使用它提供的不同方法并将其与返回相同类型的其他方法组合在一起，后者才是Optional的厉害之处。

**Optional****的特性**

Optional类提供了大约10种方法，我们可以使用它们来创建和使用Optional类，下面将介绍如何使用它们。

**创建一个****Optional****类**

这是用于创建可选实例的三种创建方法。

1. **static  **[**Optional**]** **[**empty**]**()**

返回一个空的Optional实例。

```auto
// Creating an empty optional
Optional<String> empty = Optional.empty();
```

在返回一个空的{Optional}实例时，Optional的值不存在。不过，这样做可能很有诱惑力，如果对象为空，请避免与Option.empty()返回的实例的{==}比较  。因为不能保证它是一个单例，反之，应该使用isPresent()。

2. **static  **[**Optional**]** **[**of**]**(T value)**

返回特定的非空值Optional。

```auto
// Creating an optional using of

String name = "java";

Optional<String> opt = Optional.of(name);
```

静态方法需要一个非null参数；否则，将引发空指针异常。因此，如果我们不知道参数是否为null，那就是我们使用  ofNullable的时候，下面将对此进行介绍。

3. **static  **[**Optional**]** **[**of**]**(T value)**

返回描述指定值的Optional，如果非空，则返回空值。

```auto
// Possible null value

 Optional<String> optional = Optional.ofNullable(name());

  private  String  name(){

  String name = "Java";

  return (name.length() > 5) ? name : null;

 }
```

如果我们传入一个空引用，它不会抛出异常，而是返回一个空的Optional对象：

所以这就是动态或手动创建Optional的三种方法。下一组方法用于检查值的存在。

1. **布尔值****[isPresent]****（）**

如果存在值，则返回true；反之，返回false。如果所包含的对象不为null，则返回true，反之返回false。通常在对对象执行任何其他操作之前，先在Optional上调用此方法。 ··· //ispresent

Optional optional1 = Optional.of("javaone");

if (optional1.isPresent()){

//Do something, normally a get

} ··· 2. **布尔值**[isEmpty（）]

如果存在值，则返回false；否则，返回ture。这与isPresent 相反，  并且仅在Java 11及更高版本中可用。

```auto
 //isempty

Optional<String> optional1 = Optional.of("javaone");

if (optional1.isEmpty()){

  //Do something

}
```

3. **void [ifPresent](**[**Consumer**]**<? super **[**T**]**> consumer)**

如果存在值，则使用该值调用指定的使用者；否则，什么都不做。

如果您不熟悉Java 8，那么您可能会想知道：什么是消费者？简单来说，消费者是一种接受参数且不返回任何内容的方法。当使用  ifPresent时，这个方法就是一石二鸟。我们可以执行值存在性检查并使用一种方法执行预期的操作，如下所示。

```auto
//ifpresent

Optional<String> optional1 = Optional.of("javaone");

optional1.ifPresent(s -> System.out.println(s.length()));
```

可选类提供了另一组用于获取可选值的方法。

1. **T**[**get**]**（）**

如果此Optional中存在值，则返回该值，否则抛出  NoSuchElementException。在这之后，我们想要的是存储在Optional中的值，我们可以通过get()来获取它。但是，当该值为null时，此方法将引发异常。这就需要  orElse() 方法来紧急救援。

```auto
//get
Optional<String> optional1 = Optional.of("javaone");
if (optional1.isPresent()){ 
  String value = optional1.get();
}
```

2. [**T **][**orElse**]**（**[**T**]**其他）**

返回值（如果存在）；反之，返回其他。

该  orElse() 方法用于检索包装在Optional实例内的值。它采用一个充当默认值的参数。该  orElse() 方法返回包装的值（如果存在）及其参数，反之：

```auto
 //orElse
        String nullName = null;
        String name = Optional.ofNullable(nullName).orElse("default_name");

```

如果这还不够，那么Optional类将继续提供另一种获取值的方法，即使该方法的null称为 orElseGet()。

3. **[T]**[**orElseGet**]**(**[**Supplier**]**<? extends **[**T**]**> other)**

返回值（如果存在）；否则，调用other并返回该调用的结果。

该orElseGet() 方法类似于 orElse()。但是，如果没有Optional值，则不采用返回值，而是采用供应商功能接口，该接口将被调用并返回调用的值：

```auto
  //orElseGet
        String name = Optional.ofNullable(nullName).orElseGet(() -> "john");

```

那么，orElse() 和orElseGet()之间有什么区别。

乍一看，这两种方法似乎具有相同的效果。但是，事实并非如此。让我们创建一些示例，以突出两者之间的相似性和行为差异。

首先，让我们看看它们在对象为空时的行为：

```auto
String text = null;
String defaultText = Optional.ofNullable(text).orElseGet(this::getDefaultValue);
defaultText = Optional.ofNullable(text).orElse(getDefaultValue());
public String getDefaultValue() {
    System.out.println("Getting Default Value");
    return "Default Value";
}

```

在上面的示例中，我们在Optional对象中包装了一个空文本，然后尝试使用两种方法中的每一种来获取包装后的值。副作用如下：

```auto
Getting default value...
Getting default value...
```

在每种情况下都会调用默认方法。碰巧的是，当不存在包装的值时，两者  orElse() 和的  orElseGet() 工作方式完全相同。

现在，让我们运行另一个该值存在测试，理想情况下，甚至不应创建默认值：

在这个简单的示例中，创建默认对象不会花费很多成本，因为JVM知道如何处理此类对象。但是，当诸如此类的方法  default 必须进行Web服务调用或者查询数据库时，则成本变得非常明显。

**使用** **Optional** **最佳实践**

就像编程语言的任何其他功能一样，它可以正确使用或被滥用。为了了解使用Optional类的最佳方法，需要了解以下内容：

**1.****它解决的问题**

Optional的方法是尝试通过增加构建更具表现力的API的可能性来减少Java系统中空指针异常的情况，这些API解释了有时缺少返回值的可能性。

如果从一开始就存在Optional，那么大多数库和应用程序可能会更好地处理缺少的返回值，从而减少了空指针异常的数量以及总体上的错误总数。

**2.****它不解决的问题**

Optional并不意味着是一种避免所有类型的空指针的机制。例如，它仍然必须测试方法和构造函数的强制输入参数。

像使用null时一样，Optional不能帮助传达缺失值的含义。以类似的方式，null可能意味着很多不同的东西（找不到值等），因此缺少Optional值也可以。

该方法的调用方仍然需要检查该方法的JavaDoc以理解缺省选项的含义，以便正确地处理它。

同样，以一种类似的方式，可以将检查的异常捕获在一个空块中，没有什么阻止调用方进行调用  get() 并继续进行。

**3.****何时使用**

**Optional**的预期用途**主要是作为返回类型**。获取此类型的实例后，可以提取该值（如果存在）或提供其他行为（如果不存在）。

Optional类的一个非常有用的用例是将其与流或返回Optional值以构建流畅的API的其他方法结合。请参见下面的代码段

```auto
User user = users.stream().findFirst().orElse(new User("default", "1234"));
```

**4.****什么时候不使用**

a）不要将其用作类中的字段，因为它不可序列化

如果确实需要序列化包含Optional值的对象，则Jackson库提供了将Optionals视为普通对象的支持。这意味着Jackson将空对象视为空，将具有值的对象视为包含该值的字段。可以在jackson-modules-java8项目中找到此功能。

b）不要将其用作构造函数和方法的参数，因为这会导致不必要的复杂代码。

```auto
User user = new User("john@gmail.com", "1234", Optional.empty());
```

本人创业团队产品MadPecker，主要做BUG管理、测试管理、应用分发 网址:[www.madpecker.com]，有需要的朋友欢迎试用、体验！ 本文为MadPecker团队技术人员译制，转载请标明出处

