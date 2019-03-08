require("./index.css");
var mm = require("../../../util/mm.js");
var template = require("./index.string");
//侧边导航
var navSide = {
    option:{
        name:'',
        navList:[
            {name: 'user-center', desc:"个人中心", href:"./user-center.html"},
            {name: 'order-list', desc:"我的订单", href:"./user-center.html"},
            {name: 'pass-update', desc:"修改密码", href:"./user-center.html"},
            {name: 'about', desc:"关于MMall", href:"./user-center.html"}
        ]
    },
    init:function (option) {
        //合并选项
        $.extend(this.option,option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav:function () {
        //判断哪个是active
        for (var i = 0;i < this.option.navList.length;i++) {
            if (this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        //渲染html
        var navHtml = mm.renderHtml(template,{
            navList:this.option.navList
        });
        //
        $(".nav-side").html(navHtml);

    }
};
module.exports = navSide;