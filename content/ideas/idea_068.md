+++
title = "idea_068"
date = "2025-09-26T09:41:36+0800"
draft = false
weight = 2003
author = "zhangxingong"
hiddenFromHomePage = false
+++

# idea如何在激活后永久不过期

相信开发这使用Jetbrain家族下的产品时，经常为找不到linsence或者linsence过期而烦恼。第一网上的linsence大多数会提示unvalid key, 或者无效。或者临时的linsence只能激活二个月，如何解决提供思路
  
第一步： 先用网上的临时激活码激活，或者破解工具+激活码激活
  
第二部： 禁止Jetbrain产品与外网连接，本地防火墙或者本地CDN欺骗。目的是让产品无法发送网络请求，既可以永久使用临时验证码，windows修改hosts domain映射为本机。其他平台应该也有对应的工具，以windows系类为例，以管理员身份编辑文件

```
C:\Windows\System32\drivers\etc\hosts

在末尾空白处，或另起一行写入以下内容：
```

```bash

0.0.0.0 account.jetbrains.com
0.0.0.0 jetbrains.com
0.0.0.0 *.jetbrains.com
0.0.0.0 account.jetbrains.com
0.0.0.0 auth.jetbrains.com
0.0.0.0 license.jetbrains.com
0.0.0.0 licensing.jetbrains.com
0.0.0.0 jb.gg
0.0.0.0 www.jb.gg
```

保存！！！

然后打开CMD刷新DNS：若看到 “**已成功刷新 DNS 解析器缓存**” 的提示，说明操作完成。

```
$ethan> ipconfig /flushdns
```
