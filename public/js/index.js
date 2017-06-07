/**
 * Created by wqy on 2017/6/7.
 */

$(function () {

    var $loginBox = $('#loginBox');
    var $signUp = $('#signUp');
    var $loginSuccess = $('#loginSuccess');

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
                        $('#singUpMessage').html(result.message);
                        $('#singUpMessage').show();

                        if(!result.code)
                        {
                            $('#singUpMessage').text(result.message+'啦,3s后将自动跳转到登陆界面');
                            setTimeout(function () {
                                $loginBox.show();
                                $signUp.hide();
                            },3000)
                        }
                    }
                }
            )
        });
    });