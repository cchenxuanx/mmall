require("./index.css");
var mm = require("../../util/mm.js");
require("../common/header/index.js");
require('../common/nav/index.js');
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
        this.loadCart();
    },
    bindEvent:function () {
        var _this = this;
        //商品选择/取消
        $(document).on('click','.cart-select',function () {
            var $this = $(this);
            //模版传参
            var productId = $this.parents('.cart-table').data('product-id');
            //选中
            if ($this.is(":checked")){
                _cart.selectProduct(productId,function (res) {
                    _this.renderCart(res);
                },function (err) {
                    $(".page-wrap").html('<p class="err">哪里不对了，刷新下试试吧。</p>')
                })
            }else{
                _cart.unselectProduct(productId,function (res) {
                    _this.renderCart(res);
                },function (err) {
                    $(".page-wrap").html('<p class="err">哪里不对了，刷新下试试吧。</p>')
                })
            }
        });
        //商品全选/取消
        $(document).on('click','.cart-select-all',function () {
            var $this = $(this);
            //选中
            if ($this.is(":checked")){
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                },function (err) {
                    $(".page-wrap").html('<p class="err">哪里不对了，刷新下试试吧。</p>')
                })
            }else{
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                },function (err) {
                    $(".page-wrap").html('<p class="err">哪里不对了，刷新下试试吧。</p>')
                })
            }
        });
        // 商品数量的变化
        $(document).on('click', '.count-btn', function(){
            var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                $(".page-wrap").html('<p class="err">哪里不对了，刷新下试试吧。</p>')
            });
        });

        //删除单个商品
        $(document).on('click','.cart-delete',function () {
            if (window.confirm("确定删除?")){
                var productId = $(".cart-table").data('product-id');
                _this.deleteCartProduct(productId);
            }
        });

        //提交购物车
        $(document).on('click','.btn-submit',function () {
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0 ){
                window.location.href = "./confirm.html"
            }else {
                mm.errorTips("怎么也要挑个商品吧。")
            }
        });


    },
    loadCart:function () {

        var _this = this;
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        },function (err) {
            $(".page-wrap").html('<p class="err">哪里不对了，刷新下试试吧。</p>')
        })
    },
    renderCart:function(data){
        this.filter(data);
        this.data.cartInfo = data;
        console.log(this.data.cartInfo);
        var cartHtml = mm.renderHtml(templateIndex,data);
        $(".page-wrap").html(cartHtml);
        _cart.getCartCount(function (res) {
            $(".nav .cart-count").text(res || 0);
        },function (err) {
            $(".nav .cart-count").text(res || 0)
        });
    },
    filter:function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    //删除制定商品
    deleteCartProduct:function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds,function () {
            _this.renderCart(res);
        },function (err) {
            $(".page-wrap").html('<p class="err">哪里不对了，刷新下试试吧。</p>')
        });
    }

};
$(function () {
    page.init()
});