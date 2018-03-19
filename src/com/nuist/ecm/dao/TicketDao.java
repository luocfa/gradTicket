package com.nuist.ecm.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TicketDao {

	@Resource(name = "jdbcTemplateOracle")
	private JdbcTemplate jdbcTemplate;
	
	public List<Map<String, Object>> queryHotStations() throws Exception {
		String sql = "SELECT * FROM ecm_stations es WHERE es.`hotFlag` = 'Y' ORDER BY es.`staionIdS` ASC";
		return jdbcTemplate.queryForList(sql);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	public List<Map<String, Object>> name(String str) {
		String sql = "UPDATE ecm_stations s SET hotFlag = 'Y' WHERE s.stationSUrl IN ";
		String favorite_names = "bji|北京|BJP|0@sha|上海|SHH|1@tji|天津|TJP|2@cqi|重庆|CQW|3@csh|长沙|CSQ|4@cch|长春|CCT|5@cdu|成都|CDW|6@fzh|福州|FZS|7@gzh|广州|GZQ|8@gya|贵阳|GIW|9@hht|呼和浩特|HHC|10@heb|哈尔滨|HBB|11@hfe|合肥|HFH|12@hzh|杭州|HZH|13@hko|海口|VUQ|14@jna|济南|JNK|15@kmi|昆明|KMM|16@lsa|拉萨|LSO|17@lzh|兰州|LZJ|18@nni|南宁|NNZ|19@nji|南京|NJH|20@nch|南昌|NCG|21@sya|沈阳|SYT|22@sjz|石家庄|SJP|23@tyu|太原|TYV|24@wlq|乌鲁木齐南|WMR|25@wha|武汉|WHN|26@xni|西宁|XNO|27@xan|西安|XAY|28@ych|银川|YIJ|29@zzh|郑州|ZZF|30@szh|深圳|SZQ|shenzhen|sz|31@xme|厦门|XMS|xiamen|xm|32";
		String[] arr1 = favorite_names.split("@");
		sql += "(";
		for (int i = 0, n = arr1.length; i < n; i++) {
			String str2 = arr1[i];
			String[] arr2 = str2.split("\\|");
			sql += "'" + arr2[2] + "'";
			if (i != n - 1) {
			    sql += ",";
			}
		}
		sql += ");";
		int list = jdbcTemplate.update(sql);
		System.out.println(list);
		return null;
	}
}
