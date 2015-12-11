$(document).ready(function () {
    'use strict'
    var m = 4;
    var n = 5;
    for (var i = 0; i < m; i++) {
    	 $("#life").append('<tr id="tr-'+ i + '">');
    	for (var j = 0; j < n; j++) {
    		$("#life tr#tr-" + i).append('<td id="td-'+ j + '">');
    	};
    }
});