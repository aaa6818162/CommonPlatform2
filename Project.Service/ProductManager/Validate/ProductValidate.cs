using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NHibernate.Util;
using Project.Model.ProductManager;
using Project.Repository.ProductManager;

namespace Project.Service.ProductManager.Validate
{
    public class ProductValidate
    {
        private readonly ProductRepository _productRepository;
        private readonly GoodsRepository _goodsRepository;
        public ProductValidate()
        {
            this._productRepository = new ProductRepository();
            this._goodsRepository = new GoodsRepository();
        }

        public Tuple<bool, string> ProductPublishValidate(ProductEntity entity)
        {
            if (!entity.GoodsEntityList.Any())
            {
                return new Tuple<bool, string>(false, "请选择产品规格来生成组合商品。");
            }

            if (entity.GoodsEntityList.Any(p => p.GoodsPrice == 0))
            {
                return new Tuple<bool, string>(false, "SKU表的商品价格必须大于0。");
            }

            if (entity.GoodsEntityList.Any(p => p.GoodsStock == 0))
            {
                return new Tuple<bool, string>(false, "SKU表的商品数量必须大于0。");
            }

            if (!entity.ProductImageEntityList.Any(p => p.IsDefault == 1))
            {
                return new Tuple<bool, string>(false, "商品第一张图片必须上传。");
            }

            if (entity.GoodsEntityList.Any(p => string.IsNullOrWhiteSpace(p.GoodsCode)))
            {
                return new Tuple<bool, string>(false, "SKU表的商品编码必填。");
            }

            if (entity.PkId <= 0)
            {
                var validateResult = _productRepository.Query().Any(p => p.ProductCode == entity.ProductCode);

                if (validateResult)
                {
                    return new Tuple<bool, string>(false, "存在重复的产品编码" + entity.ProductCode + "。");
                }

                var distinctGoodsCodeCount = entity.GoodsEntityList.Select(p => p.GoodsCode).Distinct().Count();
                var goodsCodeCount = entity.GoodsEntityList.Select(p => p.GoodsCode).Count();
                if (distinctGoodsCodeCount != goodsCodeCount)
                {
                    return new Tuple<bool, string>(false, "存在重复的商品编码。");
                }

                var validateResult3 = true;

                entity.GoodsEntityList.ForEach(p =>
                {
                    if (_goodsRepository.Query().Any(x=> x.GoodsCode == p.GoodsCode))
                    {
                        validateResult3 = false;
                    }
                });

                if (!validateResult3)
                {
                    return new Tuple<bool, string>(false, "存在重复的商品编码。");
                }

            }
            else
            {
                var validateResult = _productRepository.Query().Any(p => p.ProductCode == entity.ProductCode&&p.PkId!=entity.PkId);

                if (validateResult)
                {
                    return new Tuple<bool, string>(false, "存在重复的产品编码" + entity.ProductCode + "。");
                }

                var distinctGoodsCodeCount = entity.GoodsEntityList.Select(p => p.GoodsCode).Distinct().Count();
                var goodsCodeCount = entity.GoodsEntityList.Select(p => p.GoodsCode).Count();
                if (distinctGoodsCodeCount != goodsCodeCount)
                {
                    return new Tuple<bool, string>(false, "存在重复的商品编码。");
                }

                var validateResult3 = true;

                entity.GoodsEntityList.ForEach(p =>
                {
                    if (_goodsRepository.Query().Any(x => x.GoodsCode == p.GoodsCode&&x.ProductId!=entity.PkId))
                    {
                        validateResult3 = false;
                    }
                });

                if (!validateResult3)
                {
                    return new Tuple<bool, string>(false, "存在重复的商品编码。");
                }
            }


            return new Tuple<bool, string>(true, "");
        }
    }
}
