//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using Project.Config;
//using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
//using Project.Model.OrderManager;
//using Project.Model.SalePromotionManager;
//using Project.Repository.ProductManager;
//using Project.Repository.SalePromotionManager;

//namespace Project.Application.Service.OrderManager.Validate
//{
//    public class OrderServiceImplValidate
//    {

//        public TicketRepository _ticketRepository;
//        private readonly ProductRepository _productRepository;
//        private readonly GoodsRepository _goodsRepository;

//        public OrderServiceImplValidate()
//        {
//            _ticketRepository = new TicketRepository();
//            _productRepository = new ProductRepository();
//            _goodsRepository = new GoodsRepository();
//        }


//        public bool TicketValidate(string ticketCodes, int customerId)
//        {
//            if (string.IsNullOrWhiteSpace(ticketCodes))
//            {
//                return true;
//            }

//            var tickets = ticketCodes.Split(',');
//            var validateResult = true;
//            var ticketList = new List<TicketEntity>();
//            foreach (var ticket in tickets)
//            {
//                if (!_ticketRepository.Query().Any(p => p.TicketCode == ticket && p.CustomerId == customerId))
//                {
//                    validateResult = false;
//                }
//            }

//            return validateResult;
//        }


    


//    }

//}
