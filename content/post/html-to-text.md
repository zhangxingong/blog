+++
title = "html转文本 | JAVA"
date = 2023-09-19T11:07:00+08:00
tags = ["笔记", "工具", "学习", "基础"]
categories = ["subject"]
draft = false
weight = 2001
author = "zhangxingong"
+++

## br转换行 {#br转换行}

{{< highlight java >}}
public class Test1 {

    private static final Log log = LogFactory.getLog(Test1.class);

    public static void main(String[] args) throws Exception {
        String str = "<br> <br  > <br  /> <br/>";

        str = str.replaceAll("(?i)<br[^>]*>","\n");
        System.out.println("str = " + str);

    }
    {{< /highlight >}}


## 正则表达式解析 {#正则表达式解析}

![](/img/11-04-56_2_screenshot.png)


## html转txt {#html转txt}

{{< highlight java >}}
public static String html2text(String input) {
return html2text(input, true);
}

public static String html2text(String input, boolean replaceBR) {
// String s = nullToBlank(input).replaceAll("(?s)<[^>]*>(\\s*<[^>]*>)*",
// " ");
if (!isValid(input))
return "";
if (!replaceBR) {
input = input.replaceAll("(?i)<br[^>]*>", "br2nl").replaceAll("\n",
"br2nl");
}
String text = Jsoup.parse(input).text();
if (!replaceBR) {
text = text.replaceAll("br2nl", "\n").trim();
}
return text;
}
{{< /highlight >}}


## 参考链接 {#参考链接}

[正则表达式解析](https://regexr-cn.com/)
