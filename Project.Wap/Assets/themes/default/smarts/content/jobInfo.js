smart.viewerEngineer.regedit('jobInfo', function (model) {
    var plugin = {
        conf: {
            List: {},//招聘信息集合
            locationSelect: '[role="locationSelect"]',//工作地点select
            jobdescriptionSelect: '[role="jobdescriptionSelect"]',//职能部门select
            btnSearch: '[role="search"]',//搜索按钮
            location: '[role="location"]',
            jobdescription: '[role="jobdescription"]',
        },

        //页面加载函数
        view: {
            jobInit: function () {
                var html = {}
                $.ajax({
                    type: "POST",
                    url: "/Content/Job/GetJobList",
                    data: "",
                    cache: false,
                    async: false,
                    success: function (json) {
                        if (json.success && json.data.Jobs.length > 0) {
                            _.conf.List = json.data.Jobs;
                        }
                    }
                });

                Array.prototype.unique = function () {
                    var res = [];
                    var json = {};
                    for (i = 0; i < this.length; i++) {
                        if (!json[this[i]]) {
                            res.push(this[i]);
                            json[this[i]] = 1;
                        }
                    }
                    return res;
                };
                //添加选择器
                var workplaceAll = [];//工作地点
                var departmentAll = [];//职能部门
                for (i = 0; i < _.conf.List.length; i++) {
                    workplaceAll.push(_.conf.List[i].Location);
                    departmentAll.push(_.conf.List[i].Jobdescription);
                }
                workplaceAll.push("全部");
                var workplace = workplaceAll.unique();
                var department = departmentAll.unique();
                for (i = 0; i < workplace.length; i++) {
                    $(_.conf.locationSelect).append('<option class="recruitment-opt" value="' + workplace[i] + '">' + workplace[i] + '</option>');
                }
                for (i = 0; i < department.length; i++) {
                    $(_.conf.jobdescriptionSelect).append('<option class="recruitment-opt" value="' + department[i] + '">' + department[i] + '</option>');
                }





                ////选择器事件
                //$("#workplace,#department").click(function () {
                //    $(this).children("ul").slideToggle(300);
                //    return false;
                //});
                //$(document).click(function () {
                //    $("#workplace,#department").children("ul").slideUp(300);
                //});
                _.funcs.adress(_.conf.List);
                _.funcs.job();
                $(_.conf.btnSearch).click(function () {
                    window.open('/Job?location=' + $(_.conf.locationSelect).val() + '&department=' + $(_.conf.jobdescriptionSelect).val(), "_blank");
                });
            },

        },
        //按钮事件
        funcs: {
            adress: function (JobGlobal) {
                $(_.conf.locationSelect).click(function () {    //工作地点
                    var txt = $(_.conf.locationSelect).val();
                    var searchAll = [];//职能部门
                    $(_.conf.jobdescriptionSelect).empty();    //职能部门
                    for (i = 0; i < JobGlobal.length; i++) {
                        workplaceAll = JobGlobal[i].Location;   //工作地点
                        if (txt === workplaceAll && txt != "全部") {
                            searchAll.push(JobGlobal[i].Jobdescription);
                        }
                        if (txt == "全部") {
                            searchAll.push(JobGlobal[i].Jobdescription);
                        }
                    }
                    searchAll.push("全部")    //职能部门
                    var search = searchAll.unique();
                    for (var j = 0; j < search.length; j++) {
                        $(_.conf.jobdescriptionSelect).append('<option class="recruitment-opt" value="' + search[j] + '">' + search[j] + '</option>');
                        _.funcs.job();
                    }
                    $(_.conf.jobdescriptionSelect).parents("li").children("span").html("职能部门");
                    $(this).parents("li").children("span").html(txt);
                    $(_.conf.jobdescriptionSelect).val("全部");
                });
            },
            job: function () {
                $(_.conf.jobdescriptionSelect).click(function () {
                    var txt = $(_.conf.jobdescriptionSelect).val();
                    $(this).parents("li").children("span").html(txt);
                });
            }
        },

        //初始化
        init: function () {
            this.conf = $.extend(_conf, this.conf);
            this.view = $.extend(_layout.view, this.view);

            _ = this;
            _container = this.conf.container;
            _.view.jobInit();

        }
    };
    return plugin.init();
});