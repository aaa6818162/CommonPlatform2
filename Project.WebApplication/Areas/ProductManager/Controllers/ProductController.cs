

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Aspose.Cells;
using AutoMapper;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.ProductManager;
using Project.Model.SalePromotionManager;
using Project.Service.ProductManager;
using Project.WebApplication.Areas.ProductManager.Models;
using Project.WebApplication.Controllers;

namespace Project.WebApplication.Areas.ProductManager.Controllers
{
    public class ProductController : BaseController
    {

        public ActionResult Hd(int pkId = 0)
        {

            var systemCategoryId = RequestHelper.GetInt("SystemCategoryId");

            var systemCategorySpecEntityList = SystemCategorySpecService.GetInstance().GetList(new SystemCategorySpecEntity() { SystemCategoryId = systemCategoryId });

            var systemCategoryAttributeEntityList = SystemCategoryAttributeService.GetInstance().GetList(new SystemCategoryAttributeEntity() { SystemCategoryId = systemCategoryId });

            var specEntityList = new List<SpecEntity>();
            systemCategorySpecEntityList.ForEach(p =>
            {
                specEntityList.Add(p.SpecEntity);
            });
            var specVmList = Mapper.Map<List<SpecVm>>(specEntityList);


            var attributeEntityList = new List<ExtAttributeEntity>();
            systemCategoryAttributeEntityList.ForEach(p =>
            {
                attributeEntityList.Add(p.AttributeEntity);
            });
            var attributeVmList = Mapper.Map<List<AttributeVm>>(attributeEntityList);


            if (pkId > 0)
            {
                var entity = ProductService.GetInstance().GetModelByPk(pkId);
                entity.GoodsEntityList.ForEach(p => { p.IsUse = 1; });

                ViewBag.BindEntity = JsonHelper.JsonSerializer(entity, new SpecialContractResolver());
                specVmList.ForEach(p =>
                {
                    p.SpecValueList.ForEach(x =>
                    {
                        if (entity.GoodsSpecValueEntityList.Any(z => z.SpecValueId == x.SpecValueId))
                        {
                            x.IsCheck = 1;
                        }
                    });
                });


                attributeVmList.ForEach(p =>
                {
                    p.AttributeValueList.ForEach(x =>
                    {
                        if (entity.ProductAttributeValueEntityList.Any(z => z.AttributeValueId == x.AttributeValueId))
                        {
                            x.IsCheck = 1;
                        }
                    });
                });


            }


            ViewBag.SpecVmList = JsonHelper.JsonSerializer(specVmList);
            ViewBag.AttributeVmList = JsonHelper.JsonSerializer(attributeVmList);
            return View();
        }


        public ActionResult List()
        {
            return View();
        }

        public MvcJsonResult GetList()
        {
            var pIndex = this.Request["page"].ConvertTo<int>();
            var pSize = this.Request["rows"].ConvertTo<int>();
            var where = new ProductEntity();
            where.IsCommand = RequestHelper.GetInt("IsCommand");
            where.IsShow = RequestHelper.GetInt("IsShow");

            where.ProductName = RequestHelper.GetFormString("ProductName");
            where.SystemCategoryId = RequestHelper.GetInt("SystemCategoryId");
            where.ProductCategoryId = RequestHelper.GetInt("ProductCategoryId");
            //where.ProductCategoryRoute = RequestHelper.GetFormString("ProductCategoryRoute");
            where.BrandId = RequestHelper.GetInt("BrandId");

            var searchList = ProductService.GetInstance().Search(where, (pIndex - 1) * pSize, pSize);

            var dataGridEntity = new DataGridResponse()
            {
                total = searchList.Item2,
                rows = searchList.Item1
            };
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Add(AjaxRequest<ProductEntity> postData)
        {
            postData.RequestEntity.BriefDescription = Base64Helper.DecodeBase64(postData.RequestEntity.BriefDescription);
            postData.RequestEntity.Description = Base64Helper.DecodeBase64(postData.RequestEntity.Description);
            postData.RequestEntity.GoodsEntityList = new HashSet<GoodsEntity>(postData.RequestEntity.GoodsEntityList.Where(p => p.IsUse == 1));

            var addResult = ProductService.GetInstance().Add(postData.RequestEntity);

            var result = new AjaxResponse<ProductEntity>()
            {
                Success = addResult.Item1,
                // result = postData.RequestEntity,
                Error = new ErrorInfo() { Message = addResult.Item2 }
            };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Edit(AjaxRequest<ProductEntity> postData)
        {
            postData.RequestEntity.BriefDescription = Base64Helper.DecodeBase64(postData.RequestEntity.BriefDescription);
            postData.RequestEntity.Description = Base64Helper.DecodeBase64(postData.RequestEntity.Description);
            postData.RequestEntity.GoodsEntityList = new HashSet<GoodsEntity>(postData.RequestEntity.GoodsEntityList.Where(p => p.IsUse == 1));

            var updateResult = ProductService.GetInstance().Update(postData.RequestEntity);

            var result = new AjaxResponse<ProductEntity>()
            {
                Success = updateResult.Item1,
                Result = postData.RequestEntity,
                Error = new ErrorInfo() { Message = updateResult.Item2 }
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        [HttpPost]
        public MvcJsonResult Delete(int pkid)
        {
            var deleteResult = ProductService.GetInstance().DeleteByPkId(pkid);
            var result = new AjaxResponse<ProductEntity>()
            {
                Success = deleteResult
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        [HttpPost]
        public MvcJsonResult DownPrd(int PkId)
        {
            var addResult = ProductService.GetInstance().UpdateIsShow(PkId, 2);

            var result = new AjaxResponse<ProductEntity>()
            {
                Success = addResult,
                // result = postData.RequestEntity,
                //error = new ErrorInfo() { message = addResult.Item2 }
            };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }

        [HttpPost]
        public MvcJsonResult UpPrd(int PkId)
        {
            var addResult = ProductService.GetInstance().UpdateIsShow(PkId, 1);

            var result = new AjaxResponse<ProductEntity>()
            {
                Success = addResult,
                // result = postData.RequestEntity,
                //error = new ErrorInfo() { message = addResult.Item2 }
            };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult CommandPrd(int PkId)
        {
            var addResult = ProductService.GetInstance().UpdateIsCommand(PkId, 1);

            var result = new AjaxResponse<ProductEntity>()
            {
                Success = addResult,
                // result = postData.RequestEntity,
                //error = new ErrorInfo() { message = addResult.Item2 }
            };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }

        [HttpPost]
        public MvcJsonResult CancelCommandPrd(int PkId)
        {
            var addResult = ProductService.GetInstance().UpdateIsCommand(PkId, 2);

            var result = new AjaxResponse<ProductEntity>()
            {
                Success = addResult,
                // result = postData.RequestEntity,
                //error = new ErrorInfo() { message = addResult.Item2 }
            };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }




        /// <summary>
        /// 
        /// </summary>
        public void InPortData()
        {


            //delete from PRM_AttributeValue;
            //delete from PRM_ExtAttribute;
            //delete from  PRM_Goods;
            //delete from  PRM_GoodsSpecValue;
            //delete from  PRM_Product;

            //delete from  dbo.PRM_ProductAttributeValue;

            //DELETE FROM PRM_ProductCategory WHERE(PkId <> 1);


            //delete from dbo.PRM_ProductImage;

            //delete from   dbo.PRM_ProductSpec;

            //delete from  dbo.PRM_Spec;


            //delete from   dbo.PRM_SpecValue;

            //delete from dbo.PRM_SystemCategory;

            //delete from    dbo.PRM_SystemCategoryAttribute;

            //delete from   dbo.PRM_SystemCategorySpec;






            var path = Server.MapPath("/UploadFile/基础数据.xlsx");

            Workbook workbook = new Workbook(path);

            #region
            Worksheet sheet = workbook.Worksheets[0];
            Cells cells = sheet.Cells;


            for (int i = 1; i < cells.MaxDataRow + 1; i++)
            {
                var systemCategoryName = cells[i, 0].StringValue.Trim();
                var attrPkId = 0;
                if (!string.IsNullOrWhiteSpace(systemCategoryName))
                {
                    attrPkId = SystemCategoryService.GetInstance().Add(new SystemCategoryEntity()
                    {
                        SystemCategoryName = systemCategoryName
                    });
                }
            }

            #endregion


            #region

            sheet = workbook.Worksheets[1];
            cells = sheet.Cells;

            var index = 0;
            for (int i = 1; i < cells.MaxDataRow + 1; i++)
            {
                index++;

                var attrName = cells[i, 0].StringValue.Trim();
                var attrValues = cells[i, 1].StringValue.Trim();
                var remark = cells[i, 2].StringValue.Trim();

                var attrPkId = 0;
                if (!string.IsNullOrWhiteSpace(attrName))
                {
                    attrPkId = ExtAttributeService.GetInstance().Add(new ExtAttributeEntity()
                    {
                        AttributeName = attrName,
                        ShowTypeName = "下拉框",
                        ShowType = 2,
                        Remark = remark,
                        Sort = index
                    });


                    //绑定关系
                    if (!string.IsNullOrWhiteSpace(remark))
                    {
                        var t = SystemCategoryService.GetInstance()
                                .GetList(new SystemCategoryEntity())
                                .FirstOrDefault(p => p.SystemCategoryName.Contains(remark));
                        if (t != null)
                        {
                            SystemCategoryService.GetInstance().AddSystemCategoryAttributeRelation(new SystemCategoryAttributeEntity()
                            {
                                AttributeId = attrPkId,
                                SystemCategoryId = t.PkId
                            });

                        }
                    }


                }



                index = 0;
                if (!string.IsNullOrWhiteSpace(attrValues))
                {

                    var values = attrValues.Split(',');

                    values.Where(p => p != "").ForEach(p =>
                        {
                            index++;

                            AttributeValueService.GetInstance().Add(new AttributeValueEntity()
                            {
                                AttributeValueName = p,
                                AttributeId = attrPkId,
                                Sort = index
                            });

                        });
                }
            }
            #endregion


            #region
            sheet = workbook.Worksheets[2];
            cells = sheet.Cells;

            index = 0;
            for (int i = 1; i < cells.MaxDataRow + 1; i++)
            {
                index++;

                var specName = cells[i, 0].StringValue.Trim();
                var specValues = cells[i, 1].StringValue.Trim();
                var remark = cells[i, 2].StringValue.Trim();

                var attrPkId = 0;
                if (!string.IsNullOrWhiteSpace(specName))
                {
                    attrPkId = SpecService.GetInstance().Add(new SpecEntity()
                    {
                        SpecName = specName,
                        ShowTypeName = "平铺",
                        ShowType = 1,
                        Remark = remark,
                        SpecType = 1,
                        SpecTypeName = "文本"
                    });


                    //绑定关系
                    if (!string.IsNullOrWhiteSpace(remark))
                    {
                        var t = SystemCategoryService.GetInstance()
                                .GetList(new SystemCategoryEntity())
                                .FirstOrDefault(p => p.SystemCategoryName.Contains(remark));
                        if (t != null)
                        {
                            SystemCategoryService.GetInstance().AddSystemCategorySpecRelation(new SystemCategorySpecEntity()
                            {
                                SpecId = attrPkId,
                                SystemCategoryId = t.PkId
                            });

                        }
                    }



                }


                index = 0;
                if (!string.IsNullOrWhiteSpace(specValues))
                {

                    var values = specValues.Split(',');

                    values.Where(p => p != "").ForEach(p =>
                        {
                            index++;

                            SpecValueService.GetInstance().Add(new SpecValueEntity()
                            {
                                SpecValueName = p,
                                SpecId = attrPkId,
                                Sort = index
                            });

                        });
                }
            }
            #endregion


            #region

            //DELETE FROM PRM_ProductCategory WHERE(PkId <> 1)


            sheet = workbook.Worksheets[3];
            cells = sheet.Cells;



           var firstPkId = 0;
            var firstName = "";
            var firstSystemCategoryId = 0;
            var firstSystemCategoryName = "";
            for (int i = 1; i < cells.MaxDataRow + 1; i++)
            {
                index++;

                var sysCategory = cells[i, 0].StringValue.Trim();
                var first = cells[i, 1].StringValue.Trim();
                var second = cells[i, 2].StringValue.Trim();
                var thrid = cells[i, 3].StringValue.Trim();


                if (!string.IsNullOrWhiteSpace(first))
                {

                    var SystemCategory = SystemCategoryService.GetInstance().GetList(new SystemCategoryEntity()).Where(p => p.SystemCategoryName.Contains(sysCategory)).FirstOrDefault();

                    firstName = first;
                    firstSystemCategoryId = (SystemCategory == null ? 0 : SystemCategory.PkId);
                    firstSystemCategoryName = (SystemCategory == null ? "" : SystemCategory.SystemCategoryName);

                    firstPkId = ProductCategoryService.GetInstance().Add(new ProductCategoryEntity()
                    {
                        ProductCategoryName = first,
                        ParentId = 1,
                        Rank = 2,
                        IsShow = "是",
                        SystemCategoryId = firstSystemCategoryId,
                        SystemCategoryName = firstSystemCategoryName
                    });
                }



                if (!string.IsNullOrWhiteSpace(second))
                {
                    var secondPkId = ProductCategoryService.GetInstance().Add(new ProductCategoryEntity()
                    {
                        ProductCategoryName = second,
                        ParentId = firstPkId,
                        Rank = 3,
                        IsShow = "是",
                        SystemCategoryId = firstSystemCategoryId,
                        SystemCategoryName = firstSystemCategoryName
                    });


                    if (!string.IsNullOrWhiteSpace(thrid))
                    {

                        var thrids = thrid.Split(',');
                        thrids.ForEach(p =>
                        {

                            ProductCategoryService.GetInstance().Add(new ProductCategoryEntity()
                            {
                                ProductCategoryName = p,
                                ParentId = secondPkId,
                                Rank = 4,
                                IsShow = "是",
                                SystemCategoryId = firstSystemCategoryId,
                                SystemCategoryName = firstSystemCategoryName
                            });


                        });


                    }

                }
            }

            #endregion




        }







    }
}




