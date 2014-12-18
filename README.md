webutils
==========================
Web开发中常用的Javascript方法库

#url方法集
##1、Url参数获取方法
###获取url参数

* 方法：

  webutils.url.get(name,url);

* 参数：

  name：url参数名。

  url：(可选)，默认是当前url。

###设置url参数

* 方法：

  webutils.url.set(name,value,url);

* 参数：

  name：url参数名。如果name不存在则新增，反之则更新。

  value：url参数值。

  url：(可选)，默认是当前url。

#xml方法集
##1、调用XSLT方法
* 方法：

  webutils.xml.callXslt(options);
  
* 参数：

  xml：xml文档对象。
  
  url：xslt文件。
  
  success：函数接口，function(n){}，n为转换结果。

#DOM对象扩展方法集
##format方法，扩展日期对象
* 方法：

  [DateObject].format("yyyy-MM-dd");

* 参数：

  yyyy-MM-dd HH:mm:ss.SSS
  
  y：年，M：月，d：日，H：小时，m：分钟，s：秒，S：毫秒。
  
