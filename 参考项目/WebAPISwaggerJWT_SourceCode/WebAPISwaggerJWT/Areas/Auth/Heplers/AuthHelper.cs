using JWT;
using JWT.Algorithms;
using JWT.Serializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPISwaggerJWT.Areas.Auth.Helpers
{
    /// <summary>
    /// 授权帮助类
    /// </summary>
    public class AuthHelper
    {

        /// <summary>
        /// 密钥
        /// </summary>
        private static string _secret = "D9F2111C-14F8-46B2-A8E3-C6821D2C1C53";

        /// <summary>
        /// 有效期(秒)
        /// </summary>
        private const int _expire = 60;

        #region EncodeToken
        /// <summary>
        /// 生成票据
        /// </summary>
        /// <returns></returns>
        internal static string EncodeToken(string account, string password,int role)
        {
            IDateTimeProvider provider = new UtcDateTimeProvider();
            var now = provider.GetNow();
            var unixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc); // or use JwtValidator.UnixEpoch
            var secondsSinceEpoch = Math.Round((now - unixEpoch).TotalSeconds);
            var payload = new TokenPayload();
            payload.Account = account;
            payload.Expired = secondsSinceEpoch + _expire;
            payload.Role = role;
            IJwtAlgorithm algorithm = new HMACSHA256Algorithm();
            IJsonSerializer serializer = new JsonNetSerializer();
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtEncoder encoder = new JwtEncoder(algorithm, serializer, urlEncoder);
            var token = encoder.Encode(payload, _secret);
            return token;
        }
        #endregion

        #region DecodeToken
        /// <summary>
        /// 解析票据
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        internal static DecodeTokenResult DecodeToken(string token)
        {
            var result = new DecodeTokenResult();
            try
            {
                IJsonSerializer serializer = new JsonNetSerializer();
                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);
                var json = decoder.Decode(token, _secret, verify: true);//token为之前生成的字符串   
                result = json.ToObj<DecodeTokenResult>();
                result.OK = true;
                result.Message = json;
            }
            catch (TokenExpiredException)
            {
                result.OK = false;
                result.Message = "Token has expired";
            }
            catch (SignatureVerificationException)
            {
                result.OK = false;
                result.Message = "Token has invalid signature";
            }
            catch (Exception ex)
            {
                result.OK = false;
                result.Message = ex.Message;
            }
            return result;
        }
        #endregion
    }
}