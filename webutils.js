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
