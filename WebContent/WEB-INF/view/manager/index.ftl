<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>NUIST火车票预订</title>
<link rel="stylesheet" href="../css/index.min.css">
<link rel="stylesheet" href="../css/common.css">
<link rel="stylesheet" type="text/css" href="css/base.css" />
<link rel="stylesheet" type="text/css" href="css/manager.css" />
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
<script>
	var domain = "${domain}";
	var domain_manager = "${domain_manager}";
</script>
</head>
<body>
<div id="main" style="display: block;">
[#include "WEB-INF/view/header.ftl"]
<input type="hidden" id="pageId" value="2">
<div id="content" class="wrapper">
	<div class="menu">
		[#if userType == "2"]
		<div class="modelTab">
			<div class="title">
				<p>余票管理</p>
			</div>
			<ul>
				<li id="ticket_hourinfo">余票查询</li>
				<li id="ticket_aqiinfo">添加余票</li>
			</ul>
		</div>
		[/#if]
		[#if userType == "1"]
		<div class="modelTab">
			<div class="title">
				<p>联系人管理</p>
			</div>
			<ul>
				<li id="contact_hourinfo">联系人管理</li>
			</ul>
		</div>
		[/#if]
		<!-- div class="modelTab">
			<div class="title">
				<p>信息</p>
			</div>
			<ul>
				<!--li id="news_list">查看图片</li
				<li id="news_editor">添加图片</li>
			</ul>
		</div -->
		<div class="modelTab">
			<div class="title">
				<p>个人信息管理</p>
			</div>
			<ul>
				<li id="userinfo_passwd">密码修改</li>
				<li id="userinfo_userinfo">资料修改</li>
			</ul>
		</div>
	</div>
	
	<iframe id="frame" name="mainIframe" src="${domain_manager}main.htm?pageCode=welcome"></iframe>
</div>
[#include "WEB-INF/view/footer.ftl"]
</div>
</body>
<script type="text/javascript" src="${domain_resource}manager/js/manager.js"></script>
</html>
