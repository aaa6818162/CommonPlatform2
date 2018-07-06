using System;
using System.Configuration;
using Project.Infrastructure.FrameworkCore.Payment.Model;

namespace Project.Infrastructure.FrameworkCore.Payment.Configs
{
    /// <summary>
    /// 支付配置信息
    /// </summary>
    public class NetPayConfig
    {
        /// <summary>
        /// 网店刷卡-招行网银
        /// </summary>
        public static string CmbPayCode = ConfigurationManager.AppSettings["CmbPayCode"];

        /// <summary>
        /// 网店刷卡-工行网银
        /// </summary>
        public static string IcbcPayCode = ConfigurationManager.AppSettings["IcbcPayCode"];

        /// <summary>
        /// 网店刷卡-交行网银
        /// </summary>
        public static string CommPayCode = ConfigurationManager.AppSettings["CommPayCode"];

        /// <summary>
        /// 网店刷卡-建行网银
        /// </summary>
        public static string CcbPayCode = ConfigurationManager.AppSettings["CcbPayCode"];

        /// <summary>
        /// 支付宝
        /// </summary>
        public static string AlipayCode = ConfigurationManager.AppSettings["AlipayCode"];

        /// <summary>
        /// 支付宝移动端
        /// </summary>
        public static string AlipayMobileCode = ConfigurationManager.AppSettings["AlipayCode"] + "01";

        /// <summary>
        /// 招财宝
        /// </summary>
        public static string TenpayCode = ConfigurationManager.AppSettings["TenpayCode"];

        /// <summary>
        /// 微信支付
        /// </summary>
        public static string WechatPayCode = ConfigurationManager.AppSettings["WechatPayCode"];

        /// <summary>
        /// 微信公众号支付
        /// </summary>
        public static string WechatJsApiPayCode = (ConfigurationManager.AppSettings["WechatPayCode"] + "01");

        /// <summary>
        /// 微信扫码支付
        /// </summary>
        public static string WechatNativePayCode = (ConfigurationManager.AppSettings["WechatPayCode"] + "02");

        /// <summary>
        /// 银联支付
        /// </summary>
        public static string ChinaPayCode = ConfigurationManager.AppSettings["ChinaPayCode"];

        /// <summary>
        /// 招商汇转
        /// </summary>
        public static string CmbRemittancePayCode = ConfigurationManager.AppSettings["CmbRemittancePayCode"];

        /// <summary>
        /// 工行汇转
        /// </summary>
        public static string IcbcRemittancePayCode = ConfigurationManager.AppSettings["IcbcRemittancePayCode"];

        /// <summary>
        /// 交行汇转
        /// </summary>
        public static string CommRemittancePayCode = ConfigurationManager.AppSettings["CommRemittancePayCode"];


        /// <summary>
        /// 判断是否汇款
        /// </summary>
        /// <param name="payCode">支付代码</param>
        /// <returns></returns>
        public static bool IsRemittance(string payCode)
        {
            return payCode == IcbcRemittancePayCode || payCode == CmbRemittancePayCode ||
                   payCode == IcbcRemittancePayCode;
        }

        /// <summary>
        /// 通过支付枚举获取支付代码
        /// </summary>
        /// <param name="payEnum"></param>
        /// <returns></returns>
        public static string GetPayCode(PayEnum payEnum)
        {
            string result;
            switch (payEnum)
            {
                case PayEnum.Alipay:
                case PayEnum.AlipayForMobile:
                    result = AlipayCode;
                    break;
                case PayEnum.CmbBank:
                    result = CmbPayCode;
                    break;
                case PayEnum.CommBank:
                    result = CommPayCode;
                    break;
                case PayEnum.IcbcBank:
                    result = IcbcPayCode;
                    break;
                case PayEnum.Tenpay:
                    result = TenpayCode;
                    break;
                case PayEnum.ChinaPay:
                    result = ChinaPayCode;
                    break;
                case PayEnum.CcbBank:
                    result = CcbPayCode;
                    break;
                case PayEnum.WechatPay:
                case PayEnum.WechatPayForJsApi:
                    result = WechatPayCode;
                    break;
                default:
                    throw new InvalidOperationException("无效的支付类型，支付异常。");
            }
            return result;
        }
    }
}
