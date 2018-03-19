$(function() {

	var $passengerDiv = $($("#tr_id_1")[0]).clone();
	var orderTicketCount = 7;
	var currTicketCount = 1;

	$("#addPassenger").on("click", function() {
		ticketCountChange({
			type : "1"
		});
	});

	$("#ticketInfo_id").on("click", ".i-del", function() {
		var _this = this;
		ticketCountChange({
			obj : _this
		});
	});

	function ticketCountChange(param) {
		param = param || {};
		var type = param.type || "", obj = param.obj;
		var nowCount = currTicketCount;
		if (type == "1") {
			if (nowCount >= orderTicketCount) {// 如果票量等于最大票量，不能再加了
				alert("单笔订单最多只能买" + nowCount + "张票");
				return false;
			}
			nowCount++;
			// 增加一个乘客div
			var $passenger = $passengerDiv.clone();
			$("#ticketInfo_id").append($passenger);
		} else {
			// 删除的时候。两种情况，一个是点击减号（删除联系人最后一个），一个是点击删除（删除当前联系人）
			var $delDiv = $(obj).parent().parent();
			if (nowCount <= 1) {// 票量等于1，就不能再减了
				alert("就剩一张了，你还删！");
				return false;
			}
			// 如果是登陆状态那么还要考虑当前删除的是不是已选中的联系人，是的话，要取消打勾的
			// 登陆的判断没有用登陆标记，而是直接看联系人列表里有没有东西，防止登陆，但是没有联系人
			$delDiv.attr("contact_index") && $('#passenger_name' + $delDiv.attr("contact_index")).attr({
				"checked" : false
			});
			// 移除当前乘客div
			$delDiv.remove();
			nowCount--;
		}
		currTicketCount = nowCount;// 修改两个对象的属性
		return true;
	}

	$("body").on("focus", "input[cus_placeholder]", function() {
		inputFocus(this);
	}).on("blur", "input[cus_placeholder]", function() {
		inputBlur({
			obj : this
		});
	});

	// 输入框focus
	function inputFocus(obj) {
		var placeholderValue = $(obj).attr("cus_placeholder");
		var inputValue = $(obj).val();
		if (inputValue == placeholderValue) {
			$(obj).val("");
		}
		$(obj).css("color", "#333").removeClass("inp_Text_red");
		$(obj).parent().nextAll(".common_tips").text("");
	}

	function inputBlur(param) {
		var obj = param.obj;// 必传
		// 先去空格
		obj.value = obj.value.replace(/\s*/g, '');
		// placeholder的值
		var placeholderValue = $(obj).attr("cus_placeholder"),
		// 输入的值
		inputValue = obj.value,
		// 去除首尾空格
		inputValueTrimed = $.trim(inputValue),
		// 输入类型，姓名，身份证，手机
		inputType = $(obj).attr("input_type");
		// 容错提示框
		if (inputValueTrimed == "" || inputValueTrimed == placeholderValue) {
			$(obj).val(placeholderValue);
			$(obj).css("color", "#d6d6d6").addClass("inp_Text_red");
			if (inputType == "1") {// 姓名
				alert("请输入证件上的姓名");
			} else if (inputType == "2") {// 身份证
				alert("请输入证件号码");
			} else if (inputType == "3") {// 手机
				alert("请输入手机号码");
			}
		} else {
			$(obj).css("color", "#333");
			if (inputType == "1") {// 姓名
				if (!checkName(inputValue)) {
					alert("请正确输入证件上的姓名");
					$(obj).addClass("inp_Text_red");
				} else {
					$(obj).removeClass("inp_Text_red");
					return true;
				}
			} else if (inputType == "2") {// 身份证
				if (!Common.isIdCard(inputValue)) {
					alert("请正确输入证件号码");
					$(obj).addClass("inp_Text_red");
				} else if (checkIdCardRepeat(obj)) {
					alert("证件号码已存在，请重新填写");
					$(obj).addClass("inp_Text_red");
				} else {
					$(obj).removeClass("inp_Text_red");
					return true;
				}
			} else if (inputType == "3") {// 手机
				if (!Common.isMobile(inputValue)) {
					alert("请正确输入手机号码");
					$(obj).addClass("inp_Text_red");
				} else {
					$(obj).removeClass("inp_Text_red");
					return true;
				}
			}
		}
		return false;
	}

	// 姓名必须是13汉子或者26个字母
	function checkName(name) {
		return Common.isChanEng(name) && Common.getLength(name) <= 26;
	}
	// 检验身份证是否重复输入
	function checkIdCardRepeat(curr) {
		// 乘车人姓名验证
		var count = 0;
		$(".passenger_mes .IDCardNo").each(function(index, obj) {
			if ($.trim(obj.value).toUpperCase() == $.trim($(curr).val()).toUpperCase()) {
				count++;
			}
		});
		return count > 1;
	}

	getContacts();

	function getContacts() {
		$
				.ajax({
					type : "post",
					url : domain + "getUserContact.htm?",
					dataType : "json",
					success : function(res) {
						// -----------------首先是联系人的展示------------
						var contactList = res;
						var contactNum = contactList.length;
						if (contactNum > 0) {
							var htmlStr = "";
							for (var i = 0; i < contactNum; i++) {
								htmlStr +=
										'<li><input id="passenger_name' + i
												+ '"  type="checkbox" class="check" value="' + i + '|'
												+ contactList[i].contactName + '|' + contactList[i].contactCardCode
												+ '|' + contactList[i].contactMobile
												+ '"><label style="cursor: pointer" for="passenger_name' + i + '">'
												+ contactList[i].contactName + '</label></li>';
							}
							$("#normal_passenger_id").html(htmlStr);

							// -------------------旅客信息复选框-------------
							$("#normal_passenger_id").on("click", ".check", function() {
								if (!$(this).attr("checked")) {
									delPasInfo(this);
								} else {
									addPasInfo(this);
								}
							});

							// 添加旅客信息
							function addPasInfo(obj) {
								// 取出旅客信息
								var userInfo = $(obj).val().split("|");
								// 为了计数判断是否要增加一个联系人
								var count = 0;
								// 遍历当前乘客信息框
								$("#ticketInfo_id tr")
										.each(
												function(i, n) {
													var $input = $(n).find("input[cus_placeholder]");
													// 这是给当前乘客div添加的自定义属性，值是联系人列表里面的序号，如果没有值表示第一个没有输入内容，就要把联系人的内容填充
													// 但是显然这样没有考虑到手动输入的情况，因此后面又加入了单独对姓名和身份证的校验，只要有值，就不能动
													if (!($(n).attr("contact_index")
															|| $input[0].value != $($input[0]).attr("cus_placeholder") || $input[1].value != $(
															$input[1]).attr("cus_placeholder"))) {
														// 给自定义的属性赋值为当前联系人序号
														$(n).attr({
															"contact_index" : userInfo[0]
														});
														// 为姓名和身份证赋值，并触发其blur校验事件
														$($input[0]).val(userInfo[1]).blur();
														$($input[1]).val(userInfo[2]).blur();
														$($input[2]).val(userInfo[3]).blur();
														// return一下不用循环了，可以结束了
														return false;
													} else {
														// 如果第一个框被添加了自定义属性，那么说明已经有了信息，统计一下次数
														count++;
													}
												});
								// 当遍历完之后，如果数量跟票数相等，说明要添加一个乘客了
								if (count == currTicketCount) {
									// 先调用一下在初始化模块里面写的添加联系人的方法，然后再循环调用一下自己添加值
									ticketCountChange({
										type : "1"
									}) && addPasInfo(obj);
								}
							}

							// 再次点击已选中的联系人删除乘客信息的方法，跟添加相比，这个就简单多了
							function delPasInfo(obj) {
								var userInfo = $(obj).val().split("|");
								$("#ticketInfo_id tr").each(function(i, n) {
									// 遍历联系人列表找到与当前选中的联系人一样的那个div的内容，并清空
									if ($(n).attr("contact_index") == userInfo[0]) {
										$(n).attr({
											"contact_index" : ""
										});
										$(n).find("input[cus_placeholder]").val("").blur();
										return false;
									}
								});
							}

						}

					}
				});
	}

	$("#submitBtn").on("click", function() {
		submitOrder();
	});

	function submitOrder() {
		var isInputReady = true;
		$("input[cus_placeholder]").each(function(i, n) {
			if (!inputBlur({
				obj : n
			})) {
				isInputReady = false;
			}
		});
		if (isInputReady) {

			var orderJson = [];
			var orderMoney = 0;
			$("#ticketInfo_id tr").each(function(i, n) {
				var passenger = $(n).find("input[cus_placeholder]");
				var val = $(n).find(".seatType option:selected").val().split("|");
				var ticketMoney = val[1].substring(1);
				orderMoney += +parseFloat(ticketMoney);
				var orderMap = {
					seatType : val[0],
					passengerName : passenger[0].value,
					passengerCardCode : passenger[1].value,
					passengerMobile : passenger[2].value,
					ticketMoney : ticketMoney,
					fromStation : from_station_name,
					toStation : to_station_name,
					trainTime : start_time
				};
				orderJson.push(orderMap);
			});

			$.ajax({
				url : domain + "submitOrder.htm",
				dataType : "json",
				type : "get",
				data : {
					stationTrainCode : station_train_code,
					ticketCount : currTicketCount,
					trainDate : date,
					orderMoney : orderMoney,
					contactMobile : "18512526245",
					orderJson : encodeURIComponent(JSON.stringify(orderJson))
				},
				success : function(res) {
					if (res.flag == "1") {
						alert("保存订单成功");
						location.href = domain + "pay.htm?orderId=" + res.orderId;
					} else {
						alert(res.failReason);
					}
				}
			});
		}
	}
});
