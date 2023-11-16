+++
title = "idea_044"
date = "2023-11-16T17:18:01+0800"
draft = false
weight = 2003
author = "zhangxingong"
hiddenFromHomePage = false
+++

最近几天成功实现了从手机上传图片,商品信息到博客网站。大概是有了这个想法，然后就去全网找方案，还好找到一个木木木的相册实现。就测试了下效果，先实现了读取博客网站的图片，再进一步寻找从手机同步数据的方案。然后就看到这一篇[memos当相册工具](https://immmmm.com/hugo-shortcodes-recently-by-memos/)。遇到了几个问题，如下

1. memo是一个需要部署的产品，需要找代理网站。[memos纯公益代部署服务](https://www.imcharon.com/1467/)
2. 需要集成到hugo短码，参考以上memos当相册工具
3. 改进相册短码，提取相册标题。 [memos相册短码](https://github.com/zhangxingong/blog/blob/main/themes/maupassant/layouts/shortcodes/album.html)
