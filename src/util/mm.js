
var conf = {
    serverHost:''
};
var Hogan = require('hogan.js');
var _mm = {
    //网络请求
    request:function (param) {
        var _this = this;
        $.ajax({
            type: param.method ||'GET',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success:function (res) {
                //请求成功
                if (res.status === 0){
                    //设计的回调函数，只有传入是函数才行
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //强制登陆
                else if (res.status === 10){
                    _this.doLogin();
                }
                //请求数据错误
                else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error:function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })

    },
    doLogin:function () {
        window.location.href = './login.html?redirect='+encodeURIComponent(window.location.href);
    },
    //获取服务器地址
    getServerUrl:function (path) {
        return conf.serverHost+path;
    },
    //获取url参数
    getUrlParams:function (name) {
        var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]):null;
    },
    //渲染html
    renderHtml:function (htmlTemplate,data) {
        var template = Hogan.compile(htmlTemplate);
        var renderResult = template.render(data);
        return renderResult
    },
    //成功提示和错误提示
    successTips:function (res) {
        alert(res||"成功");
    },
    errorTips:function (err) {
        alert(res||"错误");
    },
    //信息验证,是否为空、手机、邮箱
    validate:function (value,type) {
        var value1 = $.trim(value);
        //非空验证,将value1强制转换为布尔类型
        if (type === 'require'){
            return !!value1
        }
        //手机号验证
        if (type === 'phone'){
            return /^1\d{10}$/.test(value1);
        }
        //邮箱验证
        if (type === 'email'){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value1)
        }
    },
    gohome:function () {
        window.location.href = './index.html';
    }

};
module.exports = _mm;