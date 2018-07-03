using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Project.Application.Service.ContentManager;
using Project.Config;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Model.ContentManager;
using Project.WebSite.Extend;
using Project.WebSite.Models;
using Project.WebSite.Models.Component;

namespace Project.WebSite.Controllers
{
    public class ContentController : NoAuthorizeController
    {
        // GET: Content
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 品牌列表
        /// </summary>
        /// <returns></returns>
        public ActionResult BrandList()
        {
            var pageIndex = RequestHelper.GetInt("page") == 0 ? 1 : RequestHelper.GetInt("page");


            var maxResults = SiteConfig.GetConfig().PageSize;
            var skipResults = (pageIndex - 1) * maxResults;
           
            var result = new ContentServiceImpl().Search(new PageContentEntity() {PageContentCategoryId = 10}, skipResults, maxResults);

            var viewModel = new BrandListVm();
            viewModel.PageContentEntityList = result.Item1;
            viewModel.PageInfo = new MyPagedList(pageIndex, maxResults, result.Item2);
            return View(viewModel);
        }


        public ActionResult BrandDetail()
        {
            return View();
        }




        public ActionResult FamousList()
        {
            return View();
        }

        public ActionResult FamousDetail()
        {
            return View();
        }


        public ActionResult ActivityList()
        {
            return View();
        }

        public ActionResult ActivityDetail()
        {
            return View();
        }


    }

    public class BrandListVm: SearchBaseVm
    {

        public BrandListVm()
        {
            PageContentEntityList=new List<PageContentEntity>();
        }


        public IList<PageContentEntity> PageContentEntityList { get; set; }

      

    }

}