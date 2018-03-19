package com.nuist.ecm.action;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;
import com.nuist.common.util.InterfaceUtil;
import com.nuist.common.util.SpringMVCResult;
import com.nuist.ecm.service.TicketService;


@Controller
public class TicketAction {
	
	@Autowired
	private InterfaceUtil interfaceUtil;
	
	@Resource(name = "interfaceConfig")
    private Map<String, String> interfaceConfig;
	
	@Autowired
	private TicketService ticketservice;
	
	@RequestMapping("index.htm")
	public ModelAndView getIndexInfo() {
		
		return new ModelAndView("WEB-INF/view/index.ftl");
	}

	@RequestMapping("query.htm")
	public ResponseEntity<String> query(
	        @RequestParam(value = "queryDate", required = true) String queryDate, 
	        @RequestParam(value = "startUrl", required = true) String startUrl, 
	        @RequestParam(value = "endUrl", required = true) String endUrl) {
		String url = interfaceConfig.get("nuist_otn_query");
		// 这些接口都限制参数顺序，好烦
		url += "?leftTicketDTO.train_date=" + queryDate
		        + "&leftTicketDTO.from_station=" + startUrl
		        + "&leftTicketDTO.to_station=" + endUrl
		        + "&purpose_codes=ADULT";
		List<Map<String, Object>> result = interfaceUtil.getDataList(url, "查询车次接口", null);
		return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
	}
	
	@RequestMapping("queryHotStations.htm")
	public ResponseEntity<String> queryHotStations() throws Exception {
		return SpringMVCResult.returnResponseEntity(JSON.toJSONString(ticketservice.queryHotStations()));
	}
	
	@RequestMapping("queryPrice.htm")
	public ResponseEntity<String> queryPrice(
			@RequestParam(value = "trainNo", required = true) String trainNo,
			@RequestParam(value = "fromStationNo", required = true) String fromStationNo,
			@RequestParam(value = "toStationNo", required = true) String toStationNo,
			@RequestParam(value = "seatTypes", required = true) String seatTypes,
			@RequestParam(value = "trainDate", required = true) String trainDate) {
		String url = interfaceConfig.get("nuist_otn_query_price");
		url += "?train_no=" + trainNo
				+ "&from_station_no=" + fromStationNo
				+ "&to_station_no=" + toStationNo
				+ "&seat_types=" + seatTypes
				+ "&train_date=" + trainDate;
		Map<String, Object> result = interfaceUtil.getDataMap(url, "查询票价接口", null);
		return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
		
	}
}
