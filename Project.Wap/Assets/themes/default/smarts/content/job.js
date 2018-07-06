smart.viewerEngineer.regedit('job', function (model) {
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
                var html= {}
                $.ajax({
                    type: "POST",
                    url: "/Content/Job/GetJobList",
                    data: "",
                    cache: false,
                    async: false,
                    success: function (json) {
                        if (json.success && json.data.Jobs.length > 0) {
                            _.conf.List = json.data.Jobs;

                            //for (i = 0; i < _.conf.List.length; i++) {
                                //html.push('<li>');
                                //html.push('<a href="/JobInfo-' + _.conf.List[i].ID + '">');
                                //html.push(' <p><span class="list-1">' + _.conf.List[i].Position + '</span><span class="list-2 fr">' + _.conf.List[i].Createdate.substring(0, 10) + '</span></p>');
                                //html.push('<p><span class="list-3" role="location">' + _.conf.List[i].Location + '</span><span class="list-3 ml20" role="jobdescription">' + _.conf.List[i].Jobdescription + '</span></p>');
                                //html.push('</a>');
                                //html.push('</li>');
                            //}
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
                $(_.conf.locationSelect).val("全部");
                for (i = 0; i < department.length; i++) {
                    $(_.conf.jobdescriptionSelect).append('<option class="recruitment-opt" value="' + department[i] + '">' + department[i] + '</option>');
                }
                $(_.conf.jobdescriptionSelect).val("全部");

                //$('.recruitment-list').append(html.join(''));



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
                    var place = $(_.conf.locationSelect).val();
                    if (place == null || place == " ") { place ="全部"}
                    var ment = $(_.conf.jobdescriptionSelect).val();
                    if (ment == null || ment == " ") { ment = "全部" }
                    //解决不选择情况下显示所有信息
                    if (place == "工作地点" && ment == "职能部门") {
                        $(".recruitment-list li").show();
                    }
                    else if (place == "全部" && ment == "职能部门") {
                        $(".recruitment-list li").show();
                    }
                    else if (place == "全部" && ment == "全部") {
                        $(".recruitment-list li").show();
                    }
                    else if (place != "全部" && ment == "全部") {
                        $(".recruitment-list li").hide();
                        $(".recruitment-list li").each(function () {
                            var placeLike = $(this).find("a").find(_.conf.location).text();    //地址
                            var mentLike = $(this).find("a").find(_.conf.jobdescription).text();     //部门
                            if (placeLike == place && mentLike == ment) {
                                $(this).show();
                            } else if (placeLike == place && ment == "职能部门") {
                                $(this).show();
                            } else if (place == "工作地点" && mentLike == ment) {
                                $(this).show();
                            }
                            else if (placeLike == place && ment == "全部") {
                                $(this).show();
                            }
                            return true;
                        });
                    }
                    else if (place == "全部" && ment != "全部") {
                        $(".recruitment-list li").hide();
                        $(".recruitment-list li").each(function () {
                            var placeLike = $(this).find("a").find(_.conf.location).text();    //地址
                            var mentLike = $(this).find("a").find(_.conf.jobdescription).text();     //部门
                            if (mentLike == ment) {
                                $(this).show();
                            }
                            return true;
                        });
                    }
                    else {
                        $(".recruitment-list li").hide();
                        $(".recruitment-list li").each(function () {
                            var placeLike = $(this).find("a").find(_.conf.location).text();    //地址
                            var mentLike = $(this).find("a").find(_.conf.jobdescription).text();     //部门
                            if (placeLike == place && mentLike == ment) {
                                $(this).show();
                            } else if (placeLike == place && ment == "职能部门") {
                                $(this).show();
                            } else if (place == "工作地点" && mentLike == ment) {
                                $(this).show();
                            }
                            return true;
                        });
                    }
                });
            },

        },
        //按钮事件
        funcs: {
            adress: function (JobGlobal) {
                $(_.conf.locationSelect).change(function () {    //工作地点
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
                $(_.conf.jobdescriptionSelect).change(function () {
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