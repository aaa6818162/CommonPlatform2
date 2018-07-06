/************************  失焦判断  **********************************/
$("#passWord").blur(function(){
    checkPassWord();
    $(this).css("border-color","#dddddd")
});
$("#rePassWord").blur(function(){
    checkRePassWord();
    $(this).css("border-color","#dddddd")
});

$(".u-name").blur(function(){
    checkNC();
    $(this).css("border-color","#dddddd");
});
/********************** 聚焦提示 ************************/
$(".u-name,#passWord,#rePassWord").focus(function(){
    $(this).css("border-color","#6997d5")

});
//登录密码
function checkPassWord() {
    if($("#passWord").val().length==0)
    {
        $(".spa1").text('密码不能为空');
        $(".spa1").css("color","#e04444");
        $("#passWord").css("border-color","#e04444");
        return false;
    }
    var pattern=/^[A-Za-z0-9]{6,16}$/;
    if(!pattern.test($("#passWord").val()))
    {
        $(".spa1").text('密码不符合格式，请重新输入');
        $(".spa1").css("color","#e04444");
        $("#passWord").css("border-color","#e04444");
        return false;
    }
    $(".spa1").text('密码输入正确');
    $(".spa1").css("color","#5bdc63");
    return true;
}

//重复登录密码
function checkRePassWord() {
    if($("#passWord").val().length==0)
    {
        $(".spa2").text('重复密码不能为空');
        $(".spa2").css("color","#e04444");
        $("#rePassWord").css("border-color","#e04444");
        return false;
    }
    if($("#rePassWord").val()!=$("#passWord").val())
    {
        $(".spa2").text('两次输入的密码不一致，请重新输入');
        $(".spa2").css("color","#e04444");
        $("#rePassWord").css("border-color","#e04444");
        return false;
    }
    $(".spa2").text('两次密码一致');
    $(".spa2").css("color","#5bdc63");
    return true;
}
//昵称（6-20位所有字符）
function checkNC() {
    if($(".u-name").val().length==0)
    {
        $(".spa3").text('昵称不能为空');
        $(".spa3").css("color","#e04444");
        return false;
    }
    var pattern=/^.{3,20}$/;
    if(!pattern.test( $(".u-name").val())) {
        $(".spa3").text('昵称格式错误，请重新输入');
        $(".spa3").css("color","#e04444");
        return false;
    }
    $(".spa3").text('昵称输入正确');
    $(".spa3").css("color","#5bdc63");
    return true;
}