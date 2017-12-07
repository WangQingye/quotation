/**
 * Created by wqy on 2017/12/6.
 */

$(function () {
    /* 页面数据 */
    var imgBase64;
    var $loginBox = $('#loginBox');
    var $signUp = $('#signUp');
    var $loginSuccess = $('#loginSuccess');
    var $goodsNav = $('#goodsNav');
    $goodsNav.find('li').on('click', function () {
        $goodsNav.addClass('active')
    });
    var $goodImg = $('#img');
    var $showImg = $('#showImg');
    var $imgSrc = $('#goodimg')
    $goodImg.on('change',function(){
        var file = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {      
            imgBase64 = reader.result;
            $showImg.attr('src', imgBase64);
            $imgSrc.val(imgBase64);
            console.log($imgSrc.val());
        };
    })

    $('#submit').on('click', function(){
        console.log(111);
        // $.ajax({
        //     type: 'post',
        //     url:'add',
        //     data:{
        //         goodname: $('#title').val(),
        //         goodprice: $('#price').val(),
        //         gooddes: $('#description').val(),
        //         goodimg: imgBase64,
        //     },
        //     dataType:'json',
        //     success: function(){
        //         console.log('上传成功')
        //     }
        // })
    })

    // //点击注册
    // $signUp.find('button').on('click', function () {
    //     $.ajax(
    //             {
    //                 type:'post',
    //                 url:'/api/user/signup',
    //                 data:
    //                     {
    //                         username: $signUp.find("[name = userid]").val(),
    //                         password: $signUp.find('[name = password]').val(),
    //                         repassword: $signUp.find('[name = repassword]').val()
    //                     },
    //                 dataType:'json',
    //                 success:function (result) {
    //                     $signUp.find("[name = singUpMessage]").html(result.message);
    //                     $signUp.find("[name = singUpMessage]").show();

    //                     if(!result.code)
    //                     {
    //                         $signUp.find("[name = singUpMessage]").text(result.message+'啦,3s后将自动跳转到登陆界面');
    //                         setTimeout(function () {
    //                             $loginBox.show();
    //                             $signUp.hide();
    //                         },3000)
    //                     }
    //                 }
    //             }
    //         )
    //     });
    // //点击登陆
    // $loginBox.find('button').on('click', function () {
    //     $.ajax(
    //         {
    //             type:'post',
    //             url:'/api/user/login',
    //             data:
    //                 {
    //                     username: $loginBox.find("[name = userid]").val(),
    //                     password: $loginBox.find('[name = password]').val(),
    //                 },
    //             dataType:'json',
    //             success:function (result) {
    //                 // if(!result.code)
    //                 // {
    //                 //     $loginBox.hide();
    //                 //     $loginSuccess.show();
    //                 //     $loginSuccess.find("[name = username]").html(result.userInfo.username)
    //                 // }else
    //                 // {
    //                 //     $loginBox.find("[name = singUpMessage]").show();
    //                 //     $loginBox.find("[name = singUpMessage]").text(result.message);
    //                 // }
    //                 // 有cookies过后上一段就不需要了，只需要刷新页面
    //                 if(!result.code)
    //                 {
    //                     window.location.reload();
    //                 }else
    //                 {
    //                     $loginBox.find("[name = singUpMessage]").show();
    //                     $loginBox.find("[name = singUpMessage]").text(result.message);
    //                 }
    //             }
    //         }
    //     )
    // });
    // //点击退出
    // $('#logout').on('click', function () {
    //     $.ajax(
    //         {
    //             //默认type:'get',
    //             url:'/api/user/logout',
    //             success:function (result) {
    //                 if(!result.code)
    //                 {
    //                     window.location.reload();
    //                 }
    //             }
    //         }
    //     )
    // })
    
    });