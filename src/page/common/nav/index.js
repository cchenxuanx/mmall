require("./index.css");
var mm = require("../../../util/mm.js");
var _user = require("../../../service/user-service.js");
var _cart = require("../../../service/cart-service.js");
//最顶部导航栏
var nav = {
    init:function () {
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        return this
    },
    bindEvent:function () {
        //登陆点击事件
        $(".js-login").click(function () {
            mm.doLogin();
        });
        //注册点击事件
        $(".js-register").click(function () {
            window.location.href = "./register.html"
        });
        //退出点击事件
        $(".js-logout").click(function () {
            _user.logout(function(res){
                    window.location.reload();
                },function(err){
                    mm.errorTips(err)
                }
            );
        })
    },

    //加载用户信息
    loadUserInfo:function () {
        _user.checkLogin(function (res) {
            $(".user.not-login").hide().siblings('.usesr.login').show()
                .find('.username').text(res.username)
        },function (err) {
        })
    },
    //加载购物车数量
    loadCartCount:function () {
        _cart.getCartCount(function (res) {
            $(".nav .cart-count").text(res || 0);
        },function (err) {
            $(".nav .cart-count").text(res || 0)
        })
    }
};
module.exports = nav.init();