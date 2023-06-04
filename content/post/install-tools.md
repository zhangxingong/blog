+++
title = "使用巧克力包管理安装其他工具"
date = 2023-06-04T17:58:00+08:00
draft = false
author = "zhangxingong"
+++

## 确保上篇文章已经正确安装 {#确保上篇文章已经正确安装}

就可以开始使用包管理器进行搜索，安装，更新操作


### 巧克力查看命令帮助 {#巧克力查看命令帮助}

{{< figure src="https://img.vinua.cn/images/Ot65J.png" >}}


### 常用命令 {#常用命令}

1.  chocolatey -version 显示版本
2.  chocolatey help 帮助
3.  chocolatey search 、find 查找包
4.  chocolatey install 安装包
5.  chocolatey uninstall 卸载包
6.  chocolatey upgrade 更新包


### 安装博客必要包 {#安装博客必要包}

{{< highlight nil >}}
chocolatey install hugo emacs git
{{< /highlight >}}

或手工安装Git Bash 官网地址
[Git For Window](https://gitforwindows.org/)

安装成功后使用一下命令检测
git --version
hugo help
where emacs
如果无错误信息说明安装成功
![](https://img.vinua.cn/images/OtSUK.png)
