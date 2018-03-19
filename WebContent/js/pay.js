$(function() {
	
	if (payStatus != "1") {
		alert("订单支付状态异常，请重新选择支付！");
		location.href = domain + "orderCenter.htm";
	}
	
	$("#submitOnlinePay").on("click", pay);
	
	function pay() {
		var payMoney = $("#accountPayMoney").val();
		var payPass = $("#payPwd").val();
		if (parseFloat(payMoney) != parseFloat(orderMoney)){
			alert("请输入正确的金额");
		} else if (parseFloat(orderMoney) >= parseFloat(balance)) {
			alert("余额不足请充值");
		} else if(payPass == "") {
			alert("请输入密码");
		} else {
			$.ajax({
				url : domain + "doPay.htm",
				type : "post",
				dataType : "json",
				data : {
					orderId : orderId,
					payMoney : payMoney,
					payPass : payPass
				}, 
				success : function(rv) {
					if (rv.flag == "1") {
						alert("支付成功！");
						location.href = domain + "orderCenter.htm";
					} else {
						alert(rv.failReason);
					}
				}
			});
		}
		
	}
});