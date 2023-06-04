+++
title = "chocolatey安装教程"
tags = ["chocolatey"]
categories = ["建站"]
toc = true
hiddenFromHomePage = false
draft = false
author = "zhangxingong"
+++

## chocolatey安装教程 <span class="tag"><span class="package">package</span><span class="manage">manage</span></span> {#chocolatey安装教程}

1.  在window系统安装chocolatey包管理器
    使用 powershell 来安装（如果你的系统没有 powershell, 需要首先安装 powershell).
    使用管理员权限打开 powershell
    {{< highlight nil >}}
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    {{< /highlight >}}
    安装完后，在 powershell 中输入 choco, 你会得到如下截图则说明安装成功：
    ![](https://book.emacs-china.org/img/2022-10-16_20-36-02_screenshot.jpg)
