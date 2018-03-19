function toPay(orderId) {
	location.href = domain + "pay.htm?orderId=" + orderId;
}

function toCancel(orderId, flag) {
	var str = flag == "1" ? "取消订单" : "退票";
	$.ajax({
		url : domain + "doCancel.htm",
		dataType : "json",
		type : "get",
		data : {
			orderId : orderId,
			flag : flag
		},
		success : function(rv) {
			if (rv.flag == "1") {
				alert(str + "成功！");
				location.href = domain + "orderCenter.htm";
			} else {
				alert(str + "失败！");
			}
		}
	});
}