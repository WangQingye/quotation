/**
 * Created by wqy on 2017/6/7.
 */

$(function () {

    var $loginBox = $('#loginBox');
    var $signUp = $('#signUp');
    var $loginSuccess = $('#loginSuccess');
    
    //登陆与注册页面切换
    $loginBox.find('a').on('click', function () {
        console.log('312');
        $signUp.show();
        $loginBox.hide();
    });
    $signUp.find('a').on('click', function () {
        console.log('123');
        $loginBox.show();
        $signUp.hide();
    });

    //点击注册
    $signUp.find('button').on('click', function () {
        $.ajax(
                {
                    type:'post',
                    url:'/api/user/signup',
                    data:
                        {
                            username: $signUp.find("[name = userid]").val(),
                            password: $signUp.find('[name = password]').val(),
                            repassword: $signUp.find('[name = repassword]').val()
                        },
                    dataType:'json',
                    success:function (result) {
                        $signUp.find("[name = singUpMessage]").html(result.message);
                        $signUp.find("[name = singUpMessage]").show();

                        if(!result.code)
                        {
                            $signUp.find("[name = singUpMessage]").text(result.message+'啦,3s后将自动跳转到登陆界面');
                            setTimeout(function () {
                                $loginBox.show();
                                $signUp.hide();
                            },3000)
                        }
                    }
                }
            )
        });
    //点击登陆
    $loginBox.find('button').on('click', function () {
        $.ajax(
            {
                type:'post',
                url:'/api/user/login',
                data:
                    {
                        username: $loginBox.find("[name = userid]").val(),
                        password: $loginBox.find('[name = password]').val(),
                    },
                dataType:'json',
                success:function (result) {
                    // if(!result.code)
                    // {
                    //     $loginBox.hide();
                    //     $loginSuccess.show();
                    //     $loginSuccess.find("[name = username]").html(result.userInfo.username)
                    // }else
                    // {
                    //     $loginBox.find("[name = singUpMessage]").show();
                    //     $loginBox.find("[name = singUpMessage]").text(result.message);
                    // }
                    // 有cookies过后上一段就不需要了，只需要刷新页面
                    if(!result.code)
                    {
                        window.location.reload();
                    }else
                    {
                        $loginBox.find("[name = singUpMessage]").show();
                        $loginBox.find("[name = singUpMessage]").text(result.message);
                    }
                }
            }
        )
    });
    //点击退出
    $loginSuccess.find('a').on('click', function () {
        $.ajax(
            {
                //默认type:'get',
                url:'/api/user/logout',
                success:function (result) {
                    if(!result.code)
                    {
                        window.location.reload();
                    }
                }
            }
        )
    })
    
    });