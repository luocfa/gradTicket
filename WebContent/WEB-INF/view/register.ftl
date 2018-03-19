<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NUIST火车票预订</title>
<link rel="stylesheet" href="css/logreg.css">
<link rel="stylesheet" href="css/index.min.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/commonl.css">
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
<div class="reg_main w1002">
	    <!--邀请人及活动 end-->
		<div class="reg_wrap clearfix">
	        <div class="reg_content left">
	            <div class="reg_bd">
	                <div class="reg_inp_item clearfix">
	                    <label><em class="inp_nece">*</em>用户名</label>
	                    <span class="reg_inp_layer">
	                        <span class="reg_inp_layer_inner clearfix">
	                            <input type="text" class="inp_Text_h35 inp_Text_h35_w270" id="userName" autocomplete="off">
	                            <span class="reg_inp_status_tips" id="regMobileTip"></span>
	                        </span>
	                    </span>
	                </div>
	                <div class="reg_inp_item clearfix">
	                    <label><em class="inp_nece">*</em>设置密码</label>
	                    <span class="reg_inp_layer">
	                        <span class="reg_inp_layer_inner clearfix">
	                            <input type="password" class="inp_Text_h35 inp_Text_h35_w270" id="userPass" onpaste="return false;" autocomplete="off">
	                       		<span class="reg_inp_focus_tips" id="regPwdTip"></span>
	                        </span>
	                    </span>
	                </div>
	                <div class="reg_inp_item clearfix">
	                    <label><em class="inp_nece">*</em>确认密码</label>
	                    <span class="reg_inp_layer">
	                        <span class="reg_inp_layer_inner clearfix">
	                            <input type="password" class="inp_Text_h35 inp_Text_h35_w270" id="confirmPass" onpaste="return false;" autocomplete="off">
	                        	<span class="reg_inp_status_tips" id="regConfirmPwdTip"></span>
	                        </span>
	                    </span>
	                </div>
	                <div class="reg_submit">
	                    <input type="button" value="注册" class="btn_orange btn_orange_reg" id="register_btn" tts="link_6294">
	                </div>
	            </div>
	        </div>
	        <div class="reg_pic right">
        		<img src="${domain}images/testjiaodiantu.jpg" width="461" height="390" tts="link_7040">
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
<script src="js/register.js"></script>
<script>
</script>
</html>