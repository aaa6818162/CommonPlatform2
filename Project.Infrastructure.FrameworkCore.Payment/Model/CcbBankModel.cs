using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Infrastructure.FrameworkCore.Payment.Model
{
    /// <summary>
    /// 建设银行支付实体
    /// </summary>
    internal class CcbBankModel
    {
        public CcbBankModel()
        {
            CurCode = "01";
            TxCode = "520100";
            Type = "1";
        }

        /// <summary>
        /// 网关地址
        /// </summary>
        public string CcbBankUrl { get; set; }

        /// <summary>
        /// 商户代码	CHAR(15)	Y	由建行统一分配
        /// </summary>
        public string CcbMerchantId { get; set; }

        /// <summary>
        /// 商户柜台代码	CHAR(9)	Y	由建行统一分配
        /// </summary>
        public string CcbPosID { get; set; }

        /// <summary>
        /// 分行代码	CHAR(9)	Y	由建行统一指定
        /// </summary>
        public string CcbBranchId { get; set; }

        /// <summary>
        /// 币种	CHAR(2)	Y	缺省为01－人民币（只支持人民币支付）
        /// </summary>
        public string CurCode { get; set; }

        /// <summary>
        /// 交易码
        /// </summary>
        public string TxCode { get; set; }

        /// <summary>
        /// 接口类型	CHAR(1)	Y	0- 非钓鱼接口
        ///                         1- 防钓鱼接口
        ///                         目前该字段以银行开关为准，如果有该字段则需要传送以下字段。
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// 公钥后30位	CHAR(30)	Y	仅作为源串参加MD5摘要，不作为参数传递
        /// </summary>
        public string Pub { get; set; }

        /// <summary>
        /// 网关类型	VARCHAR(100)	N	详见下方的GATEWAY设置说明
        /// </summary>
        public string Gateway { get; set; }

        /// <summary>
        /// IP
        /// </summary>
        public string Ip { get; set; }

        /// <summary>
        /// 端口
        /// </summary>
        public int Port { get; set; }
    }
}
