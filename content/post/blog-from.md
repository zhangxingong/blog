+++
title = "搭建博客参考资料"
tags = ["hugo","emacs","github","友情","共享","进步"]
categories = ["建站"]
toc = true
hiddenFromHomePage = false
date = 2023-06-04T20:07:00+08:00
draft = false
author = "zhangxingong"
+++

## 起因是学习子龙山人20天学习emacs视频，bilbil地址 {#起因是学习子龙山人20天学习emacs视频-bilbil地址}

[21天学会emacs](https://www.bilibili.com/video/BV12P4y1j7EL/)
发现可以使用org Mode + hugo (org-mode Emacs强大的文字工具)来写博客
所以萌生想法把博客托管到github里，省去了一台云主机，然后使用CName映射自己购买的域名


## 遇到的问题 {#遇到的问题}

1.  申请域名选择问题 选择困难，起名字最耗时间
2.  域名提供商 选择了腾讯云 。原因可以使用微信自带的信息认真，省去了信息采集流程
3.  域名认真耗时间 上传证件，企业比个人申请方便 写的要三个小时 比之前要快
4.  域名与github Page关联 费时间 第一次干这个事。脑残填写了github.com 应该是 库名字.github.com
5.  域名解析 云特有的概念很多，需要摸索 有快速输入方式
6.  关联成功后，样式，脚本无法加载 参 【考光就一个字】
7.  映射不成功两边查找原因
8.  申请成功后先机智的用停靠页面测试CDN
9.  总结：擅长代码工作，文档、配置工作很耗时
10. 参考博客如下表格

| 描述                                                                              | 参考博客                                                                                                  | 博主名称 | 博主头像                                                                                 |
|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|------|--------------------------------------------------------------------------------------|
| [访问github无css样式的解决方案](https://blog.csdn.net/qq_31393401/article/details/80729765) | [访问github无css样式的解决方案](https://blog.csdn.net/qq_31393401/article/details/80729765)               | `光就一个字` | [光就一个字](https://blog.csdn.net/qq_31393401)                                          |
| [Github绑定腾讯云申请的域名](https://blog.csdn.net/geidongdong/article/details/122786896) |                                                                                                           | `梁栋沉` | [栋沉](https://profile-avatar.csdnimg.cn/36b0da7c8018464ea7e81329eefefec5_geidongdong.jpg) |
| even主题无法使用                                                                  | [飞雪无情的博客](https://www.flysnow.org/2018/07/29/from-hexo-to-hugo#hugo%E7%9A%84maupassant%E4%B8%BB%E9%A2%98) | `飞雪无情` |                                                                                          |
| 廖雪峰git课程                                                                     | [廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)                                      | `廖雪峰` |                                                                                          |
| 本地图片生产链接                                                                  | [微梦图床](https://img.vinua.cn/)                                                                         | `佚名`  |                                                                                          |
|github pages 无法加载css的问题|[点我链接](https://blog.csdn.net/qq_38048756/article/details/120151920)|`馋学习的身子`||
|标签页没有icon|[Bright's Blog](https://ibrights.github.io/post/blog20210527/)|`Bright Cha`n|无|
|标签页没有icon|[生成icon工具](https://realfavicongenerator.net/)|`Bright Chan`|无|
|github默认分支修改|[默认分支从master改为main](https://www.git-tower.com/learn/git/faq/git-rename-master-to-main)|`tower`|无|
|httpDelete没有entityBody|[restAPI delete没有body问题](https://daweini.wordpress.com/2013/12/20/apache-httpclient-send-entity-body-in-a-http-delete-request/)|`DNI DEVELOPING NOTES`|无|
|命令行 java -jar 执行jar包|[执行jar包](https://blog.csdn.net/dreamstar613/article/details/107065826)|`dream_heheda`|无|
|Emacs之elisp调用shell命令|[Emacs调用命令的三种方式](https://blog.csdn.net/u010164190/article/details/130481350)|`Android系统攻城狮`|无|
|emacs特殊列表|[elisp条件三种写法](https://www.gnu.org/software/emacs/manual/html_node/elisp/Conditionals.html)|||
|python pip包管理工具|[pip教程](https://www.runoob.com/w3cnote/python-pip-install-usage.html)|`bunoob`||
|pyton2.7教程|[python管方入门文档](https://docs.python.org/2.7/tutorial/)|||
|pyGithub|[pyGitApi](https://pygithub.readthedocs.io/en/latest/examples/Repository.html#update-a-file-in-the-repository)|||
|emacs用户输入|[user input](http://xahlee.info/emacs/emacs/elisp_idioms_prompting_input.html)|xha||
|构建静态网站 python|[pelican](https://github.com/getpelican/pelican)|||
|hugoTemplate|[Introduction to Hugo Templating](https://gohugo.io/templates/introduction/)|||
|基于Hugo在Github上搭建个人博客|[build blog by hugo](https://juejin.cn/post/6844904070658916359)|||
|Hugo org Mode |[peter](https://lucidmanager.org/productivity/create-websites-with-org-mode-and-hugo/) |||


## Hugo 主题汇总

|主题名称 |主题地址| 来源|
|:---------|:-----------------------------|:------------|
|**maupassant**      |[点我查看](https://github.com/flysnow-org/maupassant-hugo/)|github|
|Fuji      |[点我查看](https://github.com/dsrkafuu/hugo-theme-fuji/)|github|
