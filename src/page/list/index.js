var mm = require("../../util/mm.js");
require("../common/header/index.js");
require('../common/nav/index.js');
require("./index.css");
var _product = require('../../service/product-service.js');
var templateIndex = require("./index.string");

var page ={
    data:{
        listParam:{
            keyword: mm.getUrlParams("keyword") || '',
            categoryId: mm.getUrlParams("categoryId") || '',
            orderBy: mm.getUrlParams("orderBy") || 'default',
            pageNum: mm.getUrlParams("pageNum") || 1,
            pageSize: mm.getUrlParams("pageSize") || 20
        }
    },
    init:function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function () {
        this.loadList();
    },
    bindEvent:function () {
        
    },
    loadList:function () {
        var _this = this;
        var html = '';
        var listParam = this.data.listParam;

        _product.getProductList(listParam,function (res) {
            html = mm.renderHtml(templateIndex,{
                list:res.list
            });
            $(".p-list-con").html(html);
            // _this.loadPagination(res.pageNum, res.pages);

        },function (err) {
            mm.errorTips(err)
        })
    },
    loadPagination:function (pageNum,pages) {
        
    }
};
$(function () {
   page.init()
});