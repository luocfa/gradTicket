<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NUIST火车票预订</title>
<link rel="stylesheet" href="css/index.min.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/commonl.css">
<link rel="stylesheet" href="css/logreg.css">
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
	<div class="w980 reg_main clearfix mgt10 mgb10">
		  <div class="w575 left mgt5 mgl30">
		  	<img src="${domain}images/testjiaodiantu.jpg" width="520" height="420" tts="link_6998">
		  </div>
		  <div class="w370 left mgt40 mgb10">
		  	<div class="loginDiv">
		  		<h2>
		  		<a href="${domain}reg.htm" class="right blue mgr5"">快速注册</a>
		  		<b class="font16">会员登录</b></h2>
				<div class="mgl30 mgt15 mgb15 lineh20">
			        <input type="radio" name="login" id="login1" checked="checked" tts="link_6268">
			        <label for="login1" class="mgl5">普通登录</label>
			        <input type="radio" name="login" id="login2" tts="link_6268">
			        <label for="login1" class="mgl5">管理员登录</label>
			    </div>
			    <div id="comLoginDiv">
				    <div class="inp_layer_item clearfix mgl30">
					      <span class="inp_layer">
					      	<span class="inp_layer_inner clearfix">
					        	<span class="inp_layer_wraper"><input type="text" id="userName" class="inp_Text_h35ico inp_Text_gray" placeholder="请输入用户名/手机号" autocomplete="off"></span>
					      		<span class="" id="comUserNameTip"></span> 
					      	</span>
					        <span class="login_icon login_iconPoren"></span>
					      </span>
				     </div>
			      	<div class="inp_layer_item clearfix mgl30 posRel">
			      		<span class="inp_layer">
			      			<span class="inp_layer_inner clearfix">
			        			<span class="inp_layer_wraper"><input type="password" id="userPass" class="inp_Text_h35ico inp_Text_gray" placeholder="密码" onpaste="return false;" autocomplete="off"></span>
			      				<span class="" id="comPwdTip"></span>
			      			</span>
			      			<span class="login_icon login_iconPomi"></span>
			      		</span>
			      	</div>
				    <div class="mgl30 mgb30">
				    	<input type="button" value="登&nbsp;&nbsp;录" id="comLoginSubmit" class="btn_orange btn_orange_search" tts="link_6283">
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
	var backUrl = "${backUrl!domain}";
</script>
<script src="js/login.js"></script>
<script>
</script>
</html>