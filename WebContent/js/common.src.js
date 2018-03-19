function Common() {
}
// 校验是否为空(先删除二边空格再验证)
Common.isNull = function (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	if (null == str || "" == str) {
		return true;
	} else {
		return false;
	}
};
//校验是否存在任何空白字符
Common.isLowerS= function (str) {
	var patrn = /\s/;
	return patrn.test(str);
};
//忽略空格，包括全角的
Common.trimContent = function(str){
	//用正则表达式将前后空格用空字符串替代。      
	str = str.replace(/(^\s*)|(\s*$)/g, "");    
    return str.replace(/(^　*)|(　*$)/g, "");    
};
// 校验是否全是数字
Common.isDigit = function (str) {
	var patrn = /^\d+$/;
	return patrn.test(str);
};
// 校验是否全是数字
Common.isMoney = function (str) {
	var patrn = /^[0-9]*(\.[0-9]{1,2})?$/;
	return patrn.test(str);
};
//校验是否全是非字母字符
Common.isW= function (str) {
	var patrn = /^[\W_]+$/;
	return patrn.test(str);
};
//校验是否全是小写字母
Common.isa_z= function (str) {
	var patrn = /^[a-z]+$/;
	return patrn.test(str);
};
//校验是否全是大写字母
Common.isUpperA_Z= function (str) {
	var patrn = /^[A-Z]+$/;
	return patrn.test(str);
};
// 校验是否是整数
Common.isInteger = function (str) {
	var patrn = /^([+-]?)(\d+)$/;
	return patrn.test(str);
};
// 校验是否为正整数
Common.isPlusInteger = function (str) {
	var patrn = /^([+]?)(\d+)$/;
	return patrn.test(str);
};
// 校验是否为负整数
Common.isMinusInteger = function (str) {
	var patrn = /^-(\d+)$/;
	return patrn.test(str);
};
// 校验是否为浮点数
Common.isFloat = function (str) {
	var patrn = /^([+-]?)\d*\.\d+$/;
	return patrn.test(str);
};
// 校验是否为正浮点数
Common.isPlusFloat = function (str) {
	var patrn = /^([+]?)\d*\.\d+$/;
	return patrn.test(str);
};
// 校验是否为负浮点数
Common.isMinusFloat = function (str) {
	var patrn = /^-\d*\.\d+$/;
	return patrn.test(str);
};
// 校验是否仅中文
Common.isChinese = function (str) {
	var patrn = /[\u4E00-\u9FA5\uF900-\uFA2D]+$/;
	return patrn.test(str);
};
//判断是否只有英文
Common.isEnglish = function (str){
	var patrn = /^[a-z]+$/i;
	return patrn.test(str);
};
// 校验是否仅ACSII字符
Common.isAcsii = function (str) {
	var patrn = /^[\x00-\xFF]+$/;
	return patrn.test(str);
};
// 校验手机号码
Common.isMobile = function (str) {
	var patrn = /^0?1[3,4,5,7,8][0-9]{9}$/;
	return patrn.test(str);
};
// 校验电话号码
Common.isPhone = function (str) {
	var patrn = /^(0[\d]{2,3}-)?\d{6,8}(-\d{0,4})?$/;
	return patrn.test(str);
};
// 校验URL地址
Common.isUrl = function (str) {
	var patrn = /^http[s]?:\/\/[\w-]+(\.[\w-]+)+([\w-\.\/?%&=]*)?$/;
	return patrn.test(str);
};
// 校验电邮地址
Common.isEmail = function (str) {
	var patrn = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	return patrn.test(str);
};
// 校验邮编
Common.isZipCode = function (str) {
	var patrn = /^\d{6}$/;
	return patrn.test(str);
};
// 校验合法时间
Common.isDate = function (str) {
	if (!/\d{4}(\.|\/|\-)\d{1,2}(\.|\/|\-)\d{1,2}/.test(str)) {
		return false;
	}
	var r = str.match(/\d{1,4}/g);
	if (r == null) {
		return false;
	}
	var d = new Date(r[0], r[1] - 1, r[2]);
	return (d.getFullYear() == r[0] && (d.getMonth() + 1) == r[1] && d.getDate() == r[2]);
};
// 校验字符串：只能输入6-20个字母、数字、下划线(常用手校验用户名和密码)
Common.isString6_20 = function (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^(\w){6,20}$/;
	return patrn.test(str);
};

// 校验字符串：至少输入6个字符
Common.isString6up = function (str) {
	var patrn = /^(\w){6+}$/;
	return patrn.test(str);
};

// 判断是否只含有中文、字母、数字
Common.isChanEngNum = function (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^[a-z\d\u4E00-\u9FA5]+$/i;
	return patrn.test(str);
};
//判断是否只含有中文、字母
Common.isChanEng = function (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^[a-z\u4E00-\u9FA5]+$/i;
	return patrn.test(str);
};

//判断是否只含有中文、字母最多26个
Common.isChanEng1_26 = function (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^[a-z\u4E00-\u9FA5]{1,13}$/i;
	return patrn.test(str);
};

//判断是否只含有中文、字母最多26个
Common.isChanEng1_20 = function (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^[a-z\u4E00-\u9FA5]{1,20}$/i;
	return patrn.test(str);
};

//判断是否只含有字母、数字
Common.isLetterNum = function (str) {
	str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^[a-z\d]+$/i;
	return patrn.test(str);
};
Common.isCaptcha = function (str) {
	var patrn = /^[\da-zA-Z]{4}$/;
	return patrn.test(str);
};
Common.isSmsCaptcha = function (str) {
	var patrn = /^\d{6}$/;
	return patrn.test(str);
};
// 判断是否只含有中文、字母、数字、下划线
Common.isWord = function (str) {
	var patrn = /^[\w\u4E00-\u9FA5]+$/;
	return patrn.test(str);
};

// 判断是否只含有中文
Common.isChan = function (str) {
	var patrn = /^[\u4E00-\u9FA5]+$/i;
	return patrn.test(str);
};

//判断是否只含有中文、字母、数字、下划线、(增加)中划线（判断用户名）
Common.isNickName = function (str) {
	//str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^[(\w)\d\u4E00-\u9FA5-]+$/i;
	return patrn.test(str);
};

//校验字符串：只能输入6-30个字母、数字、下划线(常用手校验用户名和密码)
Common.isString6_30 = function (str) {
	//str = str.replace(/(^\s*)|(\s*$)/g, "");// 删除二边空格
	var patrn = /^(\w)+$/;
	return patrn.test(str);
};

/*获取字符串长度，中文算两个字符，英文算一个字符*/
Common.getLength=function(str) {
   str = str.replace(/(^\s*)|(\s*$)/g, "");//删除二边空格
   var totallength=0;
   for (var i=0;i<str.length;i++)
   {
    var intCode=str.charCodeAt(i); 
      if (intCode>=0&&intCode<=128) {
      totallength=totallength+1; //非中文单个字符长度加 1
      }
     else {
      totallength=totallength+2; //中文字符长度则加 2
      }
   }
   return totallength;
};

// 清除对象
function clean(obj) {
	obj.value = "";
	return;
}

// 去掉字符串收尾空格
Common.trim = function (str) {
	return str.replace(/(^\s+)|\s+$/g, "");
};

//获得cookie
Common.getCookie = function (name) {
	var strCookies = document.cookie;
	var cookieName = name + "="; // Cookie名称
	var valueBegin, valueEnd, value;

	// 寻找是否有此Cookie名称
	valueBegin = strCookies.indexOf(cookieName);
	if (valueBegin == -1) {
		return null;
	} // 没有此Cookie

	// 取得值的结尾位置
	valueEnd = strCookies.indexOf(";", valueBegin);
	if (valueEnd == -1) {
		valueEnd = strCookies.length;
	} // 最後一个Cookie

	// 取得Cookie值
	value = strCookies.substring(valueBegin + cookieName.length, valueEnd);
	return decodeURI(value);
};

// 保存cookie
Common.saveCookie = function (name, value, expires, path, domain, secure) {
	var strCookie = name + "=" + encodeURI(value);
	if (expires) { // 计算Cookie的期限, 参数为天数
		var curTime = new Date();
		curTime.setTime(curTime.getTime() + expires * 24 * 60 * 60 * 1000);
		strCookie += "; expires=" + curTime.toGMTString();
	}
	// Cookie的路径
	strCookie += (path) ? "; path=" + path : "";
	// Cookie的Domain
	strCookie += (domain) ? "; domain=" + domain : "";
	// 是否需要保密传送,为一个布尔值
	strCookie += (secure) ? "; secure" : "";
	document.cookie = strCookie;
};

// 检测是否存在cookie
Common.checkCookieExist = function (name) {
	if (Common.getCookie(name)) {
		return true;
	} else {
		return false;
	}
};

//是否是身份证
Common.isIdCard = function (obj)
{
	 var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
	 var iSum = 0;
	 var strIDno = obj;
	 var idCardLength = strIDno.length;
	 
	 var GetVerifyBit = function (id){ 
		    var result; 
		    var nNum=eval(id.charAt(0)*7+id.charAt(1)*9+id.charAt(2)*10+id.charAt(3)*5+id.charAt(4)*8+id.charAt(5)*4+id.charAt(6)*2+id.charAt(7)*1+id.charAt(8)*6+id.charAt(9)*3+id.charAt(10)*7+id.charAt(11)*9+id.charAt(12)*10+id.charAt(13)*5+id.charAt(14)*8+id.charAt(15)*4+id.charAt(16)*2);
		    nNum=nNum%11; 
		    switch (nNum) { 
		       case 0 : 
		          result="1"; 
		          break; 
		       case 1 : 
		          result="0"; 
		          break; 
		       case 2 : 
		          result="X"; 
		          break; 
		       case 3 : 
		          result="9"; 
		          break; 
		       case 4 : 
		          result="8"; 
		          break; 
		       case 5 : 
		          result="7"; 
		          break; 
		       case 6 : 
		          result="6"; 
		          break; 
		       case 7 : 
		          result="5"; 
		          break; 
		       case 8 : 
		          result="4"; 
		          break; 
		       case 9 : 
		          result="3"; 
		          break; 
		       case 10 : 
		          result="2"; 
		          break; 
		    } 
		    return result; 
		};
	 if(!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno))
	 {
       return false; // 非法身份证号
	 }

	 if(aCity[parseInt(strIDno.substr(0,2))]==null)
	 {
		 return false;// 非法地区
	 }

	 // 15位身份证转换为18位
	 if (idCardLength==15)
	 {
		 sBirthday = "19" + strIDno.substr(6,2) + "-" + Number(strIDno.substr(8,2)) + "-" + Number(strIDno.substr(10,2));
		 var d = new Date(sBirthday.replace(/-/g,"/"));
		 var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();
		 if(sBirthday != dd)
		 {
           return false; // 非法生日
		 }
        strIDno=strIDno.substring(0,6)+"19"+strIDno.substring(6,15);
        strIDno=strIDno+GetVerifyBit(strIDno);
	  }

      // 判断是否大于2078年，小于1900年
      var year =strIDno.substring(6,10);
      if (year<1900 || year>2078 )
      {
          return false;// 非法生日
      }

      // 18位身份证处理

      // 在后面的运算中x相当于数字10,所以转换成a
      strIDno = strIDno.replace(/x$/i,"a");

	   sBirthday=strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));
	   var d = new Date(sBirthday.replace(/-/g,"/"));
	   if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))
	   {
           return false; // 非法生日
	   }
      // 身份证编码规范验证
	   for(var i = 17;i>=0;i --)
	   {
		    iSum += (Math.pow(2,i) % 11) * parseInt(strIDno.charAt(17 - i),11);
	   }
	   if(iSum%11!=1)
	   {
           return false;// 非法身份证号
	   }

	   // 判断是否屏蔽身份证
	   var words = new Array();
	   words = new Array("11111119111111111","12121219121212121");

	   for(var k=0;k<words.length;k++)
	   {
		   if (strIDno.indexOf(words[k])!=-1)
		   {
			   return false;
		   }
	   }
	   return true;
};

Common.decodeNumber = function(str){
	var _result = "";
	var numberArr = ["6","2","5","1","3","9","0","8","7","4"];
	if(str && str != ""){
		for(var i=0;i<str.length;i++){
			var _ = str.charAt(i);
			if(/^\d+$/.test(_)){
				_result += numberArr[parseInt(_)];
			}else{
				_result += _;
			}
		}
	}
	return _result;
};

// 封装dom对象
function _t(id) {
	return document.getElementById(id);
}

// 提示验证信息
function innerStr(id,str,color,classOrColor,time) {
	if(classOrColor == 'class') {// 传的是样式
		_t(id).innerHTML = '<font class="' + color + '">' + str + '</font>';
	}else {// 传的是颜色
		_t(id).innerHTML = '<font style="color:' + color + '">' + str + '</font>';
	}
	if(typeof(time) != 'undefined' && time != null && !isNaN(time)) {
		window.setTimeout(function(){_t(id).innerHTML = '';},time);
	}
}

// 打开页面
function winOpen(_url, _frmName, _width, _height, _top, _left) {
	if ((_top == "") && (_left == "")) {
		var t = (screen.height - _height) / 2 - 10;
		var l = (screen.width - _width) / 2;
		window.open(_url, _frmName, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no," + "width=" + _width + ",height=" + _height + ",top=" + t + ",left=" + l);
	} else {
		window.open(_url, _frmName, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no," + "width=" + _width + ",height=" + _height + ",top=" + _top + ",left=" + _left);
	}
}

// 根据id和value，选择select的值
function selectSelect(selectId, selectValue) {
	var _select = $("#" + selectId)[0];
	for (var i = 0; i < _select.options.length; i++) {
		if (_select.options[i].value == selectValue) {
			_select.options[i].selected = "selected";
		}
	}
}

function copy(txt) {
	if (window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);
		alert("内容已经复制到您的剪贴板!");
	} else {
		if (navigator.userAgent.indexOf("Opera") != -1) {
			window.location = txt;
		} else {
			alert("您的浏览器不支持,请手动复制!");
			return false;
			if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}
				catch (e) {
					alert("您的浏览器不支持,请手动复制!");
					return false;
				}
				var clip = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
				if (!clip) {
					return;
				}
				var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
				if (!trans) {
					return;
				}
				trans.addDataFlavor("text/unicode");
				var str = new Object();
				var len = new Object();
				var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
				var copytext = txt;
				str.data = copytext;
				trans.setTransferData("text/unicode", str, copytext.length * 2);
				var clipid = Components.interfaces.nsIClipboard;
				if (!clip) {
					alert("您的浏览器不支持,请手动复制");
					return false;
				}
				clip.setData(trans, null, clipid.kGlobalClipboard);
				alert("地址已经复制到您的剪贴板，您可以发送给您的朋友啦!");
			}
		}
	}
}

/*设置页面为浏览器首页*/
function homePage(obj,val){
  try{
    obj.style.behavior='url(#default#homepage)';
    obj.setHomePage(val);
  }catch(e){
    if(window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
        }catch (e)  {
            alert("此操作被浏览器拒绝！"); 
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage',val);
     }else{
    	 alert("建议您手动设置");
     }
  }
}

/*页面加入收藏夹*/
function addfavorite(){
	var url = window.top.location;
    if (document.all) {
       try{
    	 window.external.addFavorite(url,'畅途网');
       }catch(e){
    	   alert("建议您手动添加或者按Ctrl+D快捷键。");
       }
    }else if(window.sidebar) {
       try{
    	   window.sidebar.addPanel('畅途网', url, "");
       }catch(e){
    	   alert("建议您手动添加或者按Ctrl+D快捷键。");
       }
    }else{
    	alert("建议您手动添加或者按Ctrl+D快捷键。");
    }
}
function getRadioValue(tagName){
	var result = null;
	var radioList = document.getElementsByName(tagName);
	for(var i = 0 ; i <  radioList.length ; i++){
		if(radioList[i].checked){
			result = radioList[i].value;
		}
	}
	return result;
}

function html_encode(str)   
{   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&/g, "&amp;");   
  s = s.replace(/</g, "&lt;");   
  s = s.replace(/>/g, "&gt;");   
  return s;   
}   

function html_decode(str)   
{   
  var s = "";   
  if (str.length == 0) return "";   
  s = str.replace(/&amp;/g, "&");   
  s = s.replace(/&lt;/g, "<");   
  s = s.replace(/&gt;/g, ">");   
  s = s.replace(/&nbsp;/g, " ");   
  return s;   
}

var alert_timeout;
function jAlert(str, mil){
clearTheTimeout();
	if(!mil || !/^\d+$/.test(mil)) mil = 3000;
	var id="succ_div";
	$("#"+id).remove();
	var div_str = "";
	div_str+='<div id="'+id+'" style="z-index:9999;" class="small_div">';
	div_str+='  <div class="small_div_boder">';
	div_str+='      <div class="div_close">';
	div_str+='      <div class="close_blue" onclick="closeDiv(\''+id+'\')" style="cursor:pointer;"></div>';
	div_str+='    </div>';
	div_str+='    <div class="div_title bold font14 div_fail">'+str+'</div> ';
	div_str+='    <div class="clear"></div> ';
	div_str+='  </div>';
	div_str+='</div>';
	
	var scrollTop = $(window).scrollTop();
	var scrollLeft = $(window).scrollLeft();
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	$("body").append(div_str);
	
	document.getElementById(id).style.display = 'block';
	document.getElementById(id).style.left = windowWidth/2 + scrollLeft - 200 + 'px';
	document.getElementById(id).style.top = windowHeight/2 + scrollTop - 30 + 'px';
	alert_timeout = window.setTimeout("closeDiv('succ_div')",mil);
}
function iAlert(str,mil){
clearTheTimeout();
	if(!mil || !/^\d+$/.test(mil)) mil = 3000;
	var id="succ_div";
	$("#"+id).remove();
	var div_str = "";
	div_str+='<div id="'+id+'" style="z-index:9999;" class="small_div">';
	div_str+='  <div class="small_div_boder">';
	div_str+='      <div class="div_close">';
	div_str+='      <div class="close_blue" onclick="closeDiv(\''+id+'\')" style="cursor:pointer;"></div>';
	div_str+='    </div>';
	div_str+='    <div class="div_title bold font14 div_succeed">'+str+'</div> ';
	div_str+='    <div class="clear"></div>';
	div_str+='  </div>';
	div_str+='</div>';
	
	var scrollTop = $(window).scrollTop();
	var scrollLeft = $(window).scrollLeft();
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	$("body").append(div_str);
	
	document.getElementById(id).style.display = 'block';
	document.getElementById(id).style.left = windowWidth/2 + scrollLeft - 200 + 'px';
	document.getElementById(id).style.top = windowHeight/2 + scrollTop - 30 + 'px';
	alert_timeout = setTimeout("closeDiv('succ_div')",mil);
}

function jAlert_new(str){
clearTheTimeout();
	var id="succ_div";
	$("#"+id).remove();
	var div_str = "";
	div_str+='<div id="'+id+'" style="z-index:9999;" class="small_div">';
	div_str+='  <div class="small_div_boder">';
	div_str+='      <div class="div_close">';
	div_str+='      <div class="close_blue" onclick="closeDiv_new(\''+id+'\')" style="cursor:pointer;"></div>';
	div_str+='    </div>';
	div_str+='    <div class="div_title bold font14 div_fail">'+str+'</div> ';
	div_str+='    <div class="clear"></div> ';
	div_str+='  </div>';
	div_str+='</div>';
	
	var scrollTop = $(window).scrollTop();
	var scrollLeft = $(window).scrollLeft();
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	$("body").append(div_str);
	
	document.getElementById('fade').style.display = 'block';
	document.getElementById(id).style.display = 'block';
	document.getElementById(id).style.left = windowWidth/2 + scrollLeft - 200 + 'px';
	document.getElementById(id).style.top = windowHeight/2 + scrollTop - 30 + 'px';
	alert_timeout = setTimeout("closeDiv_new('succ_div')",3000);
}
function iAlert_new(str){
clearTheTimeout();
	var id="succ_div";
	$("#"+id).remove();
	var div_str = "";
	div_str+='<div id="'+id+'" style="z-index:9999;" class="small_div">';
	div_str+='  <div class="small_div_boder">';
	div_str+='      <div class="div_close">';
	div_str+='      <div class="close_blue" onclick="closeDiv_new(\''+id+'\')" style="cursor:pointer;"></div>';
	div_str+='    </div>';
	div_str+='    <div class="div_title bold font14 div_succeed">'+str+'</div> ';
	div_str+='    <div class="clear"></div>';
	div_str+='  </div>';
	div_str+='</div>';
	
	var scrollTop = $(window).scrollTop();
	var scrollLeft = $(window).scrollLeft();
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();
	
	$("body").append(div_str);
	
	document.getElementById('fade').style.display = 'block';
	document.getElementById(id).style.display = 'block';
	document.getElementById(id).style.left = windowWidth/2 + scrollLeft - 200 + 'px';
	document.getElementById(id).style.top = windowHeight/2 + scrollTop - 30 + 'px';
	alert_timeout = setTimeout("closeDiv_new('succ_div');",3000);
}
function clearTheTimeout(){
	window.clearTimeout(alert_timeout);
}
function closeDiv(divId){
	$("#succ_div").remove();
}

function closeDiv_new(divId){
	//$("#"+divId).remove();
	//document.getElementById('fade').style.display = 'none';
	window.top.location.reload();
}
/*offsetTop和offsetLeft的兼容性封装*/
function getOffsetTop(el){
    var _t =el.offsetTop;
         while(el = el.offsetParent){
        _t += el.offsetTop;
    }
    return _t;
}
function getOffsetLeft(el){
    var _t =el.offsetLeft;
         while(el =el.offsetParent){
        _t += el.offsetLeft;
    }
    return _t;
}
function selectSelect(selectId, selectValue) {
	var _select = $("#" + selectId)[0];
	for (var i = 0; i < _select.options.length; i++) {
		if (_select.options[i].value == selectValue) {
			_select.options[i].selected = "selected";
		}
	}
}
//除法函数，用来得到精确的除法结果 
//说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。 
//调用：accDiv(arg1,arg2) 
//返回值：arg1除以arg2的精确结果
function accDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {
	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * pow(10, t2 - t1);
	}
}
//给Number类型增加一个div方法，调用起来更加方便。
//Number.prototype.div = function(arg) {
//	return accDiv(this, arg);
//}
//乘法函数，用来得到精确的乘法结果
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
function accMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m);
}
//给Number类型增加一个mul方法，调用起来更加方便。
//Number.prototype.mul = function(arg) {
//	return accMul(arg, this);
//}
//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}
//给Number类型增加一个add方法，调用起来更加方便。
//Number.prototype.add = function(arg) {
//	return accAdd(arg, this);
//}

function accSub(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	// last modify by deeka
	// 动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//给Number类型增加一个subtr方法，调用起来更加方便。
//Number.prototype.add = function(arg) {
//	return Subtr(arg, this);
//}
/**
 * 关于大星星
 * @param 
 */
function rateStar(params){
	var type = params.type || '';//目前三种'all'-总体评价，'chezhan'-客运站评价，'bus'-车内环境评价
	var wrapId = params.wrapId || '';//包裹ID
	var clickFun = params.onclick || function(){};
	var mouseoverFun = params.onmouseover || function(){};
	var mouseoutFun = params.onmouseout || function(){};
	var explArr = {//三种评分描述，顺序依次是总体评价、客运站评价、车内评价
	   'all' : ['信息较差，还需要改进','信息对我没有帮助','信息一般，还需要完善','信息比较全面，对我有帮助','信息非常全面，对我帮助很大'],
	   'chezhan' : ['很差','差','一般','好','很好'],
	   'bus' : ['很差','差','一般','好','很好']
	};
	
	var wrap = $('#'+wrapId);
	var selectedIndex=0;
	wrap.children().each(function(i){
		var t = $(this);
		t.mouseover(function(){
			t.prevAll().andSelf().each(function(){
				this.src = domain+'img/star_light.gif';
			}).end().end().nextAll().each(function(){
				this.src = domain+'img/star_grey.gif';
			});
			var res = {score:i+1,expl:explArr[type][i]};
			mouseoverFun(res);
		}).mouseout(function(){
			var res = {};
			if(selectedIndex>0){
				wrap.children().eq(selectedIndex-1).prevAll().andSelf().each(function(){
					this.src = domain+'img/star_light.gif';
				}).end().end().nextAll().each(function(){
					this.src = domain+'img/star_grey.gif';
				})
				res = {score:selectedIndex,expl:explArr[type][selectedIndex-1]};
			}else{
				wrap.children().each(function(){
					this.src = domain+'img/star_grey.gif';
				});
				res = {score:0,expl:'点击星星进行打分'};
			}
			mouseoutFun(res);
		}).click(function(){
			selectedIndex = t.prevAll().size()+1;
			t.prevAll().andSelf().each(function(){
				this.src = domain+'img/star_light.gif';
			}).end().end().nextAll(function(){
				this.src = domain+'img/star_grey.gif';
			});
			var res = {score:selectedIndex,expl:explArr[type][selectedIndex-1]};
			clickFun(res);
		});
	});
}

function changeState(starId){
	for(var i=1;i<=starId;i++){
		$("#star_"+i).attr("src",domain+"img/star_light.gif");
	}
	for(var i=parseInt(starId)+1;i<=5;i++){
		$("#star_"+i).attr("src",domain+"img/star_grey.gif");
	} 
	if(currentSrc.indexOf("light")!=-1){
		$("#star_"+starId).attr("src",domain+"img/star_grey.gif");	
		changeIndex=parseInt(starId)-1;				
	}else{
		changeIndex=parseInt(starId);
	} 	
	currentSrc=$("#star_"+starId).attr("src");	
}

function changeColor(starId){
	currentSrc=$("#star_"+starId).attr("src");
	for(var i=1;i<=starId;i++){
		$("#star_"+i).attr("src",domain+"img/star_light.gif");
	}
	for(var i=parseInt(starId)+1;i<=5;i++){
		$("#star_"+i).attr("src",domain+"img/star_grey.gif");
	} 
}

function backColor(starId){
	for(var i=1;i<=changeIndex;i++){
		$("#star_"+i).attr("src",domain+"img/star_light.gif");
	}
	for(var i=changeIndex+1;i<=5;i++){
		$("#star_"+i).attr("src",domain+"img/star_grey.gif");
	} 
}

function Obj2str( o) {
    if ( o == undefined) {
        return "" ;
    }
    var r = [];
    if ( typeof o == "string" ) return "\"" + o.replace (/([\"\\])/g, " \\$1").replace( /(\n)/g, "\\ n").replace(/(\r)/g , "\\ r").replace(/(\t)/g , "\\t ") + "\"" ;
    if ( typeof o == "object" ) {
        if (! o.sort ) {
            for ( var i in o)
                r.push ("\"" + i + "\":" + Obj2str(o[i] ));
            if (!! document.all && !/^\n?function \s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/. test(o .toString)) {
                r.push ("toString:" + o. toString.toString ());
            }
            r = "{" + r .join() + "}"
        } else {
            for ( var i = 0; i < o. length; i++)
                r.push (Obj2str( o[i]))
            r = "[" + r .join() + "]";
        }
        return r ;
    }
    return o .toString(). replace(/\"\:/g , '":""');
}
/**
 * 截取字符串
 */
Common.subString = function(srcStr, subLength){
	//参数：要截取的字符串、截取的长度
	if(srcStr == null || srcStr == ''){
		return '';
	}
	srcStr = srcStr + '';
	if(subLength == null || typeof subLength != 'Number'){
		subLength = srcStr.length;
	}
	return srcStr.length > subLength ? srcStr.slice(0,subLength) : srcStr;
};

//3.0密码规则
Common.pwdRegx = function(pwd){
	var flag=false;
	if(pwd.length < 6 || pwd.length>20){
		return flag;
	}else{
		var singleFlag=Common.isW(pwd);
		var azFlag=Common.isa_z(pwd);
		var upperAZFlag=Common.isUpperA_Z(pwd);
		var digitFlag=Common.isDigit(pwd);
		if(!singleFlag && !azFlag && !upperAZFlag && !digitFlag){
			flag=true;
		}
		return flag;
	}	
};
//3.0密码强度规则
Common.pwdLevel = function(value){
    var pattern_1 =/^[\da-z]{6,7}$/;
    var pattern_2 =/^[(\W|_)A-Z]{10,20}$/;
    var pattern_3 = /\d+/;
    var pattern_4 = /[a-z]+/;
    var pattern_5 = /[A-Z]+/;
    var pattern_6 = /(\W|_)+/;
    var pattern_7 = /\S{10,20}/;
    var level = 2;
    if (pattern_1.test(value)) {
        level=1;
    }else{
	    var level31=pattern_7.test(value) && ((pattern_3.test(value) && pattern_5.test(value) && pattern_6.test(value)) || (pattern_4.test(value) && pattern_5.test(value) && pattern_6.test(value)));
	    var level32=pattern_2.test(value);
	    var level33=pattern_3.test(value) && pattern_4.test(value) && pattern_5.test(value) && pattern_6.test(value);
    	if (level31 || level32 || level33) {
            level=3;
        }
    }
    return level;
};
function transfer(url){
	if(!url){
		return;
	}
	if(document.getElementById('trip8080Jump')){
		var img = document.getElementById('trip8080Jump');
		img.src = 'http://www.trip8080.com/c.jspx?url='+encodeURI(url)+'&r='+new Date().getTime();
	}else{
		var img = document.createElement('img');
		img.id = 'trip8080Jump';
		img.src = 'http://www.trip8080.com/c.jspx?url='+encodeURI(url)+'&r='+new Date().getTime();
	}
	window.open(url);
}

/**
 * 记录Referrer和对应的Source
 */
(function(undefined){
	var ref = document.referrer;
	if (ref.indexOf("http://www.hzcy.com/") != -1) {
		Common.saveCookie("sourceId", "212" );
	}else if(ref.indexOf("http://www.jnqczz.com.cn/") != -1){
		Common.saveCookie("sourceId", "252" );
	}else if(ref.indexOf("www.19lou.com") != -1){
		Common.saveCookie("sourceId","20002");
	}
})();

//截取中英文字符
String.prototype.sub = function (n) { 
	var r = /[^\x00-\xff]/g; 
	if ( this .replace(r, "mm" ).length <= n) return this ; 
	var m = Math.floor(n/2);  
	for ( var i=m; i< this .length; i++) {  
	  if ( this .substr(0, i).replace(r, "mm" ).length>=n){ 
		  return this .substr(0, i-2) + "..." ;
		  } 
	   }
	return this ; 
};
//js过滤HTML标签以及&nbsp;
function removeHTMLTag(str) {
    str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
    return str;
}

function stopBubble() {
	//取消事件冒泡 
	 var e=arguments.callee.caller.arguments[0]||event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
	 if (e && e.stopPropagation) { 
	  // this code is for Mozilla and Opera
	  e.stopPropagation(); 
	 } else if (window.event) { 
	  // this code is for IE 
	  window.event.cancelBubble = true; 
	 } 
}

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function forbidBackSpace(e) {
	   var ev = e || window.event; //获取event对象 
	   var obj = ev.target || ev.srcElement; //获取事件源 
	   var t = obj.type || obj.getAttribute('type'); //获取事件源类型 
	   //获取作为判断条件的事件类型 
	   var vReadOnly = obj.readOnly;
	   var vDisabled = obj.disabled;
	   //处理undefined值情况 
	   vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	   vDisabled = (vDisabled == undefined) ? true : vDisabled;
	   //当敲Backspace键时，事件源类型为密码或单行、多行文本的， 
	   //并且readOnly属性为true或disabled属性为true的，则退格键失效 
	   var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
	   //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效 
	   var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
	   //判断 
	   if (flag2 || flag1) return false;
	}
	//禁止后退键 作用于Firefox、Opera
	document.onkeypress = forbidBackSpace;
	//禁止后退键  作用于IE、Chrome
	document.onkeydown = forbidBackSpace;
	
//比较日期差多少天
function dateCompare(dateStr1, dateStr2){
	var date1 = new Date(),
		date2 = new Date(),
		splits1 = dateStr1.split("-"),
		splits2 = dateStr2.split("-");
	date1.setFullYear(+splits1[0],+splits1[1]-1,+splits1[2]);
	date2.setFullYear(+splits2[0],+splits2[1]-1,+splits2[2]);
	return (date1 - date2)/1000/60/60/24;
}

function checkInputTextFocus(ele){
	var focusFlag = false;
	var myInput = document.getElementById(ele);
	if (myInput == document.activeElement) {
		focusFlag = true;
	} 
	return focusFlag;
};

//解决focus与select的
var flag = 0;
function focusAndselect(obj){
	if (flag%2 == 0 ){
        obj.focus();
        obj.select();
    }
    flag++;
}

//解决网络条件下面慢。无法输入的一种方式。
function focusInput(v){
	if(v.value == '请输入中文/拼音/简拼'){
		v.value = '';
		v.style.cssText = 'color:#333';
	}
} 