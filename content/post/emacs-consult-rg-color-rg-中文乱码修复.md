+++
title = "Emacs consult-rg 执行后 color-rg 中文乱码问题排查与修复"
date = "2026-07-10T11:45:22+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
hiddenFromHomePage = true
+++



# Emacs consult-rg 执行后 color-rg 中文乱码问题排查与修复

## 问题描述

- 单独使用 `consult-rg` 中文正常
- 单独使用 `color-rg` 中文正常
- 使用 `consult-rg` 之后，`color-rg` 中文显示乱码
- 已排除 PowerShell 编码问题

## 原始排查过程

### 1. 定位 encoding 相关配置

文件 `lisp/init-basic.el`:

```elisp
(setq locale-coding-system 'utf-8
      default-process-coding-system '(utf-8 . utf-8))

(dolist (item '(("[rR][gG]" . (utf-8 . gbk-dos))
                ("[aA][gG]" . (utf-8 . gbk-dos))
                ("[cC][mM][dD][pP][rR][oO][xX][yY]" . (utf-8 . gbk-dos))))
  (add-to-list 'process-coding-system-alist item))

(set-charset-priority 'unicode)
(set-language-environment 'chinese-gbk)
(prefer-coding-system 'utf-8-auto)
```

文件 `lisp/init-completion.el` line 123，在 `use-package consult :config` 块内：

```elisp
(add-to-list 'process-coding-system-alist '("es" gbk . gbk))
```

文件 `config.el` line 225，同样存在：

```elisp
(add-to-list 'process-coding-system-alist '("es" gbk . gbk))
```

### 2. 发现关键问题

`process-coding-system-alist` 中的 `("es" gbk . gbk)` 正则表达式 `"es"` 过于宽泛，它会匹配任何包含 "es" 子串的程序名。

该系统的 `shell-file-name` = `C:\Program Files\Git\bin\bash.exe`，路径中的 "Fil**es**" 包含 "es"，因此被该正则匹配。

而 `compilation-start`（color-rg 使用的进程启动方式）通过 `start-file-process-shell-command` 创建进程，最终使用的程序名是 `shell-file-name`（bash.exe 的完整路径）。Emacs 用 `process-coding-system-alist` 匹配程序名来决定编解码方式。

### 3. 为什么 "使用 consult-rg 之后" 才出现？

`init-completion.el` line 123 的 `add-to-list` 在 `use-package consult :config` 块内，被 Emacs 展开为 `(eval-after-load 'consult ...)`，即延迟执行。

- **consult-rg 运行前**：consult 包未加载，`("es" gbk . gbk)` 未添加到 `process-coding-system-alist`。bash.exe 路径不匹配任何条目，回退到 `default-process-coding-system` = `(utf-8 . utf-8)`。color-rg 正常。
- **consult-rg 运行后**：consult 包被加载，`:config` 块执行，`("es" gbk . gbk)` 被添加到 `process-coding-system-alist` 头部。bash.exe 路径匹配 "es" → 解码使用 GBK。rg 输出 UTF-8 被按 GBK 解码 → 乱码。

完整链路：

```
1. Emacs 启动 → consult 未加载 → "es" 条目不在 process-coding-system-alist 中
2. 运行 color-rg → compilation-start 使用 bash.exe → 无 alist 匹配
   → 回退 default-process-coding-system = utf-8 → 正确输出
3. 运行 consult-ripgrep → consult 加载 → :config 执行
   → (add-to-list 'process-coding-system-alist '("es" gbk . gbk)) 执行
4. 再次运行 color-rg → compilation-start 使用 bash.exe
   → "es" 正则匹配 "Files" 中的 "es" → coding = (gbk . gbk)
   → rg 的 UTF-8 输出按 GBK 解码 → 乱码
```

## 修复代码（原始，未整理）

### 修复1：init-completion.el line 123

将宽泛的正则 `"es"` 锚定为精确匹配程序名 `es` 或 `es.exe`：

```elisp
;; 修复前
(add-to-list 'process-coding-system-alist '("es" gbk . gbk))

;; 修复后
(add-to-list 'process-coding-system-alist '("\\`es\\(?:\\.exe\\)?\\'" gbk . gbk))
```

### 修复2：config.el line 225

同样修改：

```elisp
;; 修复前
(add-to-list 'process-coding-system-alist '("es" gbk . gbk))

;; 修复后
(add-to-list 'process-coding-system-alist '("\\`es\\(?:\\.exe\\)?\\'" gbk . gbk))
```

## projectile-grep 乱码问题（后续追加）

### 问题

`my/projectile-grep`（init-completion.el line 90）搜索中文同样乱码。

### 排查

命令：

```
cd d:/xgzhang/projects/svn/Elafs/branches/asp/ && LANG=en_US.UTF-8 egrep -rinHI --exclude-dir=.idea --exclude-dir=.svn --color=always "领导" *
```

报错：

```
'LANG'      ڲ    ⲿ   Ҳ   ǿ    еĳ   
         ļ   
```

这个乱码本身就是 GBK 的 cmd.exe 错误信息（"'LANG' 不是内部或外部命令..."）被按 UTF-8 解码的结果。

### 原因分析

1. Windows Emacs 上 `shell-file-name` 默认为 `cmdproxy.exe`（即 cmd.exe），不是 bash.exe
2. `LANG=en_US.UTF-8` 前缀语法在 cmd.exe 中无效（cmd.exe 不支持 POSIX 环境变量语法）
3. `egrep`（来自 Git Bash/MSYS2）是 POSIX 程序，其输出编码由 MSYS2 locale 决定，不像 ripgrep 有自己的 `--encoding` 参数
4. 在中文 Windows 上，MSYS2 egrep 默认输出 GBK
5. `process-coding-system-alist` 中 `[cC][mM][dD][pP][rR][oO][xX][yY]` → `(utf-8 . gbk-dos)` 意味着 cmdproxy 的输出按 UTF-8 解码
6. 原始命令中的 `chcp 65001` 只影响 Windows 控制台 API，对使用 POSIX I/O 的 MSYS2 程序无效
7. 结果：egrep 输出 GBK 字节 → Emacs 按 UTF-8 解码 → 乱码

### 修复3：init-completion.el my/projectile-grep 函数

```elisp
;; 修复前
(defun my/projectile-grep (&optional regexp arg)
  "简化版 projectile-grep，避免 Windows 下复杂 find 命令的问题。"
  (interactive "i\nP")
  (let* ((root (projectile-project-root))
         (search-regexp (or regexp
                            (projectile--read-search-string-with-default "Grep for")))
         (default-files (projectile-grep-default-files))
         (files (cond
                 ((equal arg '-) default-files)
                 (arg (read-string (projectile-prepend-project-name "Grep in: ")
                                   default-files))
                 (t "*"))))
    (grep-compute-defaults)
    (let ((command (format "chcp 65001 >nul && egrep -rinHI --exclude-dir=.idea --exclude-dir=.svn --color=always %s %s"
                           (shell-quote-argument search-regexp)
                           files)))
      (grep (concat "cd " root " && " command)))))

;; 修复后
(defun my/projectile-grep (&optional regexp arg)
  "简化版 projectile-grep，避免 Windows 下复杂 find 命令的问题。"
  (interactive "i\nP")
  (let* ((root (projectile-project-root))
         (search-regexp (or regexp
                            (projectile--read-search-string-with-default "Grep for")))
         (default-files (projectile-grep-default-files))
         (files (cond
                 ((equal arg '-) default-files)
                 (arg (read-string (projectile-prepend-project-name "Grep in: ")
                                   default-files))
                 (t "*"))))
    (grep-compute-defaults)
    (let ((command (format "egrep -rinHI --exclude-dir=.idea --exclude-dir=.svn --color=always %s %s"
                           (shell-quote-argument search-regexp)
                           files))
          (coding-system-for-read 'chinese-gbk-dos))
      (grep (concat "cd " root " && " command)))))
```

变更点：
- 移除 `chcp 65001 >nul &&`（只影响 Windows 控制台 API，对 MSYS2 egrep 无效）
- 移除 `LANG=en_US.UTF-8` 前缀（cmd.exe 不支持 POSIX 环境变量语法）
- 添加 `(coding-system-for-read 'chinese-gbk-dos)` 绑定，强制 Emacs 按 GBK 解码该 grep 进程的输出

## 涉及的关键文件

| 文件 | 行号 | 内容 |
|------|------|------|
| `lisp/init-basic.el` | 68-74, 125-140 | process-coding-system-alist 初始化、语言环境设置 |
| `lisp/init-completion.el` | 123 | 被修复的 `("es" gbk . gbk)` 条目（延迟加载） |
| `lisp/init-completion.el` | 90-107 | my/projectile-grep 函数 |
| `config.el` | 225 | 重复的 `("es" gbk . gbk)` 条目 |
| `elpa/color-rg/color-rg.el` | 760-900 | color-rg-build-command / color-rg-search |
| `elpa/consult-20250908.1642/consult.el` | 2449-2538 | consult--async-process |

## 核心教训

1. `process-coding-system-alist` 正则在匹配时包括程序的完整路径，不仅仅是程序名（basename）。写正则时需要用 `\`` 和 `\'` 锚定。
2. `use-package :config` 块中的代码是延迟执行的（`eval-after-load`），状态变化可能发生在任何时间点。
3. Windows 上 `shell-file-name` 默认是 `cmdproxy.exe`（cmd.exe），不是 bash.exe，即使系统安装了 Git Bash。
4. `chcp 65001` 只影响 Windows 控制台 API（`WriteConsole` 等），不影响通过管道（pipe）的 POSIX I/O。
5. MSYS2/Git Bash 的 GNU 工具使用 POSIX locale 决定输出编码，不受 Windows 控制台代码页影响。
6. `coding-system-for-read` 是 Emacs 动态变量，可以在调用 `compilation-start` / `grep` 时动态绑定来覆盖 `process-coding-system-alist` 的解码设置。
