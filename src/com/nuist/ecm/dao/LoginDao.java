package com.nuist.ecm.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LoginDao {
    
    @Resource(name = "jdbcTemplateOracle")
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> doLogin(String userName, String userPass, String userType) {
        String mobile = "0?1[3,4,5,7,8][0-9]{9}";
        String sql1 = "SELECT * FROM ecm_users eu WHERE eu.`userName` = ? AND eu.`userPasswd` = ? AND eu.`userType` = ?";
        String sql2 = "SELECT * FROM ecm_users eu WHERE eu.`userMobile` = ? AND eu.`userPasswd` = ? AND eu.`userType` = ?";
        List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
        if (userName.matches(mobile)) {
            result = jdbcTemplate.queryForList(sql2, userName, userPass, userType);
        } else {
            result = jdbcTemplate.queryForList(sql1, userName, userPass, userType);
        }
        return result;
    }
    
    
    public Map<String, Object> doReg(String userName, String userPass) {
        String sql1 = "SELECT COUNT(0) FROM ecm_users eu WHERE eu.`userName` = ?";
        String sql2 = "INSERT INTO ecm_users (userName, userPasswd, nickName) VALUES (?,?,?)";
        Map<String, Object> result = new HashMap<String, Object>();
        if (jdbcTemplate.queryForInt(sql1, userName) > 0) {
            result.put("flag", "0");
            result.put("failReason", "用户名已存在，请重新输入");
        } else {
            if (jdbcTemplate.update(sql2, userName, userPass, userName) > 0) {
                result.put("flag", "1");
            } else {
                result.put("flag", "0");
                result.put("failReason", "注册失败");
            }
        }
        return result;
    }
    
    public Map<String, Object> queryUserInfo(String userId) {
    	String sql = "SELECT * FROM ecm_users eu WHERE eu.`userId` = ?";
    	return jdbcTemplate.queryForMap(sql, userId);
    }
}
