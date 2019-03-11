var mm = require("../util/mm.js");

var _order = {

    //获取购物车数量
    getProductList:function (resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/order/get_order_cart_product.do'),
            success:resolve,
            error:reject
        })
    }
};
module.exports = _order;