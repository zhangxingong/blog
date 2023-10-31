+++
title = "【JAVA知识点、简单的语言、大白话的理解】 并发、线程、锁 的深入理解 | JAVA"
date = 2023-10-31T17:11:22+08:00
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

## 提出问题

## 为什么需要多线程？

我在网上搜索为什么需要多线程？大概归类一下就是：

+   提高系统的并发性能。
+   改善用户体验。
+   提高资源利用率。
+   支持异步操作。
+   实现复杂的业务逻辑。  
    

说的好像都对，但是好像又太笼统了。  

> 到底为什么我们需要多线程呢？

我的回答是： 多线程的出现就是要将计算机性能发挥到极致，计算机的发展目标之一就是更快。所以计算机的发展方向就是：

+   1 程序和算法，将程序的时间复杂度和空间复杂度降到最低。
+   2 硬件设备CPU频率、内存大小和速度、I/O总线的宽度和速度的提升。
+   3 直接颠覆性的模型和设计。

第2点硬件设备发展的过程中由于材料、工艺、设计等等，会产生很多差异，并且这些差异是不可改变的。所以计算机的设计中CPU、内存、I/O 设备的速度是有极大差异，系统的性能往往受限于最慢的组件，当CPU需要等待内存读取数据时，它将不能继续执行其他指令，这就是所谓的“内存瓶颈”。为了充分利用系统资源，所以我们需要多线程来合理利用 CPU 的高性能，平衡这三者的速度差异。让计算机的效率达到最高、让计算机的速度达到最快。

## 多线程会带来什么问题？

为了平衡CPU、内存、I/O 设备的速度差异。

### 可见性

每个核心都增加了缓存，线程在不同的核心上执行时，缓存不能及时同步到主存，可能读取到不同的缓存值。

### 原子性

操作系统层面增加了线程、进程的概念。操作系统可以在多个任务之间进行调度和切换，分时复用就会导致原子性问题。

### 有序性

在程序编译阶段，编译器会进行指令的重排，可能会导致有序性问题。

> 这三种问题就是我们常见的并发问题。

## 如何解决并发问题

### JVM层面

为了解决并发问题，JVM层面制定了Happens-Before 规则，你可以理解为前后原则，列出常见的规则（如果你懒的看原理，光看黑体字就够了）：

+   程序次序规则：在同一个线程中，按照程序的书写顺序，前面的操作Happens-Before后面的操作（**前面的操作 在 后面的操作 之前**）。这个规则确保了线程内操作的顺序性，即代码的执行顺序按照编写的顺序执行。
+   锁定规则：一个解锁操作Happens-Before后续的对同一个锁的加锁操作（**一个解锁操作 在 后续的对同一个锁的加锁操作 之前**）。这个规则确保了在多线程环境下，一个线程对共享资源的修改对其他线程是可见的。
+   volatile变量规则：对一个volatile变量的写操作Happens-Before后续对该变量的读操作（**对一个volatile变量的写操作 在 后续对该变量的读操作 之前**）。这个规则确保了对volatile变量的修改对其他线程可见。
+   传递性规则：如果操作A Happens-Before操作B，操作B Happens-Before操作C，那么操作A Happens-Before操作C。（**A 在 B 之前,B 在 C 之前，那么 A 在 C 之前**）这个规则允许我们通过一系列的Happens-Before关系来推断操作之间的顺序关系。

### JDK层面

三个关键字**volatile**、**synchronized** 和 **final**

#### volatile

用于修饰变量，当一个变量被volatile修饰时，表示该变量是一个共享变量。

+   保证可见性：当一个线程对volatile变量进行写操作后，其他线程可以立即看到最新的值，即对volatile变量的写操作对其他线程是可见的。
+   保证有序性：禁止指令重排序，volatile变量的读写操作具有禁止指令重排序的作用。普通的变量在编译器或处理器优化时可能会进行指令重排序，而volatile变量不会被重排序。这样可以确保对volatile变量的操作按照代码的执行顺序进行。
+   不保证原子性：volatile变量并不能保证操作的原子性。如果一个操作涉及到多次读写volatile变量，那么这个操作仍然可能不是原子操作。如果需要保证操作的原子性，可以使用synchronized或者java.util.concurrent.atomic包中的原子类。

#### synchronized

用于实现线程的互斥访问。当一个方法或一个代码块被synchronized修饰时，表示该方法或代码块是一个临界区，同一时间只能有一个线程进入临界区执行。synchronized可以修饰实例方法、静态方法和代码块。

+   保证原子性：同一时间只能有一个线程进入synchronized临界区执行，其他线程需要等待锁释放后才能进入临界区。
+   保证可见性：当一个线程进入synchronized临界区修改共享变量的值后，其他线程可以立即看到最新的值，即对共享变量的写操作对其他线程是可见的。
+   保证有序性：synchronized关键字可以保证临界区内的操作按照代码的执行顺序进行，防止指令重排序。

> 那是不是说就可以无脑synchronized，并不是synchronized关键字属于重量级锁，使用不当可能会造成性能问题。还是要根据实际应用场景和业务代码合理使用。

#### final

final可以用来修饰变量、方法、类、参数、引用类型。

+   final修饰变量：被final修饰的变量表示常量，一旦被赋值后就不能再改变其值。final修饰的变量必须在声明时或构造函数中初始化。
+   final修饰方法：被final修饰的方法不能被子类重写，即该方法为最终版本，子类只能继承该方法，但不能修改其实现。
+   final修饰类：被final修饰的类是最终类，不能被其他类继承。
+   final修饰参数：在方法的参数上使用final关键字，表示该参数值在方法内部不能被修改。
+   final修饰引用类型：final修饰引用类型变量，表示该变量引用的对象地址不可变，但对象本身的值可以修改。

不可变性决定了它可以保证 原子性、有序性和可见性。

## 线程

## 线程的生命周期

概括图

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94cdd541dd214cc3833885a322fd09a1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=803&h=463&s=63747&e=png&b=fdfdfd) **线程的五种状态：**

### 创建（New）

当一个Thread对象被创建时，线程处于新建状态。此时线程已经分配了必要的资源，但还没有开始执行。

### 就绪（Runnable）

当线程调用start()方法后，线程进入就绪状态。此时，线程已经准备好运行，等待获取CPU时间片来执行。

### 运行（Running）

当线程被调度并获取到CPU时间片后，线程进入运行状态。此时，线程开始执行run()方法中的代码。

### 阻塞（Blocked）\*重要

线程可能会进入阻塞状态，暂时停止执行。有多种情况会导致线程进入阻塞状态，比如调用了sleep()方法、wait()方法、join()方法，或者因为获取不到某个对象的锁而被阻塞。 根据阻塞类型的不同，阻塞可以分为三种：

#### 1、等待阻塞（WAITING）

线程在调用了Object类的wait()、join()、sleep()方法后，会进入等待阻塞状态。在等待阻塞状态下，线程会释放持有的锁，并且等待被唤醒。

#### 2、同步阻塞（BLOCKED）

当线程在获取synchronized锁时，如果锁已经被其他线程持有，那么该线程就会进入同步阻塞状态。在同步阻塞状态下，线程会等待其他线程释放锁才能继续执行。

#### 3、其他阻塞（TIMED\_WAITING）

线程在调用了Thread类的sleep()方法、join()方法指定了超时时间、LockSupport类的parkNanos()、parkUntil()方法后，会进入其他阻塞状态。在其他阻塞状态下，线程会等待指定的时间之后才能继续执行。

> 这三种阻塞状态都属于阻塞状态，线程在这些状态下暂停执行，不参与CPU的调度。当满足特定条件时，线程会从阻塞状态转换到就绪状态，等待CPU的调度重新执行。

### 死亡（Terminated）

线程进入终止状态有三种情况：第一种是run()方法执行完毕，线程自然终止；第二种是调用了stop()方法，强制终止线程的执行。一旦线程进入终止状态，它将不会再转换到其他状态，最后一种是线程出现异常，强行终止。

## 线程的创建

一般情况下创建线程有三种方式：（**记住一句话：所有创建方式都是通过Thread.start()方法调用的**）

### 实现Runnable接口

+   无返回值

```java
/**
 * 实现Runnable接口
 */
public class ThreadDemo implements Runnable{

    /**
     * 实现run方法
     */
    public void run(){
        System.out.println("thread creation successful");
    }

    /**
     * 测试
     * @param args
     */
    public static void main(String[] args) {
        ThreadDemo threadDemo = new ThreadDemo();
        Thread thread = new Thread(threadDemo);
        thread.start();
        System.out.println("main is running");
    }

}
```

### 实现Callable接口

+   有返回值

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * <Integer> 泛型规定返回的值的类型
 *
 * 实现Callable的方式来创建线程
 */
public class ThreadDemo implements Callable<Integer> {

    /**
     * 实现方法 call()
     * @return
     * @throws Exception
     */
    @Override
    public Integer call() throws Exception {
        return 1;
    }

    /**
     * 测试
     * @param args
     */
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ThreadDemo threadDemo = new ThreadDemo();
        FutureTask<Integer> ft = new FutureTask<>(threadDemo);
        Thread thread = new Thread(ft);
        thread.start();
        System.out.println("main is running");
        System.out.println(ft.get());
    }
    
}
```

### 继承Thread类

```java
/**
 * 继承Thread类的方式
 */
public class ThreadDemo extends Thread{

    /**
     * 实现run方法，因为Thread也实现了Runnable接口
     */
    public void run(){
        System.out.println("thread creation successful");
    }

    /**
     * 测试
     * @param args
     */
    public static void main(String[] args) {
        ThreadDemo threadDemo = new ThreadDemo();
        threadDemo.start();
        System.out.println("main is running");
    }

}
```

## 线程类的使用

### 设置守护线程 ThreadDemo.setDaemon(true);

```java
public class ThreadDemo extends Thread{

    /**
     * 实现run方法，因为Thread也实现了Runnable接口
     */
    public void run(){
        System.out.println("thread creation successful");
    }

    /**
     * 测试
     * @param args
     */
    public static void main(String[] args) {
        ThreadDemo threadDemo = new ThreadDemo();
        threadDemo.start();
        /**
         * 将此线程设置为守护线程
         */
        threadDemo.setDaemon(true);
        
        System.out.println("main is running");
    }

}
```

### 线程休眠 Thread.sleep(millisec);

+   休眠当前正在执行的线程
+   millisec 单位为毫秒。

```java
public class ThreadDemo extends Thread{

    /**
     * 实现run方法，因为Thread也实现了Runnable接口
     */
    public void run(){
        System.out.println("thread creation successful");
        try {
            /**
             * 线程休眠5秒
             */
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Sleep ended");
    }

    /**
     * 测试
     * @param args
     */
    public static void main(String[] args) {
        ThreadDemo threadDemo = new ThreadDemo();
        threadDemo.start();
        System.out.println("main is running");
    }

}
```

### 线程调度 Thread.yield();

```java
public class ThreadDemo extends Thread{
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                /**
                 * cpu让出资源
                 */
                Thread.yield();
                System.out.println("线程1执行中");
            }
            System.out.println("线程1执行结束");
        });

        Thread thread2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("线程2执行中");
            }
            System.out.println("线程2执行结束");
        });

        thread1.start();
        thread2.start();
    }
}
```

执行结果

```auto
线程1执行中
线程1执行中
线程1执行中
线程1执行中
线程1执行中
线程1执行结束
线程2执行中
线程2执行中
线程2执行中
线程2执行中
线程2执行中
线程2执行结束
```

> 需要注意的是，尽管Thread.yield()方法可以在多线程程序中有效控制线程的执行顺序，但过度使用它可能会导致线程之间的竞争变得复杂，从而影响程序的可读性和可维护性。通常情况下，我们不需要手动调用Thread.yield()方法，而是依靠操作系统的调度机制来合理分配CPU资源。

### 中断线程 Thread.interrupt()

### 检查当前线程是否被中断Thread.interrupted();

```java
public class ThreadDemo extends Thread{
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                if (Thread.interrupted()) {
                    System.out.println("线程被中断");
                } else {
                    System.out.println("线程未被中断");
                }
            }
        });

        thread.start();
        thread.interrupt(); // 中断线程

        System.out.println("主线程执行中");
    }
}
```

执行结果

```auto
主线程执行中
线程被中断
线程未被中断
线程未被中断
线程未被中断
线程未被中断
```

### 线程之间交互 Thread.join();

三种重载方式

+   Thread.join()：等待被调用线程执行完毕。
+   Thread.join(long millis)：等待被调用线程指定的毫秒数，如果在指定时间内被调用线程未执行完毕，则当前线程继续执行。
+   Thread.join(long millis, int nanos)：等待被调用线程指定的毫秒数和纳秒数，如果在指定时间内被调用线程未执行完毕，则当前线程继续执行。

```java
public class ThreadDemo extends Thread{
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            System.out.println("线程1开始执行");
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("线程1执行完毕");
        });

        Thread thread2 = new Thread(() -> {
            System.out.println("线程2开始执行");
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("线程2执行完毕");
        });

        thread1.start();
        thread2.start();

        try {
            /**
             * 等待线程1执行完毕
             */
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("主线程执行中");
    }
}
```

结果

```auto
线程1开始执行
线程2开始执行
线程1执行完毕
线程2执行完毕
主线程执行中
```

### 线程等待 Object.wait();

### 线程唤醒 Object.notify()、Object.notifyAll();

**注意是Object方法，必须在同步方法中使用**  
三种重载方法：

+   wait()：让当前线程进入等待状态，直到其他线程调用该对象的notify()或notifyAll()方法来唤醒它。
+   wait(long timeout)：让当前线程进入等待状态，最长等待指定的毫秒数，超过指定时间仍未被唤醒则自动苏醒。
+   wait(long timeout, int nanos)：让当前线程进入等待状态，最长等待指定的毫秒数和纳秒数，超过指定时间仍未被唤醒则自动苏醒。

```java
public class ThreadDemo extends Thread{
    public static void main(String[] args) {
        final Object lock = new Object();

        Thread thread1 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("线程1开始执行");
                try {
                    lock.wait(); // 线程1进入等待状态
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("线程1被唤醒");
            }
        });

        Thread thread2 = new Thread(() -> {
            synchronized (lock) {
                System.out.println("线程2开始执行");
                lock.notify(); // 唤醒线程1
                System.out.println("线程2执行完毕");
            }
        });

        thread1.start();
        thread2.start();
    }
}
```

执行结果

```auto
线程1开始执行
线程2开始执行
线程2执行完毕
线程1被唤醒
```

## 线程池（目的就是防止资源的消耗）

池线程（Thread pool）是一种线程管理的机制，在应用程序启动时就会创建一组固定数量的线程，这些线程被放入一个线程池中，可以被重复使用来执行多个任务。

使用线程池的好处是可以避免频繁地创建和销毁线程的开销，提高了线程的利用率。线程池中的线程可以被多个任务共享，而不是为每个任务创建一个新的线程。当一个任务提交给线程池时，线程池会选择一个空闲的线程来执行任务，如果没有空闲线程，任务会被放入等待队列中，等待有空闲线程时再执行。

线程池还可以控制并发执行的线程数量，可以设置最大线程数来限制线程的数量，防止系统资源被过度消耗。当任务执行完毕后，线程会返回线程池中等待下一个任务的到来。

Java中的线程池通过**Executor框架**来实现，提供了ThreadPoolExecutor类来创建和管理线程池。可以使用ThreadPoolExecutor类或者Executors工具类来创建线程池。通过配置线程池的大小、等待队列长度、线程工厂、拒绝策略等参数，可以根据应用的需求来灵活地使用线程池。

### Executor框架（jdk1.5之后管理和执行线程的框架）

Executor是Java中用于管理和执行线程的框架。它提供了一种简化线程使用的方式，使得开发者能够更方便地管理线程的生命周期和执行任务。

Executor框架的核心接口是Executor，它定义了一个用于执行任务的方法execute(Runnable command)。通过将任务（Runnable对象）提交给Executor，线程的创建和管理都交给Executor来处理，开发者无需手动创建和管理线程。

### Executor框架包含五部分

#### 1、ThreadPoolExecutor实现类（线程池的创建和使用）

ThreadPoolExecutor是Executor接口的一个实现类，用于创建一个线程池。可以通过构造方法指定线程池的核心线程数、最大线程数、线程空闲时间等参数，以及线程池的工作队列。ThreadPoolExecutor提供了灵活的线程池配置和管理功能。  
**ThreadPoolExecutor一般有三个子类比较常用。**

##### FixedThreadPool（固定线程池）

FixedThreadPool是一个固定大小的线程池，它会一直保持指定数量的线程在工作状态，即使它们是空闲的。如果提交的任务数大于线程池的大小，任务会被放入一个无界队列中等待执行。适合处理长时间的任务，可以限制线程的数量，避免资源被过度消耗。

```java
public class ThreadDemo implements Runnable{

    @Override
    public void run() {
        System.out.println("test success");
    }

    public static void main(String[] args) {
        /**
         * 固定大小为5的线程池
         */
        ExecutorService executor = Executors.newFixedThreadPool(5);

        /**
         * 循环提交10个任务到线程池
         */
        for (int i = 0; i < 10; i++) {
            Runnable worker = new ThreadDemo();

            /**
             * 执行
             */
            executor.execute(worker);
        }

        /**
         * 关闭线程池，释放资源
         */
        executor.shutdown();

    }
}
```

##### SingleThreadExecutor（单线程池）

SingleThreadExecutor是一个只有一个工作线程的线程池，它可以保证任务按照提交的顺序依次执行。如果该线程因为异常而终止，会创建一个新的线程来替代。适合需要顺序执行任务，并且在任务执行过程中需要保持某种状态的场景。

```java
public class ThreadDemo implements Runnable{

    @Override
    public void run() {
        System.out.println("test success");
    }

    public static void main(String[] args) {
        /**
         * 单线程池
         */
        ExecutorService executor = Executors.newSingleThreadExecutor();

        /**
         * 循环提交10个任务到线程池
         */
        for (int i = 0; i < 10; i++) {
            Runnable worker = new ThreadDemo();

            /**
             * 执行
             */
            executor.execute(worker);
        }

        /**
         * 关闭线程池，释放资源
         */
        executor.shutdown();

    }
}
```

##### CachedThreadPool（缓存线程池） \*推荐

CachedThreadPool是一个可以根据需要动态调整线程池大小的线程池。当提交的任务数大于当前线程数时，会创建新的线程执行任务。当线程空闲一段时间后，会被销毁。适合处理大量短时间的任务，可以根据任务的数量自动调整线程池的大小。

```java
public class ThreadDemo implements Runnable{

    @Override
    public void run() {
        System.out.println("test success");
    }

    public static void main(String[] args) {
        /**
         * 缓存线程池
         */
        ExecutorService executor = Executors.newCachedThreadPool();

        /**
         * 循环提交10个任务到线程池
         */
        for (int i = 0; i < 10; i++) {
            Runnable worker = new ThreadDemo();

            /**
             * 执行
             */
            executor.execute(worker);
        }

        /**
         * 关闭线程池，释放资源
         */
        executor.shutdown();

    }
}
```

#### 2、ScheduledThreadPoolExecutor实现类（定时任务线程池）

ScheduledThreadPoolExecutor是ThreadPoolExecutor的子类，用于创建一个可以执行定时任务的线程池。它可以在固定的延迟时间或固定的时间间隔内执行任务。

```java
public class ThreadDemo implements Runnable{

    @Override
    public void run() {
        System.out.println("test success");
    }

    public static void main(String[] args) {
        /**
         * 3表示核心数
         */
        ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(3);

        /**
         * task 执行的任务
         * 2L 时间
         * TimeUnit.SECONDS 时间单位
         */
        ThreadDemo task = new ThreadDemo();
        executor.schedule(task, 2L, TimeUnit.SECONDS);

        /**
         * task 是要执行的任务，
         * 10 是第一次执行的延迟时间
         * 2 是任务执行的周期
         * TimeUnit.SECONDS 是时间单位
         */
        executor.scheduleAtFixedRate(task, 10, 2, TimeUnit.SECONDS);

        /**
         * 关闭线程池
         */
        executor.shutdown();

    }
}
```

#### 3、Future接口（Callable异步任务返回值的接收接口）

Future接口表示一个异步计算的结果。它提供了方法来检查计算是否完成、等待计算完成并获取结果。可以通过Executor.submit()方法提交一个Callable对象或Runnable对象给线程池执行，并返回一个代表计算结果的Future对象。

+   `boolean cancel(boolean mayInterruptIfRunning)`: 取消任务。如果任务还没有开始执行，或者已经完成，或者由于某种原因无法取消，则返回false；否则尝试取消任务，并返回true。
+   `boolean isCancelled()`: 判断任务是否已被取消。
+   `boolean isDone()`: 判断任务是否已经完成。
+   `V get() throws InterruptedException, ExecutionException`: 获取计算结果。如果任务还没有完成，则阻塞等待直到任务完成，并返回计算结果。如果任务被取消，则抛出CancellationException。如果任务执行过程中抛出了异常，则抛出ExecutionException。
+   `V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException`: 在指定的时间内获取计算结果。如果任务在指定时间内完成，则返回计算结果。如果任务还没有完成，则阻塞等待直到任务完成，并返回计算结果。如果任务被取消，则抛出CancellationException。如果任务执行过程中抛出了异常，则抛出ExecutionException。如果在指定时间内任务仍未完成，则抛出TimeoutException。

```java
public class ThreadDemo{

    public static void main(String[] args) throws ExecutionException, InterruptedException {

        /**
         * 创建单线程池
         */
        ExecutorService executor = Executors.newSingleThreadExecutor();

        /**
         * executor.submit(task) 如果有返回值只能用submit
         * executor.execute(task) 如果没有返回值可以用execute 也可以用  submit
         */
        Future<Integer> future = executor.submit(new Callable<Integer>() {
            public Integer call() throws Exception {
                Thread.sleep(5000);
                return 42;
            }
        });

        /**
         * future.isDone() 判断任务是否已经执行完成
         * future.get() 获取计算结果
         * future.cancel(true) 取消任务
         */
        if (future.isDone()) {
            Integer result = future.get();
            System.out.println("Result: " + result);
        } else {
            future.cancel(true);
        }

        /**
         * 关闭线程池
         */
        executor.shutdown();

    }
}
```

#### 4、Runnable和Callable接口（任务）

不多解释。

#### 5、Executors工厂类（线程池的工厂类）

Executors是一个工厂类，提供了创建各种类型Executor的静态工厂方法。

> 简化写法：Executors.newFixedThreadPool(10)

+   `newFixedThreadPool(int nThreads)`: 创建一个固定大小的线程池，该线程池中的线程数量固定不变。
+   `newCachedThreadPool()`: 创建一个可缓存的线程池，该线程池中的线程数量可以根据需要自动增长或减少。
+   `newSingleThreadExecutor()`: 创建一个单线程的线程池，该线程池中只有一个线程在执行任务。
+   `newScheduledThreadPool(int corePoolSize)`: 创建一个可调度的线程池，该线程池中的线程可以按指定的延迟或周期执行任务。

## 锁

## synchronized关键字

```java
public class ThreadDemo{

    public void main(String[] args){

        /**
         * 创建单线程池
         */
        ExecutorService executor = Executors.newSingleThreadExecutor();

        /**
         * synchronized 关键字
         */
        executor.execute(()->{
            synchronized (this){
                System.out.println("synchronized success");
            }
        });

        /**
         * 关闭线程池
         */
        executor.shutdown();

    }
}
```

synchronized (this) 里边的this才是关键。锁主要分为三种：

+   对象锁（内置锁）

当`synchronized`修饰实例方法或实例代码块时，锁定的是当前实例对象，只有获取到该对象的锁的线程才能执行被锁定的代码块或方法。

+   类锁（静态锁）

当`synchronized`修饰静态方法或静态代码块时，锁定的是当前类的Class对象，只有获取到该Class对象的锁的线程才能执行被锁定的代码块或方法。

+   锁定指定对象

可以使用`synchronized`关键字锁定指定的对象，多个线程在访问同一个对象时，只有一个线程能够获取到该对象的锁，其他线程必须等待锁的释放。

## ReentrantLock

`java.util.concurrent`包中的锁，是Java中提供的一种可重入的独占锁。

```java
import java.util.concurrent.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ThreadDemo implements Runnable{

    private Lock lock = new ReentrantLock();

    /**
     * task
     */
    @Override
    public void run() {
        /**
         * 上锁
         */
        lock.lock();
        try {
            for (int i = 0; i < 10; i++) {
                System.out.print(i + " ");
            }
        } finally {
            /**
             * 释放
             */
            lock.unlock();
        }
    }

    public void main(String[] args){

        /**
         * 创建线程池
         */
        ExecutorService executor = Executors.newFixedThreadPool(10);

        
        ThreadDemo threadDemo = new ThreadDemo();

        for(int i = 0 ; i < 10 ; i++){
            executor.execute(threadDemo);
        }


        /**
         * 关闭线程池
         */
        executor.shutdown();

    }


}
```

使用`ReentrantLock`一般需要手动进行加锁和解锁的操作，可以通过`lock()`方法获取锁，通过`unlock()`方法释放锁。使用`ReentrantLock`时，需要确保在获取锁后一定要释放锁，否则可能会导致死锁问题。

相比于`synchronized`关键字，`ReentrantLock`提供了更多的灵活性和功能，可以在一些复杂的线程同步场景中使用。但是，使用`ReentrantLock`也需要更加小心地处理锁的释放，避免出现死锁等问题。
