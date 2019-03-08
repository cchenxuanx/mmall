require("./index.css");
require('../common/nav-simple/index.js');
var mm = require("../../util/mm.js");

$(function () {
   var type = mm.getUrlParams('type') || 'default';
   var $element = $('.'+type+'-success').show()
});