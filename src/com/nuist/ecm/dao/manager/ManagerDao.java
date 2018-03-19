package com.nuist.ecm.dao.manager;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ManagerDao {

    @Resource(name = "jdbcTemplateOracle")
	private JdbcTemplate jdbcTemplate;
	private Logger log = Logger.getLogger(ManagerDao.class);
	
	
	public List<Map<String, Object>> queryAllSeatsOnPage(String stIndex, String rowNum, String trainCode, String date) {
	    String sql = "SELECT etns.`trainNumberSeatsId`, etns.`stationTrainCode` trainCode, etns.`seatCode`, DATE_FORMAT(etns.`trainNumberDate`, '%Y-%m-%d') trainDate, etns.`seatType`, cst.`seat_type_name`, eod.`seatId`, etns.`seatStatus` FROM ecm_train_number_seats etns LEFT JOIN ecm_order_details eod ON etns.`trainNumberSeatsId` = eod.`seatId`, con_seat_types cst WHERE cst.`seat_type_id` = etns.`seatType`";
	    if (trainCode != null && !"".equals(trainCode)) {
	        sql += " AND etns.`stationTrainCode` = '" + trainCode + "'";
	    }
	    if (date != null && !"".equals(date)) {
	        sql += " AND etns.`trainNumberDate` = '" + date + "'";
	    }
	    sql += " LIMIT " + stIndex + "," + rowNum;
	    List<Map<String, Object>> infoList = jdbcTemplate.queryForList(sql);
	    return infoList;
	}
	
	public boolean updateSeatsStatus(String seatId, String status) {
	    String sql = "UPDATE ecm_train_number_seats etns SET etns.`seatStatus` = ? WHERE etns.`trainNumberSeatsId` = ?";
	    return jdbcTemplate.update(sql, status, seatId) > 0;
	}
	
	public boolean insertSeat(String date, String trainCode, String seatType) {
	    String sql = "";
	    int num = 0;
        try {
            String sql1 = "SELECT * FROM ecm_train_number etn WHERE etn.`stationTrainCode` = ?";
            if (jdbcTemplate.queryForList(sql1, trainCode).size() <= 0) {
                String sql2 = "INSERT INTO ecm_train_number (stationTrainCode, startStationSUrl, endStationSUrl, fromStationSUrl, toStationSUrl) VALUES (?, 'VAP', 'VAP', 'VAP', 'VAP')";
                jdbcTemplate.update(sql2, trainCode);
            }
            
            sql = "INSERT INTO ecm_train_number_seats (stationTrainCode, trainNumberDate, seatType, seatCode, seatStatus) VALUES ";
            for (int i = 1; i < 99; i++) {
                sql += i == 1 ? "" : ",";
                String seatCode = "";
                if ("5".equals(seatType) || "6".equals(seatType) || "7".equals(seatType)) {
                    seatCode = trainCode + "_01" + get3Str(i / 3 + 1) + i % 3 + "_" + date;
                } else {
                    seatCode = trainCode + "_01" + get3Str(i) + "0_" + date;
                }
                sql += "('" + trainCode + "', '" + date + "', '" + seatType + "', '" + seatCode + "', 'Y')";
            }
            num = jdbcTemplate.update(sql);
        } catch (DataAccessException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
	    return num > 0;
	}
	
	public String get3Str(int i) {
	    int a = (i + "").length();
	    if (a >= 3) {
	        return i + "";
	    } else {
	        if (a == 1) {
	            return "00" + i;
	        } else {
	            return "0" + i;
	        }
	    }
	}
	
	public boolean resetPasswdByUserid(String userid, String passwd) {
        String sql = "UPDATE ecm_users eu SET eu.`userPasswd` = ? WHERE eu.`userId` = ?";
        int num = 0;
        try {
            num =  jdbcTemplate.update(sql, passwd, Integer.parseInt(userid));
        } catch (DataAccessException e) {
            e.printStackTrace();
            log.info("重置密码失败！");
        }
        return num > 0;
    }
	
	public boolean updateuserinfo(String userid, String phone, String nickname, String cardCode) {
        String sql = "UPDATE ecm_users eu SET eu.`nickName` = ? , eu.`userMobile` = ?, eu.`userCardCode` = ? WHERE eu.`userId` = ?";
        int num = 0;
        try {
            num =  jdbcTemplate.update(sql, nickname, phone, cardCode, Integer.parseInt(userid));
        } catch (DataAccessException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            log.info("更新用户信息失败！");
        }
        return num > 0;
    }
	
	public List<Map<String, Object>> queryAllContact(String stIndex, String rowNum, String userId) {
        String sql = "SELECT euc.`userContactId`, euc.`contactName`, euc.`contactCardCode`, euc.`contactMobile`, euc.`contactSex`, euc.`status` FROM ecm_user_contacts euc WHERE euc.`userId` = ? LIMIT ?,?";
        List<Map<String, Object>> infoList = jdbcTemplate.queryForList(sql, userId, Integer.parseInt(stIndex), Integer.parseInt(rowNum));
        return infoList;
    }
	
	public boolean updateContact(String id, String Name, String mobile, String cardCode, String sex, String status) {
        String sql = "UPDATE ecm_user_contacts euc SET euc.`contactName` = ?, euc.`contactMobile` = ?, euc.`contactCardCode` = ?, euc.`contactSex` = ?, euc.`status` = ? WHERE euc.`userContactId` = ?";
        int num = jdbcTemplate.update(sql,Name, mobile, cardCode, sex, status, id);
        return num > 0;
    }
	
	public boolean insertContact(String userId, String Name, String mobile, String cardCode, String sex, String status) {
        String sql = "INSERT INTO ecm_user_contacts (userId, contactName, contactMobile, contactCardCode, contactSex, STATUS) VALUES (?,?,?,?,?,?)";
        int num = jdbcTemplate.update(sql,userId, Name, mobile, cardCode, sex, status);
        return num > 0;
    }
	
}
