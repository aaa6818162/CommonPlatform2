using System;
using System.Security.Cryptography;
using System.Text;

namespace Project.OpenApiSDK.Tool
{
    /// <summary>
    /// RSA
    //私钥签名
    //公钥验签
    //公钥加密
    //私钥解密
    /// </summary>
    public class SignHelper
    {

        public static void Test()
        {
            var data = "22222222";

            var key = GetPublicKeyAndPrivateKey();

            var signData = Sign(data,key.Item2);
            var verify = VerifySign(data, signData, key.Item1);


          
        }


        /// <summary>
        /// 获取公钥和私钥
        /// </summary>
        /// <returns></returns>
        public static Tuple<string, string> GetPublicKeyAndPrivateKey()
        {
            RSACryptoServiceProvider rsAalg = new RSACryptoServiceProvider();

            string strPrivateKey = rsAalg.ToXmlString(true);
            string strPublicKey = rsAalg.ToXmlString(false);

            return new Tuple<string, string>(strPublicKey, strPrivateKey);
        }

        #region 私钥签名 公钥验签
        /// <summary>
        /// 对数据进行签名
        /// </summary>
        /// <param name="strDataToSign"></param>
        /// <param name="strPrivateKey"></param>
        /// <returns></returns>
        public static string Sign(string strDataToSign, string strPrivateKey)
        {
            ASCIIEncoding byteConverter = new ASCIIEncoding();
            byte[] dataToSign = byteConverter.GetBytes(strDataToSign);
            try
            {
                RSACryptoServiceProvider rsAalg = new RSACryptoServiceProvider();
                rsAalg.FromXmlString(strPrivateKey);
                byte[] signedData = rsAalg.SignData(dataToSign, new SHA1CryptoServiceProvider());
                string strSignedData = Convert.ToBase64String(signedData);
                return strSignedData;
            }
            catch (CryptographicException e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        /// <summary>
        /// 验证签名
        /// </summary>
        /// <param name="orgData"></param>
        /// <param name="strSignedData"></param>
        /// <param name="strPublicKey"></param>
        /// <returns></returns>
        public static bool VerifySign(string orgData, string strSignedData, string strPublicKey)
        {
            byte[] signedData = Convert.FromBase64String(strSignedData);
            ASCIIEncoding byteConverter = new ASCIIEncoding();
            byte[] dataToVerify = byteConverter.GetBytes(orgData);
            try
            {
                RSACryptoServiceProvider rsAalg = new RSACryptoServiceProvider();
                rsAalg.FromXmlString(strPublicKey);
                return rsAalg.VerifyData(dataToVerify, new SHA1CryptoServiceProvider(), signedData);
            }
            catch (CryptographicException e)
            {
                Console.WriteLine(e.Message);

                return false;
            }
        }
        #endregion


    }
}
