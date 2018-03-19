<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NUIST火车票预订</title>
<link rel="stylesheet" href="css/index.min.css">
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/center.css">
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
	<input type="hidden" id="pageId" value="1">
	[#include "WEB-INF/view/header.ftl"]
	
	<div class="order"><div class="lay-bd">
	
	[#if orderList?? && orderList?size > 0]
	
	[#list orderList as order]
	<div class="order-item" name="order_item" >
		<div class="order-item-hd" >
			<div class="fl">
				<div class="time">订单日期：<strong>${order.createDate}</strong></div>
				<div class="time2">订单号：<strong>${order.orderCode}</strong></div>
			</div>
		</div>
		<div class="order-item-bd">
  			<table class="table-c">
  				<tbody>
  				<tr>
	            	<th width="37">序号</th>
	                <th width="145">车次信息</th>
	                <th width="120">席位信息</th>
	                <th width="100">旅客信息</th>
	                <th width="110">票款金额</th>
	                <th width="100">车票状态</th>
	                <th width="110">操作</th>
   				</tr>
   				[#list order.detail as detail]
   				<tr>
                    <td><label>${order_index + 1}</label></td>
                    <td><div class="ccxx">${detail.trainDate} ${detail.trainTime}开<br>${detail.stationTrainCode} ${detail.fromStation}-${detail.toStation}
					</div></td>
                    <td>${detail.seatsCarriage}车厢<br>${detail.seatsCode}号<br> ${detail.typeName} </td>
                    <td title="罗长法">${detail.passengerName}</td>
                    <td>成人票<br><span>${detail.ticketMoney}</span>元</td>
                    [#if detail_index == 0]
                    <td rowspan="2" style="font-size: 12px;color: #0028AC;line-height: 16px;">
                    [#if order.orderStatus == "1" && order.payStatus == "1"]
                    	待支付
                    [#elseif order.orderStatus == "1" && order.payStatus == "2"]
                    	交易完成
                    [#elseif order.orderStatus == "2" && order.payStatus == "1"]
                    	已取消
                	[#elseif order.orderStatus == "2" && order.payStatus == "2"]
                		已退票
                    [/#if]
                    </td>
                    <td rowspan="2">
                    [#if order.orderStatus == "1" && order.payStatus == "1"]
                    <input class="btn_blue_min btn_blue_search_min" onclick="javascipt:toPay(${order.orderId});" type="button" value="去支付"/>
                    <input class="btn_blue_min btn_blue_search_min" onclick="javascript:toCancel(${order.orderId}, '');" type="button" value="取消"/>
                    [#elseif order.orderStatus == "1" && order.payStatus == "2"]
                    <input class="btn_blue_min btn_blue_search_min" onclick="javascipt:toCancel(${order.orderId},'1');" type="button" value="退票"/>
                    [/#if]
                    </td>
                    [/#if]
				</tr>
				[/#list]
              	</tbody>
             </table>
 		</div>
	</div>
	[/#list]
	
	[#else]
	<p> 暂无订单 </p>
	[/#if]

	</div></div>
	
	
	[#include "WEB-INF/view/footer.ftl"]
	</div>
</body>
<script>
	var domain = "${domain}";
	var backUrl = "${backUrl}";
</script>
<script src="js/jquery-1.7.2.min.js"></script>
<script src="js/myOrder.js"></script>
</html>