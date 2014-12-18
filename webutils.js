/* Web Utilities */
/*! CopyRight: juuen, Licensed under: MIT */
; (function ($, window, document, undefined) {
    //Web常用方法扩展库
    var webutils = function () { };

    //url utils for web
    webutils.url = {
        _url: function (u) { return u || window.location.href; },
        get: function (name, uri) {
            var value = new RegExp('[\?&]' + name + '=([^&#]*)', 'i').exec(this._url(uri));
            return value == null ? null : value[1];
        },
        set: function (name, value, uri) {
            var _u = this._url(uri);
            if (_u.indexOf(name + '=') > 0) {
                return _u.replace(new RegExp('([\?&])' + name + '=[^&#]*', 'i'), '$1' + name + '=' + value);
            } else {
                return _u + (_u.indexOf('?') > 0 ? '&' : '?') + name + '=' + value;
                //考虑锚点待定
            }
        }
    };
    
    //xml utils for web
    webutils.xml = {
        callXslt: function (options) {
            var settings = {
                type: 'GET',
                dataType: 'text'//输出text类型可避免DOM/MSDOM差异带来的兼容性问题。
            };
            $.extend(settings, options);
            $.ajax({
                type: settings.type,
                url: settings.url,
                data: settings.data,
                dataType: settings.dataType,
                success: function (result) {
                    if (typeof (XSLTProcessor) == "undefined") {
                        var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.6.0");
                        xslDoc.loadXML(result);
                        var xslt = new ActiveXObject("Msxml2.XSLTemplate.6.0");
                        xslt.stylesheet = xslDoc;
                        var xslProc = xslt.createProcessor();
                        xslProc.input = settings.xml;
                        xslProc.transform();
                        settings.success(xslProc.output);
                    } else {
                        var xsltProcessor = new XSLTProcessor();
                        xsltProcessor.importStylesheet((new DOMParser()).parseFromString(result, "text/xml"));
                        var resultDocument = xsltProcessor.transformToFragment(settings.xml, document);
                        settings.success(resultDocument);
                    }
                },
                error: settings.error
            });
        }
    };

    //Web常用对象扩展库
    //....


    //扩展DOM方法

    //扩展Date方法format() 
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    //访问接口
    //if (typeof $ != undefined) {
    //    $.wu = webutils;
    //} else {
    window.webutils = webutils;
    //}

})(jQuery, window, document);
