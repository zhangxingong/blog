+++
title = "代码框样式 | CSS"
date = "2023-12-01T17:24:34+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++



当定制一个代码框的样式时，你可以使用CSS来实现你的需求。下面是一个简单的例子，展示如何设置一个底色深色、带有圆角边框和代码高亮的代码框样式。

```css
/* 定义代码框样式 */
.code-box {
  background-color: #272822; /* 深色底色 */
  border: 1px solid #373832; /* 边框颜色 */
  border-radius: 8px; /* 圆角边框 */
  padding: 10px; /* 代码框内边距 */
  overflow-x: auto; /* 水平滚动条 */
}

/* 定义代码高亮样式 */
.code-box code {
  color: #F8F8F2; /* 代码文本颜色 */
  font-family: 'Courier New', monospace; /* 设置代码字体 */
}

/* 定义代码行号样式 */
.code-box pre {
  counter-reset: line; /* 重置计数器 */
}

.code-box pre code:before {
  content: counter(line); /* 设置计数器内容 */
  counter-increment: line; /* 计数器递增 */
  display: inline-block;
  width: 2em; /* 代码行号宽度 */
  margin-right: 1em; /* 行号与代码之间的间距 */
  color: #75715E; /* 行号颜色 */
}
```

以上CSS代码定义了一个名为 `.code-box` 的容器，其中包含一个 `code` 元素表示代码文本。这个代码框有深色底色，带有圆角边框，并且包含水平滚动条。同时，代码文本的颜色为亮色，行号颜色为灰色。

你可以将上述CSS代码嵌入到你的HTML文件的 `<style>` 标签中，或者将其保存为独立的CSS文件并在HTML文件中引入。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Code Box</title>
  <style>
    /* 将上述CSS代码放在这里 */
  </style>
</head>
<body>
  <div class="code-box">
    <pre><code>// Your code here</code></pre>
  </div>
</body>
</html>
```

这个例子中，代码框的文本部分用 `<pre><code>...</code></pre>` 包裹，你可以在这里放置你的代码。这只是一个基础的示例，你可以根据需要进行修改和扩展。
