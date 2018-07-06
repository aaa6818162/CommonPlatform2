using System;

namespace Project.Wap.Models
{
    public class PaymentVM 
    {
        /// <summary>
        /// 订单号
        /// </summary>
        public string OrderNo { get; set; }

        /// <summary>
        /// 商品数量
        /// </summary>
        public decimal ProductNum { get; set; }

        /// <summary>
        /// 应付合计
        /// </summary>
        public decimal TotalAmount { get; set; }

        /// <summary>
        /// 发货时间
        /// </summary>
        public DateTime? SendDate { get; set; }

        /// <summary>
        /// 是否微信客户端
        /// </summary>
        public bool IsWechat { get; set; }

        /// <summary>
        /// 授权登录返回后自动弹出微信支付
        /// </summary>
        public bool IsWechatAutoPay { get; set; }

        /// <summary>
        /// 微信支付参数
        /// </summary>
        public string WxJsApiParam { get; set; }
    }
}