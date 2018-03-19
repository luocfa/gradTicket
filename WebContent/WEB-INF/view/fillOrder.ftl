<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>NUIST火车票预订</title>
<link rel="stylesheet" href="css/index.min.css">
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/pay.css">
<link rel="stylesheet" href="css/base.css">
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
<div class="content" style="min-height: 488px;"><!--列车信息 开始-->
<div class="layout t-info"><div class="lay-hd">
				列车信息<span class="small">（以下余票信息仅供参考）</span>
</div>
<div class="wri_ticket_bd">
<div class="wri_ticket_bd_route"><!--p class="t-tit" id="ticket_tit_id">
<strong class="mr5">2016-05-02（周一）</strong><strong class="ml5">K1154</strong>次<strong class="ml5">汉口</strong>站<strong>（05:36开）—南京</strong>站（14:06到）
</p>
<p class="t-con" id="ticket_con_id">
<span class="s1">软卧（<span class="colorA">￥246.0</span>）无票</span>

<span class="s1">硬卧（<span class="colorA">￥156.0</span>）12张票</span>

<span class="s1">硬座（<span class="colorA">￥83.0</span>）无票</span>

<span class="s1">无座（<span class="colorA">￥83.0</span>）有票</span>
</p-->
<ul class="clearfix">
            <li class="left wtbr_time">
              <p class="font14 fontW">${date}</p>
              <p class="mgt5">历时<span class="font20 fontW mgr5">${lishi}</span></p>
            </li>
            <li class="left wtbr_route">
              <div class="clearfix">
                <div class="wtbr_route_city left">
                  <p class="city fontW font20">${from_station_name}</p>
                  <p class="stat font12 mgt5">${start_time}开</p>
                </div>
                <div class="wtbr_route_arrow left"> <span>${station_train_code}</span> <s class="line auto"></s> </div>
                <div class="wtbr_route_city left">
                  <p class="city fontW font20">${to_station_name}</p>
                  <p class="stat font12 mgt5">${arrive_time}到</p>
                </div>
              </div>
            </li>
          </ul>
          <p class="t-con" id="ticket_con_id">
			[#if swz_num != "--"]<span class="s1">商务座（<span id="A9" class="colorA">${price.A9}</span>）${swz_num}票</span>[/#if]
			[#if tz_num != "--"]<span class="s1">特等座（<span id="P" class="colorA">${price.P}</span>）${tz_num}</span>[/#if]
			[#if zy_num != "--"]<span class="s1">一等座（<span id="M" class="colorA">${price.M}</span>）${zy_num}票</span>[/#if]
			[#if ze_num != "--"]<span class="s1">二等座（<span id="O" class="colorA">${price.O}</span>）${ze_num}票</span>[/#if]
			[#if gr_num != "--"]<span class="s1">高级软卧（<span id="A6" class="colorA">${price.A6}</span>）${gr_num}票</span>[/#if]
			[#if rw_num != "--"]<span class="s1">软卧（<span id="A4" class="colorA">${price.A4}</span>）${rw_num}票</span>[/#if]
			[#if yw_num != "--"]<span class="s1">硬卧（<span id="A3" class="colorA">${price.A3}</span>）${yw_num}票</span>[/#if]
			[#if rz_num != "--"]<span class="s1">软座（<span id="A2" class="colorA">${price.A2}</span>）${rz_num}票</span>[/#if]
			[#if yz_num != "--"]<span class="s1">硬座（<span id="A1" class="colorA">${price.A1}</span>）${yz_num}票</span>[/#if]
			[#if wz_num != "--"]<span class="s1">无座（<span id="wz" class="colorA">[#if ze_num != "--"]${price.O}[#else]${price.A1}[/#if]</span>）${wz_num}票</span>[/#if]
			[#if qt_num != "--"]<span class="s1">其他（<span class="colorA"></span>）无票</span>[/#if]
			
			</p>
</div></div>
</div>
<!--列车信息 结束-->
<!--改签原票信息 开始-->
<!--改签原票信息 结束-->
<div style="display: none;"><input style="display: none;" type="checkbox" id="fczk">
</div>
<!--乘客信息 开始-->
<div class="layout person"><div class="lay-hd">
				乘客信息<span class="small" id="psInfo">（填写说明）</span>
</div>
<div class="lay-bd">
<div class="per-sel">

<div class="item clearfix">
<h2 class="cy" id="normal_passenger_image_id" title="常用联系人" style="">常用联系人</h2>
<ul id="normal_passenger_id">
</ul>
<div class="btn-all" style="" id="btnAll"><a id="show_more_passenger_id" title="展开" href="javascript:" style="" shape="rect"><label id="gd">更多</label>
<b></b>
</a>
</div>
</div>
</div>
<table class="per-ticket"><tbody><tr><th width="28" rowspan="1" colspan="1">序号</th>
<th rowspan="1" colspan="1">席别 </th>
<th rowspan="1" colspan="1">票种</th>
<th rowspan="1" colspan="1">姓名</th>
<th rowspan="1" colspan="1">证件类型</th>
<th rowspan="1" colspan="1">证件号码</th>
<th rowspan="1" colspan="1">手机号码</th>
<!-- 
						<th><input type="checkbox" class="check" id="selected_ticket_passenger_all"
							onclick="javascript:selectedTicketPassengerAll(this,true);" checked="checked" />全部</th>
						-->
<th width="70" rowspan="1" colspan="1"></th>
<th width="30" rowspan="1" colspan="1"></th>
</tr>
</tbody><tbody id="ticketInfo_id">
<tr id="tr_id_1">
				<td align="center">1</td>
						<td><select class="seatType" id="seatType_1">
                         
            [#if swz_num != "--" && swz_num != "无"]<option value="1|${price.A9}" selected="selected">商务座（${price.A9}）</option>[/#if]
			[#if tz_num != "--" && tz_num != "无"]<option value="2|${price.P}">特等座（${price.P}）</option>[/#if]
			[#if zy_num != "--" && zy_num != "无"]<option value="3|${price.M}">一等座（${price.M}）</option>[/#if]
			[#if ze_num != "--" && ze_num != "无"]<option value="4|${price.O}">二等座（${price.O}）</option>[/#if]
			[#if gr_num != "--" && gr_num != "无"]<option value="5|${price.A6}">高级软卧（${price.A6}）</option>[/#if]
			[#if rw_num != "--" && rw_num != "无"]<option value="6|${price.A4}">软卧（${price.A4}）</option>[/#if]
			[#if yw_num != "--" && yw_num != "无"]<option value="7|${price.A3}">硬卧（${price.A3}）</option>[/#if]
			[#if rz_num != "--" && rz_num != "无"]<option value="8|${price.A2}">软座（${price.A2}）</option>[/#if]
			[#if yz_num != "--" && yz_num != "无"]<option value="9|${price.A1}">硬座（${price.A1}）</option>[/#if]
			[#if wz_num != "--" && wz_num != "无"]<option value="10|[#if ze_num != "--" && ze_num != "无"]${price.O}[#else]${price.A1}[/#if]">无座（[#if ze_num != "--" && ze_num != "无"]${price.O}[#else]${price.A1}[/#if]）</option>[/#if]
            
             </select>
                         </td>
						<td>
    <select id="ticketType_1">
                          
 			
				<option name="ticket_type_option" value="1" selected="selected">成人票</option>
            
</select>
                        </td>
						<td><div class="pos-rel">
						<input cus_placeholder="请输入姓名" input_type="1" id="passenger_name_1" class="inptxt w110" value="请输入姓名" size="12" maxlength="20"  style="color:#d6d6d6">
						<div class="w110-focus" id="passenger_name_1_notice"></div>
						</div></td>
						<td><select id="passenger_id_type_1" disabled="disabled" style="color:#999999">
                       
 
				<option value="1" selected="selected">二代身份证</option>
			
        </select>
             </td>
<td><div class="pos-rel"><input cus_placeholder="请输入身份证号" input_type="2" id="passenger_id_no_1" class="inptxt w160" value="请输入身份证号" size="20" maxlength="35" style="color:#d6d6d6"><div class="w160-focus" id="passenger_id_no_1_notice"></div></div></td>
						<td><div class="pos-rel"><input cus_placeholder="请输入手机号" input_type="3"  id="phone_no_1" class="inptxt w110" value="请输入手机号" size="11" maxlength="20" style="color:#d6d6d6"><div class="w160-focus" id="phone_no_1_notice"></div></div></td>
 
			

	<td style="width:40;">
		<a href="javascript:" id="addchild_1" name="addchild_default_0"></a>
	</td>


<td title="删除常用联系人">
 <span class="i-del" id="del_1_default_0"></span>
</td>

		</tr>
  
</tbody>
</table>
<div><div class="add-per"><span id="addPassenger">新增乘客</span>
</div>
</div>
</div>
<div class="goRe_btn mgt20 mgb20">
      <input type="button" id="submitBtn" class="Nbtn_gray btn_blue btn_blue_search auto" value="下一步，核对信息">
    </div>

</div>


</div>
[#include "WEB-INF/view/footer.ftl"]
</body>
<script>
	var domain = "${domain}";
	var station_train_code = "${station_train_code}";
	var date = "${date}";
	var from_station_name = "${from_station_name}";
	var to_station_name = "${to_station_name}";
	var start_time = "${start_time}";
	
</script>
<script src="js/fillOrder.js"></script>
<script src="js/common.src.js"></script>
</html>