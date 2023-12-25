+++
title = "VUE 快速上手与基础指令（内附详细案例）"
date = "2023-12-20T14:12:16+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++

#### 文章目录

+   [前言](#_4)
+   [发现宝藏](#_8)
+   [一、vue快速上手](#vue_12)
+   +   [1\. vue是什么](#1_vue_18)
    +   [2\. 创建一个vue实例](#2_vue_35)
    +   [3\. 插值表达式](#3__105)
    +   [4\. vue的响应式特性](#4_vue_172)
    +   [5\. 开发者工具安装](#5__218)
+   [二、vue指令](#vue_222)
+   +   [1\. v-html](#1_vhtml_224)
    +   [2\. v-if 和 v-show](#2_vif__vshow_262)
    +   [3\. v-else 和 v-else-if](#3_velse__velseif_316)
    +   [4\. v-on](#4_von_357)
    +   [5\. v-bind](#5_vbind_491)
    +   [6\. 案例-波仔的学习之旅](#6__524)
    +   [7\. v-for](#7_vfor_565)
    +   [8\. 案例-小黑的书架](#8__610)
    +   [9\. v-for 中的key](#9_vfor_key_663)
    +   [10\. v-model](#10_vmodel_667)
    +   [11\. 综合案例 - 小黑记事本](#11____717)
+   [三、 好书推荐](#__966)
+   [总结](#_974)

* * *

## 前言

为了巩固所学的知识，作者尝试着开始发布一些学习笔记类的博客，方便日后回顾。当然，如果能帮到一些萌新进行新技术的学习那也是极好的。作者菜菜一枚，文章中如果有记录错误，欢迎读者朋友们批评指正。

## 发现宝藏

前些天发现了一个巨牛的人工智能学习网站，通俗易懂，风趣幽默，忍不住分享一下给大家。【[宝藏入口](https://www.captainbed.cn/dl)】。

## 一、vue快速上手

### 1\. vue是什么

Vue是一种流行的前端开发框架。它是一个用于构建用户界面的渐进式JavaScript框架。Vue提供了一组用于构建交互式Web界面的工具和库，使开发者能够更轻松地创建可复用的组件、处理数据和状态、以及实现页面动态性。下面是一些关于Vue的核心概念和特点：

+   渐进式：Vue被设计为渐进式框架，可以逐步地应用到现有的项目中。它可以仅用于处理特定部分的功能，也可以作为完整的单页面应用（SPA）开发。

![在这里插入图片描述](/img/51a7c0c06b0b44248340e076a264c7d6.png)

+   响应式更新：Vue使用了一种称为"响应式"的机制，当数据发生变化时，界面会自动更新以反映这些变化。这样的机制使得开发者不需要手动操作DOM来更新界面，而是通过操作数据来实现界面的动态变化。
    
+   组件化开发：Vue鼓励开发者以组件的方式构建应用。一个组件是一个可重用且自包含的代码块，包括模版（HTML）、样式（CSS）和逻辑（JavaScript）。组件可以嵌套、组合和重复使用，使得代码更易维护和复用。
    
+   单向数据流：在Vue中，通过将数据从父组件传递给子组件，实现了一种单向数据流的数据管理方式。父组件可以通过props将数据传递给子组件，子组件则通过事件向父组件发送数据更新请求。
    
+   生态系统：Vue拥有丰富的生态系统，包括官方提供的核心库以及许多由社区贡献的插件和工具。这些插件和工具可以帮助开发者更高效地开发、测试和部署Vue应用。
    

### 2\. 创建一个vue实例

> vue 2 官方文档：https://v2.cn.vuejs.org/v2/guide/

核心步骤4步:

> 1\. 准备容器  
> 2\. 引包(官网)- 开发版本 /生产版本  
> 3\. 创建Vue 实例 new Vue()  
> 4\. 指定配置项>渲染数据
> 
> +   Del指定挂载点
> +   data 提供数据

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

<!-- 
  创建Vue实例，初始化渲染
  1. 准备容器 (Vue所管理的范围)
  2. 引包 (开发版本包 / 生产版本包) 官网
  3. 创建实例
  4. 添加配置项 => 完成渲染
-->

<!-- 不是Vue管理的范围 -->
<div class="box2">
  box2 -- {{ count }}
</div>
<div class="box">
  box -- {{ msg }}
</div>
-----------------------------------------------------
<!-- Vue所管理的范围 -->
<div id="app">
  <!-- 这里将来会编写一些用于渲染的代码逻辑 -->
  <h1>{{ msg }}</h1>
  <a href="#">{{ count }}</a>
</div>

<!-- 引入的是开发版本包 - 包含完整的注释和警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>

<script>
  // 一旦引入 VueJS核心包，在全局环境，就有了 Vue 构造函数
  const app = new Vue({
    // 通过 el 配置选择器，指定 Vue 管理的是哪个盒子
    el: '#app',
    // 通过 data 提供数据
    data: {
      msg: 'Hello 传智播客',
      count: 666
    }
  })

</script>

  
</body>
</html>
```

![在这里插入图片描述](/img/2e03ebc37c124915b6f143b34ffb639c.png)

### 3\. 插值表达式

![在这里插入图片描述](/img/72ff9b3ef33546a19e308c7630559cef.png)  
![在这里插入图片描述](/img/b4e820365f57441bad6cd38ddbc6faaf.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  
<!-- 
  插值表达式：Vue的一种模板语法
  作用：利用 表达式 进行插值渲染
  语法：{{ 表达式 }}

  注意点：
    1. 使用的数据要存在
    2. 支持的是表达式，不是语句  if  for
    3. 不能在标签属性中使用 {{ }}
 -->
<div id="app">
  <p>{{ nickname }}</p>
  <p>{{ nickname.toUpperCase() }}</p>
  <p>{{ nickname + '你好' }}</p>
  <p>{{ age >= 18 ? '成年' : '未成年' }}</p>
  <p>{{ friend.name }}</p>
  <p>{{ friend.desc }}</p>

  <!-- ----------------------- -->
  <!-- <p>{{ hobby }}</p> -->
  <!-- <p>{{ if }}</p> -->
  <!-- <p title="{{ nickname }}">我是p标签</p> -->
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>

  const app = new Vue({
    el: '#app',
    data: {
      nickname: 'tony',
      age: 18,
      friend: {
        name: 'jepson',
        desc: '热爱学习 Vue'
      }
    }
  })


</script>

</body>
</html>
```

![在这里插入图片描述](/img/b94739b5cb89486db95737b1511da1ba.png)

### 4\. vue的响应式特性

![在这里插入图片描述](/img/abb0bc3c9dc149e498a4d0f2d26d7109.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

<div id="app">
  {{ msg }}
  {{ count }}
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

<script>

  const app = new Vue({
    el: '#app',
    data: {
      // 响应式数据 → 数据变化了，视图自动更新
      msg: '你好，黑马',
      count: 100
    }
  })

  // data中的数据，是会被添加到实例上
  // 1. 访问数据  实例.属性名
  // 2. 修改数据  实例.属性名 = 新值

</script>

</body>
</html>
      
```

![在这里插入图片描述](/img/b9cf5744a81a406887ae4244e3baeb02.png)  
![在这里插入图片描述](/img/e3e65ffcc3d9470b907a704e16ccc8f5.png)

### 5\. 开发者工具安装

![在这里插入图片描述](/img/1ee73747810b40819bf47934fa17fced.png)  
![在这里插入图片描述](/img/7e88324bef0c4db197e7976f06e9bd5b.png)

## 二、vue指令

### 1\. v-html

`插值表达式并不具备解析标签的能力`  
![在这里插入图片描述](/img/5381b3a85d0f476cbed7a9b2f6026d11.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app">
    <div v-html="msg"></div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>

    const app = new Vue({
      el: '#app',
      data: {
        msg: `
          <h3>学前端~来黑马！</h3>
        `
      }
    })

  </script>

</body>
</html>
```

### 2\. v-if 和 v-show

![在这里插入图片描述](/img/261c87d9a97245dabe4a4c88f2d6cb7a.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      width: 200px;
      height: 100px;
      line-height: 100px;
      margin: 10px;
      border: 3px solid #000;
      text-align: center;
      border-radius: 5px;
      box-shadow: 2px 2px 2px #ccc;
    }
  </style>
</head>
<body>

  <!-- 
    v-show底层原理：切换 css 的 display: none 来控制显示隐藏
    v-if  底层原理：根据 判断条件 控制元素的 创建 和 移除（条件渲染）
  -->

  <div id="app">
    <div v-show="flag" class="box">我是v-show控制的盒子</div>
    <div v-if="flag" class="box">我是v-if控制的盒子</div>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        flag: false
      }
    })
  </script>

</body>
</html>
```

![在这里插入图片描述](/img/265b8673a133472488493f8b9874b981.png)

### 3\. v-else 和 v-else-if

![在这里插入图片描述](/img/bcb7f4c3b99d47d0bb3ba11ca090ea4d.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
  <div id="app">
    <p v-if="gender === 1">性别：♂ 男</p>
    <p v-else>性别：♀ 女</p>
    <hr>
    <p v-if="score >= 90">成绩评定A：奖励电脑一台</p>
    <p v-else-if="score >= 70">成绩评定B：奖励周末郊游</p>
    <p v-else-if="score >= 60">成绩评定C：奖励零食礼包</p>
    <p v-else>成绩评定D：惩罚一周不能玩手机</p>
  </div>
  
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>

    const app = new Vue({
      el: '#app',
      data: {
        gender: 2,
        score: 95
      }
    })
  </script>

</body>
</html>
```

![在这里插入图片描述](/img/830d7e3f8b73471bad00319a7d7df503.png)

### 4\. v-on

**1\. v-on 内联语句**  
![在这里插入图片描述](/img/bea642b6099a4debb2f47348dd102de6.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <button @click="count--">-</button>
    <span>{{ count }}</span>
    <button v-on:click="count++">+</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        count: 100
      }
    })
  </script>
</body>
</html>
```

![在这里插入图片描述](/img/e47e489160a6485892fe18c252271959.png)

**2\. v-on 配置mehtods函数**  
![在这里插入图片描述](/img/095b822b78d44a29a71de8445b26c7d6.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <button @click="fn">切换显示隐藏</button>
    <h1 v-show="isShow">黑马程序员</h1>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app4 = new Vue({
      el: '#app',
      data: {
        isShow: true
      },
      methods: {
        fn () {
          // 让提供的所有methods中的函数，this都指向当前实例
          // console.log('执行了fn', app.isShow)
          // console.log(app3 === this)
          this.isShow = !this.isShow
        }
      }
    })
  </script>
</body>
</html>
```

![在这里插入图片描述](/img/b8616a35136146769fc6721be6a73423.png)

**3\. v-on 调用传参**  
![在这里插入图片描述](/img/053d8c98cd8541099e35fac5dc0208bb.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
      border: 3px solid #000000;
      border-radius: 10px;
      padding: 20px;
      margin: 20px;
      width: 200px;
    }
    h3 {
      margin: 10px 0 20px 0;
    }
    p {
      margin: 20px;
    }
  </style>
</head>
<body>

  <div id="app">
    <div class="box">
      <h3>小黑自动售货机</h3>
      <button @click="buy(5)">可乐5元</button>
      <button @click="buy(10)">咖啡10元</button>
      <button @click="buy(8)">牛奶8元</button>
    </div>
    <p>银行卡余额：{{ money }}元</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        money: 100
      },
      methods: ## 标题{
        buy (price) {
          this.money -= price
        }
      }
    })
  </script>
</body>
</html>
```

![在这里插入图片描述](/img/33feaf09bb2d4150bb7fb3a470b56520.png)

### 5\. v-bind

![在这里插入图片描述](/img/214e0f97fa1d4d088cdbcba3181dd9c9.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <!-- v-bind:src   =>   :src -->
    <img v-bind:src="imgUrl" v-bind:title="msg" alt="">
    <img :src="imgUrl" :title="msg" alt="">
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        imgUrl: './imgs/10-02.png',
        msg: 'hello 波仔'
      }
    })

  </script>
</body>
</html>
```

### 6\. 案例-波仔的学习之旅

![在这里插入图片描述](/img/a1eeef3fb41240c5ad8d501253ad425d.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <button v-show="index > 0" @click="index--">上一页</button>
    <div>
      <img :src="list[index]" alt="">
    </div>
    <button v-show="index < list.length - 1" @click="index++">下一页</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        index: 0,
        list: [
          './imgs/11-00.gif',
          './imgs/11-01.gif',
          './imgs/11-02.gif',
          './imgs/11-03.gif',
          './imgs/11-04.png',
          './imgs/11-05.png',
        ]
      }
    })
  </script>
</body>
</html>
```

### 7\. v-for

![在这里插入图片描述](/img/03ca2be4fdb044d58514da1cdb45f58f.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app">
    <h3>小黑水果店</h3>
    <ul>
      <li v-for="(item, index) in list">
        {{ item }} - {{ index }}
      </li>
    </ul>

    <ul>
      <li v-for="item in list">
        {{ item }}
      </li>
    </ul>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        list: ['西瓜', '苹果', '鸭梨', '榴莲']
      }
    })
  </script>
</body>
</html>
```

![在这里插入图片描述](/img/19d9f07f6a284f9d86d23380dd1ca105.png)

### 8\. 案例-小黑的书架

![在这里插入图片描述](/img/bc374144dfb44fc1ad390ff84ed53f46.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app">
    <h3>小黑的书架</h3>
    <ul>
      <li v-for="(item, index) in booksList" :key="item.id">
        <span>{{ item.name }}</span>
        <span>{{ item.author }}</span>
        <!-- 注册点击事件 →  通过 id 进行删除数组中的 对应项 -->
        <button @click="del(item.id)">删除</button>
      </li>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        booksList: [
          { id: 1, name: '《红楼梦》', author: '曹雪芹' },
          { id: 2, name: '《西游记》', author: '吴承恩' },
          { id: 3, name: '《水浒传》', author: '施耐庵' },
          { id: 4, name: '《三国演义》', author: '罗贯中' }
        ]
      },
      methods: {
        del (id) {
          // console.log('删除', id)
          // 通过 id 进行删除数组中的 对应项 → filter(不会改变原数组)
          // filter: 根据条件，保留满足条件的对应项，得到一个新数组。
          // console.log(this.booksList.filter(item => item.id !== id))
          this.booksList = this.booksList.filter(item => item.id !== id)
        }
      }
    })
  </script>
</body>
</html>
```

![在这里插入图片描述](/img/dbaba49c54fe41d18dfc0512cbc6a4df.png)

### 9\. v-for 中的key

![在这里插入图片描述](/img/1adcad75bf4c46c2b5a359ff2b0daaf6.png)

### 10\. v-model

![在这里插入图片描述](/img/1c1684a2895743f4964f8dce56db6e66.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app">
    <!-- 
      v-model 可以让数据和视图，形成双向数据绑定
      (1) 数据变化，视图自动更新
      (2) 视图变化，数据自动更新
      可以快速[获取]或[设置]表单元素的内容
     -->
    账户：<input type="text" v-model="username"> <br><br>
    密码：<input type="password" v-model="password"> <br><br>
    <button @click="login">登录</button>
    <button @click="reset">重置</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        username: '',
        password: ''
      },
      methods: {
        login () {
          console.log(this.username, this.password)
        },
        reset () {
          this.username = ''
          this.password = ''
        }
      }
    })
  </script>
</body>
</html>
```

![在这里插入图片描述](/img/895f498a77ef44fe8d8fb1c4cde3e048.png)

### 11\. 综合案例 - 小黑记事本

![在这里插入图片描述](/img/20734091d18f47019025e627484acdbf.png)

1.  列表渲染和删除

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="./css/index.css" />
<title>记事本</title>
</head>
<body>

<!-- 主体区域 -->
<section id="app">
  <!-- 输入框 -->
  <header class="header">
    <h1>小黑记事本</h1>
    <input  placeholder="请输入任务" class="new-todo" />
    <button class="add">添加任务</button>
  </header>
  <!-- 列表区域 -->
  <section class="main">
    <ul class="todo-list">
      <li class="todo" v-for="(item, index) in list" :key="item.id">
        <div class="view">
          <span class="index">{{ index + 1 }}.</span> <label>{{ item.name }}</label>
          <button @click="del(item.id)" class="destroy"></button>
        </div>
      </li>
    </ul>
  </section>
  <!-- 统计和清空 -->
  <footer class="footer">
    <!-- 统计 -->
    <span class="todo-count">合 计:<strong> 2 </strong></span>
    <!-- 清空 -->
    <button class="clear-completed">
      清空任务
    </button>
  </footer>
</section>

<!-- 底部 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      list: [
        { id: 1, name: '跑步一公里' },
        { id: 3, name: '游泳100米' },
      ]
    },
    methods: {
      del (id) {
        // console.log(id) => filter 保留所有不等于该 id 的项
        this.list = this.list.filter(item => item.id !== id)
      }
    }
  })

</script>
</body>
</html>

```

![在这里插入图片描述](/img/137522c6a5ac46b4bb376a8b9d0b5522.png)  
2\. 添加

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="./css/index.css" />
<title>记事本</title>
</head>
<body>

<!-- 主体区域 -->
<section id="app">
  <!-- 输入框 -->
  <header class="header">
    <h1>小黑记事本</h1>
    <input v-model="todoName"  placeholder="请输入任务" class="new-todo" />
    <button @click="add" class="add">添加任务</button>
  </header>
  <!-- 列表区域 -->
  <section class="main">
    <ul class="todo-list">
      <li class="todo" v-for="(item, index) in list" :key="item.id">
        <div class="view">
          <span class="index">{{ index + 1 }}.</span> <label>{{ item.name }}</label>
          <button @click="del(item.id)" class="destroy"></button>
        </div>
      </li>
    </ul>
  </section>
  <!-- 统计和清空 -->
  <footer class="footer">
    <!-- 统计 -->
    <span class="todo-count">合 计:<strong> 2 </strong></span>
    <!-- 清空 -->
    <button class="clear-completed">
      清空任务
    </button>
  </footer>
</section>

<!-- 底部 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  // 添加功能
  // 1. 通过 v-model 绑定 输入框 → 实时获取表单元素的内容
  // 2. 点击按钮，进行新增，往数组最前面加 unshift
  const app = new Vue({
    el: '#app',
    data: {
      todoName: '',
      list: [
        { id: 1, name: '跑步一公里' },
        { id: 3, name: '游泳100米' },
      ]
    },
    methods: {
      del (id) {
        // console.log(id) => filter 保留所有不等于该 id 的项
        this.list = this.list.filter(item => item.id !== id)
      },
      add () {
        if (this.todoName.trim() === '') {
          alert('请输入任务名称')
          return
        }
        this.list.unshift({
          id: +new Date(),
          name: this.todoName
        })
        this.todoName = ''
      }
    }
  })

</script>
</body>
</html>

```

![在这里插入图片描述](/img/c272461f3c4d49ff99b10ed75dddd9da.png)

3.  底部统计和清空

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="./css/index.css" />
<title>记事本</title>
</head>
<body>

<!-- 主体区域 -->
<section id="app">
  <!-- 输入框 -->
  <header class="header">
    <h1>小黑记事本</h1>
    <input v-model="todoName"  placeholder="请输入任务" class="new-todo" />
    <button @click="add" class="add">添加任务</button>
  </header>
  <!-- 列表区域 -->
  <section class="main">
    <ul class="todo-list">
      <li class="todo" v-for="(item, index) in list" :key="item.id">
        <div class="view">
          <span class="index">{{ index + 1 }}.</span> <label>{{ item.name }}</label>
          <button @click="del(item.id)" class="destroy"></button>
        </div>
      </li>
    </ul>
  </section>
  <!-- 统计和清空 → 如果没有任务了，底部隐藏掉 → v-show -->
  <footer class="footer" v-show="list.length > 0">
    <!-- 统计 -->
    <span class="todo-count">合 计:<strong> {{ list.length }} </strong></span>
    <!-- 清空 -->
    <button @click="clear" class="clear-completed">
      清空任务
    </button>
  </footer>
</section>

<!-- 底部 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  // 添加功能
  // 1. 通过 v-model 绑定 输入框 → 实时获取表单元素的内容
  // 2. 点击按钮，进行新增，往数组最前面加 unshift
  const app = new Vue({
    el: '#app',
    data: {
      todoName: '',
      list: [
        { id: 1, name: '跑步一公里' },
        { id: 2, name: '跳绳200个' },
        { id: 3, name: '游泳100米' },
      ]
    },
    methods: {
      del (id) {
        // console.log(id) => filter 保留所有不等于该 id 的项
        this.list = this.list.filter(item => item.id !== id)
      },
      add () {
        if (this.todoName.trim() === '') {
          alert('请输入任务名称')
          return
        }
        this.list.unshift({
          id: +new Date(),
          name: this.todoName
        })
        this.todoName = ''
      },
      clear () {
        this.list = []
      }
    }
  })

</script>
</body>
</html>

```

![在这里插入图片描述](/img/87b87a16a1f046a7a4681cc9bb8ad268.png)  
![在这里插入图片描述](/img/fca88a573a30492cb54f762fad116832.png)

## 三、 好书推荐

![在这里插入图片描述](/img/9e42bde172304ef18ff47c1b1e0c9962.png#pic_center)  
![在这里插入图片描述](/img/22117ff9fced43cab6c4bf984f1f13c4.png)

> 京东购买链接：https://item.jd.com/14140678.html

## 总结

欢迎各位留言交流以及批评指正，如果文章对您有帮助或者觉得作者写的还不错可以点一下关注,点赞，收藏支持一下。  


