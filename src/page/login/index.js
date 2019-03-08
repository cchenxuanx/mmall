require("./login.css");
require('../common/nav-simple/index.js');
var mm = require("../../util/mm.js");
var _user = require("../../service/user-service");

//表单里的错误提示
var formError = {
    show:function (errMsg) {
        $('.error-item').show().find(".err-msg").text(errMsg);
    },
    hide:function () {
        $('.error-item').hide().find(".err-msg").text('');
    }
};



var page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        var _this = this;
        $("#submit").click(function () {
            _this.submit();
        });
        //按下回车也提交
        $(".user-content").keyup(function (e) {
            if (e.keyCode === 13){
                _this.submit();
            }
        })
    },
    submit:function () {
        var formData = {
            username:$.trim($("#username").val()),
            password:$.trim($("#password").val())
        };
        //表单验证结果
        var validateResult = this.formValidate(formData);
        //成功
        if (validateResult.status){
           _user.login(formData,function (res) {
               window.location.href = mm.getUrlParams('redirect') || './index.html';
           }, function (errMsg) {
               formError.show(errMsg);
           });
        }
        //失败
        else {
            formError.show(validateResult.msg);
        }
    },
    //表单验证
    formValidate:function (formdata) {
        var result = {
            status:false,
            msg:''
        };

        if (!mm.validate(formdata.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if (!mm.validate(formdata.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }

        result.status = true;
        result.msg = "验证通过";

        return result;

    }
};
$(function () {
   page.init();
});