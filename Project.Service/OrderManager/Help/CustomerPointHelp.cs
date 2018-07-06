using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Model.OrderManager;
using Project.Repository.CustomerManager;

namespace Project.Service.OrderManager.Help
{

    public class CustomerHelp
    {
        private readonly CustomerRepository _customerRepository;
        private readonly CardTypeRepository _cardTypeRepository;
        public CustomerHelp()
        {
            _customerRepository = new CustomerRepository();
            _cardTypeRepository = new CardTypeRepository();
        }

        /// <summary>
        /// 新增积分
        /// </summary>
        /// <param name="entity"></param>
        public void AddPoint(OrderMainEntity entity)
        {
            #region 积分汇总
            var customerInfo = _customerRepository.GetById(entity.CustomerId);
            customerInfo.Totalamount = customerInfo.Totalamount + entity.Totalamount;
            var cardType = _cardTypeRepository.Query().FirstOrDefault(p => p.NeedTotalAmount <= customerInfo.Totalamount && p.NeedTotalAmountEnd > customerInfo.Totalamount);
            if (cardType != null)
            {
                customerInfo.CardTypeId = cardType.PkId;
                customerInfo.Discount = cardType.Discount;
            }
            _customerRepository.Update(customerInfo);
            #endregion
        }

        /// <summary>
        /// 减去积分
        /// </summary>
        /// <param name="entity"></param>
        public void SubtractionPoint(OrderMainEntity entity)
        {
            #region 积分汇总
            var customerInfo = _customerRepository.GetById(entity.CustomerId);
            customerInfo.Totalamount = customerInfo.Totalamount - entity.Totalamount;
            var cardType = _cardTypeRepository.Query().FirstOrDefault(p => p.NeedTotalAmount <= customerInfo.Totalamount && p.NeedTotalAmountEnd > customerInfo.Totalamount);
            if (cardType != null)
            {
                customerInfo.CardTypeId = cardType.PkId;
                customerInfo.Discount = cardType.Discount;
            }
            _customerRepository.Update(customerInfo);
            #endregion
        }


    }
}
