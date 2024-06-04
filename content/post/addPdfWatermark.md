+++
title = "基于java技术实现word、pdf文件添加水印"
date = "2024-0-15T11:47:22+0800"
tags = ["笔记","学习","编程"]
categories = ["subject"]
draft = false
weight = 2002
author = "zhangxingong"
+++


### 前言：

在当今数字化时代，随着电子文档的广泛应用，保护文档的安全性和完整性变得尤为重要。为了防止文档被盗用、篡改或未经授权的复制，添加水印成为一种常见的解决方案。

水印作为一种可见或隐形的标记，可以为文档增加额外的信息或标识，从而提高文档的可信度和可辨识性。无论是在商业领域中保护机密文件，还是在学术界中保护研究成果的版权，添加水印都发挥着重要的作用。

在本文中，我们将探讨如何使用Java技术实现在Word和PDF文件中添加水印。

### pdf文件添加水印:

 ```java
 package test;
 
 import com.itextpdf.text.Element;
 import com.itextpdf.text.Rectangle;
 import com.itextpdf.text.pdf.*;
 
 import javax.swing.*;
 import java.awt.*;
 import java.io.FileOutputStream;
 
 
 /**
  * @author weixinxin 2024-01-24
  **/
 public class textWaterMark {
     public static void main(String[] args) {
         String waterMark = "内部使用";
         String filePath = "C:\\Users\\weixinxin_ext\\Desktop\\FLEET10463_湖北小柚智行汽车科技有限公司_20240123_GUA 保证协议-甜猫_replace_加密.pdf";
         String outFilePath = "C:\\Users\\weixinxin_ext\\Desktop\\添加多行文字水印_replace_加密_水印.pdf";
 
         addPdfWatermark(filePath, outFilePath, waterMark);
     }
 
 
     public static void addPdfWatermark(String inputFile, String outputFile, String waterMarkName) {
         try {
             // 水印的高和宽（参数可调节）
             int textH = 75;
             int textW = 170;
             // 间隔距离（参数可调节）
             int interval = 30;
             String owerPwd = "111";
             String userWpd = "222";
             PdfReader reader = new PdfReader(inputFile);
             PdfReader.unethicalreading = true;
             PdfStamper stamper = new PdfStamper(reader, new FileOutputStream(outputFile));
             //userWpd 文件加密（打开文件密码）；owerPwd 操作加密（文件操作密码）； permissions = 4 能打印不能复制
             //stamper.setEncryption(userWpd.getBytes(),owerPwd.getBytes(),4,false);
             BaseFont base = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.EMBEDDED);
             PdfGState gs = new PdfGState();
             gs.setFillOpacity(0.2f);
             gs.setStrokeOpacity(0.4f);
             int total = reader.getNumberOfPages() + 1;
             JLabel label = new JLabel();
             label.setText(waterMarkName);
             PdfContentByte under;
 
             Rectangle pageRect = null;
             FontMetrics metrics;
             label.setText(waterMarkName);
             metrics = label.getFontMetrics(label.getFont());
             for (int i = 1; i < total; i++) {
                 pageRect = reader.getPageSizeWithRotation(i);
                 // 在内容上方加水印
                 under = stamper.getOverContent(i);
                 // 在内容下方加水印
                 //under = stamper.getUnderContent(i);
                 under.saveState();
                 under.setGState(gs);
                 under.beginText();
                 under.setFontAndSize(base, 20);
                 // 水印文字成30度角倾斜
                 for (int height = interval + textH; height < pageRect.getHeight();
                      height = height + textH * 3) {
                     for (int width = interval + textW; width < pageRect.getWidth() + textW;
                          width = width + textW * 2) {
                         under.showTextAligned(Element.ALIGN_LEFT
                                 , waterMarkName, width - textW,
                                 height - textH, 30);
                     }
                 }
                 under.endText();
             }
             stamper.close();
             reader.close();
         } catch (Exception e) {
             e.printStackTrace();
         }
     }
 }
 ```

 **结果：**
 
 ![](https://img-blog.csdnimg.cn/direct/cf728f04f21b4efb8a84f69faa1284d9.png)

### word文件添加水印：

 ```java
 package com.atxinxin;
 
 import com.itextpdf.text.Element;
 import com.itextpdf.text.Rectangle;
 import com.itextpdf.text.pdf.*;
 import com.spire.doc.Document;
 import com.spire.doc.FileFormat;
 import com.spire.doc.HeaderFooter;
 import com.spire.doc.Section;
 import com.spire.doc.documents.Paragraph;
 import com.spire.doc.documents.ShapeLineStyle;
 import com.spire.doc.documents.ShapeType;
 import com.spire.doc.fields.ShapeObject;
 
 import javax.swing.*;
 import java.awt.*;
 import java.io.FileOutputStream;
 
 /**
  * @author weixinxin 2024-01-26
  **/
 public class WaterMark {
     public static void main(String[] args) {
         String waterMark = "内部使用";
         String filePath = "C:\\Users\\weixinxin_ext\\Desktop\\测试word转pdf.docx";
         String outFilePath = "C:\\Users\\weixinxin_ext\\Desktop\\测试word转pdf-水印.docx";
         addWordWaterMark(filePath,outFilePath,waterMark);
     }
     
     private static void addWordWaterMark(String filePath, String outFilePath,String waterMark) {
         Document doc = new Document();
         doc.loadFromFile(filePath);
         ShapeObject shape = new ShapeObject(doc, ShapeType.Text_Plain_Text);
         shape.setWidth(60);
         shape.setHeight(20);
         //设置艺术字文本内容、位置及样式
         shape.setVerticalPosition(30);
         shape.setHorizontalPosition(20);
         shape.setRotation(315);
         shape.getWordArt().setFontFamily("宋体");
         shape.getWordArt().setText(waterMark);
         shape.setFillColor(new Color(255, 255, 255));
         shape.setLineStyle(ShapeLineStyle.Single);
         shape.setStrokeColor(new Color(185, 181, 181, 204));
         shape.setStrokeWeight(1);
 
         Section section;
         HeaderFooter header;
         for (int n = 0; n < doc.getSections().getCount(); n++) {
             section = doc.getSections().get(n);
             header = section.getHeadersFooters().getHeader();
             Paragraph paragraph;
 
             if (header.getParagraphs().getCount()  0) {
                 paragraph = header.getParagraphs().get(0);
             } else {
                 paragraph = header.addParagraph();
             }
             for (int i = 0; i < 3; i++) {
                 for (int j = 0; j < 4; j++) {
                     shape = (ShapeObject) shape.deepClone();
                     shape.setVerticalPosition(60 + 200 * i);
                     shape.setHorizontalPosition(50 + 200 * j);
                     paragraph.getChildObjects().add(shape);
                 }
             }
         }
         //保存文档
         doc.saveToFile(outFilePath, FileFormat.Docx_2013);
     }
 }
 ```

 **结果：**
 
 ![](https://img-blog.csdnimg.cn/direct/d07489c0cc244c458c0114f128540075.png)

### 参考

[基于java技术实现word、pdf文件添加水印](https://blog.csdn.net/qq_44033725/article/details/135912632 "基于java技术实现word、pdf文件添加水印")
