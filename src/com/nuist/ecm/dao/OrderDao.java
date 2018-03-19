package com.nuist.ecm.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class OrderDao {

    @Resource(name = "jdbcTemplateOracle")
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> submitOrder(String orderCode, String orderUserId, String orderCount, String orderMoney,
            String contactMobile, List<Map<String, Object>> orderJson) {
        Map<String, Object> result = new HashMap<String, Object>();
        String sql1 = "INSERT INTO ecm_orders (orderCode, orderUserId, creatDate, orderStatus, orderCount, orderMoney, payStatus, status) VALUES (?, ?, SYSDATE(), '1', ?, ?, '1', 'N')";
        int count = jdbcTemplate.update(sql1, orderCode, orderUserId, orderCount, orderMoney);
        if (count > 0) {
            String sql2 = "SELECT eo.orderId FROM ecm_orders eo WHERE eo.`orderCode` = ?";
            List<Map<String, Object>> orderList = jdbcTemplate.queryForList(sql2, orderCode);
            if (orderList != null && orderList.size() > 0) {
                Map<String, Object> order = orderList.get(0);
                String orderId = order.get("orderId") + "";
                if (orderJson != null && orderJson.size() > 0) {
                    String sql3 = "INSERT INTO ecm_order_details (orderId, stationTrainCode, seatsType, seatsCarriage, seatsCode, passengerName, passengerCardCode, passengerMobile, contactMobile, ticketMoney, trainDate, fromStation, toStation, trainTime, seatId) VALUES ";
                    for (int i = 0; i < orderJson.size(); i++) {
                        Map<String, Object> info = orderJson.get(i);
                        sql3 += i == 0 ? "" : ",";
                        sql3 += "(" + orderId + ", '" + info.get("stationTrainCode") + "','" + info.get("seatType")
                                + "','" + info.get("seatsCarriage") + "','" + info.get("seatsCode") + "','"
                                + info.get("passengerName") + "','" + info.get("passengerCardCode") + "','"
                                + info.get("passengerMobile") + "','" + contactMobile + "','" + info.get("ticketMoney")
                                + "','" + info.get("trainDate") + "','" + info.get("fromStation") + "','"
                                + info.get("toStation") + "','" + info.get("trainTime") + "','" + info.get("seatId") + "')";
                    }
                    int detailCount = jdbcTemplate.update(sql3);
                    if (detailCount > 0) {
                        String sql4 = "UPDATE ecm_orders eo SET eo.`status` = 'Y' WHERE eo.`orderId` = ?";
                        int a = jdbcTemplate.update(sql4, orderId);
                        if (a > 0) {
                            result.put("orderId", orderId);
                            result.put("flag", "1");
                        } else {
                            result.put("failReson", "更新订单表失败");
                            result.put("flag", "0");
                        }
                    } else {
                        result.put("failReson", "插入详情表失败");
                        result.put("flag", "0");
                    }
                } else {
                    result.put("failReson", "详情数据参数不合法");
                    result.put("flag", "0");
                }
            } else {
                result.put("failReson", "查询订单主键失败：可能是订单表数据异常");
                result.put("flag", "0");
            }
        } else {
            result.put("failReson", "插入订单表失败");
            result.put("flag", "0");
        }
        return result;
    }

    public List<Map<String, Object>> getSeatResources(String trainCode, String seatType, String trainDate) {
        String sql = "SELECT et.`trainNumberSeatsId`, et.`seatCode` FROM ecm_train_number_seats et WHERE et.`stationTrainCode` = ? AND et.`trainNumberDate` = ? AND et.`seatType` = ? AND et.`seatStatus` = 'Y' ORDER BY et.`seatCode` ASC";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, trainCode, trainDate, seatType);
        return result == null ? new ArrayList<Map<String, Object>>() : result;
    }

    public boolean distributeResources(String seatsId) {
        String sql = "UPDATE ecm_train_number_seats et SET et.`seatStatus` = 'N' WHERE et.`trainNumberSeatsId` = ?";
        int num = jdbcTemplate.update(sql, seatsId);
        return num > 0;
    }

    public boolean releaseResources(String seatsIds) {
        String sql = "UPDATE ecm_train_number_seats et SET et.`seatStatus` = 'Y' WHERE et.`trainNumberSeatsId` = ?";
        String[] seatsId = seatsIds.split(",");
        int num = 0;
        for (int i = 0; i < seatsId.length; i++) {
            num += jdbcTemplate.update(sql, seatsId[i]);
        }
        return num >= seatsId.length;
    }

    public List<Map<String, Object>> getUserContact(String userId) {
        String sql = "SELECT * FROM ecm_user_contacts euc WHERE euc.`status` = 'Y' AND euc.`userId` = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, userId);
        return result;
    }
    
    public List<Map<String, Object>> getOrders(String userId) {
        String sql1 = "SELECT eo.`orderId`, eo.`orderCode`, eo.`orderStatus`, eo.`orderMoney`, eo.`payStatus`, DATE_FORMAT(eo.`creatDate`, '%Y-%m-%d %T') createDate FROM ecm_orders eo WHERE eo.`status` = 'Y' AND eo.`orderUserId` = ?";
        String sql2 = "SELECT eod.`orderDetailsId`, eod.`stationTrainCode`, cst.`seat_type_name` typeName, eod.`seatsCarriage`, eod.`seatsCode`, eod.`passengerName`, eod.`passengerCardCode`, eod.`passengerMobile`, eod.`ticketMoney`, eod.`fromStation`, eod.`toStation`, eod.`trainTime`, DATE_FORMAT(eod.`trainDate`, '%Y-%m-%d') trainDate FROM ecm_order_details eod, con_seat_types cst WHERE cst.`seat_type_id` = eod.`seatsType` AND eod.orderId = ?";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql1, userId);
        if (result != null && result.size() > 0) {
            for (Map<String, Object> map : result) {
                String orderId = map.get("orderId") + "";
                List<Map<String, Object>> details = jdbcTemplate.queryForList(sql2, orderId);
                map.put("detail", details);
            }
        }
        return result;
    }
    
}
