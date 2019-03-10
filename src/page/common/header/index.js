require("./index.css");
var mm = require("../../../util/mm.js");

//header
var header = {
    init:function () {
        this.bindEvent();
        this.onload();
    },
    onload:function(){
        var keyword = mm.getUrlParams("keyword");
        if (keyword){
            $('#search-input').val(keyword)
        }
    },
    bindEvent:function () {
        var _this = this;
        $("#search-btn").click(function () {
            _this.searchSubmit();
        });
        //回车提交
        $('#search-input').keyup(function (e) {
            if (e.keyCode ===13) {
                _this.searchSubmit();
            }
        })
    },
    //搜索提交
    searchSubmit:function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword){
            window.location.href = './list.html?keyword='+keyword;
        }else {
            mm.gohome();
        }
    }
};
header.init();