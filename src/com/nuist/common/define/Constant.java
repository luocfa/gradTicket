package com.nuist.common.define;

/**
 * 
 * 项目名称： gradTicket
 * 
 * @version 类名称： Constant
 * @version 描述：
 * @author luocfa (●—●)
 * @version 创建时间： 2015年11月3日 下午3:16:34
 * @version 修改人：luocfa 修改日期： 2015年11月3日
 * @version 修改备注：
 * 
 */
public class Constant {

    private static final String ENCODING_UTF8 = "utf8";

    private static String DOMAINNAME = "";

    public static String getDOMAINNAME() {
        return DOMAINNAME;
    }

    public static void setDOMAINNAME(String dOMAINNAME) {
        DOMAINNAME = dOMAINNAME;
    }

    public static String getEncodingUtf8() {
        return ENCODING_UTF8;
    }

}
