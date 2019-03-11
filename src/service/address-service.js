var mm = require("../util/mm.js");

var _address = {

    getAddressList:function (resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/shipping/list.do'),
            data:{
                pageSize:50
            },
            success:resolve,
            error:reject
        })
    }
};
module.exports = _address;