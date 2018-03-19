package com.nuist.ecm.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfig;

import com.nuist.common.define.Constant;
import com.nuist.ecm.dao.LoginDao;

import freemarker.template.Configuration;

@Service
public class LoginService {

    @Autowired
    private LoginDao loginDao;
    
    @Autowired
    private FreeMarkerConfig freemarkerConfig;

    
    public Map<String, Object> doLogin(String userName, String userPass, String userType) {
        Map<String, Object> model = new HashMap<String, Object>();
        List<Map<String, Object>> result = loginDao.doLogin(userName, userPass, userType);
        if (result != null && result.size() > 0) {
            model.put("flag", "1");
            Map<String, Object> map = result.get(0);
            model.put("nickName", map.get("nickName"));
            model.put("userId", map.get("userId"));
        } else {
            model.put("flag", "0");
        }
        return model;
    }
    
    public Map<String, Object> doReg(String userName, String userPass, String confirmPass) {
        Map<String, Object> model = new HashMap<String, Object>();
        if (!userPass.equals(confirmPass)) {
            model.put("flag", "0");
            model.put("failReason", "两次密码不相同，请重新输入");
        } else {
            model = loginDao.doReg(userName, userPass);
        }
        return model;
    }
    
    public Map<String, Object> queryUserInfo(String userId) {
    	return loginDao.queryUserInfo(userId);
    }
    
    public String getLoginUrl(HttpServletRequest request, String bFlag) throws UnsupportedEncodingException {
        Configuration config = freemarkerConfig.getConfiguration();
        String url = config.getSharedVariable("domain") + "login.htm";
        if ("1".equals(bFlag)) {
        	url += "?backUrl=" + request.getRequestURL();
            if (request.getQueryString() != null) {
                url += "?" + URLEncoder.encode(request.getQueryString(), Constant.getEncodingUtf8());

            }
        }
        return url;
    }
}
