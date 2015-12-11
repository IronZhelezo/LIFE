$(document).ready(function () {
    'use strict'
    var m = 40;
    var n = 50;
    for (var i = 0; i < m; i++) {
    	 $("#life").append('<tr id="tr-'+ i + '">');
    	for (var j = 0; j < n; j++) {
    		$("#life tr#tr-" + i).append('<td id="td-'+ j + '">');
    	};
    }
    $("td").click(function () {
    	$(this).addClass("life");
    })
});