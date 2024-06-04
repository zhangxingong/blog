+++
title = "解决unable to find valid certification path to requested target"
date = "2024-01-12T14:45:47+0800"
draft = false
weight = 2003
hiddenFromHomePage = true
+++

## 原因

当Java客户端请求实现https协议的服务时，出现异常：’unable to find valid certification path to requested target’，这是因为自签名证书不被Java信任导致SSL握手失败，需要把自签名服务端证书导入到Java 证书信任库keystore中。

2. 接口反回Received fatal alert: protocol_version，TLS版本的问题，您这边设置的什么版本？

## 解决方法

将服务端证书添加到Java证书信任库中

```js
keytool -import -alias casserver -keystore $JAVA_HOME/lib/security/cacerts -file server.crt -storepass changeit -noprompt
```

+   alias，证书别名，可以任意，不重复。
+   file，需要导入服务端证书
+   keystore，Java 证书库地址，不同系统和JDK环境可能不同，默认是 `$JAVA_HOME/jre/lib/security/cacerts`
+   storepass，Java 证书库密码，默认密码为 `changeit`

2. fix

需要做两步
1. 设置系统变量 System.setProperty("https.protocols", "TLSv1.1,TLSv1.2"); 不要用默认的TLSv1
2. 导入 Digicert的根证书，到Java证书信任库，因为这个证书在才1.7.0_101版本才加到信任库里面。
具体看 https://juejin.cn/post/7182875477223145529
证书文件 https://cacerts.digicert.com/DigiCertGlobalCAG2.crt ，或者用chrome浏览器从 https://root.cn 导出可以

如果更换ssl证书，你们还要继续手动导入，所以还是建议你们更新到较新版本。现在java7最新的是 JDK 7u351

![](/img/企业微信截图_1709625773929.png)
![](/img/12097a66-55cf-4385-a4aa-286ffdbcc821.png)

## 链接

[jdk7默认版本好像用的是TLSv1 ，能不能设置下环境变量](https://stackoverflow.com/questions/54827624/java-setproperty-https-protocols-tlsv1-2-for-one-rest-call)

[https.protocols在Java中的使用](https://emacsist.github.io/2017/03/02/https.protocols%E5%9C%A8java%E4%B8%AD%E7%9A%84%E4%BD%BF%E7%94%A8/)
