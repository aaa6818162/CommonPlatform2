

using System;
using System.Linq;
using Project.Application.OpenApiService.AccountManager.Request;
using Project.Infrastructure.FrameworkCore.ApplicationService;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Model.PermissionManager;
using Project.Repository.CustomerManager;
using Project.Repository.PermissionManager;

/// <summary>
/// 
/// </summary>
public class AccountServiceImpl : IServiceImpl
{
    private readonly CustomerRepository _customerRepository;
    private readonly UserSessionRepository _userSessionRepository;


    public AccountServiceImpl()
    {
        this._customerRepository = new CustomerRepository();
        this._userSessionRepository = new UserSessionRepository();
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    public LoginResponse Login(LoginRequest request)
    {
        var customerInfo = _customerRepository.Query().Where(p => p.Mobilephone == request.LoginName && p.Password == Encrypt.MD5Encrypt(request.Password)).FirstOrDefault();
        if (customerInfo != null)
        {
            var token = Guid.NewGuid().ToString();
            _userSessionRepository.Save(new UserSessionEntity()
            {
                Token = token,
                CreateTime = DateTime.Now,
                UserId = customerInfo.PkId
            });

            return new LoginResponse()
            {
                MobilePhone = customerInfo.Mobilephone,
                Token = token,
                IsLoginSuccess=true
            };
        }
        return new LoginResponse()
        {
            IsLoginSuccess = false,
            Message = "用户名或密码错误"
        };
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    public ValidateTokenResponse ValidateToken(ValidateTokenRequest request)
    {
        var tokenInfo = _userSessionRepository.Query().Where(p => p.Token == request.Token).FirstOrDefault();
        if (tokenInfo != null)
        {
            if (DateTime.Now > tokenInfo.CreateTime.GetValueOrDefault().AddMinutes(20))
            {
                return new ValidateTokenResponse()
                {
                    IsPassValidate = false,
                    Message = "token过期"
                };
            }
        }
        else
        {
            return new ValidateTokenResponse()
            {
                IsPassValidate = false,
                Message = "未登录"
            };
        }

        return new ValidateTokenResponse()
        {
            IsPassValidate = true,
            Message = ""
        };
    }


}