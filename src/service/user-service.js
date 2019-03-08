var mm = require("../util/mm.js");

var _user = {
    login:function(userInfo,resolve,reject){
        mm.request({
            url:mm.getServerUrl('/user/login.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error:reject
        })
    },

    logout:function (resolve,reject) {
        //登出
        mm.request({
            url:mm.getServerUrl('/user/logout.do'),
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //检查登陆状态
    checkLogin:function (resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/user/get_user_info.do'),
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //检查用户名
    checkUserName:function(username,resolve,reject){
        mm.request({
            url:mm.getServerUrl('/user/check_valid.do'),
            data:{
                type:"username",
                str : username
            },
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //用户注册
    register:function(userInfo,resolve,reject){
        mm.request({
            url:mm.getServerUrl('/user/register.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //获取用户信息
    getUserInfo:function(resolve,reject){
        mm.request({
            url:mm.getServerUrl('/user/get_information.do'),
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //更新用户信息
    updateUserInfo:function(userInfo,resolve,reject){
        mm.request({
            url:mm.getServerUrl('/user/update_information.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error:reject
        })
    }

};
module.exports = _user;