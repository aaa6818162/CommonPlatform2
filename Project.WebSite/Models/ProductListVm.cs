using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project.Infrastructure.FrameworkCore.Domain.Entities.Component;
using Project.Model.ProductManager.Request;
using Project.WebSite.Models.Component;

namespace Project.WebSite.Models
{
    public class ProductListVm: SearchBaseVm
    {
        public ProductListVm()
        {
            ProductCategoryList=new List<ProductCategoryVm>();
            ProductList=new List<ProductVm>();
            AttributList=new List<AttributeVm>();
            AttributeValueList = new List<AttributeValueVm>();
        }

        /// <summary>
        /// 
        /// </summary>
        public IList<ProductCategoryVm> ProductCategoryList { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public IList<ProductVm> ProductList { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public IList<AttributeVm> AttributList { get; set; }

        public List<AttributeValueVm> AttributeValueList { get; set; }


        public ProductSearchCondition ProductSearchCondition { get; set; }
    }

    public class ProductCategoryVm
    {
        public int ProductCategoryId { get; set; }

        public int ProductCategoryName { get; set; }

        public IList<ProductCategoryVm> ProductCategoryList { get; set; }
    }

    public class ProductVm
    {
        public System.String ProductId { get; set; }

        public System.String ProductName { get; set; }
        public System.String ProductCode { get; set; }

        public System.String ImageUrl { get; set; }

        public virtual System.Decimal SellPrice { get; set; }


        /// <summary>
        /// 是否促销
        /// </summary>
        public virtual System.Int32 IsPromotion { get; set; }

        /// <summary>
        /// 促销价格范围
        /// </summary>
        public virtual System.String PromotionPriceArea { get; set; }
    }


    public class AttributeVm
    {
        public string AttributeId;

        public string AttributeName;

        public int ShowType;

        public virtual string SelectValue { get; set; }

        public virtual IList<AttributeValueVm> AttributeValueList { get; set; }
    }

    public class AttributeValueVm
    {
        public int AttributeId { get; set; }

        public int AttributeValueId { get; set; }

        public string AttributeValueName { get; set; }


    }



}