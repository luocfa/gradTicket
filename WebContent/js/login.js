$(function() {
	
	$("#comLoginSubmit").on("click", login);
	
	function login() {
		var userName = $("#userName").val(),
			userPass = $("#userPass").val(),
			userType = $("input[type=radio]")[0].checked ? "1" : "2";
		$.ajax({
			url : domain + "doLogin.htm",
			type : "post",
			dataType : "json",
			data : {
				userName : encodeURIComponent(userName),
				userPass : userPass,
				userType : userType
			},
			success : function(rv) {
				if (rv.flag == "1") {
					location.href = backUrl;
				} else {
					alert("用户名或密码错误，登录失败！");
				}
			}
		});
	}
});