package com.nuist.ecm.action;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.alibaba.fastjson.JSON;
import com.nuist.common.define.Constant;
import com.nuist.common.util.SpringMVCResult;
import com.nuist.ecm.service.LoginService;

import session.TTSSession;

@Controller
public class LoginAction {

	@Autowired
	private LoginService loginService;

	@RequestMapping("login.htm")
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "backUrl", required = false) String backUrl) throws Exception {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("backUrl", backUrl);
		return new ModelAndView("WEB-INF/view/login.ftl", model);
	}
	
	@RequestMapping("reg.htm")
    public ModelAndView reg(HttpServletRequest request, HttpServletResponse response) throws Exception {
        return new ModelAndView("WEB-INF/view/register.ftl");
    }
	
	@RequestMapping("doReg.htm")
    public ResponseEntity<String> doReg(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "userName", required = false) String userName,
            @RequestParam(value = "userPass", required = false) String userPass,
            @RequestParam(value = "confirmPass", required = false) String confirmPass) throws Exception {
        userName = URLDecoder.decode(userName, Constant.getEncodingUtf8());
        Map<String, Object> result = loginService.doReg(userName, userPass, confirmPass);
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
    }

	@RequestMapping("doLogin.htm")
	public ResponseEntity<String> doLogin(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "userName", required = false) String userName,
			@RequestParam(value = "userPass", required = false) String userPass,
			@RequestParam(value = "userType", required = false) String userType) throws Exception {
		TTSSession session = new TTSSession(request, response);
		userName = URLDecoder.decode(userName, Constant.getEncodingUtf8());
		Map<String, Object> result = loginService.doLogin(userName, userPass, userType);
		if ("1".equals(result.get("flag"))) {
			String userId = result.get("userId") + "";
			session.setAttributeByHttpOnly("userId", userId, Constant.getDOMAINNAME(), true);
		}
		return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
	}

	@RequestMapping("verifyLogin.htm")
	public ResponseEntity<String> verifyLogin(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		TTSSession session = new TTSSession(request, response);
		String userId = session.getAttribute("userId");
		Map<String, Object> result = new HashMap<String, Object>();
		if (userId != null && !"".equals(userId)) {
			Map<String, Object> map = loginService.queryUserInfo(userId);
			result.put("flag", "1");
			result.put("nickName", map.get("nickName"));
		} else {
			result.put("flag", "0");
		}
		return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
	}
	
	@RequestMapping("loginOut.htm")
	public ModelAndView loginOut(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		TTSSession session = new TTSSession(request, response);
		session.delAttribute("userId", Constant.getDOMAINNAME());
		return new ModelAndView(new RedirectView(loginService.getLoginUrl(request, "0")));
	}
	
	
}
