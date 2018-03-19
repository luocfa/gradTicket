$(function() {
	$("#register_btn").on("click", reg);

	function reg() {
		var userName = $("#userName").val(), 
			userPass = $("#userPass").val(), 
			confirmPass = $("#confirmPass").val();
		$.ajax({
			url : domain + "doReg.htm",
			type : "post",
			dataType : "json",
			data : {
				userName : encodeURIComponent(userName),
				userPass : userPass,
				confirmPass : confirmPass
			},
			success : function(rv) {
				if (rv.flag == "1") {
					alert("注册成功，请登录");
					location.href = domain + "login.htm";
				} else {
					alert(rv.failReason || "注册失败");
				}
			}
		});
	}
});