var mm = require("../../util/mm.js");
require("../common/header/index.js");
require('../common/nav/index.js');
require("./index.css");
var navSide = require('../common/nav-side/index.js');
var _user = require('../../service/user-service.js');
var templateIndex = require("./index.string");


var page = {
    init: function () {
        this.onload();
    },
    onload:function(){
        navSide.init({
            name:'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo: function () {
        var userhtml = '';

        _user.getUserInfo(function (res) {
            userhtml = mm.renderHtml(templateIndex,res);
            $(".panel-body").html(userhtml);
        },function (err) {
            mm.errorTips(err)
        });
    }
};
$(function () {
    page.init();
});