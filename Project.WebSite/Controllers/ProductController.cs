using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Project.Application.Service.ProductManager;
using Project.Config;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Model.ProductManager;
using Project.Model.ProductManager.Request;
using Project.Service.ProductManager;
using Project.WebSite.Extend;
using Project.WebSite.Models;
using Project.WebSite.Models.Product;

namespace Project.WebSite.Controllers
{
    public class ProductController : NoAuthorizeController
    {
        #region 视图展示
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            var pageIndex = RequestHelper.GetInt("page") == 0 ? 1 : RequestHelper.GetInt("page");

            var viewModel = new ProductListVm();

            //通过分类查询
            var systemCategoryAttributeEntityList =new ProductServiceImpl().GetSystemCategoryAttributeList(RequestHelper.GetInt("SystemCategoryId")) ;
            var attributeEntityList = new List<ExtAttributeEntity>();
            systemCategoryAttributeEntityList.ForEach(p =>
            {
                attributeEntityList.Add(p.AttributeEntity);
            });
            viewModel.AttributList = Mapper.Map<List<AttributeVm>>(attributeEntityList);

            viewModel.AttributList.ForEach(p =>
            {
                viewModel.AttributeValueList.AddRange(p.AttributeValueList);
            });
           


          //商品列表
          var where = new ProductSearchCondition();
            where.AttributeValue1 = RequestHelper.GetInt("Attr1");
            where.AttributeValue2 = RequestHelper.GetInt("Attr2");
            where.AttributeValue3 = RequestHelper.GetInt("Attr3");
            where.AttributeValue4 = RequestHelper.GetInt("Attr4");
            where.AttributeValue5 = RequestHelper.GetInt("Attr5");
            where.AttributeValue6 = RequestHelper.GetInt("Attr6");
            where.ProductCategoryId = RequestHelper.GetInt("ProductCategoryId");
            where.ProductCode = RequestHelper.GetString("ProductCode");
            where.SystemCategoryId = RequestHelper.GetInt("SystemCategoryId");

            where.skipResults = (pageIndex - 1) * SiteConfig.GetConfig().PageSize;
            where.maxResults = SiteConfig.GetConfig().PageSize;
            var result =new ProductServiceImpl().SearchProduct(where);
            viewModel.ProductList = Mapper.Map<List<ProductVm>>(result.Item1);
            viewModel.PageInfo = new MyPagedList(pageIndex, where.maxResults, result.Item2);
            viewModel.ProductSearchCondition = where;

            return View(viewModel);
        }

        public ActionResult List2()
        {
            return List();
        }

        public ActionResult Detail(int productId)
        {
            var productInfo = ProductService.GetInstance().GetModelByPk(productId);
            var systemCategoryId = productInfo.SystemCategoryId;
            var systemCategorySpecEntityList = SystemCategorySpecService.GetInstance().GetList(new SystemCategorySpecEntity() { SystemCategoryId = systemCategoryId });


            var specEntityList = new List<SpecEntity>();
            systemCategorySpecEntityList.ForEach(p =>
            {
                specEntityList.Add(p.SpecEntity);
            });
            var specVmList = Mapper.Map<List<SpecVm>>(specEntityList);


            ViewBag.BindEntity = JsonHelper.JsonSerializer(productInfo, new SpecialContractResolver());
            specVmList.ForEach(p =>
            {
                p.SpecValueList.ForEach(x =>
                {
                    if (productInfo.GoodsSpecValueEntityList.Any(z => z.SpecValueId == x.SpecValueId))
                    {
                        x.IfCanChoose = 1;
                    }
                });
            });

            ViewBag.SpecVmList = JsonHelper.JsonSerializer(specVmList);

            ViewBag.Title = productInfo.ProductName;

            var detailOutput=new DetailOutput();
            detailOutput.ProductEntity = productInfo;
            detailOutput.SpecVmList = specVmList;

            return View(detailOutput);
        }

        #endregion


    }
}