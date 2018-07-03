using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project.Model.ProductManager;

namespace Project.WebSite.Models.Product
{
    public class DetailOutput
    {
        public IList<SpecVm> SpecVmList { get; set; }

        public ProductEntity ProductEntity { get; set; }




    }


    public class SpecVm
    {
        /// <summary>
        ///规格编号
        /// </summary>
        public virtual System.Int32 SpecId { get; set; }

        /// <summary>
        /// 规格名称
        /// </summary>
        public virtual System.String SpecName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual System.Int32 SpecType { get; set; }

        /// <summary>
        /// 规格值
        /// </summary>
        public virtual IList<SpecValueVm> SpecValueList { get; set; }
    }


    public class SpecValueVm
    {
        #region 属性

        /// <summary>
        /// 
        /// </summary>
        public virtual System.Int32? SpecValueId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual System.Int32? SpecId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual System.String SpecValueName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual System.Int32? Sort { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public virtual System.String ImageUrl { get; set; }

        /// <summary>
        /// 是否能选
        /// </summary>
        public virtual int IfCanChoose { get; set; }


        /// <summary>
        /// 别名
        /// </summary>
        public virtual int OtherSpecValueName { get; set; }

        #endregion
    }



}