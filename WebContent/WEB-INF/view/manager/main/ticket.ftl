<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>南京信息工程大学-小气候环境监测系统发布平台</title>
<link rel="stylesheet" href="${domain_resource}css/index.min.css" />
<link rel="stylesheet" href="${domain_resource}manager/css/bootstrap.min.css" />
<link rel="stylesheet" href="${domain_resource}manager/css/main.css" />
<script src="${domain_resource}js/jquery-1.7.2.min.js"></script>
<script>
	var loginFlag = "${loginFlag}";
	if (loginFlag == "0") {
		parent.location.href = parent.domain + "login.htm";
	}
	var offset_left = 43, offset_top = 28;
</script>
<style>
.filterBox {    
	width: 719px;
    height: 32px;
    position: relative;
    margin: 0 0 10px 9px;
    float: left;
}
.filterBox span {
	float: left;
    height: 32px;
    line-height: 32px
}
.filterBox input {
	height: 30px;
    width: 110px;
    float: left;
    margin: 0;
    padding: 0;
}
.tips {
	position: absolute;
    top: 0;
    right: 0;
    width: 250px;
}

</style>
</head>
<body>
	<div class="content">
		<div class="title">
			<div class="figure"></div>
			<div class="position">
				<span id="posName1"></span>>><span id="posName2"></span>
			</div>
		</div>
		<div id="hourinfo" class="editor">
			<div class="hourinfobody">
			
			<div class="filterBox">
			<span>请选择日期：</span><input class="form-control station-text" id="date_forward_text" type="text" value="${.now?string('yyyy-MM-dd')}" readonly>
			<span style="margin-left:30px;">请输入车次：</span><input id="train_code" class="form-control" type="text" value="">
			<input id="search_btn" class="form-control" style="margin-left:30px;" type="button" value="查询">
			</div>
			
				<table id="allseats" class="table table-bordered table-condensed">
					<tbody></tbody>
				</table>
				  <div style="height:50px;"><ul class="pagination">
				    <li id="Previous" class="disabled">
				      <a href="javascript:pageJian();" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
				    </li>
				    <li id="page1" onclick="javascript:showPage(this);" class="active"><a href="javascript:;">1</a></li>
				    <li id="page2" onclick="javascript:showPage(this);"><a href="javascript:;">2</a></li>
				    <li id="page3" onclick="javascript:showPage(this);"><a href="javascript:;">3</a></li>
				    <li id="page4" onclick="javascript:showPage(this);"><a href="javascript:;">4</a></li>
				    <li id="page5" onclick="javascript:showPage(this);"><a href="javascript:;">5</a></li>
				    <li id="page6" onclick="javascript:showPage(this);"><a href="javascript:;">6</a></li>
				    <li id="Next">
				      <a href="javascript:pageJia();" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				      </a>
				    </li>
				  </ul></div>
				  
			</div>
		</div>
		<div id="aqiinfo" class="editor">
		<div class="hourinfobody">
			<div class="filterBox">
			<span>请选择日期：</span><input class="form-control station-text" id="date_forward_icon" type="text" value="${.now?string('yyyy-MM-dd')}" readonly>
			<span style="margin-left:30px;">请输入车次：</span><input id="add_train_code" class="form-control" type="text" value="">
			</div>
			<div class="filterBox">
			<span>请选择坐席：</span>
			<input class="form-control" id="seatType" type="text" placeholder="请选择座位类型">
			<input id="add_btn" class="form-control" style="margin-left:30px;" type="button" value="添加">
			</div>
			
			<table id="seat_type_code" class="table table-bordered table-condensed" style="width:58%;max-width:58%;">
					<tr class="success"> <th>编码</th><th>坐席类别</th></tr>
					<tr class="info gd"> <td>1</td><td>商务座</td></tr>
					<tr class="warning gd"> <td>2</td><td>特等座</td></tr>
					<tr class="info gd"> <td>3</td><td>一等座</td></tr>
					<tr class="warning gd"> <td>4</td><td>二等座</td></tr>
					<tr class="info kc"> <td>5</td><td>高级软卧</td></tr>
					<tr class="warning kc"> <td>6</td><td>软卧</td></tr>
					<tr class="info kc"> <td>7</td><td>硬卧</td></tr>
					<tr class="warning kc"> <td>8</td><td>软座</td></tr>
					<tr class="info kc"> <td>9</td><td>硬座</td></tr>
					<tr class="warning"> <td>10</td><td>无座</td></tr>
				</table>
				<div class="tips">
				  	<p class="bg-success">根据时间和车次添加余票信息，同日，同车次只能添加一次。</p>
				  </div>
		</div>
		</div>
	</div>
	[#include "WEB-INF/view/dateBox.ftl"]
</body>
<script type="text/javascript" src="${domain_resource}js/dateBox.js"></script>
<script type="text/javascript" src="${domain_resource}manager/js/ticket.js"></script>
</html>