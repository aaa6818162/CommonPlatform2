using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Project.Infrastructure.FrameworkCore.Logging;
using Project.Infrastructure.FrameworkCore.Payment.Base;
using Project.Infrastructure.FrameworkCore.Payment.Interfaces;
using Project.Infrastructure.FrameworkCore.Payment.Model;

namespace Project.Infrastructure.FrameworkCore.Payment.Services
{
    /// <summary>
    /// 建设银行网银支付
    /// </summary>
    internal class CcbBankService : BaseService, IPayService
    {
        private readonly CcbBankModel _ccbBankModel;

        /// <summary>
        /// 初始化
        /// </summary>
        public CcbBankService()
        {
            _ccbBankModel = new CcbBankModel
            {
                Pub = ConfigurationManager.AppSettings["CcbPubKey"],
                CcbBankUrl = ConfigurationManager.AppSettings["CcbBankUrl"],
                CcbMerchantId = ConfigurationManager.AppSettings["CcbMerchantId"],
                CcbPosID = ConfigurationManager.AppSettings["CcbPosID"],
                CcbBranchId = ConfigurationManager.AppSettings["CcbBranchId"],
                Ip = ConfigurationManager.AppSettings["CcbIp"],
                Port = Int32.Parse(ConfigurationManager.AppSettings["CcbPort"])
            };
        }

        /// <summary>
        /// 发送支付请求
        /// </summary>
        /// <param name="orderPay">订单支付信息</param>
        /// <returns></returns>
        public string SubmitRequest(OrderPay orderPay)
        {
            var builder = new StringBuilder();
            string orderNoForTao = orderPay.OrderNo;
            if (orderPay.OrderNo.Length < 10)
            {
                orderNoForTao = orderPay.OrderNo.PadLeft(10, '0');
            }

            var paramDictionary = new Dictionary<string, string>();
            paramDictionary.Add("MERCHANTID", _ccbBankModel.CcbMerchantId);
            paramDictionary.Add("POSID", _ccbBankModel.CcbPosID);
            paramDictionary.Add("BRANCHID", _ccbBankModel.CcbBranchId);
            paramDictionary.Add("ORDERID", orderNoForTao);
            paramDictionary.Add("PAYMENT", orderPay.TotalAmount.ToString("f2"));
            paramDictionary.Add("CURCODE", _ccbBankModel.CurCode);
            paramDictionary.Add("TXCODE", _ccbBankModel.TxCode);
            paramDictionary.Add("REMARK1", orderPay.TotalAmount.ToString("f2"));
            paramDictionary.Add("REMARK2", string.Empty);
            paramDictionary.Add("TYPE", _ccbBankModel.Type);
            paramDictionary.Add("PUB", _ccbBankModel.Pub);
            paramDictionary.Add("GATEWAY", string.Empty);
            paramDictionary.Add("CLIENTIP", string.Empty);
            paramDictionary.Add("REGINFO", string.Empty);
            paramDictionary.Add("PROINFO", string.Empty);
            paramDictionary.Add("REFERER", string.Empty);

            paramDictionary.Add("MAC", GetMac(paramDictionary));

            paramDictionary.Remove("PUB");
            builder.AppendFormat("<form name=\"form\" action=\"{0}\" method=\"post\">",
                _ccbBankModel.CcbBankUrl + "?" + this.GetUrlParam(paramDictionary));

            //foreach (var param in paramDictionary)
            //{
            //    builder.AppendFormat(" <input type=\"hidden\" name=\"{0}\" value=\"{1}\" />",
            //        param.Key, param.Value);
            //}

            builder.Append(" </form>");
            builder.Append("<script type=\"text/javascript\">document.form.submit();</script>");

            LoggerHelper.InfoFormat(LogType.PaymentLogger,"建设银行支付请求：订单号：{0}\r\n", orderPay.OrderNo);
            return builder.ToString();
        }

        /// <summary>
        /// 处理支付返回信息
        /// </summary>
        /// <param name="notifyType"></param>
        /// <returns></returns>
        public PayResult CheckNotifyData(NotifyEnum notifyType)
        {
            var result = new PayResult
            {
                PayEnum = PayEnum.CcbBank,
                MerchantAccount = _ccbBankModel.CcbMerchantId + "-" + _ccbBankModel.CcbPosID
            };

            //POSID     商户柜台代码	CHAR(9)	        从商户传送的信息中获得
            //BRANCHID	分行代码	    CHAR(9)	        从商户传送的信息中获得
            //ORDERID	定单号	        CHAR(30)	    从商户传送的信息中获得
            //PAYMENT	付款金额	    NUMBER(16,2)	从商户传送的信息中获得
            //CURCODE	币种	        CHAR(2)	        从商户传送的信息中获得
            //REMARK1	备注一	        CHAR(30)	    从商户传送的信息中获得
            //REMARK2	备注二	        CHAR(30)	    从商户传送的信息中获得
            //SUCCESS	成功标志	    CHAR(1)	        成功时返回Y
            //SIGN	    数字签名	    CHAR(256)	

            var paramDictionary = new Dictionary<string, string>();
            paramDictionary.Add("POSID", HttpContext.Current.Request.QueryString["POSID"]);
            paramDictionary.Add("BRANCHID", HttpContext.Current.Request.QueryString["BRANCHID"]);
            paramDictionary.Add("ORDERID", HttpContext.Current.Request.QueryString["ORDERID"]);
            paramDictionary.Add("PAYMENT", HttpContext.Current.Request.QueryString["PAYMENT"]);
            paramDictionary.Add("CURCODE", HttpContext.Current.Request.QueryString["CURCODE"]);
            paramDictionary.Add("REMARK1", HttpContext.Current.Request.QueryString["REMARK1"]);
            paramDictionary.Add("REMARK2", HttpContext.Current.Request.QueryString["REMARK2"]);
            if (!string.IsNullOrEmpty(HttpContext.Current.Request.QueryString["ACC_TYPE"]))
                paramDictionary.Add("ACC_TYPE", HttpContext.Current.Request.QueryString["ACC_TYPE"]);
            paramDictionary.Add("SUCCESS", HttpContext.Current.Request.QueryString["SUCCESS"]);
            paramDictionary.Add("TYPE", HttpContext.Current.Request.QueryString["TYPE"]);
            paramDictionary.Add("REFERER", HttpContext.Current.Request.QueryString["REFERER"]);
            paramDictionary.Add("CLIENTIP", HttpContext.Current.Request.QueryString["CLIENTIP"]);
            paramDictionary.Add("SIGN", HttpContext.Current.Request.QueryString["SIGN"]);

            result.OrderNo = paramDictionary["ORDERID"];
            result.TotalAmount = paramDictionary["REMARK1"];

            var dicParams = new Dictionary<string, string>
            {
                {"Url",this.GetUrlParam(paramDictionary)},
                {"Sign",HttpContext.Current.Request.QueryString["SIGN"]}
            };
            //签名验证
            var verifyResult = SignVerify(dicParams);
            if (verifyResult)
            {
                result.Status = paramDictionary["SUCCESS"] == "Y";
                //result.PayDate = msg.Substring(10, 8);
                //result.SerialNumber = msg.Substring(18);
            }
            result.Message = verifyResult ? "验证成功" : "验证失败";
            LoggerHelper.InfoFormat(LogType.PaymentLogger,"建设银行支付通知，{0}。\r\n", result.Message);
            return result;
        }

        /// <summary>
        /// 签名验证
        /// </summary>
        /// <param name="dicParams">参数</param>
        /// <returns></returns>
        public bool SignVerify(Dictionary<string, string> dicParams)
        {
            try
            {
                Socket newclient = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                IPEndPoint ie = new IPEndPoint(IPAddress.Parse(_ccbBankModel.Ip), _ccbBankModel.Port); // 服务器的IP和端口 
                try
                {
                    newclient.Connect(ie);
                }
                catch (SocketException e)
                {
                    //e.ToString();
                    return false;
                }

                var signStr = dicParams["Url"] + "\r\n"; //在发送报文尾部添加换行符

                newclient.Send(Encoding.ASCII.GetBytes(signStr));

                byte[] data = new byte[2048];
                int recv = newclient.Receive(data);

                newclient.Shutdown(SocketShutdown.Both);
                newclient.Close();

                var result = Encoding.ASCII.GetString(data, 0, recv).TrimEnd("\r\n".ToCharArray());

                if (result[0] == 'N' || result.Substring(2) != dicParams["Sign"])
                {
                    LoggerHelper.InfoFormat(LogType.PaymentLogger,"建设银行\r\n通知商户验签失败。\r\n");
                    return false;
                }

                return true;
            }
            catch (Exception ex)
            {
                LoggerHelper.InfoFormat(LogType.PaymentLogger, "建设银行\r\n通知商户验签失败,错误信息{0}。\r\n", ex.Message);
                return false;
            }
        }

        private string GetUrlParam(Dictionary<string, string> dicParams)
        {
            List<string> list = new List<string>();
            foreach (var param in dicParams)
            {
                list.Add(string.Format("{0}={1}", param.Key, System.Web.HttpUtility.UrlEncode(param.Value)));
            }

            return string.Join("&", list);
        }

        private string GetMac(Dictionary<string, string> dicParams)
        {
            var url = GetUrlParam(dicParams);
            byte[] result = Encoding.Default.GetBytes(url);
            MD5 md5 = new MD5CryptoServiceProvider();
            byte[] output = md5.ComputeHash(result);
            var mac = BitConverter.ToString(output).Replace("-", "").ToLower();
            LoggerHelper.InfoFormat(LogType.PaymentLogger,"URL:" + url + ";MAC:" + mac);
            return mac;
        }
    }
}
