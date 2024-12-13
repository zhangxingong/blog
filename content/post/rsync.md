+++
title = "📚 Efficient File Synchronization & Stream Editing with rsync & sed"
date = "2024-12-13T14:03:00+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++


# 📚 Efficient File Synchronization & Stream Editing with rsync & sed 📊

Managing files effectively is crucial for system administrators and developers. Two powerful tools, **rsync** ✨ and **sed** ⚖️, cater to file synchronization and stream editing needs, respectively. This blog provides a comprehensive guide to these tools, complete with examples and best practices.

---

## 🎮 rsync: High-Performance File Synchronization

### 🔄 Overview
`rsync` is a utility for efficiently transferring and synchronizing files ⚡ locally or across remote systems. It supports incremental file transfer and preserves metadata, making it indispensable for backups and mirroring tasks.

### 🔀 Basic Syntax
```bash
rsync [options] source destination
```

### 🎨 Common Use Cases & Examples

#### **1. Basic Local File Synchronization**
```bash
rsync -av /source/ /destination/
```
- **`-a`**: Archive mode (preserves file structure, permissions, and metadata).
- **`-v`**: Verbose mode for detailed output.

#### **2. Remote File Transfer**
```bash
rsync -avz /local/path/ user@remote:/remote/path/
```
- **`-z`**: Compress files during transfer.

#### **3. Include and Exclude Files**
```bash
rsync -av --exclude '*.tmp' --include '*.txt' /src/ /dest/
```
- Exclude all temporary files while including text files.

#### **4. Mirror Directories**
```bash
rsync -av --delete /src/ /dest/
```
- Synchronize directories while deleting extraneous files in the destination.

#### **5. Display Progress**
```bash
rsync -avz --progress /src/ /dest/
```
- Use `--progress` to monitor file transfer status.

#### **6. Resume Interrupted Transfers**
```bash
rsync -av --partial /src/ /dest/
```
- Enable resumable file transfers for large files.

### 🌈 Advanced Options

#### **File Filtering**
- Use `--include-from` and `--exclude-from` to apply filters from files:
  ```bash
  rsync -av --include-from=include.txt --exclude-from=exclude.txt /src/ /dest/
  ```

#### **Optimizing Performance**
- Compress files with `-z`.
- Limit bandwidth with `--bwlimit=KBPS`.

#### **Permissions Management**
- Adjust permissions with `--chmod`:
  ```bash
  rsync --chmod=a=rw,Da+x /src/ /dest/
  ```

#### **Command Example with Explanation**
```bash
rsync -ruhi --include-from "include.txt" --exclude-from "exclude.txt" \
      --chmod=a=rw,Da+x /cygdrive/d/context/ user@192.168.1.25::context/
```
- 🔄 `-r`: Recursive.
- ➡️ `-u`: Skip files newer on the receiver.
- 🔥 `-h`: Human-readable numbers.
- ⚡ `--include-from`: Include patterns from a file.
- ✖️ `--exclude-from`: Exclude patterns from a file.

---

## 🎨 sed: Stream Editing Mastery

`sed` (Stream Editor) is a non-interactive text processing tool for editing files, substituting strings, and more.

### 🔀 Basic Syntax
```bash
sed [options] script [file]
```

### 🎮 Common Use Cases & Examples

#### **1. Replace Text in a File**
```bash
sed 's/old/new/' file.txt
```
- Replaces the first occurrence of "old" with "new" in each line.

#### **2. Replace Globally in Each Line**
```bash
sed 's/old/new/g' file.txt
```
- Adds `g` to replace all occurrences in each line.

#### **3. Edit File In-Place**
```bash
sed -i 's/old/new/g' file.txt
```
- Updates the file directly.

#### **4. Delete Specific Lines**
```bash
sed '1,5d' file.txt
```
- Deletes lines 1 to 5.

#### **5. Insert Text Before a Line**
```bash
sed '/pattern/i\
Inserted text' file.txt
```
- Adds "Inserted text" before lines matching "pattern".

### 🌈 Advanced Options

#### **Using Scripts**
- Create reusable scripts with `-f`:
  ```bash
  sed -f script.sed file.txt
  ```

#### **Example Script File (script.sed)**
```bash
s/foo/bar/g
1,5d
```
- Replaces "foo" with "bar" globally and deletes lines 1-5.

#### **Combining Commands**
```bash
sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt
```
- Applies multiple transformations.

---

## 🌐 Conclusion
By mastering **rsync** for file synchronization and **sed** for stream editing, system administrators and developers can efficiently manage files and automate repetitive tasks. These tools, when combined, offer unparalleled flexibility and performance in handling data.

### 🔗 Reference Documentation
- 🔹 [rsync Documentation](https://rsync.samba.org/documentation.html)
- 🔹 `man sed`
- 🔹 [sed Tutorials and Examples](https://www.gnu.org/software/sed/manual/sed.html)

