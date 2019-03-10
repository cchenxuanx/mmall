var mm = require("../util/mm.js");

var _product = {
    getProductList:function(listParam,resolve,reject){
        mm.request({
            url:mm.getServerUrl('/product/list.do'),
            data:listParam,
            success:resolve,
            error:reject
        })
    },
    //获取商品详情
    getProductDetail:function(productId,resolve,reject){
        mm.request({
            url:mm.getServerUrl('/product/detail.do'),
            data:{
                productId: productId
            },
            success:resolve,
            error:reject
        })
    }
};
module.exports = _product;