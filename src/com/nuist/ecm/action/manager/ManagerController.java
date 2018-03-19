package com.nuist.ecm.action.manager;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageOutputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import session.TTSSession;

import com.alibaba.fastjson.JSON;
import com.nuist.common.define.Constant;
import com.nuist.common.util.SpringMVCResult;
import com.nuist.ecm.service.LoginService;
import com.nuist.ecm.service.manager.ManagerService;

/**
 * 后台管理
 * 
 * 项目名称：grad-project 类名称：ManagerController
 * 
 * @version 类描述：
 * @version 创建人：luocf
 * @version 创建时间：2015年3月24日 下午1:28:09
 * @version 修改人：luocf 修改时间：2015年3月24日 下午1:28:09
 * @version 修改备注：
 * 
 */
@Controller
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private ManagerService managerservice;

    @RequestMapping("index.htm")
    public ModelAndView managerIndex(HttpServletRequest request, HttpServletResponse response) throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userid = session.getAttribute("userId");
        if (userid != null && !"".equals(userid)) {
            return new ModelAndView("/WEB-INF/view/manager/index.ftl", loginService.queryUserInfo(userid));
        } else {
            return new ModelAndView(new RedirectView(loginService.getLoginUrl(request, "0")));
        }
    }

    @RequestMapping("main.htm")
    public ModelAndView welcome(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "pageCode") String pageCode) throws Exception {
        String viewStr = "/WEB-INF/view/manager/main/" + pageCode + ".ftl";
        TTSSession session = new TTSSession(request, response);
        String userid = session.getAttribute("userId");
        Map<String, Object> model = new HashMap<String, Object>();
        if (userid != null && !"".equals(userid)) {
            if ("userinfo".equals(pageCode)) {
                model.put("userInfo", loginService.queryUserInfo(userid));
            }
            model.put("loginFlag", "1");
        } else {
            model.put("loginFlag", "0");
        }
        return new ModelAndView(viewStr, model);
    }

    @RequestMapping("queryAllSeatsOnPage.htm")
    public ResponseEntity<String> queryAllSeatsOnPage(HttpServletRequest request, HttpServletResponse response,
            String page, String rowNum, String trainCode, String date) {

        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(managerservice.queryAllSeatsOnPage(page, rowNum,
                trainCode, date)));
    }

    @RequestMapping("updateSeats.htm")
    public ResponseEntity<String> updateSeats(HttpServletRequest request, HttpServletResponse response, String seatId,
            String status) {
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(managerservice.updateSeatStatus(seatId, status)));
    }
    
    @RequestMapping("insertSeats.htm")
    public ResponseEntity<String> insertSeats(HttpServletRequest request, HttpServletResponse response, String date,
            String trainCode, String seatType) {
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(managerservice.insertSeat(date, trainCode, seatType)));
    }

    @RequestMapping("queryContact.htm")
    public ResponseEntity<String> queryContact(HttpServletRequest request, HttpServletResponse response, String page,
            String rowNum) throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userid = session.getAttribute("userId");
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(managerservice.queryAllContact(page, rowNum,
                userid)));
    }

    @RequestMapping("updateContact.htm")
    public ResponseEntity<String> updateContact(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "id") String id, @RequestParam(value = "Name") String Name,
            @RequestParam(value = "mobile") String mobile, @RequestParam(value = "cardCode") String cardCode,
            @RequestParam(value = "sex") String sex, @RequestParam(value = "status") String status) throws Exception {
        Name = URLDecoder.decode(Name, Constant.getEncodingUtf8());
        Map<String, Object> model = new HashMap<String, Object>();
        if (managerservice.updateContact(id, Name, mobile, cardCode, sex, status)) {
            model.put("flag", "1");
        } else {
            model.put("flag", "0");
        }
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(model));
    }

    @RequestMapping("insertContact.htm")
    public ResponseEntity<String> insertContact(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "Name") String Name, @RequestParam(value = "mobile") String mobile,
            @RequestParam(value = "cardCode") String cardCode, @RequestParam(value = "sex") String sex,
            @RequestParam(value = "status") String status) throws Exception {
        Name = URLDecoder.decode(Name, Constant.getEncodingUtf8());
        Map<String, Object> model = new HashMap<String, Object>();
        TTSSession session = new TTSSession(request, response);
        String userId = session.getAttribute("userId");
        if (managerservice.insertContact(userId, Name, mobile, cardCode, sex, status)) {
            model.put("flag", "1");
        } else {
            model.put("flag", "0");
        }
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(model));
    }

    @RequestMapping("getCaptcha.htm")
    public void captchaRegister(HttpServletRequest request, HttpServletResponse response) throws Exception {
        int width = 65;
        int height = 30;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();
        g.setColor(new Color(255, 255, 255));
        g.fillRect(0, 0, width, height);
        g.setFont(new Font("Arial", Font.BOLD, 22));
        // 随机获取字母
        Random random = new Random();
        String captchaTouchCreate = "";
        char[] s = new char[4];
        for (int i = 0; i < 4; i++) {
            int j = random.nextInt(62);
            if (j < 10) {
                s[i] = (char) ('0' + j);
            } else if (j < 36) {
                s[i] = (char) (j - 10 + 'a');
            } else {
                s[i] = (char) (j - 36 + 'A');
            }
            captchaTouchCreate += s[i];
            g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
            g.drawString(s[i] + "", 7 + 12 * i, 22);
        }
        TTSSession session = new TTSSession(request, response);
        // 将验证码存入SESSION
        session.setAttribute("captcha", captchaTouchCreate, Constant.getDOMAINNAME());
        // 生成图像
        g.dispose();
        response.setContentType("image/jpeg");
        response.setHeader("Cache-Control", "no-cache");
        ServletOutputStream output = response.getOutputStream();
        ImageOutputStream imageOut = ImageIO.createImageOutputStream(output);
        ImageIO.write(image, "JPEG", imageOut);
        imageOut.close();
    }

    @RequestMapping("verifyCaptcha.htm")
    public ResponseEntity<String> getJudgeCaptchaTrueFlag(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "captchaInput") String captchaInput) {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            TTSSession session = new TTSSession(request, response);
            String sessionCaptcha = null == session.getAttribute("captcha") ? "" : session.getAttribute("captcha") + "";
            // boolean captureFlag = CommonUtil.getCaptureVerify(sessionCaptcha, captchaInput);
            boolean captureFlag = false;
            sessionCaptcha = sessionCaptcha.toLowerCase();
            captchaInput = captchaInput.toLowerCase();
            if (sessionCaptcha.equals(captchaInput))
                captureFlag = true;
            result.put("captureFlag", captureFlag);
        } catch (Exception e) {
            result.put("captureFlag", false);
            e.printStackTrace();
        }
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
    }

    @RequestMapping("userinfo/changepass.htm")
    public ResponseEntity<String> changepass(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "oldpass", required = false) String oldpass,
            @RequestParam(value = "pass", required = false) String pass) throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userid = session.getAttribute("userId");
        Map<String, Object> result = managerservice.changePasswd(userid, phone, oldpass, pass);
        if ("1".equals(result.get("flag"))) {
            session.delAttribute("userid", Constant.getDOMAINNAME());
        }
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
    }

    @RequestMapping("userinfo/updateInfo.htm")
    public ResponseEntity<String> changeInfo(HttpServletRequest request, HttpServletResponse response,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "nickname", required = false) String nickname,
            @RequestParam(value = "cardCode", required = false) String cardCode) throws Exception {
        TTSSession session = new TTSSession(request, response);
        String userid = session.getAttribute("userId");
        Map<String, Object> result = new HashMap<String, Object>();
        if (userid == null || "".equals(userid)) {
            result.put("flag", "0");
            result.put("msg", "你的登陆已过期，请先登陆");
        } else if (managerservice.updateuserInfo(userid, phone, nickname, cardCode)) {
            result.put("flag", "1");
        } else {
            result.put("flag", "0");
            result.put("msg", "更新失败");
        }
        return SpringMVCResult.returnResponseEntity(JSON.toJSONString(result));
    }
}
