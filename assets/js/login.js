$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //从 layui 获取 form 对象
    var form = layui.form
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
        $.post('http://ajax.frontend.itheima.net/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function(res) {
            if (res.status !== 0) {
                return console.log(res.message);
            }
            console.log('注册成功');
            $('.login-box').show();
            $('.reg-box').hide();
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.post('http://ajax.frontend.itheima.net/api/login', { username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val() }, function(res) {
            if (res.status !== 0) {
                return console.log(res.message);
            }
            localStorage.setItem('token', res.token)
            location.href = '/index.html';
        })
    })
})