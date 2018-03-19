$(function() {
	$("#queryLeftTable").on("click", "td[name=searchPrice]", function() {
		var info = $(this).parent().attr("info").split("|");
		$.ajax({
			url : domain + "queryPrice.htm",
			data : {
				trainNo : info[1],
				fromStationNo : info[2],
				toStationNo : info[3],
				seatTypes : info[0],
				trainDate : $("#date_forward_text").val()
			},
			type : 'get',
			dataType : 'json',
			success : function(data) {
				
			}
		});
	});
});

var ticketData = {};

function searchBook() {
	var startUrl = $("#station_from").val();
	var endUrl = $("#station_to").val();
//	var startUrl = 'ZDN';
//	var endUrl = 'NJH';
	if (!startUrl) {
		alert("请输入出发城市");
		return;
	}
	if (!endUrl) {
		alert("请输入到达城市");
		return;
	}
	getDataList({startUrl : startUrl, endUrl : endUrl});
}

function getDataList(params) {
	$("#t-list").hide();
	$("#train_list_error_msg").html("<span>正在查询车次，请稍等...</span>").show();
	params.queryDate = $("#date_forward_text").val();
	$.ajax({
		url : domain + "query.htm",
		data : params,
		type : 'get',
		dataType : 'json',
		success : function(res) {
			ticketData = res;
			if (res.length > 0) {
				var str = '';
				for (var i = 0; i < res.length; i++) {
					var buttonTextInfo = res[i].buttonTextInfo;
					var data = res[i].queryLeftNewDTO;
//					var secretStr = res[i].secretStr;
					str += '<tr info="' + data.seat_types + '|' + data.train_no + "|" + data.from_station_no + "|" + data.to_station_no
						+ '" class="' + (i%2 == 0 ? '' : 'bgc') + '"><td colspan="4" width="370"><div class="ticket-info clearfix">'
						+ '<div class="train"><div><a title="点击查看停靠站信息" href="javascript:" class="number">'
						+ data.station_train_code
						+ '</a></div></div><div class="cdz"><strong class="'
						+ (data.from_station_name == data.start_station_name ? "start-s" : "") 
						+ '">'
						+ data.from_station_name
						+ '</strong><strong class="'
						+ (data.to_station_name == data.end_station_name ? "end-s" : "")
						+ '">'
						+ data.end_station_name
						+ '</strong></div><div class="cds"><strong class="start-t">'
						+ data.start_time
						+ '</strong><strong class="color999">'
						+ data.arrive_time
						+ '</strong></div><div class="ls"><strong>'
						+ data.lishi
						+ '</strong><span></span></div></div></td>'
						+ '<td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.swz_num) // 商务座
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.tz_num) // 特等座
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.zy_num) // 一等座
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.ze_num) // 二等座
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.gr_num) // 高级软卧
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.rw_num) // 软卧
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.yw_num) // 硬卧
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.rz_num) // 软座
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.yz_num) // 硬座
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.wz_num) // 无座
						+ '</td><td name="searchPrice" width="46" align="center" style="cursor: pointer;"'
						+ checkSeatsClass(data.qt_num) // 其他
						+ '</td><td align="center" width="80" class="no-br">'
						+ (function(buttonTextInfo) {
							var html = "";
							if (buttonTextInfo == "预订" && data.canWebBuy == "Y") {
								html += '<a href="javascript:;" onclick="javascript:handleBook('+ i +');" class="btn72">预订</a>';
							} else {
								html += buttonTextInfo;
							}
							return html;
							})(buttonTextInfo)
						+ '</td></tr>';
				}
				$("#queryLeftTable").html(str);
				$("#t-list").show();
				$("#train_list_error_msg").hide();
			} else {
				$("#train_list_error_msg").html("<span>未查询到任何班次，请更换时间或者其他达到城市</span>").show();
			}
			
		}
	});
}

function checkSeatsClass(num) {
	var str = "";
	if (num == "有") {
		str += ' class="yes">有';
	} else if (/^[0-9]+$/.test(num)) {
		str += ' class="t-num">' + num;
	} else {
		str += '>' + num;
	}
	return str;
}

function handleBook(index) {
	location.href = domain + "order.htm?data=" + encodeURIComponent(encodeURIComponent(JSON.stringify(ticketData[index]))) + "&date=" + $("#date_forward_text").val();
}
