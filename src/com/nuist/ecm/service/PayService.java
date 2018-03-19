package com.nuist.ecm.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nuist.ecm.dao.PayDao;

@Service
public class PayService {

	@Autowired
	private PayDao payDao;
	
	public Map<String, Object> getPayInfo(String userId, String orderId) {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("balance", payDao.getBalance(userId));
		model.put("orderMoney", payDao.getOrderMoney(orderId));
		model.put("payStatus", payDao.getOrderPayStatus(orderId));
		return model;
	}
	
	public Map<String, Object> doPay(String userId, String orderId, String payMoney, String payPass) {
		Map<String, Object> model = new HashMap<String, Object>();
		String orderMoney = payDao.getOrderMoney(orderId);
		String orderUserId = payDao.getOrderUser(orderId);
		String userPayPass = payDao.getPayPass(userId);
		if (!"1".equals(payDao.getOrderPayStatus(orderId))) {
			model.put("flag", "0");
			model.put("failReason", "订单支付状态异常，请重新选择支付");
		} else if (Float.parseFloat(orderMoney) != Float.parseFloat(payMoney)) {
			model.put("flag", "0");
			model.put("failReason", "支付金额不正确，请重新输入！");
		} else if (!userId.equals(orderUserId)) {
			model.put("flag", "0");
			model.put("failReason", "订单对于的用户和当前登录用户不一致，请检查并重新登录");
		} else if (!payPass.equals(userPayPass)) {
			model.put("flag", "0");
			model.put("failReason", "支付密码错误，请重新输入");
		} else {
			model = payDao.pay(userId, orderId, payMoney, payDao.getBalance(userId));
		}
		return model;
	}
	
	public Map<String, Object> doCancel(String userId, String orderId, String flag) {
		Map<String, Object> model = new HashMap<String, Object>();
		model = payDao.cancel(userId, orderId, flag);
		return model;
	}
}
