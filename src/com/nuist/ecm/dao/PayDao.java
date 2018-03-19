package com.nuist.ecm.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class PayDao {

    @Resource(name = "jdbcTemplateOracle")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private OrderDao orderDao;

    public String getBalance(String userId) {
        String sql = "SELECT eub.`userBalance` FROM ecm_user_balance eub WHERE eub.`userId` = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, userId);
        String balance = "0";
        if (result != null && result.size() > 0) {
            Map<String, Object> map = result.get(0);
            balance = map.get("userBalance") + "";
        }
        return balance;
    }

    public String getPayPass(String userId) {
        String sql = "SELECT eub.`payPass` FROM ecm_user_balance eub WHERE eub.`userId` = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, userId);
        String payPass = "0";
        if (result != null && result.size() > 0) {
            Map<String, Object> map = result.get(0);
            payPass = map.get("payPass") + "";
        }
        return payPass;
    }

    public String getOrderMoney(String orderId) {
        Map<String, Object> map = getOrderInfo(orderId);
        String orderMoney = "0";
        if (map != null) {
            orderMoney = map.get("orderMoney") + "";
        }
        return orderMoney == null ? "0" : orderMoney;
    }

    public String getOrderUser(String orderId) {
        Map<String, Object> map = getOrderInfo(orderId);
        String orderUserId = "0";
        if (map != null) {
            orderUserId = map.get("orderUserId") + "";
        }
        return orderUserId;
    }

    public String getOrderPayStatus(String orderId) {
        Map<String, Object> map = getOrderInfo(orderId);
        String payStatus = "1";
        if (map != null) {
            payStatus = map.get("payStatus") + "";
        }
        return payStatus == null ? "0" : payStatus;
    }

    public Map<String, Object> getOrderInfo(String orderId) {
        String sql = "SELECT * FROM ecm_orders eo WHERE eo.`orderId` = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, orderId);
        Map<String, Object> map = new HashMap<String, Object>();
        if (result != null && result.size() > 0) {
            map = result.get(0);
        } else {
            map = null;
        }
        return map;
    }

    public Map<String, Object> pay(String userId, String orderId, String balance, String oldBalance) {
        String sql1 = "UPDATE ecm_user_balance eub SET eub.`userBalance` = ? WHERE eub.`userId` = ?";
        String sql2 = "UPDATE ecm_orders eo SET eo.`payStatus` = 2 WHERE eo.`orderId` = ?";
        int num = jdbcTemplate.update(sql1, Float.parseFloat(oldBalance) - Float.parseFloat(balance), userId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("flag", "0");
        if (num > 0) {
            if (jdbcTemplate.update(sql2, orderId) > 0) {
                model.put("flag", "1");
            } else {
                model.put("failReason", "更新订单表失败！");
                jdbcTemplate.update(sql1, oldBalance, userId);
            }
        } else {
            model.put("failReason", "扣款失败！");
        }
        return model;
    }

    public String getOrderSeatIds(String orderId) {
        String sql = "SELECT eod.`seatId` FROM ecm_order_details eod WHERE eod.`orderId` = ?";
        List<Map<String, Object>> rv = jdbcTemplate.queryForList(sql, orderId);
        String seatIds = "";
        for (Map<String, Object> map : rv) {
            seatIds += map.get("seatId");
        }
        return seatIds;
    }

    public Map<String, Object> cancel(String userId, String orderId, String flag) {

        String sql1 = "UPDATE ecm_user_balance eub SET eub.`userBalance` = ? WHERE eub.`userId` = ?";
        String sql2 = "UPDATE ecm_orders eo SET eo.`orderStatus` = 2 WHERE eo.`orderId` = ?";
        String sql3 = "UPDATE ecm_order_details eod SET eod.`seatId` = 000000 WHERE eod.`orderId` = ? ";
        Map<String, Object> model = new HashMap<String, Object>();
        if (orderDao.releaseResources(this.getOrderSeatIds(orderId)) && jdbcTemplate.update(sql3, orderId) > 0) {
            if ("1".equals(flag)) {
                String balance = getBalance(userId);
                String orderMoney = getOrderMoney(orderId);
                jdbcTemplate.update(sql1, Float.parseFloat(orderMoney) + Float.parseFloat(balance), userId);
            }

            model.put("flag", "0");
            if (jdbcTemplate.update(sql2, orderId) > 0) {
                model.put("flag", "1");
            } else {
                model.put("failReason", "更新订单状态失败！");
                // jdbcTemplate.update(sql1, balance, userId);
            }
        } else {
            model.put("flag", "0");
            model.put("failReason", "释放票资源失败！");
        }
        return model;
    }
}
