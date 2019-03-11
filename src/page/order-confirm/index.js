require("./index.css");
var mm = require("../../util/mm.js");
require("../common/header/index.js");
require('../common/nav/index.js');
var templateProduct = require("./product-list.string");
var templateAddress = require("./address-list.string");
var _order = require('../../service/order-service.js');
var _address = require('../../service/address-service.js');


var page ={
    data:{
       selectedAddressId:null
    },
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        this.loadAddressList();
        this.loadProductList();

    },
    bindEvent:function () {
        var _this = this;
        $()

    },
    loadAddressList:function () {

        // var _this = this;
        // _address.getAddressList(function (res) {
        //     var addressListHtml = mm.renderHtml(templateAddress,res);
        //     $(".address-con").html(addressListHtml);
        //
        // },function (err) {
        //     $(".address-con").html("<p class='err-tip'>地址加载失败，请稍后再试</p>");
        // })
    },
    loadProductList:function () {

        var _this = this;
        _order.getProductList(function (res) {
            var productListHtml = mm.renderHtml(templateProduct,res);
            $(".product-con").html(productListHtml);

        },function (err) {
            $(".product-con").html("<p class='err-tip'>商品信息加载失败</p>");
        })
    }


};
$(function () {
    page.init()
});