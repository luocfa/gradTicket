package com.nuist.common.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.nuist.common.define.Constant;

@Component
public class InterfaceUtil {

	@Resource(name = "interfaceConfig")
	private Map<String, String> interfaceConfig;
	private Logger log = Logger.getLogger(InterfaceUtil.class);

	public String ssLPost(String url, String urlName, Map<String, String> params) {
		String encoding = Constant.getEncodingUtf8();// 接口编码
//		url = interfaceConfig.get(url);
		String result = "";
		log.info("接口：" + url + "; 描述：" + urlName + "; 参数：" + params);
		try {
			result = HttpRequestUtils.sslRequest(url, params, HttpRequestUtils.REQUEST_TYPE_GET, encoding);
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.info("接口：" + url + "; 返回：" + result);
		return result;
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> getDataMap(String url, String urlName, Map<String, String> params) {
		String result = this.ssLPost(url, urlName, params);
		Map<String, Object> dataMap = (Map<String, Object>) JSON.parse(result);
		Map<String, Object> data = (Map<String, Object>) JSON.parse(result);
		try {
		    if (dataMap != null) {
		        boolean status = (boolean) dataMap.get("status");
	            if (status) {
	                data = (Map<String, Object>) dataMap.get("data");
	            }
		    }
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return data == null ? new HashMap<String, Object>() : data;
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> getDataList(String url, String urlName, Map<String, String> params) {
		String result = this.ssLPost(url, urlName, params);
		Map<String, Object> dataMap = (Map<String, Object>) JSON.parse(result);
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
		try {
		    if (dataMap != null) {
		        boolean status = (boolean) dataMap.get("status");
	            if (status) {
	                data = (List<Map<String, Object>>) dataMap.get("data");
	            }
		    }
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return data == null ? new ArrayList<Map<String, Object>>() : data;
	}

}
