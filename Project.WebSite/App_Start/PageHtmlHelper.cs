using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Model.ContentManager;
using Project.Model.ProductManager.Request;

namespace Project.WebSite
{




    public class MyPageHtmlHelper
    {

        public static string GetLi(string title, int value, int selectValue)
        {

            var activeClass = value == selectValue ? "class=\"active\"" : "";

            return "<li " + activeClass + "><a href = \"/Order/List?State=" + value + "\"> " + title + " </a ></li >";
        }


        public static string GetImagePath(int width, int heigth, string orgPath)
        {
            var size = "";
            if (width > 0 && heigth > 0)
            {
                size = "/" + width + "_" + heigth + "";
            }
            if (string.IsNullOrWhiteSpace(orgPath))
            {
                return "/UploadFile/ProductImgFile"+ size + "/noimage.png";
            }
            else
            {
                orgPath= orgPath.Replace("ProductImgFile", "ProductImgFile" + size);
                return orgPath;
            }
        }


        public static string GetNormalImagePath(int width, int heigth, string orgPath)
        {
            var size = "";
            if (width > 0 && heigth > 0)
            {
                size = "/" + width + "_" + heigth + "";
            }
            if (string.IsNullOrWhiteSpace(orgPath))
            {
                return "/UploadFile/ImgFile" + size + "/noimage.png";
            }
            else
            {
                orgPath = orgPath.Replace("ImgFile", "ImgFile" + size);
                return orgPath;
            }
        }

    }
}