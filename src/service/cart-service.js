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
    //获取购物车列表
    getCartList:function (resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/list.do'),
            success:resolve,
            error:reject
        })
    },
    selectProduct:function (productId,resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/select.do'),
            data:{
              productId:productId
            },
            success:resolve,
            error:reject
        })
    },
    unselectProduct:function (productId,resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/un_select.do'),
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        })
    },
    selectAllProduct:function (resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/select_all.do'),
            success:resolve,
            error:reject
        })
    },
    unselectAllProduct:function (resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/un_select_all.do'),
            success:resolve,
            error:reject
        })
    },
    updateProduct:function (productInfo,resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/update.do'),
            data: productInfo,
            success:resolve,
            error:reject
        })
    },
    deleteProduct:function (productIds,resolve,reject) {
        mm.request({
            url:mm.getServerUrl('/cart/delete_product.do'),
            data: {
                productIds:productIds
            },
            success:resolve,
            error:reject
        })
    }
};
module.exports = _cart;