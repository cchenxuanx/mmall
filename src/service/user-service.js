var mm = require("../util/mm.js");

var _user = {
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
};
module.exports = _user;