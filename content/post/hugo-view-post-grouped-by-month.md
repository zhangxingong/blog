+++
title = "博客按月归档"
date = 2023-06-26T17:13:00+08:00
tags = ["go", "archives"]
categories = ["建站"]
draft = false
weight = 2001
author = "zhangxingong"
+++

使用Hugo安装的主题默认归档方式是按年分组  
希望改成每月归档一次  
于是在线编辑模板  
找到主题路径 themes/maupassant/layouts/archives/single.html   
一看有点傻眼，完全不懂   
搜索资料后发现是使用的 go html | text templating  
认真学习了下语法后，果然有点明白逻辑了  
看完go基础与hugo template语法后  
问题变得很简单  
只需要改下GroupByDate的格式  
原来的.GroupByDate "2006"改为.GroupByDate "January 2006"  
剩下的问题就是日期格式  
由原来的   
{{ .Date.Format "2006/01/12" }}  
改为  
{{ .Date.Format "06 Jan 02 Mon 15:04:05" }}  

问题完美解决。  

代码如下：  

{{< highlight html >}}
{{ define "content"}}
<div class="post-archive">
  {{ range (where (where .Site.Pages "Type" "in" (slice "post" "posts")) "Kind" "page").GroupByDate "January 2006" }}
  <h2>{{ .Key }}</h2>
  <ul class="listing">
    {{ range .Pages }}
    <li>
      <span class="date">{{ .Date.Format "06 Jan 02 Mon 15:04:05" }}</span>
      <a href="{{ .Permalink }}" title="{{ .Title }}" target="_blank">{{ .Title }}</a>
    </li>
    {{ end }}
  </ul>
  {{ end }}

</div>
{{ end }}
{{< /highlight >}}

参考博客：  
[Hugo - View Posts Grouped By Month](https://digitaldrummerj.me/hugo-view-post-grouped-by-month/)   
[go 模版中的日期格式](https://tricks.one/post/date-format-in-hugo-or-go-templates/)
