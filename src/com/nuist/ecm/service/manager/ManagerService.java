package com.nuist.ecm.service.manager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.stereotype.Service;

import com.nuist.ecm.dao.LoginDao;
import com.nuist.ecm.dao.manager.ManagerDao;

@Service
public class ManagerService {
	
	@Autowired
	private ManagerDao managerdao;
	
	@Autowired
	private LoginDao loginDao;
	
	public List<Map<String, Object>> queryAllSeatsOnPage(String page, String rowNum, String trainCode, String date) {
	    int stIndex = (Integer.parseInt(page) - 1 ) * Integer.parseInt(rowNum);
	    List<Map<String, Object>> result = managerdao.queryAllSeatsOnPage(stIndex + "", rowNum, trainCode, date);
	    for(Map<String, Object> map : result) {
	        String seatType = map.get("seatType") + "";
	        String seatCode = map.get("seatCode").toString().split("_")[1];
	        String seatsCode = seatCode.substring(2, 5);
	        map.put("seatsCarriage", seatCode.substring(0, 2));
	        if ("5".equals(seatType) || "6".equals(seatType) || "7".equals(seatType)) {
                String seatPos = seatCode.substring(5, 6);
                seatsCode += "1".equals(seatPos) ? "上" : "2".equals(seatPos) ? "中" : "下";
            }
	        map.put("seatsCode", seatsCode);
	    }
	    
	    return result;
	}
	
	public Map<String, Object> updateSeatStatus(String seatId, String status) {
	    Map<String, Object> result = new HashMap<String, Object>();
	    if (managerdao.updateSeatsStatus(seatId, status)) {
	        result.put("flag", "1");
	    } else {
	        result.put("flag", "0");
	    }
	    return result;
	}
	
	public Map<String, Object> insertSeat(String date, String trainCode, String seatType) {
	    Map<String, Object> result = new HashMap<String, Object>();
        if (managerdao.insertSeat(date, trainCode, seatType)) {
            result.put("flag", "1");
        } else {
            result.put("flag", "0");
        }
        return result;
	}
	
	
	public Map<String, Object> changePasswd(String userid, String phone, String oldpass, String pass) {
        Map<String, Object> userInfo = loginDao.queryUserInfo(userid);
        String rPhone = userInfo.get("userMobile").toString();
        String rPass = userInfo.get("userPasswd").toString();
        Map<String, Object> result = new HashMap<String, Object>();
        if ("".equals(userid)) {
            result.put("flag", "0");
            result.put("msg", "你的登陆已过期，请先登陆");
        } else if ("".equals(rPhone)) {
            result.put("flag", "0");
            result.put("msg", "手机号码验证失败");
        } else if (!phone.equals(rPhone)){
            result.put("flag", "0");
            result.put("msg", "手机号码错误");
        } else if(!oldpass.equals(rPass)) {
            result.put("flag", "0");
            result.put("msg", "旧密码不正确");
        } else {
            if (managerdao.resetPasswdByUserid(userid, pass)) {
                result.put("flag", "1");
            } else {
                result.put("flag", "0");
                result.put("msg", "修改密码失败，请重试");
            }
        }
        return result;
    }
	
	public boolean updateuserInfo(String userid, String phone, String nickname, String cardCode) {
        return managerdao.updateuserinfo(userid, phone, nickname, cardCode);
    }
	
	
	public List<Map<String, Object>> queryAllContact(String page, String rowNum, String userId) {
        int stIndex = (Integer.parseInt(page) - 1 ) * Integer.parseInt(rowNum);
        List<Map<String, Object>> result = managerdao.queryAllContact(stIndex + "", rowNum, userId);
        return result;
    }
	
	public boolean updateContact(String id, String Name, String mobile,String cardCode, String sex, String status) {
	    return managerdao.updateContact(id, Name, mobile, cardCode, sex, status);
    }
	
	public boolean insertContact(String userId, String Name, String mobile,String cardCode, String sex, String status) {
        return managerdao.insertContact(userId, Name, mobile, cardCode, sex, status);
    }
}
