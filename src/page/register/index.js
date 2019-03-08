require("./index.css");
require('../common/nav-simple/index.js');
var mm = require("../../util/mm.js");
var _user = require("../../service/user-service");

//表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find(".err-msg").text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find(".err-msg").text('');
    }
};


var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;

        //已注册验证
        $("#username").blur(function () {
            var username = $.trim($(this).val());
            if (!username) {
                return;
            }
            _user.checkUserName(username, function (res) {
                formError.hide()
            }, function (errmsg) {
                formError.show(errmsg)
            })
        });


        $("#submit").click(function () {
            _this.submit();
        });
        //按下回车也提交
        $(".user-content").keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    submit: function () {
        var formData = {
            username: $.trim($("#username").val()),
            password: $.trim($("#password").val()),
            passwordConfirm: $.trim($("#password-confirm").val()),
            phone: $.trim($("#phone").val()),
            email: $.trim($("#email").val()),
            // question:'123',
            // answer:'123'
        };
        //表单验证结果
        var validateResult = this.formValidate(formData);
        //成功
        if (validateResult.status) {
            _user.register(formData, function (res) {
                window.location.href = './result.html?type=register';
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
    formValidate: function (formdata) {
        var result = {
            status: false,
            msg: ''
        };

        if (!mm.validate(formdata.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        //验证密码是否为空
        if (!mm.validate(formdata.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //验证密码长度
        if (formdata.password.length < 6) {
            result.msg = '密码长度不能少于6位';
            return result;
        }
        //验证两次密码是否一致
        if (formdata.password !== formdata.passwordConfirm) {
            result.msg = '两次输入密码不一致';
            return result;
        }
        //验证手机
        if (!mm.validate(formdata.phone, 'phone')) {
            result.msg = '手机格式不正确';
            return result;
        }
        //验证邮箱
        if (!mm.validate(formdata.email, 'email')) {
            result.msg = '邮箱格式不正确';
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