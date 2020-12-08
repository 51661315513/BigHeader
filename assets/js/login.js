$(function() {
    //跳转至注册页面
    $('#link_reg').on('click', function() {
            $('.login-box').hide();
            $('.reg-box').show();
        })
        //跳转至登录页面
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从 layui 获取 form 对象
    var form = layui.form
    var layer = layui.layer;
    //通过lay-verify（）自定义效验规则
    form.verify({
            //自定义一个pwsd效验规则
            pwsd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val();
                if (pwd !== value) {
                    return '两次输入的密码不一致'
                }
            }
        })
        // 监听注册事件的提交事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault();
            var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('.login-box').show();
                $('.reg-box').hide();
            })
        })
        // 监听登录事件的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        // $.ajax({
        //         method: 'POST',
        //         url: 'http://ajax.frontend.itheima.net/api/login',
        //         data: $(this).serialize(),
        //         success: function(res) {
        //             if (res.status !== 0) {
        //                 return layer.msg(res.message);
        //             }
        //             localStorage.setItem('token', res.token)
        //             location.href = '/index.html';

        //         }
        //     })
        var data = { username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val() };
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            localStorage.setItem('token', res.token)
            location.href = '/index.html';
        })
    })
})