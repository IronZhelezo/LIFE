$(document).ready(function () {
	'use strict'

//*START ANIMATION*//
	var width = $(".content").width();
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

//*DRAW TABLE*//
	var m = 30;
	var n = Math.floor(width/16);
	function table () {
		for (var i = 0; i < m; i++) {
			 $("#life").append('<tr id="tr-'+ i + '">');
			for (var j = 0; j < n; j++) {
				$("#life tr#tr-" + i).append('<td id="tr-' + i + 'td-'+ j + '">');
			};
		}
	}

//*HANDLE UPDATE WIDTH OR/AND HEIGHT *//
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


//* HANDLE ADD OR DELETE LIFE CELL *//
	$('body').on('click', 'td', function(){
		if ($(this).hasClass("life")) {
			$(this).removeClass("life");
		} else{
			$(this).addClass("life");
		}
	})


//* RUN OR STOP LIFE CYCLE *//
	var life = 0;
	var timer;
	var z = 1;
	var x = 1;
	var sec = 1000;
	function stoped () {
		clearInterval(timer);
		$(".born").removeClass("born");
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
		var nah = 0;
	$(".onestep").click(function(){
		nah++;
		stoped();
		runLife ();
		console.log(nah);
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

//**************  FIGURES   *************************//
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
	function addFig(addX, addZ) {
		$("#tr-"+addX+"td-"+addZ).addClass("life");
	}
	$(".dropdown-menu div").click(function(){
		var thisDiv = $(this).attr('id');
		var thisFigure;
		for (var key in figures) if (thisDiv === key) thisFigure = figures[key];
		var arr = thisFigure.split('\n');
		coordinates (arr.length,arr[0].length);
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {
				var addX = x + i;
				if (arr[i][j] === "*") {
					var addZ = z + j;
					addFig (addX,addZ);
				}
			}
		}
		start();
	});

//*Sustainable figures*//
	var figures = {
		cGoLBlock:
			"**\n" +
			"**\n",

		biBlock:
			"** **\n" +
			"** **",

		hive:
			" ** \n" +
			"*  *\n" +
			" ** ",

		honeyFarm:
			"      *      \n" +
			"     * *     \n" +
			"     * *     \n" +
			"      *      \n" +
			"             \n" +
			" **       ** \n" +
			"*  *     *  *\n" +
			" **       ** \n" +
			"             \n" +
			"      *      \n" +
			"     * *     \n" +
			"     * *     \n" +
			"      *      ",

		loaf:
			"  * \n" +
			" * *\n" +
			"*  *\n" +
			" ** ",

		barge:
			" *    \n" +
			"* *   \n" +
			" * *  \n" +
			"  * * \n" +
			"   * *\n" +
			"    * ",

		boat:
			"**    \n" +
			"* *   \n" +
			" * *  \n" +
			"  * * \n" +
			"   * *\n" +
			"    * ",

		ship:
			"**    \n" +
			"* *   \n" +
			" * *  \n" +
			"  * * \n" +
			"   * *\n" +
			"    **",

		tie:
			" *    \n" +
			"* *   \n" +
			" **   \n" +
			"   ** \n" +
			"   * *\n" +
			"    * ",

		canoe:
			"   **\n" +
			"    *\n" +
			"   * \n" +
			"* *  \n" +
			"**   ",

		aircraft:
			"**  \n" +
			"*  *\n" +
			"  **",

		integral:
			"   **\n" +
			"  * *\n" +
			"  *  \n" +
			"* *  \n" +
			"**   ",

		mango:
			" **  \n" +
			"*  * \n" +
			" *  *\n" +
			"  ** ",

		pond:
			" ** \n" +
			"*  *\n" +
			"*  *\n" +
			" ** ",

//*Periodic figures*//
		blinker:
			" * \n" +
			" * \n" +
			" * ",

		star:
			"             \n" +
			"      *      \n" +
			"     ***     \n" +
			"   *** ***   \n" +
			"   *     *   \n" +
			"  **     **  \n" +
			" **       ** \n" +
			"  **     **  \n" +
			"   *     *   \n" +
			"   *** ***   \n" +
			"     ***     \n" +
			"      *      \n" +
			"             ",

		cross:
			"          \n" +
			"   ****   \n" +
			"   *  *   \n" +
			" ***  *** \n" +
			" *      * \n" +
			" *      * \n" +
			" ***  *** \n" +
			"   *  *   \n" +
			"   ****   ",

		french:
			"           \n" +
			"        ** \n" +
			"        *  \n" +
			"     ** *  \n" +
			"    *  *   \n" +
			"    **     \n" +
			"     **    \n" +
			"   *  *    \n" +
			"  * **     \n" +
			"  *        \n" +
			" **        \n",

		clock:
			"              \n" +
			"       **     \n" +
			"       **     \n" +
			"              \n" +
			"     ****     \n" +
			" ** *    *    \n" +
			" ** **   *    \n" +
			"    * ** * ** \n" +
			"    *    * ** \n" +
			"     ****     \n" +
			"              \n" +
			"     **       \n" +
			"     **       \n" +
			"              \n",

		pinwheel:
			"              \n" +
			"       **     \n" +
			"       **     \n" +
			"              \n" +
			"     ****     \n" +
			" ** *  * *    \n" +
			" ** **   *    \n" +
			"    * *  * ** \n" +
			"    *    * ** \n" +
			"     ****     \n" +
			"              \n" +
			"     **       \n" +
			"     **       \n" +
			"              \n",

		octagon:
			"   **   \n" +
			"  *  *  \n" +
			" *    * \n" +
			"*      *\n" +
			"*      *\n" +
			" *    * \n" +
			"  *  *  \n" +
			"   **   ",

		fumarole:
			"        \n" +
			"   **   \n" +
			" **  ** \n" +
			" *    * \n" +
			"  *  *  \n" +
			"* *  * *\n" +
		"**    **",

		eight:
			"        \n" +
			" ***    \n" +
			" ***    \n" +
			" ***    \n" +
			"    *** \n" +
			"    *** \n" +
			"    *** \n" +
			"          ",

		champagne:
			"                 \n" +
			"    **     **    \n" +
			"    *       *    \n" +
			" ** *       * ** \n" +
			" *  **     **  * \n" +
			"  **  *      **  \n" +
			"    **    ***    \n" +
			"    *  *    *    \n" +
			"     *******     \n" +
			"                 \n" +
			"       ***       \n" +
			"       *  *      \n" +
			"         **      ",

		achims:
			"                              \n" +
			" **                        ** \n" +
			" **                        ** \n" +
			"                   **         \n" +
			"                  *  *        \n" +
			"                   **         \n" +
			"               *              \n" +
			"     **        *              \n" +
			"              * *             \n" +
			"               *              \n" +
			"             *  *             \n" +
			"              *               \n" +
			"             * *              \n" +
			"              *        **     \n" +
			"              *               \n" +
			"         **                   \n" +
			"        *  *                  \n" +
			"         **                   \n" +
			" **                        ** \n" +
			" **                        ** \n" +
			"                              \n",

//*Glaider, spaceships*//
		glider:
			" * \n" +
			"  *\n" +
			"***\n",

		spaceship:
			" *****\n" +
			"*    *\n" +
			"     *\n" +
			"*   * \n" +
			" *    ",

		brain:
			"  **     * \n" +
			"**       * \n" +
			"** *  ** * \n" +
			"      *    \n" +
			" ** *    * \n" +
			" **  ***   \n" +
			"   *      *\n" +
			"   ****** *\n" +
			"           \n" +
			"   ****** *\n" +
			"   *      *\n" +
			" **  ***   \n" +
			" ** *    * \n" +
			"      *    \n" +
			"** *  ** * \n" +
			"**       * \n" +
			"  **     * ",

		dart:
			"        * \n" +
			"       * *\n" +
			"      **  \n" +
			"         *\n" +
			"     *   *\n" +
			"  *  *    \n" +
			" * *  ****\n" +
			"*  *      \n" +
			" * *  ****\n" +
			"  *  *    \n" +
			"     *   *\n" +
			"         *\n" +
			"      **  \n" +
			"       * *\n" +
			"        * ",

		flotila:
			"    ****       \n" +
			"   ******      \n" +
			"  ** ****      \n" +
			"   **          \n" +
			"               \n" +
			"           **  \n" +
			" *            *\n" +
			"*              \n" +
			"*             *\n" +
			"************** \n" +
			"               \n" +
			"               \n" +
			"    ****       \n" +
			"   ******      \n" +
			"  ** ****      \n" +
			"   **          ",

		hivenudg:
			"****     *  *\n" +
			"*   *   *    \n" +
			"*       *   *\n" +
			" *  *   **** \n" +
			"             \n" +
			"     **      \n" +
			"     **      \n" +
			"     **      \n" +
			"             \n" +
			" *  *   **** \n" +
			"*       *   *\n" +
			"*   *   *    \n" +
			"****     *  *",

		schckEngine:
			"****              \n" +
			"*   *         *   \n" +
			"*           **    \n" +
			" *  *  **     *** \n" +
			"      ***      ***\n" +
			" *  *  **     *** \n" +
			"*           **    \n" +
			"*   *         *   \n" +
			"****              ",

		tortila:
			" ***       *\n" +
			" **  * ** **\n" +
			"   ***    * \n" +
			" *  * *   * \n" +
			"*    *    * \n" +
			"*    *    * \n" +
			" *  * *   * \n" +
			"   ***    * \n" +
			" **  * ** **\n" +
			" ***       *\n",

		weekend:
			"       ***\n" +
			"      ** *\n" +
			"    * ****\n" +
			"   *      \n" +
			"   **     \n" +
			"****      \n" +
			"   * *    \n" +
			"   *  *   \n" +
			"   *  *   \n" +
			"   * *    \n" +
			"****      \n" +
			"   **     \n" +
			"   *      \n" +
			"    * ****\n" +
			"      ** *\n" +
			"       ***",

		spider:
			"         **     **         \n" +
			" **** * * *     * * * **** \n" +
			"*** * * ** *   * ** * * ***\n" +
			"*   * *             * *   *\n" +
			" * ***     ** **     *** * \n" +
			" **                     ** \n" +
			" *****               ***** \n" +
			"    **               **     ",

		pushalong:
			"  *** *     \n" +
			" **** *     \n" +
			"**          \n" +
			" * *        \n" +
			"  **** *    \n" +
			"   ***      \n" +
			"            \n" +
			"            \n" +
			"      ***** \n" +
			"      *    *\n" +
			"      *     \n" +
			"       *   *\n" +
			"         *  ",

//*Generetion figures*//
		gospergun:
			"                           *        \n" +
			"                          * *       \n" +
			"         **               ** *      \n" +
			"         * *              ** **   **\n" +
			"    **      *             ** *    **\n" +
			"** *  *  *  *             * *       \n" +
			"**  **      *        *     *        \n" +
			"         * *       * *              \n" +
			"         **         **              \n" +
			"                                    \n" +
			"                                    \n" +
			"                                    \n" +
			"                                    \n" +
			"                                    \n" +
			"                                    \n" +
			"                     **             \n" +
			"                     **   *         \n" +
			"                         * *        \n" +
			"                          * *       \n" +
			"                            *       \n" +
			"                            **      ",

		glidergenerator:
			"            \n" +
			"    ****    \n" +
			"            \n" +
			"  ********  \n" +
			"            \n" +
			"************\n" +
			"            \n" +
			"  ********  \n" +
			"            \n" +
			"    ****    \n" +
			"            "
	};

});
