<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NUIST火车票预订</title>
<link rel="stylesheet" href="css/index.min.css">
<link rel="stylesheet" href="css/common.css">
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
	<input type="hidden" id="pageId" value="0">
		[#include "WEB-INF/view/header.ftl"]
		<div class="wrapper">
			<div class="query">
				<div class="trip-place">
					<ul>
						<li><span class="trip-label">出发城市</span>
							<div class="trip-input">
								<input id="station_from" class="station-hide" type="text">
								<input id="station_from_text" class="station-text" type="text"
									data-station="0" placeholder="请输入出发城市">
								<input id="station_from_icon" class="station-icon" type="button"
									tabindex="-1">
							</div></li>
						<li id="station_change" title="调换出发城市和到达城市"></li>
						<li><span class="trip-label">到达城市</span>
							<div class="trip-input">
								<input id="station_to" class="station-hide" type="text">
								<input id="station_to_text" class="station-text" type="text"
									data-station="1" placeholder="请输入到达城市">
								<input id="station_to_icon" class="station-icon" type="button"
									tabindex="-1">
							</div></li>
						<li><span class="trip-label">出发日期</span>
							<div class="trip-input">
								<input id="date-forward" class="station-hide" type="text">
								<input id="date_forward_text" class="station-text hasDatepicker"
									type="text" value="${.now?string('yyyy-MM-dd')}" readonly=""> <input
									id="date_forward_icon" class="station-icon" type="button">
							</div></li>
					</ul>
				</div>
				<div class="trip-query">
					<div class="refresh">
						<input id="btn_refresh" onclick="javascript:searchBook();" type="button" value="查询" class="start">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="content">
		<div id="train_list_error_msg" class="train_list_error"
			style="display: block;">
			<span>请先设置出发城市、到达城市及出发日期</span>
		</div>
		<div class="t-list" id="t-list" style="display:none;">
			<table>
				<thead>
					<tr class="th" id="float">
						<th width="90" colspan="1" rowspan="1">车次</th>
						<th width="100" colspan="1" rowspan="1">出发站<br clear="none">
							到达站
						</th>
						<th width="82" colspan="1" rowspan="1" id="startendtime"><span
							class="b1" id="s_time" style="cursor: pointer;">出发时间</span><br>
							<span class="b2" id="r_time" style="cursor: pointer;">到达时间</span></th>
						<th width="82" colspan="1" rowspan="1"><span class="b3"
							id="l_s" style="cursor: pointer;">历时</span></th>
						<th width="49" colspan="1" rowspan="1">商务座</th>
						<th width="49" colspan="1" rowspan="1">特等座</th>
						<th width="49" colspan="1" rowspan="1">一等座</th>
						<th width="49" colspan="1" rowspan="1">二等座</th>
						<th width="49" colspan="1" rowspan="1">高级<br clear="none">
							软卧
						</th>
						<th width="49" colspan="1" rowspan="1">软卧</th>
						<th width="49" colspan="1" rowspan="1">硬卧</th>
						<th width="49" colspan="1" rowspan="1">软座</th>
						<th width="49" colspan="1" rowspan="1">硬座</th>
						<th width="49" colspan="1" rowspan="1">无座</th>
						<th width="49" colspan="1" rowspan="1">其他</th>
						<th class="last" colspan="1" rowspan="1">备注</th>
					</tr>
				</thead>
				<tbody id="queryLeftTable">
				</tbody>
			</table>
		</div>
	</div>
	[#include "WEB-INF/view/footer.ftl"]
	<div id="piao_station_el_box1" class="piao_station_box1"
		style="left: 386.5px; top: 223px; position: absolute; display: none;">
		<div class="b1-hd">
			按"<font color="red">s</font>"检索：
		</div>
		<ul class="b1-list">
		</ul>
		<ul class="b1-page" style="display: block;">
			<span class="prev">« 上一页</span>
			<a class="next" data-index="1">下一页 »</a>
		</ul>
	</div>
	<div id="piao_station_el_box2" class="piao_station_box2"
		style="left: 386.5px; top: 223px; position: absolute; display: none;">
		<div class="b2-title">
			可直接输入拼音或首字母
			<del class="ch-btn-close">X</del>
		</div>
		<ul class="b2-hd">
			<li data-index="0" class="selected">热门</li>
			<li data-index="1" class="">ABCDE</li>
			<li data-index="2" class="">FGHIJ</li>
			<li data-index="3" class="">KLMNO</li>
			<li data-index="4" class="">PQRST</li>
			<li data-index="5" class="">UVWXYZ</li>
		</ul>
		<ul class="b2-list"></ul>
		<ul class="b2-page" style="display: none;"></ul>
	</div>
	[#include "WEB-INF/view/dateBox.ftl"]
</body>
<script>
	var domain = "${domain}";
	var offset_left = 50, offset_top = 52;
</script>
<script src="js/stationName.js"></script>
<script src="js/favoriteName.js"></script>
<script src="js/cityBox.js"></script>
<script src="js/dateBox.js"></script>
<script src="js/main.js"></script>
</html>