//所有城市
var stationNames = station_names.split("@");
//热门城市
var favoriteNames = favorite_names.split("@");
//城市框当前显示要展示的城市列表
var cityList = new Array();
var grepList = new Array();
var ROWNUM1 = 6;
var ROWNUM2 = 30;
var LETTER1 = "abcde", LETTER2 = "fghij", LETTER3 = "klmno", LETTER4 = "pqrst", LETTER5 = "uvwxyz";
var $posi = "";
$(function() {
	//点出发到达框展示城市控件
	$(".station-text:lt(2), .station-icon:lt(2)").on("click", function(e) {
		var $posiN = $(this).parent().children(".station-text").focus();
		if ($("#piao_station_el_box1").css("display") == "none" || $posi.attr("id") != $posiN.attr("id")) {
			initBox2($("#piao_station_el_box2 .b2-hd li")[0]);
			$("#piao_station_el_box2").css({
				"left" : $posiN.offset().left + 2,
				"top" : $posiN.offset().top + 52
			}).show();
		}
		$posi = $posiN;
		e.stopPropagation();
	}).on("keyup", function() {
		$posi = $(this).parent().children(".station-text").focus();
		var inputStr = $posi.val().toLowerCase();
		grepList = $.grep(stationNames, function(a){
			return a.indexOf(inputStr) > -1;
		});
		if (grepList.length > 0) {
			$("#piao_station_el_box1 .b1-hd").html('按"<font color=red>' + inputStr + '</font>"检索：');
		} else {
			$("#piao_station_el_box1 .b1-hd").html('无法匹配：<font color=red>' + inputStr + '</font>');
		}
		box1ShowPage(0);
		$("#piao_station_el_box1").css({
			"left" : $posi.offset().left + 2,
			"top" : $posi.offset().top + 52
		}).show();
	});
	
	//点控件不要消失
	$("#piao_station_el_box2").on("click", function(e) {
		$(this).show();
		e.stopPropagation();
	});
	$("#piao_station_el_box1").on("click", function(e) {
		$(this).show();
		e.stopPropagation();
	});
	//点空白处控件隐藏
	$("body, .ch-btn-close").on("click", function(e) {
		$("#piao_station_el_box2, #piao_station_el_box1").hide();
		e.stopPropagation();
	});
	//点击城市分类
	$("#piao_station_el_box2 .b2-hd li").on("click", function(e) {
		initBox2(this);
	});
	//查询框上一页下一页
	$("#piao_station_el_box2 .b2-page").on("click", "a", function(e) {
		var page = $(this).attr("data-index");
		box2ShowPage(1, page);
	});
	$("#piao_station_el_box1 .b1-page").on("click", "a", function(e) {
		var page = $(this).attr("data-index");
		box1ShowPage(page);
	});
	
	//点击选择城市
	$("#piao_station_el_box2 .b2-list").on("click", "li", function(e) {
		$posi.val($(this).text());
		$posi.prev().val($(this).attr("url"));
		$("#piao_station_el_box2").hide();
		e.stopPropagation();
	});
	$("#piao_station_el_box1 .b1-list").on("click", "li", function(e) {
		$posi.val($(this).text());
		$posi.prev().val($(this).attr("url"));
		$("#piao_station_el_box1").hide();
		e.stopPropagation();
	});
	
});

function initBox2(obj) {
	var index = $(obj).attr("data-index");
	$(obj).addClass("selected").siblings().removeClass("selected");
	switch (index) {
	case '1' :
		cityList = $.grep(stationNames, function(a){
			var l = a.split("|")[4].substr(0,1);
			return LETTER1.indexOf(l) > -1;
		}); 
		break;
	case '2' : 
		cityList = $.grep(stationNames, function(a){
			var l = a.split("|")[4].substr(0,1);
			return LETTER2.indexOf(l) > -1;
		}); 
		break;
	case '3' : 
		cityList = $.grep(stationNames, function(a){
			var l = a.split("|")[4].substr(0,1);
			return LETTER3.indexOf(l) > -1;
		}); 
		break;
	case '4' :
		cityList = $.grep(stationNames, function(a){
			var l = a.split("|")[4].substr(0,1);
			return LETTER4.indexOf(l) > -1;
		}); 
		break;
	case '5' : 
		cityList = $.grep(stationNames, function(a){
			var l = a.split("|")[4].substr(0,1);
			return LETTER5.indexOf(l) > -1;
		}); 
		break;
	default : 
		cityList = favoriteNames;
		break;
	}
	box2ShowPage(index, 0);
}

function box1ShowPage(page) {
	$("#piao_station_el_box2").hide();
	var num = grepList.length;
	var pages = Math.ceil(num/ROWNUM1);
	var str = '';
	for (var i = page * ROWNUM1, n = (page - (-1)) >= pages ? num : (page - (-1)) * ROWNUM1; i < n; i++) {
		var cityArr = grepList[i].split("|");
		str += '<li title="' + cityArr[1] + '" url="' + cityArr[2] + '"';
		if (i == page * ROWNUM1) {
			str += 'class="selected"';
		}
		str += '>' + cityArr[1] + '</li>';
	}
	$("#piao_station_el_box1 .b1-list").html(str);
	if (pages >= 2) {
		var str2 = '';
		if (page == 0) {
			str2 += '<span class="prev">« 上一页</span>';
		} else {
			str2 += '<a class="prev" data-index="' + (page - 1) + '">« 上一页</a>';
		}
		if (page == pages - 1) {
			str2 += '<span class="next">下一页 »</span>';
		} else {
			str2 += '<a class="next" data-index="' + (page - (-1)) + '">下一页 »</a>';
		}
		$("#piao_station_el_box1 .b1-page").html(str2).show();
	} else {
		$("#piao_station_el_box1 .b1-page").hide();
	}
}

function box2ShowPage(index, page) {
	$("#piao_station_el_box1").hide();
	var num = cityList.length;
	var pages = Math.ceil(num/ROWNUM2);
	var str = '';
	if (index == 0) {
		for (var i = 0, n = num; i < n; i++) {
			var cityArr = cityList[i].split("|");
			str += '<li title="' + cityArr[1] + '" url="' + cityArr[2] + '">' + cityArr[1] + '</li>';
		}
		$("#piao_station_el_box2 .b2-list").html(str);
		$("#piao_station_el_box2 .b2-page").hide();
	} else {
		for (var i = page * ROWNUM2, n = (page - (-1)) >= pages ? num : (page - (-1)) * ROWNUM2; i < n; i++) {
			var cityArr = cityList[i].split("|");
			str += '<li title="' + cityArr[1] + '" url="' + cityArr[2] + '">' + cityArr[1] + '</li>';
		}
		$("#piao_station_el_box2 .b2-list").html(str);
		if (pages >= 2) {
			var str2 = '';
			if (page == 0) {
				str2 += '« 上一页';
			} else {
				str2 += '<a data-index="' + (page - 1) + '">« 上一页</a>';
			}
			str2 += '<span>|</span>';
			if (page == pages - 1) {
				str2 += '下一页 »';
			} else {
				str2 += '<a data-index="' + (page - (-1)) + '">下一页 »</a>';
			}
			$("#piao_station_el_box2 .b2-page").html(str2).show();
		} else {
			$("#piao_station_el_box2 .b2-page").hide();
		}
	}
}