var mm = require("../../util/mm.js");
require("../common/header/index.js");
require('../common/nav/index.js');
require("./index.css");
var navSide = require('../common/nav-side/index.js');
var _user = require('../../service/user-service.js');
var templateIndex = require("./index.string");
//渲染进来的html通过事件冒泡监听

var page = {
    init: function () {
        this.onload();
        this.bindEvent();
    },
    onload:function(){
        navSide.init({
            name:'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent:function(){
        var _this = this;
        $(document).on('click','.btn-submit',function () {
            var userInfo = {
                phone:$.trim($('#phone').val()),
                email:$.trim($('#email').val())
            };
            var validateResult = _this.formValidate(userInfo);
            if (validateResult.status){
                _user.updateUserInfo(userInfo,function (res,msg) {
                    mm.successTips(msg);
                    window.location.href = './user-center.html'
                },function (err) {
                    mm.errorTips(err);
                });
            }else {
                mm.errorTips(validateResult.msg)
            }
        })
    },
    loadUserInfo: function () {
        var userhtml = '';
        _user.getUserInfo(function (res) {
            userhtml = mm.renderHtml(templateIndex,res);
            $(".panel-body").html(userhtml);
        },function (err) {
            mm.errorTips(err)
        });
    },
    //表单验证
    formValidate: function (formdata) {
        var result = {
            status: false,
            msg: ''
        };

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