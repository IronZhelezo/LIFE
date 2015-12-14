$(document).ready(function () {
	'use strict'
	var m = 30;
	var n = 50;
	var life = 0;
	var timer;
	for (var i = 0; i < m; i++) {
		 $("#life").append('<tr id="tr-'+ i + '">');
		for (var j = 0; j < n; j++) {
			$("#life tr#tr-" + i).append('<td id="tr-' + i + 'td-'+ j + '">');
		};
	}
	$("td").click(function () {
		$(this).addClass("life");
	})
	function runLife () {
		for (var i = 0; i < $(".life").length; i++) {
				var trNum = parseInt($(".life")[i].parentNode.id.substring(3));
				var tdNum = (trNum<10) ? parseInt($(".life")[i].id.substring(7)):
				parseInt($(".life")[i].id.substring(8));
			for (var j = trNum-1; j <= trNum+1; j++) {
				for (var k = tdNum - 1; k <= tdNum + 1; k++) {
					var l = (j == m) ? 0 : (j == -1) ? m - 1 : j;
					var h = (k == n) ? 0 : (k == -1) ? n - 1 : k;
					var neighbor = $("#tr-"+l+"td-"+h)[0];
					life = 0;
					for (var a = l-1; a <= l+1; a++) {
						for (var b = h - 1; b <= h + 1; b++) {
							var c = (a == m) ? 0 : (a == -1) ? m - 1 : a;
							var d = (b == n) ? 0 : (b == -1) ? n - 1 : b;
							var neighborNext = $("#tr-"+c+"td-"+d)[0];
							if ( $(neighborNext).hasClass("life"))life++;
							if (($(neighbor).hasClass("life")&&life == 4)||(life == 3)){
								$(neighbor).addClass("born");
							} else {
							 $(neighbor).removeClass("born");
							};
						};
					};
				};
			};
		};
		$("td").removeClass("life");
		$(".born").addClass("life");
		$("td").removeClass("born");
	};

	$(".onestep").click(function(){
		runLife ();
	});
	$(".start").click(function(){
		timer = setInterval(function () {
				runLife ();
			}, 1000);
		$(this).css('display','none');
		$(".stop").css('display','inline-block');
	});
	$(".stop").click(function(){
		clearInterval(timer);
		$(this).css('display','none');
		$(".start").css('display','inline-block');
	});
});

