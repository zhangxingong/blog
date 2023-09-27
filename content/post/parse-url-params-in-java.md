+++
title = "获取URL参数 | JAVA"
date = 2023-09-27T16:54:00+08:00
tags = ["笔记", "工具", "编程"]
categories = ["subject"]
draft = false
weight = 2001
author = "zhangxingong"
+++

日常开发中需要解析URL里的参数与值

如下：

{{< highlight java >}}
/**
* @description 解析日志url
* @param url 需要解析的单条日志内容
*/
public static Map<String, String> getUrlParams(String url){
HashMap<String,String> strUrlParas = new HashMap<>();
strUrlParas.clear();
//		传递的URL参数
String strUrl = "";
String strUrlParams = "";


//		解析访问地址
if(url.contains("?")){
String[] strUrlPatten = url.split("\\?");
strUrl = strUrlPatten[0];
strUrlParams = strUrlPatten[1];

        }else{
            strUrl = url;
            strUrlParams = url;
        }

        strUrlParas.put("URL", strUrl);
        //		解析参数
        String[] params = null;

        if(strUrlParams.contains("&")){
            params = strUrlParams.split("&");
        }else{
            params = new String[] {strUrlParams};
        }

//		保存参数到参数容器
for(String p:params){
if(p.contains("=")) {
String[] param = p.split("=");
if(param.length==1){
strUrlParas.put(param[0],"");
}else{

                    String key = param[0];
                    String value = param[1];

                    strUrlParas.put(key, value);
                }
            }else {
                strUrlParas.put("errorParam",p);
            }
        }
        return strUrlParas;
    }
    {{< /highlight >}}

---

思路如下：

问号切分地址与参数

&amp;符号切分所有参数

=切分键与值
