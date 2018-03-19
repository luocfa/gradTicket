package com.nuist.ecm.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.nuist.common.util.InterfaceUtil;
import com.nuist.ecm.dao.OrderDao;

@Service
public class OrderService {

    @Autowired
    private OrderDao orderDao;

    @Resource(name = "interfaceConfig")
    private Map<String, String> interfaceConfig;

    @Autowired
    private InterfaceUtil interfaceUtil;

    @SuppressWarnings("unchecked")
    public Map<String, Object> toOrderIndex(String data, String date) {
        Map<String, Object> modelMap = JSON.parseObject(data);
        Map<String, Object> model = (Map<String, Object>) modelMap.get("queryLeftNewDTO");
        String secretStr = modelMap.get("secretStr") + "";
        model.put("secretStr", secretStr);
        model.put("date", date);
        model.put(
                "price",
                queryPrice(model.get("train_no") + "", model.get("from_station_no") + "", model.get("to_station_no")
                        + "", model.get("seat_types") + "", date));
        return model;
    }

    public Map<String, Object> queryPrice(String trainNo, String fromStationNo, String toStationNo, String seatTypes,
            String trainDate) {
        String url = interfaceConfig.get("nuist_otn_query_price");
        url += "?train_no=" + trainNo + "&from_station_no=" + fromStationNo + "&to_station_no=" + toStationNo
                + "&seat_types=" + seatTypes + "&train_date=" + trainDate;
        Map<String, Object> result = interfaceUtil.getDataMap(url, "查询票价接口", null);
        return result;
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> submitOrder(String orderUserId, String trainDate, String orderMoney,
            String contactMobile, String stationTrainCode, String ticketCount, String orderJson) {
        List<Map<String, Object>> orderList = (List<Map<String, Object>>) JSON.parse(orderJson);
        Map<String, Object> result = distributeResources(stationTrainCode, trainDate, orderList);
        Map<String, Object> res = new HashMap<String, Object>();
        if ("1".equals(result.get("flag"))) {
            orderList = (List<Map<String, Object>>) result.get("orderJson");
            try {
                res = orderDao.submitOrder(getOrderCode(), orderUserId, ticketCount, orderMoney, contactMobile,
                        orderList);
            } catch (Exception e) {
                res.put("flag", "0");
                res.put("failReason", "保存订单抛异常了，回退一下");
                orderDao.releaseResources(result.get("seatIds") + "");
                e.printStackTrace();
            }
        } else {
            res.put("flag", "0");
            res.put("failReason", "分配票资源失败");
        }
        return res;
    }

    public String getOrderCode() {
        String orderCode = "101100";
        Date date = new Date();
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
        orderCode += df.format(date);
        return orderCode;
    }

    public synchronized Map<String, Object> distributeResources(String trainCode, String trainDate,
            List<Map<String, Object>> orderList) {
        Map<String, Object> result = new HashMap<String, Object>();
        String seatIds = "";
        // 查出所有有效票资源
        // List<Map<String, Object>> resourcesList = orderDao.getSeatResources(trainCode, seatType, trainDate);
        // Map<String, Object> order = new HashMap<String, Object>();
        // 循环联系人，挨个分配资源
        for (int i = 0; i < orderList.size(); i++) {
            Map<String, Object> order = orderList.get(i);
            String seatType = (String) order.get("seatType");
            List<Map<String, Object>> resourcesList = orderDao.getSeatResources(trainCode, seatType, trainDate);
            if (resourcesList != null && resourcesList.size() > 0) {
                Map<String, Object> resource = resourcesList.get(i);
                String seatId = resource.get("trainNumberSeatsId").toString();
                seatIds += (i == 0 ? "" : ",") + seatId;
                String seatCode = resource.get("seatCode").toString().split("_")[1];
                // seatCode 010010 前两个车厢号，中间三个作为号，最后一个卧铺时，1，上，2 中，3下
                if (orderDao.distributeResources(seatId)) {
                    order.put("seatsCarriage", seatCode.substring(0, 2));
                    String seatsCode = seatCode.substring(2, 5);
                    if ("5".equals(seatType) || "6".equals(seatType) || "7".equals(seatType)) {
                        String seatPos = seatCode.substring(5, 6);
                        seatsCode += "1".equals(seatPos) ? "上" : "2".equals(seatPos) ? "中" : "下";
                    }
                    order.put("seatsCode", seatsCode);
                    order.put("trainDate", trainDate);
                    order.put("stationTrainCode", trainCode);
                    order.put("seatId", seatIds);
                } else {
                    result.put("flag", "0");
                    result.put("failReason", "分配票资源失败，可能是系统原因");
                    return result;
                }
            } else {
                result.put("flag", "0");
                result.put("failReason", "票资源不足");
                return result;
            }
        }
        result.put("flag", "1");
        result.put("seatId", seatIds);
        result.put("orderJson", orderList);
        return result;
    }

    public List<Map<String, Object>> getUserContact(String userId) {
        List<Map<String, Object>> result = orderDao.getUserContact(userId);
        return result;
    }
    
    public List<Map<String, Object>> getOrders(String userId) {
        List<Map<String, Object>> result = orderDao.getOrders(userId);
        return result;
    }

}
