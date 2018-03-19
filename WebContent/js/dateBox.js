//预售期天数
var PRESELLDAY = 60;
//最大预售期日期
var MAXPRESELLDAY = "";
//今天
var DATE = new Date();

var $nowObj;
$(function() {
	//根据预售期天数计算最大预售期日期
	var t = DATE.getTime();
	t += PRESELLDAY * 24 * 60 * 60 * 1000;
	var date = new Date(t);
	MAXPRESELLDAY = date.getFullYear() + s(date.getMonth() - (-1)) + s(date.getDate());
	//end
	
	$("#date_forward_text, #date_forward_icon").on("click", function(e) {
		$nowObj = $(this);
		var $posiN = $(this).parent().children(".station-text").focus();
		var nowDate = $posiN.val().split("-");
		initCalendar(nowDate[0], nowDate[1], nowDate[2]);
		$("#ui-datepicker-div").css({
			"left" : +$posiN.offset().left + offset_left,
			"top" : +$posiN.offset().top + offset_top
		}).show();
		e.stopPropagation();
	});
	
	$("#ui-datepicker-div").on("click", function(e) {
		$(this).show();
		e.stopPropagation();
	});
	
	//点空白处控件隐藏
	$("body, .ch-btn-close").on("click", function(e) {
		$("#ui-datepicker-div").hide();
		e.stopPropagation();
	});
	
	$("#ui-datepicker-div .ui-datepicker-calendar").on("click", "a", function(e) {
		var $parent = $(this).parents(".ui-datepicker-group");
		var year = $parent.find(".ui-datepicker-year").text();
		var month = s($parent.find(".ui-datepicker-month").text());
		var date = year + "-" + month + "-" + $(this).text();
		$nowObj.val(date);
		$("#ui-datepicker-div").hide();
		e.stopPropagation();
	});

});

/**
 * 展示日历的主方法：传的年月日是当前选中的日期
 * @param year
 * @param month
 * @param day
 */
function initCalendar(year, month, day) {
	var selectDay = year + "" + s(month) + s(day);//拼出选中日期
	var initYear = DATE.getFullYear();
	var initMonth = DATE.getMonth() - (-1);
	var today = initYear + "" + s(initMonth) + s(DATE.getDate());//拼出今天日期
	//当前月
	$(".ui-datepicker-group-first .ui-datepicker-year").html(initYear);
	$(".ui-datepicker-group-first .ui-datepicker-month").html(initMonth);
	$(".ui-datepicker-group-first table tbody").html(getStr(getDateArr(initYear, initMonth), today, selectDay));
	//下一个月
	initMonth - (-1) == 13 ? (initMonth = 1, initYear++) : ++initMonth;
	$(".ui-datepicker-group-last .ui-datepicker-year").html(initYear);
	$(".ui-datepicker-group-last .ui-datepicker-month").html(initMonth);
	$(".ui-datepicker-group-last table tbody").html(getStr(getDateArr(initYear, initMonth), today, selectDay));
}

/**
 * 根据年月获取日历数组
 */
function getDateArr(year, month) {
	//日历以周一开始
	var calendarArr = new Array();
	//第一行前面的空格数
	var weekDay = (new Date(year, month - 1, 1).getDay() + 6) % 7;
	//当月天数
	var days = new Date(year, month, 0).getDate();
	var day = 1;
	for (var i = 0; i < 6; i++) {
		calendarArr[i] = new Array();
		for (var j = 0; j < 7; j++) {
			if (i == 0 && j < weekDay || day > days) {
				calendarArr[i][j] = "&nbsp;";
			} else {
				calendarArr[i][j] = year + "" + s(month) + s(day++);
			}
		}
	}
	return calendarArr;
}

/**
 * 拼出日历DOM
 * @param calendarStr
 * @param today
 * @param selectDay
 * @returns {String}
 */
function getStr(calendarStr, today, selectDay) {
	var str = '';
	for (var i = 0; i < 6; i++) {
		str += '<tr>';
		for (var j = 0; j < 7; j++) {
			var dayStr = calendarStr[i][j];
			var day = dayStr.substring(6);
			if (dayStr == "&nbsp;") {
				str += '<td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td>';
			} else if (dayStr < today || dayStr > MAXPRESELLDAY) {
				str += '<td class=" ui-datepicker-unselectable ui-state-disabled "><span class="ui-state-default">' + day + '</span></td>';
			} else if (dayStr == selectDay) {
				str += '<td class="date-selected ui-datepicker-current-day text-replaced" title="当前选中日期" data-handler="selectDay"';
				str += 'data-event="click" data-month="11" data-year="2015"><a class="ui-state-default ui-state-active" href="#">' + day + '</a></td>';
			} else {
				str += '<td class=" " data-handler="selectDay" data-event="click" data-month="11" data-year="2015"><a class="ui-state-default"';
				str += 'href="#">' + day + '</a></td>';
				if (dayStr == MAXPRESELLDAY && posi == 2) {
					
				}
			}
		}
		str += '</tr>';
	}
	return str;
}

/**
 * 月日加零
 * @param str
 * @returns
 */
function s(str) {
	return (str + "").length == 1 ? "0" + str : str;
}


