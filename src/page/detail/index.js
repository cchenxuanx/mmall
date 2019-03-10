require("./index.css");
var mm = require("../../util/mm.js");
require("../common/header/index.js");
require('../common/nav/index.js');
var _product = require('../../service/product-service.js');
var templateIndex = require("./index.string");
var _cart = require('../../service/cart-service.js');

var page ={
    data:{
        productId:mm.getUrlParams('productId') || ''
    },
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        if (!this.data.productId) {
            mm.gohome();
        }
        this.loadDetail();
    },
    bindEvent:function () {
        var _this = this;
    //    图片预览
        $(document).on('mouseenter','.p-img-item',function () {
            var imageUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imageUrl)
        });

        //count
        $(document).on('click','.p-count-btn',function () {
            var type = $(this).hasClass('plus')?'plus':'minus';
            var pCount = $(".p-count");
            var currCount = parseInt(pCount.val());
            var minCount = 1;
            var maxCount = _this.data.detailInfo.stock || 1;

            if (type === 'plus'){
                pCount.val(
                    currCount < maxCount ? currCount+1:maxCount
                );
            }else if (type === 'minus'){
                pCount.val(
                    currCount > minCount ? currCount-1:minCount
                );
            }

        });
        //加入购物车
        $(document).on('click','.cart-add',function () {

            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            },function (res) {
                window.location.href = './result.html?type=cart-add';
            },function (err) {
                mm.errorTips(err);
            })


        })


    },
    loadDetail:function () {
        var html = '';
        var $pageWrap = $(".page-wrap");
        $pageWrap.html("<div class='loading'></div>");
        var _this = this;


        _product.getProductDetail(this.data.productId,function (res) {
            _this.filter(res);
            _this.data.detailInfo = res;
            html = mm.renderHtml(templateIndex,res);
            $(".page-wrap").html(html);
        },function (err) {
            $(".page-wrap").html("<p class='err'>找不到此商品~~</p>");

        })
    },
    filter:function (data) {
        data.subImages = data.subImages.split(',');
    }
};
$(function () {
    page.init()
});