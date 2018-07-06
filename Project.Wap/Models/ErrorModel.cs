namespace Project.Wap.Models
{
    public class ErrorModel
    {
        public ErrorModel()
        {
            this.ButtonValue = "确定";
        }

        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 错误消息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 错误类型，区分页面上显示的图标，1：成功，2：提示，3：普通警告，4：强烈警告，5：等待
        /// </summary>
        public int Level { get; set; }

        /// <summary>
        /// 按钮
        /// </summary>
        public string ButtonValue { get; set; }

        /// <summary>
        /// 确认后返回的地址
        /// </summary>
        public string NextUrl { get; set; }
    }
}