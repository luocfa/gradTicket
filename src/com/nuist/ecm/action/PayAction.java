package com.nuist.ecm.action;

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
import com.nuist.common.util.SpringMVCResult;
import com.nuist.ecm.service.LoginService;
import com.nuist.ecm.service.PayService;

import session.TTSSession;

@Controller
public class PayAction {
	
	@Autowired
	private PayService payService;
	
	@Autowired
    private LoginService loginservice;

	@RequestMapping("pay.htm")
	public ModelAndView pay(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "orderId", required = false) String orderId) throws Exception {
		TTSSession session = new TTSSession(request, response);
		String userId = session.getAttribute("userId");
		if (userId != null && !"".equals(userId)) {
			Map<String, Object> model = payService.getPayInfo(userId, orderId);
			model.put("orderId", orderId);
			return new ModelAndView("WEB-INF/view/pay.ftl", model);
        } else {
            return new ModelAndView(new RedirectView(loginservice.getLoginUrl(request, "1")));
        }
		
	}
	
	@RequestMapping("doPay.htm")
	public ResponseEntity<String> doPay(HttpServletRequest request, HttpServletResponse response,
			String orderId, String payMoney, String payPass) throws Exception {
		TTSSession session = new TTSSession(request, response);
		String userId = session.getAttribute("userId");
		Map<String, Object> result = new HashMap<String, Object>();
		if (userId != null && !"".equals(userId)) {
			result = payService.doPay(userId, orderId, payMoney, payPass);
		} else {
			result.put("flag", "0");
			result.put("failReason", "登录已过期，请重新登录");
		}
		return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
	}
	
	@RequestMapping("doCancel.htm")
	public ResponseEntity<String> doCancel(HttpServletRequest request, HttpServletResponse response,
			String orderId, String flag) throws Exception {
		TTSSession session = new TTSSession(request, response);
		String userId = session.getAttribute("userId");
		Map<String, Object> result = new HashMap<String, Object>();
		if (userId != null && !"".equals(userId)) {
			result = payService.doCancel(userId, orderId, flag);
		} else {
			result.put("flag", "0");
			result.put("failReason", "登录已过期，请重新登录");
		}
		return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
	}
	
}
