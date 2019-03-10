var mm = require("../../util/mm.js");
require("../common/header/index.js");
require('../common/nav/index.js');
require('./index.css');
require("../../util/slider/index.js");
var navSide = require('../common/nav-side/index.js');
var templateBanner = require("./index.string");

$(function() {
    var bannerHtml = mm.renderHtml(templateBanner);
    $(".banner-con").html(bannerHtml);
    $('.banner').unslider({
        dots:true
    });
});