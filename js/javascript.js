$(document).ready(function () {
	'use strict'
	var width = $("body").width();
	var widthRel = $("#rel").width();
	var heightRel = $("#rel").height();
	$("#strapper").css('minHeight', heightRel + 4);
	$("#abs p").css('minWidth', widthRel);
	$("#abs").animate({
		marginTop: "0",
		fontSize: "1em"
		},{duration:2500,
		complete: function(){
			$("#rel").css('opacity',1);
			$("#strapper").animate({
				marginLeft: "-204px"
			}, 3500);
			$(".content").animate({
				"opacity": 1
			},{duration:5000,
			complete: function(){
				$(".navbar").css('opacity',1);
				$("#panelLeft").css('display','block');
				$("#panelRight").css('display','block');
				$(".content").stop();
				}
			});
		}
	}).animate({
		width: "0",
		marginLeft: "-204px"
	},{duration:3500,
	complete: function(){
		$("#abs").stop();
		$("#strapper").stop();
	}
});
	var m = 30;
	var n = Math.floor(width/16);
	var life = 0;
	var timer;
	var z = 1;
	var x = 1;
	var sec = 1000;
	function table () {
		for (var i = 0; i < m; i++) {
			 $("#life").append('<tr id="tr-'+ i + '">');
			for (var j = 0; j < n; j++) {
				$("#life tr#tr-" + i).append('<td id="tr-' + i + 'td-'+ j + '">');
			};
		}
	}
	function updateTable (n1,m1) {
		n = n1;
		m = m1;
		$("#life").empty();
		table ();
	}
	$(".widthTable").change(function () {
		var val = parseInt(this.value);
		if ((Math.floor((width-7)/16)) < val) {
			alert("не достаточное разрешение экрана для отображения такого поля");
		} else if (!isNaN(val)) {
			updateTable (val,m);
		}
	});
	$(".heightTable").change(function () {
		var val = parseInt(this.value);
		if (!isNaN(val)) {
			updateTable (n,val);
		}
	});
	table ();
	$('body').on('click', 'td', function(){
		if ($(this).hasClass("life")) {
			$(this).removeClass("life");
		} else{
			$(this).addClass("life");
		}
	})
	function stoped () {
		clearInterval(timer);
		$(".born").removeClass("born");
		// $("td").css('opacity',1);
		$(".stop").css('display','none');
		$(".start").css('display','inline-block');
		$(".navbar").css("pointer-events","auto").css("cursor","pointer").css("opacity","1");
	}
	function runLife () {
		for (var i = 0; i < $(".life").length; i++) {
				var trNum = parseInt($(".life")[i].parentNode.id.substring(3));
				var tdNum = (trNum<10) ? parseInt($(".life")[i].id.substring(7)):
				parseInt($(".life")[i].id.substring(8));
			for (var j = trNum-1; j <= trNum+1; j++) {
				for (var k = tdNum - 1; k <= tdNum + 1; k++) {
					var l = (j === m) ? 0 : (j === -1) ? m - 1 : j;
					var h = (k === n) ? 0 : (k === -1) ? n - 1 : k;
					var neighbor = $("#tr-"+l+"td-"+h)[0];
					life = 0;
					for (var a = l-1; a <= l+1; a++) {
						for (var b = h - 1; b <= h + 1; b++) {
							var c = (a === m) ? 0 : (a === -1) ? m - 1 : a;
							var d = (b === n) ? 0 : (b === -1) ? n - 1 : b;
							var neighborNext = $("#tr-"+c+"td-"+d)[0];
							if ( $(neighborNext).hasClass("life"))life++;
							if (($(neighbor).hasClass("life")&&life === 4)||(life === 3)){
								$(neighbor).addClass("born");
							} else {
								$(neighbor).removeClass("born");
							};
						};
					};
					// if (($(neighbor).hasClass("life"))&&($(neighbor).hasClass("born"))) {
					// 	$(neighbor).css('opacity','1');
					// } else if ($(neighbor).hasClass("life")) {
					// 	$(neighbor).animate({
					// 		"opacity" : 0}, 500);
					// } else if ($(neighbor).hasClass("born")) {
					// 	$(neighbor).animate({
					// 		"opacity" : 1}, 500);
					// };
				};
			};
		};
		$(".life").removeClass("life");
		$(".born").addClass("life").css('opacity','1');
		$(".born").removeClass("born");
		if (neighbor == undefined) stoped ();
	}


	function start () {
		timer = setInterval(function () {
				runLife ();
			}, sec);
		$(".start").css('display','none');
		$(".navbar").css("pointer-events","none").css("cursor","default").css("opacity","0.2");
		$(".stop").css('display','inline-block');
	}
	$(".onestep").click(function(){
		stoped();
		runLife ();
	});
	$(".start").click(function(){
		start();
	});
	$(".stop").click(function(){
		stoped();
	});
	$(".clear").click(function(){
		$(".life").removeClass("life");
		stoped();
	});


	function coordinates (xSize, zSize) {
		$(".life").removeClass("life");
		if (xSize < m && zSize < n) {
			x = Math.floor(m / 2) - Math.floor(xSize / 2);
			z = Math.floor(n / 2) - Math.floor(zSize / 2);
		} else {
			alert("Извините для данной фигуры недостаточно места");
			z = NaN;
			x = NaN;
		}
	}
//**************  FIGURES   *************************//
	function addFig(addX, addZ) {
		$("#tr-"+addX+"td-"+addZ).addClass("life");
	}
	function block() {
		addFig (x,z);
		addFig ((x+1), z);
		addFig (x, (z+1));
		addFig ((x+1), (z+1));
	}
	$(".cGoLBlock").click(function(){
		coordinates (2,2);
		block();
	});
	function biBlock() {
		addFig (x,z);
		addFig ((x+1), z);
		addFig (x, (z+1));
		addFig ((x+1), (z+1));

		addFig (x,(z+3));
		addFig ((x+1), (z+3));
		addFig (x, (z+4));
		addFig ((x+1), (z+4));
	}
	$(".biblock").click(function(){
		coordinates (2,6);
		biBlock();
	});
	function hive() {
		addFig (x,(z+2));
		addFig (x,(z+3));
		addFig ((x+1),(z+1));
		addFig ((x+1),(z+4));
		addFig ((x+2),(z+2));
		addFig ((x+2), (z+3));
	}
	$(".hive").click(function(){
		coordinates (3,6);
		hive();
	});
	function honeyFarm() {
		addFig ((x+5),(z+1));
		addFig ((x+5),(z+2));
		addFig ((x+6),z);
		addFig ((x+6),(z+3));
		addFig ((x+7),(z+1));
		addFig ((x+7),(z+2));

		addFig (x,(z+6));
		addFig ((x+1),(z+5));
		addFig ((x+2),(z+5));
		addFig ((x+1),(z+7));
		addFig ((x+2),(z+7));
		addFig ((x+3),(z+6));

		addFig ((x+9),(z+6));
		addFig ((x+10),(z+5));
		addFig ((x+11),(z+5));
		addFig ((x+10),(z+7));
		addFig ((x+11),(z+7));
		addFig ((x+12), (z+6));

		addFig ((x+5),(z+10));
		addFig ((x+5),(z+11));
		addFig ((x+6),(z+9));
		addFig ((x+6),(z+12));
		addFig ((x+7),(z+10));
		addFig ((x+7),(z+11));
	}
	$(".honeyFarm").click(function(){
		coordinates (13,13);
		honeyFarm();
	});
	function loaf() {
		addFig (x,(z+2));
		addFig ((x+1),(z+1));
		addFig ((x+1),(z+3));
		addFig ((x+2),z);
		addFig ((x+2),(z+3));
		addFig ((x+3),(z+1));
		addFig ((x+3),(z+2));
	}
	$(".loaf").click(function(){
		coordinates (4,4);
		loaf();
	});
	function box() {
		addFig (x,(z+1));
		addFig ((x+1),z);
		addFig ((x+1),(z+2));
		addFig ((x+2),(z+1));
	}
	$(".box").click(function(){
		coordinates (2,2);
		box();
	});
	function barge() {
		addFig (x,(z+1));
		addFig ((x+1),z);
		addFig ((x+1),(z+2));
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+3));
		addFig ((x+3),(z+4));
		addFig ((x+3),(z+2));
		addFig ((x+4),(z+3));
		addFig ((x+4),(z+5));
		addFig ((x+5),(z+4));
	}
	$(".barge").click(function(){
		coordinates (6,6);
		barge();
	});
		function boat() {
		addFig (x,z);
		addFig (x,(z+1));
		addFig ((x+1),z);
		addFig ((x+1),(z+2));
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+3));
		addFig ((x+3),(z+4));
		addFig ((x+3),(z+2));
		addFig ((x+4),(z+3));
		addFig ((x+4),(z+5));
		addFig ((x+5),(z+4));
	}
	$(".boat").click(function(){
		coordinates (6,6);
		boat();
	});
	function tie() {
		addFig (x,(z+1));
		addFig ((x+1),z);
		addFig ((x+1),(z+2));
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+2));

		addFig ((x+3),(z+3));
		addFig ((x+3),(z+4));
		addFig ((x+4),(z+3));
		addFig ((x+4),(z+5));
		addFig ((x+5),(z+4));

	}
	$(".tie").click(function(){
		coordinates (6,6);
		tie();
	});
	function canoe() {
		addFig (x,(z+3));
		addFig (x,(z+4));
		addFig ((x+1),(z+4));
		addFig ((x+2),(z+3));
		addFig ((x+3),(z+2));
		addFig ((x+3),z);
		addFig ((x+4),(z+1));
		addFig ((x+4),z);

	}
	$(".canoe").click(function(){
		coordinates (5,5);
		canoe();
	});
	function aircraft() {
		addFig (x,z);
		addFig (x,(z+1));
		addFig ((x+1),z);
		addFig ((x+1),(z+3));
		addFig ((x+2),(z+2));
		addFig ((x+2),(z+3));
	}
	$(".aircraft").click(function(){
		coordinates (4,3);
		aircraft();
	});
	function integral() {
		addFig (x,(z+3));
		addFig (x,(z+4));
		addFig ((x+1),(z+2));
		addFig ((x+1),(z+4));
		addFig ((x+2),(z+2));
		addFig ((x+2),z);
		addFig ((x+3),(z+1));
		addFig ((x+3),z);
	}
	$(".integral").click(function(){
		coordinates (4,3);
		integral();
	});
	function mango() {
		addFig (x,(z+1));
		addFig (x,(z+2));
		addFig ((x+1),z);
		addFig ((x+1),(z+3));
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+4));
		addFig ((x+3),(z+2));
		addFig ((x+3),(z+3));
	}
	$(".mango").click(function(){
		coordinates (5,4);
		mango();
	});
	function pond() {
		addFig (x,(z+1));
		addFig (x,(z+2));
		addFig ((x+1),z);
		addFig ((x+1),(z+3));
		addFig ((x+2),z);
		addFig ((x+2),(z+3));
		addFig ((x+3),(z+1));
		addFig ((x+3),(z+2));
	}
	$(".pond").click(function(){
		coordinates (5,4);
		pond();
	});
	function blinker() {
		addFig (x,(z+1));
		addFig ((x+1),(z+1));
		addFig ((x+2),(z+1));
	}
	$(".blinker").click(function(){
		coordinates (3,3);
		blinker();
		start();
	});
	function star() {
		addFig (x,(z+5));
		addFig ((x+1),(z+4));
		addFig ((x+1),(z+5));
		addFig ((x+1),(z+6));

		addFig ((x+2),(z+2));
		addFig ((x+2),(z+3));
		addFig ((x+2),(z+4));
		addFig ((x+2),(z+6));
		addFig ((x+2),(z+7));
		addFig ((x+2),(z+8));

		addFig ((x+3),(z+2));
		addFig ((x+3),(z+8));

		addFig ((x+4),(z+1));
		addFig ((x+4),(z+2));
		addFig ((x+4),(z+8));
		addFig ((x+4),(z+9));

		addFig ((x+5),z);
		addFig ((x+5),(z+1));
		addFig ((x+5),(z+9));
		addFig ((x+5),(z+10));

		addFig ((x+6),(z+1));
		addFig ((x+6),(z+2));
		addFig ((x+6),(z+8));
		addFig ((x+6),(z+9));

		addFig ((x+7),(z+2));
		addFig ((x+7),(z+8));

		addFig ((x+8),(z+2));
		addFig ((x+8),(z+3));
		addFig ((x+8),(z+4));
		addFig ((x+8),(z+6));
		addFig ((x+8),(z+7));
		addFig ((x+8),(z+8));

		addFig ((x+9),(z+4));
		addFig ((x+9),(z+5));
		addFig ((x+9),(z+6));

		addFig ((x+10),(z+5));
	}
	$(".star").click(function(){
		coordinates (11,11);
		star();
		start();
	});
	function cross() {
		addFig (x,(z+2));
		addFig (x,(z+3));
		addFig (x,(z+4));
		addFig (x,(z+5));

		addFig ((x+1),(z+2));
		addFig ((x+1),(z+5));

		addFig ((x+2),z);
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+2));
		addFig ((x+2),(z+5));
		addFig ((x+2),(z+6));
		addFig ((x+2),(z+7));

		addFig ((x+3),z);
		addFig ((x+3),(z+7));

		addFig ((x+4),z);
		addFig ((x+4),(z+7));

		addFig ((x+5),z);
		addFig ((x+5),(z+1));
		addFig ((x+5),(z+2));
		addFig ((x+5),(z+5));
		addFig ((x+5),(z+6));
		addFig ((x+5),(z+7));

		addFig ((x+6),(z+2));
		addFig ((x+6),(z+5));

		addFig ((x+7),(z+2));
		addFig ((x+7),(z+3));
		addFig ((x+7),(z+4));
		addFig ((x+7),(z+5));
	}
	$(".cross").click(function(){
		coordinates (8,8);
		cross();
		start();
	});
	function french() {
		addFig (x,(z+7));
		addFig (x,(z+8));

		addFig ((x+1),(z+7));

		addFig ((x+2),(z+4));
		addFig ((x+2),(z+5));
		addFig ((x+2),(z+7));

		addFig ((x+3),(z+3));
		addFig ((x+3),(z+6));

		addFig ((x+4),(z+3));
		addFig ((x+4),(z+4));

		addFig ((x+5),(z+4));
		addFig ((x+5),(z+5));

		addFig ((x+6),(z+2));
		addFig ((x+6),(z+5));

		addFig ((x+7),(z+1));
		addFig ((x+7),(z+3));
		addFig ((x+7),(z+4));

		addFig ((x+8),(z+1));

		addFig ((x+9),z);
		addFig ((x+9),(z+1));
	}
	$(".french").click(function(){
		coordinates (10,9);
		french();
		start();
	});
	function clock() {
		addFig (x,(z+6));
		addFig (x,(z+7));

		addFig ((x+1),(z+6));
		addFig ((x+1),(z+7));

		addFig ((x+3),(z+4));
		addFig ((x+3),(z+5));
		addFig ((x+3),(z+6));
		addFig ((x+3),(z+7));

		addFig ((x+4),z);
		addFig ((x+4),(z+1));
		addFig ((x+4),(z+3));
		addFig ((x+4),(z+8));

		addFig ((x+5),z);
		addFig ((x+5),(z+1));
		addFig ((x+5),(z+3));
		addFig ((x+5),(z+4));//стрелка
		addFig ((x+5),(z+8));

		addFig ((x+6),(z+3));
		addFig ((x+6),(z+5));//стрелка
		addFig ((x+6),(z+6));//стрелка
		addFig ((x+6),(z+8));
		addFig ((x+6),(z+10));
		addFig ((x+6),(z+11));

		addFig ((x+7),(z+3));
		addFig ((x+7),(z+8));
		addFig ((x+7),(z+10));
		addFig ((x+7),(z+11));

		addFig ((x+8),(z+4));
		addFig ((x+8),(z+5));
		addFig ((x+8),(z+6));
		addFig ((x+8),(z+7));

		addFig ((x+10),(z+4));
		addFig ((x+10),(z+5));

		addFig ((x+11),(z+4));
		addFig ((x+11),(z+5));
	}
	$(".clock").click(function(){
		coordinates (12,12);
		clock();
		start();
	});
	function pinwheel() {
		addFig (x,(z+6));
		addFig (x,(z+7));

		addFig ((x+1),(z+6));
		addFig ((x+1),(z+7));

		addFig ((x+3),(z+4));
		addFig ((x+3),(z+5));
		addFig ((x+3),(z+6));
		addFig ((x+3),(z+7));

		addFig ((x+4),z);
		addFig ((x+4),(z+1));
		addFig ((x+4),(z+3));
		addFig ((x+4),(z+6));//стрелка
		addFig ((x+4),(z+8));

		addFig ((x+5),z);
		addFig ((x+5),(z+1));
		addFig ((x+5),(z+3));
		addFig ((x+5),(z+4));//стрелка
		addFig ((x+5),(z+8));

		addFig ((x+6),(z+3));
		addFig ((x+6),(z+5));//стрелка
		addFig ((x+6),(z+8));
		addFig ((x+6),(z+10));
		addFig ((x+6),(z+11));

		addFig ((x+7),(z+3));
		addFig ((x+7),(z+8));
		addFig ((x+7),(z+10));
		addFig ((x+7),(z+11));

		addFig ((x+8),(z+4));
		addFig ((x+8),(z+5));
		addFig ((x+8),(z+6));
		addFig ((x+8),(z+7));

		addFig ((x+10),(z+4));
		addFig ((x+10),(z+5));

		addFig ((x+11),(z+4));
		addFig ((x+11),(z+5));
	}
	$(".pinwheel").click(function(){
		coordinates (12,12);
		pinwheel();
		start();
	});
	function octagon() {
		addFig (x,(z+3));
		addFig (x,(z+4));

		addFig ((x+1),(z+2));
		addFig ((x+1),(z+5));

		addFig ((x+2),(z+1));
		addFig ((x+2),(z+6));

		addFig ((x+3),z);
		addFig ((x+3),(z+7));

		addFig ((x+4),z);
		addFig ((x+4),(z+7));

		addFig ((x+5),(z+1));
		addFig ((x+5),(z+6));

		addFig ((x+6),(z+2));
		addFig ((x+6),(z+5));

		addFig ((x+7),(z+3));
		addFig ((x+7),(z+4));
	}
	$(".octagon").click(function(){
		coordinates (8,8);
		octagon();
		start();
	});
	function fumarole() {
		addFig (x,(z+3));
		addFig (x,(z+4));

		addFig ((x+1),(z+1));
		addFig ((x+1),(z+2));
		addFig ((x+1),(z+5));
		addFig ((x+1),(z+6));

		addFig ((x+2),(z+1));
		addFig ((x+2),(z+6));

		addFig ((x+3),(z+2));
		addFig ((x+3),(z+5));

		addFig ((x+4),z);
		addFig ((x+4),(z+2));
		addFig ((x+4),(z+5));
		addFig ((x+4),(z+7));

		addFig ((x+5),z);
		addFig ((x+5),(z+1));
		addFig ((x+5),(z+6));
		addFig ((x+5),(z+7));

	}
	$(".fumarole").click(function(){
		coordinates (6,8);
		fumarole();
		start();
	});
	function eight() {
		addFig (x,z);
		addFig (x,(z+1));
		addFig (x,(z+2));

		addFig ((x+1),z);
		addFig ((x+1),(z+1));
		addFig ((x+1),(z+2));

		addFig ((x+2),z);
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+2));

		addFig ((x+3),(z+3));
		addFig ((x+3),(z+4));
		addFig ((x+3),(z+5));

		addFig ((x+4),(z+3));
		addFig ((x+4),(z+4));
		addFig ((x+4),(z+5));

		addFig ((x+5),(z+3));
		addFig ((x+5),(z+4));
		addFig ((x+5),(z+5));

	}
	$(".eight").click(function(){
		coordinates (6,6);
		eight();
		start();
	});
	function champagne() {
		addFig (x,(z+3));
		addFig (x,(z+4));
		addFig (x,(z+10));
		addFig (x,(z+11));

		addFig ((x+1),(z+3));
		addFig ((x+1),(z+11));

		addFig ((x+2),z);
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+3));
		addFig ((x+2),(z+11));
		addFig ((x+2),(z+13));
		addFig ((x+2),(z+14));

		addFig ((x+3),z);
		addFig ((x+3),(z+3));
		addFig ((x+3),(z+4));
		addFig ((x+3),(z+10));
		addFig ((x+3),(z+11));
		addFig ((x+3),(z+14));

		addFig ((x+4),(z+1));
		addFig ((x+4),(z+2));
		addFig ((x+4),(z+5));
		addFig ((x+4),(z+12));
		addFig ((x+4),(z+13));

		addFig ((x+5),(z+3));
		addFig ((x+5),(z+4));
		addFig ((x+5),(z+9));
		addFig ((x+5),(z+10));
		addFig ((x+5),(z+11));

		addFig ((x+6),(z+3));
		addFig ((x+6),(z+6));
		addFig ((x+6),(z+11));

		addFig ((x+7),(z+4));
		addFig ((x+7),(z+5));
		addFig ((x+7),(z+6));
		addFig ((x+7),(z+7));
		addFig ((x+7),(z+8));
		addFig ((x+7),(z+9));
		addFig ((x+7),(z+10));

		addFig ((x+9),(z+6));
		addFig ((x+9),(z+7));
		addFig ((x+9),(z+8));

		addFig ((x+10),(z+6));
		addFig ((x+10),(z+9));

		addFig ((x+11),(z+8));
		addFig ((x+11),(z+9));
	}
	$(".champagne").click(function(){
		coordinates (12,15);
		champagne();
		start();
	});
		function achims() {
		addFig (x,z);
		addFig (x,(z+1));
		addFig (x,(z+26));
		addFig (x,(z+27));

		addFig ((x+1),z);
		addFig ((x+1),(z+1));
		addFig ((x+1),(z+26));
		addFig ((x+1),(z+27));

		addFig ((x+2),(z+18));
		addFig ((x+2),(z+19));

		addFig ((x+3),(z+17));
		addFig ((x+3),(z+20));

		addFig ((x+4),(z+18));
		addFig ((x+4),(z+19));

		addFig ((x+5),(z+14));

		addFig ((x+6),(z+4));
		addFig ((x+6),(z+5));
		addFig ((x+6),(z+14));

		addFig ((x+7),(z+13));
		addFig ((x+7),(z+15));

		addFig ((x+8),(z+14));

		addFig ((x+9),(z+12));
		addFig ((x+9),(z+15));

		addFig ((x+10),(z+13));

		addFig ((x+11),(z+12));
		addFig ((x+11),(z+14));

		addFig ((x+12),(z+13));
		addFig ((x+12),(z+22));
		addFig ((x+12),(z+23));

		addFig ((x+13),(z+13));

		addFig ((x+14),(z+8));
		addFig ((x+14),(z+9));

		addFig ((x+15),(z+7));
		addFig ((x+15),(z+10));

		addFig ((x+16),(z+8));
		addFig ((x+16),(z+9));

		addFig ((x+17),z);
		addFig ((x+17),(z+1));
		addFig ((x+17),(z+26));
		addFig ((x+17),(z+27));

		addFig ((x+18),z);
		addFig ((x+18),(z+1));
		addFig ((x+18),(z+26));
		addFig ((x+18),(z+27));
	}
	$(".achims").click(function(){
		coordinates (19,28);
		achims();
		start();
	});
		function glider() {
		addFig (x,(z+1));

		addFig ((x+1),(z+2));

		addFig ((x+2),z);
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+2));
	}
	$(".glider").click(function(){
		coordinates (3,3);
		glider();
		start();
	});
	function spaceship() {
		addFig (x,(z+1));
		addFig (x,(z+2));
		addFig (x,(z+3));
		addFig (x,(z+4));
		addFig (x,(z+5));

		addFig ((x+1),z);
		addFig ((x+1),(z+5));

		addFig ((x+2),(z+5));

		addFig ((x+3),z);
		addFig ((x+3),(z+4));

		addFig ((x+4),(z+2));
	}
	$(".spaceship").click(function(){
		coordinates (6,5);
		spaceship();
		start();
	});

	function brain() {
		addFig (x,(z+2));
		addFig (x,(z+3));
		addFig (x,(z+9));

		addFig ((x+1),z);
		addFig ((x+1),(z+1));
		addFig ((x+1),(z+9));

		addFig ((x+2),z);
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+3));
		addFig ((x+2),(z+6));
		addFig ((x+2),(z+7));
		addFig ((x+2),(z+9));

		addFig ((x+3),(z+6));

		addFig ((x+4),(z+1));
		addFig ((x+4),(z+2));
		addFig ((x+4),(z+4));
		addFig ((x+4),(z+9));

		addFig ((x+5),(z+1));
		addFig ((x+5),(z+2));
		addFig ((x+5),(z+5));
		addFig ((x+5),(z+6));
		addFig ((x+5),(z+7));

		addFig ((x+6),(z+3));
		addFig ((x+6),(z+10));

		addFig ((x+7),(z+3));
		addFig ((x+7),(z+4));
		addFig ((x+7),(z+5));
		addFig ((x+7),(z+6));
		addFig ((x+7),(z+7));
		addFig ((x+7),(z+8));
		addFig ((x+7),(z+10));

		addFig ((x+9),(z+3));
		addFig ((x+9),(z+4));
		addFig ((x+9),(z+5));
		addFig ((x+9),(z+6));
		addFig ((x+9),(z+7));
		addFig ((x+9),(z+8));
		addFig ((x+9),(z+10));

		addFig ((x+10),(z+3));
		addFig ((x+10),(z+10));

		addFig ((x+11),(z+1));
		addFig ((x+11),(z+2));
		addFig ((x+11),(z+5));
		addFig ((x+11),(z+6));
		addFig ((x+11),(z+7));

		addFig ((x+12),(z+1));
		addFig ((x+12),(z+2));
		addFig ((x+12),(z+4));
		addFig ((x+12),(z+9));

		addFig ((x+13),(z+6));

		addFig ((x+14),z);
		addFig ((x+14),(z+1));
		addFig ((x+14),(z+3));
		addFig ((x+14),(z+6));
		addFig ((x+14),(z+7));
		addFig ((x+14),(z+9));

		addFig ((x+15),z);
		addFig ((x+15),(z+1));
		addFig ((x+15),(z+9));

		addFig ((x+16),(z+2));
		addFig ((x+16),(z+3));
		addFig ((x+16),(z+9));

	}
	$(".brain").click(function(){
		coordinates (17,11);
		brain();
		start();
	});
		function dart() {
		addFig (x,(z+8));

		addFig ((x+1),(z+7));
		addFig ((x+1),(z+9));

		addFig ((x+2),(z+6));
		addFig ((x+2),(z+7));

		addFig ((x+3),(z+9));

		addFig ((x+4),(z+5));
		addFig ((x+4),(z+9));

		addFig ((x+5),(z+2));
		addFig ((x+5),(z+5));

		addFig ((x+6),(z+1));
		addFig ((x+6),(z+3));
		addFig ((x+6),(z+6));
		addFig ((x+6),(z+7));
		addFig ((x+6),(z+8));
		addFig ((x+6),(z+9));

		addFig ((x+7),z);
		addFig ((x+7),(z+3));

		addFig ((x+8),(z+1));
		addFig ((x+8),(z+3));
		addFig ((x+8),(z+6));
		addFig ((x+8),(z+7));
		addFig ((x+8),(z+8));
		addFig ((x+8),(z+9));

		addFig ((x+9),(z+2));
		addFig ((x+9),(z+5));

		addFig ((x+10),(z+5));
		addFig ((x+10),(z+9));

		addFig ((x+11),(z+9));

		addFig ((x+12),(z+6));
		addFig ((x+12),(z+7));

		addFig ((x+13),(z+7));
		addFig ((x+13),(z+9));

		addFig ((x+14),(z+8));
	}
	$(".dart").click(function(){
		coordinates (15,10);
		dart();
		start();
	});
		function flotila() {
		addFig (x,(z+4));
		addFig (x,(z+5));
		addFig (x,(z+6));
		addFig (x,(z+7));

		addFig ((x+1),(z+3));
		addFig ((x+1),(z+4));
		addFig ((x+1),(z+5));
		addFig ((x+1),(z+6));
		addFig ((x+1),(z+7));
		addFig ((x+1),(z+8));

		addFig ((x+2),(z+2));
		addFig ((x+2),(z+3));
		addFig ((x+2),(z+5));
		addFig ((x+2),(z+6));
		addFig ((x+2),(z+7));
		addFig ((x+2),(z+8));

		addFig ((x+3),(z+3));
		addFig ((x+3),(z+4));

		addFig ((x+5),(z+11));
		addFig ((x+5),(z+12));

		addFig ((x+6),(z+1));
		addFig ((x+6),(z+14));

		addFig ((x+7),z);

		addFig ((x+8),z);
		addFig ((x+8),(z+14));

		addFig ((x+9),z);
		addFig ((x+9),(z+1));
		addFig ((x+9),(z+2));
		addFig ((x+9),(z+3));
		addFig ((x+9),(z+4));
		addFig ((x+9),(z+5));
		addFig ((x+9),(z+6));
		addFig ((x+9),(z+7));
		addFig ((x+9),(z+8));
		addFig ((x+9),(z+9));
		addFig ((x+9),(z+10));
		addFig ((x+9),(z+11));
		addFig ((x+9),(z+12));
		addFig ((x+9),(z+13));

		addFig ((x+12),(z+4));
		addFig ((x+12),(z+5));
		addFig ((x+12),(z+6));
		addFig ((x+12),(z+7));

		addFig ((x+13),(z+3));
		addFig ((x+13),(z+4));
		addFig ((x+13),(z+5));
		addFig ((x+13),(z+6));
		addFig ((x+13),(z+7));
		addFig ((x+13),(z+8));

		addFig ((x+14),(z+2));
		addFig ((x+14),(z+3));
		addFig ((x+14),(z+5));
		addFig ((x+14),(z+6));
		addFig ((x+14),(z+7));
		addFig ((x+14),(z+8));

		addFig ((x+15),(z+3));
		addFig ((x+15),(z+4));
	}
	$(".flotila").click(function(){
		coordinates (16,15);
		flotila();
		start();
	});
		function hivenudg() {
		addFig (x,z);
		addFig (x,(z+1));
		addFig (x,(z+2));
		addFig (x,(z+3));
		addFig (x,(z+9));
		addFig (x,(z+12));

		addFig ((x+1),z);
		addFig ((x+1),(z+4));
		addFig ((x+1),(z+8));

		addFig ((x+2),z);
		addFig ((x+2),(z+8));
		addFig ((x+2),(z+12));

		addFig ((x+3),(z+1));
		addFig ((x+3),(z+4));
		addFig ((x+3),(z+8));
		addFig ((x+3),(z+9));
		addFig ((x+3),(z+10));
		addFig ((x+3),(z+11));

		addFig ((x+5),(z+5));
		addFig ((x+5),(z+6));

		addFig ((x+6),(z+5));
		addFig ((x+6),(z+6));

		addFig ((x+7),(z+5));
		addFig ((x+7),(z+6));

		addFig ((x+9),(z+1));
		addFig ((x+9),(z+4));
		addFig ((x+9),(z+8));
		addFig ((x+9),(z+9));
		addFig ((x+9),(z+10));
		addFig ((x+9),(z+11));

		addFig ((x+10),z);
		addFig ((x+10),(z+8));
		addFig ((x+10),(z+12));

		addFig ((x+11),z);
		addFig ((x+11),(z+4));
		addFig ((x+11),(z+8));

		addFig ((x+12),z);
		addFig ((x+12),(z+1));
		addFig ((x+12),(z+2));
		addFig ((x+12),(z+3));
		addFig ((x+12),(z+9));
		addFig ((x+12),(z+12));
	}
	$(".hivenudg").click(function(){
		coordinates (13,13);
		hivenudg();
		start();
	});
	function schckEngine() {
		addFig (x,z);
		addFig (x,(z+1));
		addFig (x,(z+2));
		addFig (x,(z+3));

		addFig ((x+1),z);
		addFig ((x+1),(z+4));
		addFig ((x+1),(z+14));

		addFig ((x+2),z);
		addFig ((x+2),(z+12));
		addFig ((x+2),(z+13));

		addFig ((x+3),(z+1));
		addFig ((x+3),(z+4));
		addFig ((x+3),(z+7));
		addFig ((x+3),(z+8));
		addFig ((x+3),(z+14));
		addFig ((x+3),(z+15));
		addFig ((x+3),(z+16));

		addFig ((x+4),(z+6));
		addFig ((x+4),(z+7));
		addFig ((x+4),(z+8));
		addFig ((x+4),(z+15));
		addFig ((x+4),(z+16));
		addFig ((x+4),(z+17));

		addFig ((x+5),(z+1));
		addFig ((x+5),(z+4));
		addFig ((x+5),(z+7));
		addFig ((x+5),(z+8));
		addFig ((x+5),(z+14));
		addFig ((x+5),(z+15));
		addFig ((x+5),(z+16));

		addFig ((x+6),z);
		addFig ((x+6),(z+12));
		addFig ((x+6),(z+13));

		addFig ((x+7),z);
		addFig ((x+7),(z+4));
		addFig ((x+7),(z+14));

		addFig ((x+8),z);
		addFig ((x+8),(z+1));
		addFig ((x+8),(z+2));
		addFig ((x+8),(z+3));
	}
	$(".schckEngine").click(function(){
		coordinates (9,18);
		schckEngine();
		start();
	});
	function weekend() {
		addFig (x,(z+7));
		addFig (x,(z+8));
		addFig (x,(z+9));

		addFig ((x+1),(z+6));
		addFig ((x+1),(z+7));
		addFig ((x+1),(z+9));

		addFig ((x+2),(z+4));
		addFig ((x+2),(z+6));
		addFig ((x+2),(z+7));
		addFig ((x+2),(z+8));
		addFig ((x+2),(z+9));

		addFig ((x+3),(z+3));

		addFig ((x+4),(z+3));
		addFig ((x+4),(z+4));

		addFig ((x+5),z);
		addFig ((x+5),(z+1));
		addFig ((x+5),(z+2));
		addFig ((x+5),(z+3));

		addFig ((x+6),(z+3));
		addFig ((x+6),(z+5));

		addFig ((x+7),(z+3));
		addFig ((x+7),(z+6));

		addFig ((x+8),(z+3));
		addFig ((x+8),(z+6));

		addFig ((x+9),(z+3));
		addFig ((x+9),(z+5));

		addFig ((x+10),z);
		addFig ((x+10),(z+1));
		addFig ((x+10),(z+2));
		addFig ((x+10),(z+3));

		addFig ((x+11),(z+3));
		addFig ((x+11),(z+4));

		addFig ((x+12),(z+3));

		addFig ((x+13),(z+4));
		addFig ((x+13),(z+6));
		addFig ((x+13),(z+7));
		addFig ((x+13),(z+8));
		addFig ((x+13),(z+9));

		addFig ((x+14),(z+6));
		addFig ((x+14),(z+7));
		addFig ((x+14),(z+9));

		addFig ((x+15),(z+7));
		addFig ((x+15),(z+8));
		addFig ((x+15),(z+9));
	}
	$(".weekend").click(function(){
		coordinates (16,10);
		weekend();
		start();
	});
	function spider() {
		addFig (x,(z+9));
		addFig (x,(z+10));
		addFig (x,(z+16));
		addFig (x,(z+17));

		addFig ((x+1),(z+1));
		addFig ((x+1),(z+2));
		addFig ((x+1),(z+3));
		addFig ((x+1),(z+4));
		addFig ((x+1),(z+6));
		addFig ((x+1),(z+8));
		addFig ((x+1),(z+10));
		addFig ((x+1),(z+16));
		addFig ((x+1),(z+18));
		addFig ((x+1),(z+20));
		addFig ((x+1),(z+22));
		addFig ((x+1),(z+23));
		addFig ((x+1),(z+24));
		addFig ((x+1),(z+25));

		addFig ((x+2),z);
		addFig ((x+2),(z+1));
		addFig ((x+2),(z+2));
		addFig ((x+2),(z+4));
		addFig ((x+2),(z+6));
		addFig ((x+2),(z+8));
		addFig ((x+2),(z+9));
		addFig ((x+2),(z+11));
		addFig ((x+2),(z+15));
		addFig ((x+2),(z+17));
		addFig ((x+2),(z+18));
		addFig ((x+2),(z+20));
		addFig ((x+2),(z+22));
		addFig ((x+2),(z+24));
		addFig ((x+2),(z+25));
		addFig ((x+2),(z+26));

		addFig ((x+3),z);
		addFig ((x+3),(z+4));
		addFig ((x+3),(z+6));
		addFig ((x+3),(z+20));
		addFig ((x+3),(z+22));
		addFig ((x+3),(z+26));

		addFig ((x+4),(z+1));
		addFig ((x+4),(z+3));
		addFig ((x+4),(z+4));
		addFig ((x+4),(z+5));
		addFig ((x+4),(z+11));
		addFig ((x+4),(z+12));
		addFig ((x+4),(z+14));
		addFig ((x+4),(z+15));
		addFig ((x+4),(z+21));
		addFig ((x+4),(z+22));
		addFig ((x+4),(z+23));
		addFig ((x+4),(z+25));

		addFig ((x+5),(z+1));
		addFig ((x+5),(z+2));
		addFig ((x+5),(z+24));
		addFig ((x+5),(z+25));

		addFig ((x+6),(z+1));
		addFig ((x+6),(z+2));
		addFig ((x+6),(z+3));
		addFig ((x+6),(z+4));
		addFig ((x+6),(z+5));
		addFig ((x+6),(z+21));
		addFig ((x+6),(z+22));
		addFig ((x+6),(z+23));
		addFig ((x+6),(z+24));
		addFig ((x+6),(z+25));


		addFig ((x+7),(z+4));
		addFig ((x+7),(z+5));
		addFig ((x+7),(z+21));
		addFig ((x+7),(z+22));
	}
	$(".spider").click(function(){
		coordinates (8,22);
		spider();
		start();
	});
		function pushalong() {
		addFig (x,(z+2));
		addFig (x,(z+3));
		addFig (x,(z+4));
		addFig (x,(z+6));

		addFig ((x+1),(z+1));
		addFig ((x+1),(z+2));
		addFig ((x+1),(z+3));
		addFig ((x+1),(z+4));
		addFig ((x+1),(z+6));

		addFig ((x+2),z);
		addFig ((x+2),(z+1));

		addFig ((x+3),(z+1));
		addFig ((x+3),(z+3));

		addFig ((x+4),(z+2));
		addFig ((x+4),(z+3));
		addFig ((x+4),(z+4));
		addFig ((x+4),(z+5));
		addFig ((x+4),(z+7));

		addFig ((x+5),(z+3));
		addFig ((x+5),(z+4));
		addFig ((x+5),(z+5));

		addFig ((x+8),(z+6));
		addFig ((x+8),(z+7));
		addFig ((x+8),(z+8));
		addFig ((x+8),(z+9));
		addFig ((x+8),(z+10));

		addFig ((x+9),(z+6));
		addFig ((x+9),(z+11));

		addFig ((x+10),(z+6));

		addFig ((x+11),(z+7));
		addFig ((x+11),(z+11));


		addFig ((x+12),(z+9));
	}
	$(".pushalong").click(function(){
		coordinates (10,12);
		pushalong();
		start();
	});
	function gospergun() {
		addFig (x,(z+27));

		addFig ((x+1),(z+26));
		addFig ((x+1),(z+28));

		addFig ((x+2),(z+9));
		addFig ((x+2),(z+10));
		addFig ((x+2),(z+26));
		addFig ((x+2),(z+27));
		addFig ((x+2),(z+29));

		addFig ((x+3),(z+9));
		addFig ((x+3),(z+11));
		addFig ((x+3),(z+26));
		addFig ((x+3),(z+27));
		addFig ((x+3),(z+29));
		addFig ((x+3),(z+30));
		addFig ((x+3),(z+34));
		addFig ((x+3),(z+35));

		addFig ((x+4),(z+4));
		addFig ((x+4),(z+5));
		addFig ((x+4),(z+12));
		addFig ((x+4),(z+26));
		addFig ((x+4),(z+27));
		addFig ((x+4),(z+29));
		addFig ((x+4),(z+34));
		addFig ((x+4),(z+35));

		addFig ((x+5),z);
		addFig ((x+5),(z+1));
		addFig ((x+5),(z+3));
		addFig ((x+5),(z+6));
		addFig ((x+5),(z+9));
		addFig ((x+5),(z+12));
		addFig ((x+5),(z+26));
		addFig ((x+5),(z+28));

		addFig ((x+6),z);
		addFig ((x+6),(z+1));
		addFig ((x+6),(z+4));
		addFig ((x+6),(z+5));
		addFig ((x+6),(z+12));
		addFig ((x+6),(z+21));
		addFig ((x+6),(z+27));

		addFig ((x+7),(z+9));
		addFig ((x+7),(z+11));
		addFig ((x+7),(z+19));
		addFig ((x+7),(z+21));

		addFig ((x+8),(z+9));
		addFig ((x+8),(z+10));
		addFig ((x+8),(z+20));
		addFig ((x+8),(z+21));

		addFig ((x+15),(z+21));
		addFig ((x+15),(z+22));

		addFig ((x+16),(z+21));
		addFig ((x+16),(z+22));
		addFig ((x+16),(z+26));

		addFig ((x+17),(z+25));
		addFig ((x+17),(z+27));

		addFig ((x+18),(z+26));
		addFig ((x+18),(z+28));

		addFig ((x+19),(z+28));

		addFig ((x+20),(z+28));
		addFig ((x+20),(z+29));
	}
	$(".gospergun").click(function(){
		coordinates (21,35);
		gospergun();
		start();
	});
	function glidergenerator() {
		addFig (x,(z+4));
		addFig (x,(z+5));
		addFig (x,(z+6));
		addFig (x,(z+7));

		addFig ((x+2),(z+2));
		addFig ((x+2),(z+3));
		addFig ((x+2),(z+4));
		addFig ((x+2),(z+5));
		addFig ((x+2),(z+6));
		addFig ((x+2),(z+7));
		addFig ((x+2),(z+8));
		addFig ((x+2),(z+9));

		addFig ((x+4),z);
		addFig ((x+4),(z+1));
		addFig ((x+4),(z+2));
		addFig ((x+4),(z+3));
		addFig ((x+4),(z+4));
		addFig ((x+4),(z+5));
		addFig ((x+4),(z+6));
		addFig ((x+4),(z+7));
		addFig ((x+4),(z+8));
		addFig ((x+4),(z+9));
		addFig ((x+4),(z+10));
		addFig ((x+4),(z+11));

		addFig ((x+6),(z+2));
		addFig ((x+6),(z+3));
		addFig ((x+6),(z+4));
		addFig ((x+6),(z+5));
		addFig ((x+6),(z+6));
		addFig ((x+6),(z+7));
		addFig ((x+6),(z+8));
		addFig ((x+6),(z+9));

		addFig ((x+8),(z+4));
		addFig ((x+8),(z+5));
		addFig ((x+8),(z+6));
		addFig ((x+8),(z+7));
	}
	$(".glidergenerator").click(function(){
		coordinates (9,12);
		glidergenerator();
		start();
	});

});

