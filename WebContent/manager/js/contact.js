$(function() {
	// 决定要展示tab及title内容，由父窗口的js提供值
	$("#posName1").text(parent.posName1);
	$("#posName2").text(parent.posName2);
	$("#" + parent.tabId).show();

	get24Info("1");
	
	$("#addPassenger").on("click", addPassenger);

});
var page = "1";
function get24Info(page) {
	$
			.ajax({
				url : parent.domain_manager + "queryContact.htm",
				type : "get",
				dataType : "json",
				data : {
					page : page,
					rowNum : "12"
				},
				success : function(res) {
					var str = "";
					if (res.length == 0) {
						alert("查询信息失败！");
					} else {
						str +=
								'<tr class="success"><th style="width:80px;">姓名</th><th style="width:80px;">性别</th><th style="width:158px;">手机</th><th style="width:240px;">身份证号</th><th style="width:80px;">有效标记</th><th style="width:80px;">操作</th></tr>';
						for (var i = res.length - 1; i >= 0; i--) {
							if (i % 2 == 1) {
								str += '<tr class="warning">';
							} else {
								str += '<tr class="info">';
							}
							str += '<td style="width:80px;" class="bechange">' + res[i].contactName + '</td>';
							str += '<td style="width:80px;" class="bechange">' + (res[i].contactSex == "1" ? "男" : "女") + '</td>';
							str += '<td style="width:158px;" class="bechange">' + res[i].contactMobile + '</td>';
							str += '<td style="width:240px;" class="bechange">' + res[i].contactCardCode + '</td>';
							str += '<td style="width:80px;" class="bechange">' + res[i].status + '</td>';
							str +=
									'<td style="width:80px;"><div onclick="javascript:changevalue(this);"><span class="glyphicon glyphicon-floppy-save"></span>';
							str += '<span>修改</span></div><input type="hidden" value="' + res[i].userContactId + '"></td></tr>';
						}
						$(".hourinfobody table tbody").html(str);
					}
				}

			});
}



function addPassenger() {
	var htmlStr = '';
	htmlStr += '<tr class="info"><td class="bechange"><input class="form-control" type="text" value="" placeholder="姓名"></td>'
			+ '<td class="bechange"><input class="form-control" type="text" value="" placeholder="性别"></td>'
			+ '<td class="bechange"><input class="form-control" type="text" value="" placeholder="手机"></td>'
			+ '<td class="bechange"><input class="form-control" type="text" value="" placeholder="身份证号"></td>'
			+ '<td class="bechange"><input class="form-control" type="text" value="" placeholder="有效状态"></td>'
			+ '<td><div onclick="javascript:insertValue(this);"><span class="glyphicon glyphicon-floppy-save"></span><span>添加</span></div></td></tr>';
	$(".hourinfobody table tbody tr:eq(0)").after(htmlStr);
}

//校验手机号码
function isMobile (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^0?1[3,4,5,7,8][0-9]{9}$/;
	return patrn.test(str);
}

function insertValue(obj) {
	var $thistr = $(obj).parents("tr").find(".form-control");
//	var temp = $thistr[0].value;
//	var shidu = $thistr[1].value;
//	var aqi = $thistr[2].value;
//	var id = $(obj).next("input").val();
	if ($thistr.length == 0) {
		return;
	} else if (!isMobile($thistr[2].value)) {
		alert("请输入正确的手机号");
	} else if (!Common.isIdCard($thistr[3].value)) {
		alert("请输入正确的身份证号");
	} else {
		$.ajax({
			url : parent.domain_manager + "insertContact.htm",
			type : "get",
			dataType : "json",
			data : {
				Name : encodeURIComponent($thistr[0].value),
				mobile : $thistr[2].value,
				cardCode : $thistr[3].value,
				sex : $thistr[1].value == "男" ? "1" : "2", 
				status : $thistr[4].value == "Y" ? "Y" : "N",
			},
			success : function(res) {
				if (res.flag == "1") {
//					reverttable(obj, temp, shidu, aqi, id);
					alert("添加成功！");
					location.reload();
				} else {
					alert("修改失败！");
				}
			}
		});
	}
}

// 变为可修改状态
function changevalue(obj) {
	var $thistr = $(obj).parents("tr").find(".bechange");
	for (var i = 0; i < $thistr.length; i++) {
		var value = $($thistr[i]).text();
		$($thistr[i]).html('<input class="form-control" type="text" value="' + value + '">');
	}
	$(obj).attr({
		"onclick" : "javascript:savechange(this);"
	}).html('<span class="glyphicon glyphicon-floppy-save"></span><span>保存</span>');
}
// 保存修改
function savechange(obj) {
	var $thistr = $(obj).parents("tr").find(".form-control");
//	var temp = $thistr[0].value;
//	var shidu = $thistr[1].value;
//	var aqi = $thistr[2].value;
	var id = $(obj).next("input").val();
	if ($thistr.length == 0) {
		return;
	} else if (!isMobile($thistr[2].value)) {
		alert("请输入正确的手机号");
	} else if (!Common.isIdCard($thistr[3].value)) {
		alert("请输入正确的身份证号");
	} else {
		$.ajax({
			url : parent.domain_manager + "updateContact.htm",
			type : "get",
			dataType : "json",
			data : {
				Name : encodeURIComponent($thistr[0].value),
				mobile : $thistr[2].value,
				cardCode : $thistr[3].value,
				sex : $thistr[1].value == "男" ? "1" : "2", 
				status : $thistr[4].value == "Y" ? "Y" : "N",
				id : id
			},
			success : function(res) {
				if (res.flag == "1") {
//					reverttable(obj, temp, shidu, aqi, id);
					alert("修改成功！");
					location.reload();
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
		get24Info(page);
	}
}
