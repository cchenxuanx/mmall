var mm = require("../util/mm.js");

var _cart = {

    //获取购物车数量
    getCartCount:function (resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/get_cart_product_count.do'),
            success:resolve,
            error:reject
        })
    },
    //添加购物车
    addToCart:function (product,resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/add.do'),
            data:product,
            success:resolve,
            error:reject
        })
    },
};
module.exports = _cart;