var page = "1";
var datas = {
	page : "1",
	trainCode : "",
	date : "",
	rowNum : "100"
};
$(function() {
	// 决定要展示tab及title内容，由父窗口的js提供值
	$("#posName1").text(parent.posName1);
	$("#posName2").text(parent.posName2);
	$("#" + parent.tabId).show();

	get24Info("1");
	
	$("#search_btn").on("click", function() {
		var trainCode = $("#train_code").val();
		datas.trainCode = trainCode.toUpperCase();
		datas.date = $("#date_forward_text").val();
		get24Info();
	});
	
	$("#add_train_code").on("blur", function() {
		$("#seat_type_code tr").show();
		var str = this.value.toUpperCase();
		var pat = /^[0-9A-Z][0-9]{1,4}$/;
		if (!pat.test(str)) {
			alert("车次格式不正确");
			return;
		}
		if (str.indexOf("G") == 0 || str.indexOf("D") == 0) {
			$("#seat_type_code .kc").hide();
		} else {
			$("#seat_type_code .gd").hide();
		}
	});
	
	$("#add_btn").on("click", function() {
		var trainCode = $("#add_train_code").val();
		datas.trainCode = trainCode.toUpperCase();
		datas.date = $("#date_forward_icon").val();
		datas.seatType = $("#seatType").val();
		if (!(datas.seatType >= 1 && datas.seatType <= 10)) alert("车次类型格式不正确");
		$.ajax({
			url : parent.domain_manager + "insertSeats.htm",
			type : "get",
			dataType : "json",
			data : datas,
			success : function (res) {
				if (res.flag == "1") {
					alert("添加成功！");
					location.reload();
				} else {
					alert("添加失败！");
				}
			}
		});
	});

});

function get24Info(page) {
	$(".hourinfobody #allseats tbody").html("");
	$
			.ajax({
				url : parent.domain_manager + "queryAllSeatsOnPage.htm",
				type : "get",
				dataType : "json",
				data : datas,
				success : function(res) {
					var str = "";
					if (res.length == 0) {
						alert("查询信息失败！");
					} else {
						str +=
								'<tr class="success"><th>日期</th><th>车次</th><th>座型</th><th>车厢</th><th>座位</th><th>有效标记</th><th>占用状态</th><th>操作</th></tr>';
						for (var i = res.length - 1; i >= 0; i--) {
							if (i % 2 == 1) {
								str += '<tr class="warning">';
							} else {
								str += '<tr class="info">';
							}
							str += '<td>' + res[i].trainDate + '</td><td>' + res[i].trainCode + '</td>';
							str += '<td class="">' + res[i].seat_type_name + '</td>';
							str += '<td class="">' + res[i].seatsCarriage + '</td>';
							str += '<td class="">' + res[i].seatsCode + '</td>';
							str += '<td class="bechange">' + res[i].seatStatus + '</td>';
							str += '<td class="">' + (res[i].seatId ? "已占用" : "未占用") + '</td>';
							if (!res[i].seatId) {
								str +=
										'<td><div onclick="javascript:changevalue(this);"><span class="glyphicon glyphicon-floppy-save"></span>';
								str +=
										'<span>修改</span></div><input type="hidden" value="' + res[i].trainNumberSeatsId
												+ '"></td></tr>';
							} else {
								str += '<td></td></tr>';
							}

						}
						$(".hourinfobody #allseats tbody").html(str);
					}
				}

			});
}
// 变为可修改状态
function changevalue(obj) {
	var $thistr = $(obj).parents("tr").find(".bechange");
	for (var i = 0; i < $thistr.length; i++) {
		var value = $($thistr[i]).text();
		$($thistr[i]).html('<input class="form-control" type="text" value="' + value + '">').css({
			"padding" : "1px"
		});
	}
	$(obj).attr({
		"onclick" : "javascript:savechange(this);"
	}).html('<span class="glyphicon glyphicon-floppy-save"></span><span>保存</span>');
}
// 保存修改
function savechange(obj) {
	var $thistr = $(obj).parents("tr").find(".form-control");
	var status = $thistr[0].value;
	var id = $(obj).next("input").val();
	if ($thistr.length == 0) {
		return;
	} else {
		$.ajax({
			url : parent.domain_manager + "updateSeats.htm",
			type : "get",
			dataType : "json",
			data : {
				status : status == "Y" ? "Y" : "N",
				seatId : id
			},
			success : function(res) {
				if (res.flag == "1") {
					// reverttable(obj, temp, shidu, aqi, id);
					location.reload();
					alert("修改成功！");
				} else {
					alert("修改失败！");
				}
			}
		});
	}
}
// 回复问初始状态
function reverttable(obj, temp, shidu, aqi, id) {
	var $thistr = $(obj).parents("tr").find(".bechange");
	$($thistr[0]).html(temp);
	$($thistr[1]).html(shidu);
	$($thistr[2]).html(aqi);
	$($thistr).css({
		"padding" : "5px"
	});
	$(obj).next("input").val(id);
	$(obj).attr({
		"onclick" : "javascript:changevalue(this);"
	}).html('<span class="glyphicon glyphicon-floppy-save"></span><span>修改</span>');
}

function showPage(obj) {
	var clickpage = $(obj).text();
	if (page == clickpage)
		return;
	page = clickpage;
	$(obj).addClass("active").siblings().removeClass("active");
	$("#Previous, #Next").removeClass("disabled");
	if (page == "1") {
		$("#Previous").addClass("disabled");
	} else if (page == "6") {
		$("#Next").addClass("disabled");
	}
	datas.page = page;
	get24Info(page);
}
function pageJia() {
	if (page == "6") {
		return;
	} else {
		page = page - (-1);
		$("#page" + page).addClass("active").siblings().removeClass("active");
		$("#Previous, #Next").removeClass("disabled");
		if (page == "6")
			$("#Next").addClass("disabled");
		datas.page = page;
		get24Info(page);
	}
}
function pageJian() {
	if (page == "1") {
		return;
	} else {
		page = page - 1;
		$("#page" + page).addClass("active").siblings().removeClass("active");
		$("#Previous, #Next").removeClass("disabled");
		if (page == "1")
			$("#Previous").addClass("disabled");
		datas.page = page;
		get24Info(page);
	}
}
