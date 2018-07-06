using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Model.ProductManager;
using Project.Model.ProductManager.Request;
using Project.Repository.ProductManager;

namespace Project.Application.Service.ProductManager
{
    /// <summary>
    /// 商品服务类
    /// </summary>
    public class ProductServiceImpl : IServiceImpl
    {

        #region 

        private readonly GoodsRepository _goodsRepository;
        private readonly ProductRepository _productRepository;
        private readonly ProductCategoryRepository _productCategoryRepository;

        private readonly SystemCategoryAttributeRepository _systemCategoryAttributeRepository;
        public ProductServiceImpl()
        {
            _productCategoryRepository = new ProductCategoryRepository();
            _goodsRepository = new GoodsRepository();
            _productRepository = new ProductRepository();
            _systemCategoryAttributeRepository = new SystemCategoryAttributeRepository();
        }

        #endregion


        #region 商品信息

        /// <summary>
        /// 产品搜索
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public System.Tuple<IList<ProductEntity>, int> SearchProduct(ProductSearchCondition where)
        {
            var list = _productRepository.Search(where);
            return list;
        }

        /// <summary>
        /// 获取推荐商品
        /// </summary>
        /// <param name="top"></param>
        /// <returns></returns>
        public IList<ProductEntity> GetCommandProductList(int top)
        {
            return _productRepository.Query().Where(p => p.IsCommand == 1 && p.IsShow == 1).Skip(0).Take(top).ToList();
        }

        #endregion


        #region 其他商品附加信息

        /// <summary>
        /// 获取行业分类下的商品信息
        /// </summary>
        /// <param name="systemCategoryId"></param>
        /// <returns></returns>
        public IList<ProductCategoryEntity> GetProductCategoryList(int systemCategoryId)
        {
            return _productCategoryRepository.Query().Where(p => p.SystemCategoryId == systemCategoryId && p.IsShow == "是").ToList();
        }



        /// <summary>
        /// 获取该行业分类下的属性值 搜索条件
        /// </summary>
        /// <param name="systemCategoryId"></param>
        /// <returns></returns>
        public IList<SystemCategoryAttributeEntity> GetSystemCategoryAttributeList(int systemCategoryId)
        {
            return _systemCategoryAttributeRepository.Query().Where(p => p.SystemCategoryId == systemCategoryId).ToList();
        }

        #endregion





    }
}
