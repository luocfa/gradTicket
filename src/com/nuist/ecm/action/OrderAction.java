package com.nuist.ecm.action;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
import com.nuist.ecm.service.OrderService;

import session.TTSSession;

@Controller
public class OrderAction {

    @Autowired
    private OrderService orderService;
    
    @Autowired
    private LoginService loginservice;

    @RequestMapping("submitOrder.htm")
    public ResponseEntity<String> submitOrder(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "trainDate", required = false) String trainDate,
            @RequestParam(value = "orderMoney", required = false) String orderMoney,
            @RequestParam(value = "contactMobile", required = false) String contactMobile,
            @RequestParam(value = "ticketCount", required = false) String ticketCount,
            @RequestParam(value = "orderJson", required = false) String orderJson,
            @RequestParam(value = "stationTrainCode", required = false) String stationTrainCode) throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userId = session.getAttribute("userId");
        Map<String, Object> result = new HashMap<String, Object>();
        if (userId != null && !"".equals(userId)) {
            orderJson = URLDecoder.decode(orderJson, Constant.getEncodingUtf8());
            result = orderService.submitOrder(userId, trainDate, orderMoney, contactMobile, stationTrainCode,
                    ticketCount, orderJson);
        } else {
            result.put("flag", "0");
            result.put("loginFlag", "0");
        }
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
    }

    @RequestMapping("order.htm")
    public ModelAndView orderIndex(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "data", required = true) String data,
            @RequestParam(value = "date", required = true) String date) throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userId = session.getAttribute("userId");
        if (userId != null && !"".equals(userId)) {
            data = URLDecoder.decode(data, Constant.getEncodingUtf8());
            Map<String, Object> model = orderService.toOrderIndex(data, date);
            return new ModelAndView("WEB-INF/view/fillOrder.ftl", model);
        } else {
            return new ModelAndView(new RedirectView(loginservice.getLoginUrl(request, "1")));
        }
    }

    @RequestMapping("getUserContact.htm")
    public ResponseEntity<String> getUserContact(HttpServletRequest request, HttpServletResponse response)
            throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userId = session.getAttribute("userId");
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        if (userId != null && !"".equals(userId)) {
            result = orderService.getUserContact(userId);
        }
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
    }

    @RequestMapping("getOrders.htm")
    public ResponseEntity<String> getOrders(HttpServletRequest request, HttpServletResponse response) throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userId = session.getAttribute("userId");
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        if (userId != null && !"".equals(userId)) {
            result = orderService.getOrders(userId);
        }
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
    }

    @RequestMapping("orderCenter.htm")
    public ModelAndView toOrder(HttpServletRequest request, HttpServletResponse response) throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userId = session.getAttribute("userId");
        Map<String, Object> result = new HashMap<String, Object>();
        if (userId != null && !"".equals(userId)) {
            List<Map<String, Object>> orders = orderService.getOrders(userId);
            result.put("orderList", orders);
        } else {
            return new ModelAndView(new RedirectView(loginservice.getLoginUrl(request, "1")));
        }
        return new ModelAndView("WEB-INF/view/myOrder.ftl", result);
    }

}
