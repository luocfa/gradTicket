$(function() {
	var pageId = $("#pageId").val();
	$("#header_nav li:eq("+pageId+")").addClass("active");
	
	$.ajax({
		url : domain + "verifyLogin.htm",
		dataType : "json",
		type : "get",
		success : function(rv) {
			if (rv.flag == "1") {
				$("#nickName").text(rv.nickName).parent().show();
				$("#loginOut").show();
			}
		}
	});
});
