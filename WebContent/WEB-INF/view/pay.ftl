<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NUIST火车票预订</title>
<link rel="stylesheet" href="css/index.min.css">
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/pay.css">
<style>
.title_logo {
	font-size: 30px;
	color: #fff;
	height: 70px;
	line-height: 70px;
}

.userInfo {
	height: 70px;
	line-height: 70px;
	color: #fff;
	float: left;
	margin-right: 20px;
}
</style>
</head>
<body>
	<div id="main" style="display: block;">
	[#include "WEB-INF/view/header.ftl"]
	<div class="fontW orderv3_container">
		<div class="w980 mgt30" id="orderInfo">
			<div class="or_wide">
				<div class=" font20 or_wide_tij left">
					<i class="ov3_ico_success left mgt5"></i>订单提交成功，请尽快支付！
				</div>
				<br>
				<p class="or_wide_jine">
					应付金额：<span class="col_cheng font18">￥${orderMoney}</span>
				</p>
	    	</div>
    	</div>
    	<div id="noPwd">
    	<div class="w1002 orderv3_paccount mgt30" id="payBefore">
        	<div class="ov3_pbox clearfix">
            	<div class="ov3_pbox_title left">个人账户</div>
                <div class="ov3_pbox_remain left clearfix"><em>余额：</em><span>￥</span><span id="balance">${balance}</span><em id="balanceHide" style="display:none;">9407.95</em></div>
                <div class="ov3_pbox_money left">支付：<input type="text" id="accountPayMoney" value="" class="ov3_pay_inp"><em class="yuan">元</em>
                </div>
                <div class="ov3_pbox_pwd left">支付密码：<input type="password" id="payPwd" class="ov3_pay_inp">
                </div>
            </div>
        </div>
    	</div>
    	<div class="w1002 orderv3_opayway" id="otherPay_all">
    		<div class="ov3_opayway_bd">
    			<div class="ov3_opayway_con">
    				<div class="ov3_submit">
	                	<input type="button" id="submitOnlinePay" value="立即支付" class="btn_blue btn_blue_search">
	                </div>
    			</div>
    		</div>
    	</div>
	</div>
	
	
	[#include "WEB-INF/view/footer.ftl"]
	</div>
</body>
<script>
	var domain = "${domain}";
	var orderMoney = "${orderMoney}";
	var balance = "${balance}";
	var orderId = "${orderId}";
	var payStatus = "${payStatus}";
</script>
<script src="js/pay.js"></script>
<script>
</script>
</html>